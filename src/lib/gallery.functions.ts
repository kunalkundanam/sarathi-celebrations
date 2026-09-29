import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

const BUCKET = "gallery-images";
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type AdminSession = { galleryAdmin?: boolean };

function sessionOptions() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "sarathi-gallery-admin",
    maxAge: 60 * 60 * 8,
    // "none" so the cookie also works when the site is shown inside the editor preview frame
    cookie: { httpOnly: true, secure: true, sameSite: "none" as const, path: "/" },
  };
}

async function isAdmin() {
  const session = await useSession<AdminSession>(sessionOptions());
  return session.data.galleryAdmin === true;
}

function safeEqual(input: string, expected: string) {
  const inputHash = createHash("sha256").update(input, "utf8").digest();
  const expectedHash = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(inputHash, expectedHash);
}

async function loadGalleryItems() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("gallery_items")
    .select("id, caption, image_path, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Gallery could not be loaded.");

  return Promise.all(
    (data ?? []).map(async (item) => {
      const { data: signed } = await supabaseAdmin.storage
        .from(BUCKET)
        .createSignedUrl(item.image_path, 60 * 60);
      return { ...item, imageUrl: signed?.signedUrl ?? "" };
    }),
  );
}

export const listGalleryItems = createServerFn({ method: "GET" }).handler(loadGalleryItems);

export const getGalleryAdminState = createServerFn({ method: "GET" }).handler(async () => ({
  unlocked: await isAdmin(),
  items: (await isAdmin()) ? await loadGalleryItems() : [],
}));

export const unlockGalleryAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_GALLERY_PASSWORD"];
    if (!expected || !safeEqual(data.password, expected)) return { ok: false as const };

    const session = await useSession<AdminSession>(sessionOptions());
    await session.update({ galleryAdmin: true });
    return { ok: true as const };
  });

export const lockGalleryAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionOptions());
  await session.clear();
  return { ok: true };
});

export const uploadGalleryItem = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Invalid upload.");
    return data;
  })
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("Unauthorized");

    const caption = String(data.get("caption") ?? "").trim();
    const file = data.get("image");
    if (!caption || caption.length > 180) throw new Error("Add a caption of up to 180 characters.");
    if (!(file instanceof File) || file.size === 0) throw new Error("Choose an image.");
    if (!ALLOWED_TYPES.has(file.type) || file.size > 10 * 1024 * 1024) {
      throw new Error("Use a JPG, PNG or WebP image under 10 MB.");
    }

    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const imagePath = `${crypto.randomUUID()}.${extension}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(imagePath, await file.arrayBuffer(), { contentType: file.type, upsert: false });
    if (uploadError) throw new Error("The image could not be uploaded.");

    const { error: insertError } = await supabaseAdmin
      .from("gallery_items")
      .insert({ caption, image_path: imagePath });
    if (insertError) {
      await supabaseAdmin.storage.from(BUCKET).remove([imagePath]);
      throw new Error("The caption could not be saved.");
    }

    return { ok: true };
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    if (!(await isAdmin())) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: item, error: lookupError } = await supabaseAdmin
      .from("gallery_items")
      .select("image_path")
      .eq("id", data.id)
      .maybeSingle();
    if (lookupError) throw new Error("Photo could not be looked up.");
    if (!item) return { ok: true }; // already deleted

    const { error: storageError } = await supabaseAdmin.storage.from(BUCKET).remove([item.image_path]);
    if (storageError) throw new Error("The image could not be removed.");
    const { error: deleteError } = await supabaseAdmin.from("gallery_items").delete().eq("id", data.id);
    if (deleteError) throw new Error("The gallery entry could not be removed.");
    return { ok: true };
  });