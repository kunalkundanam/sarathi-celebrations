import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { listGalleryItems } from "@/lib/gallery.functions";

export const Route = createFileRoute("/gallery")({
  loader: () => listGalleryItems(),
  head: () => ({
    meta: [
      { title: "गॅलरी | सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स" },
      { name: "description", content: "सारथी इव्हेंट्सने पार पाडलेल्या अलीकडील वाढदिवस व विभागीय सोहळ्यांची छायाचित्रे." },
      { property: "og:title", content: "गॅलरी | Sarathi Events & Celebrations" },
      { property: "og:description", content: "Photos from recent birthdays, get-togethers and department functions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <p className="p-16 text-center">Gallery could not be loaded.</p>,
  notFoundComponent: () => <p className="p-16 text-center">Not found.</p>,
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useLang();
  const items = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-bold md:text-5xl">{t.galleryPage.title}</h1>
      <p className="mt-3 max-w-lg text-foreground/60">{t.galleryPage.body}</p>

      {items.length === 0 ? (
        <p className="glass mt-10 rounded-2xl p-10 text-center text-foreground/60">📷 …</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="glass group overflow-hidden rounded-2xl">
              <div className="overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 text-sm font-semibold">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
