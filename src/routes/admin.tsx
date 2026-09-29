import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, LogOut, Trash2, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  deleteGalleryItem,
  getGalleryAdminState,
  lockGalleryAdmin,
  unlockGalleryAdmin,
  uploadGalleryItem,
} from "@/lib/gallery.functions";

export const Route = createFileRoute("/admin")({
  loader: () => getGalleryAdminState(),
  head: () => ({
    meta: [
      { title: "Gallery Admin | Sarathi Events & Celebrations" },
      { name: "description", content: "Private gallery management for Sarathi Events & Celebrations." },
      { property: "og:title", content: "Gallery Admin | Sarathi Events & Celebrations" },
      { property: "og:description", content: "Private gallery management for Sarathi Events & Celebrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const unlock = useServerFn(unlockGalleryAdmin);
  const upload = useServerFn(uploadGalleryItem);
  const remove = useServerFn(deleteGalleryItem);
  const lock = useServerFn(lockGalleryAdmin);
  const [unlocked, setUnlocked] = useState(initial.unlocked);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    await router.invalidate();
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    const result = await unlock({ data: { password } });
    setBusy(false);
    if (!result.ok) return setError("Incorrect password.");
    setUnlocked(true);
    await refresh();
  }

  async function addPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    try {
      await upload({ data: new FormData(form) });
      form.reset();
      await refresh();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
        <form method="post" onSubmit={signIn} className="glass w-full rounded-2xl p-7">
          <h1 className="text-3xl font-bold">Gallery admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to manage event photos.</p>
          <label htmlFor="admin-password" className="mt-7 block text-sm font-medium">Password</label>
          <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 outline-none focus:border-accent" />
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="mt-5 w-full">{busy ? "Checking…" : "Enter admin"}</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Gallery manager</h1>
          <p className="mt-2 text-muted-foreground">Upload event photos and add the caption shown underneath.</p>
        </div>
        <Button variant="outline" onClick={async () => { await lock(); setUnlocked(false); await refresh(); }}>
          <LogOut /> Lock admin
        </Button>
      </div>

      <form onSubmit={addPhoto} className="glass mt-10 grid gap-5 rounded-2xl p-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="text-sm font-medium">Photo
          <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-dashed border-border bg-input px-4 text-muted-foreground">
            <ImagePlus className="size-5" /> Choose JPG, PNG or WebP
          </span>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className="sr-only" />
        </label>
        <label className="text-sm font-medium">Caption
          <input name="caption" maxLength={180} required placeholder="e.g. Annual gathering, Pune" className="mt-2 h-12 w-full rounded-lg border border-border bg-input px-4 outline-none focus:border-accent" />
        </label>
        <Button type="submit" disabled={busy} className="h-12"><Upload /> {busy ? "Uploading…" : "Upload"}</Button>
      </form>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {initial.items.map((item) => (
          <article key={item.id} className="glass overflow-hidden rounded-lg">
            <img src={item.imageUrl} alt={item.caption} className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="font-medium">{item.caption}</p>
              <Button variant="ghost" size="icon" title="Delete photo" aria-label={`Delete ${item.caption}`} onClick={async () => { await remove({ data: { id: item.id } }); await refresh(); }}>
                <Trash2 />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}