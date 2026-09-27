import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-celebration.jpg";
import sangeetImg from "@/assets/event-sangeet.jpg";
import birthdayImg from "@/assets/event-birthday.jpg";
import corporateImg from "@/assets/event-corporate.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "गॅलरी | सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स" },
      {
        name: "description",
        content: "सारथी इव्हेंट्सने पार पाडलेल्या अलीकडील विवाह, वाढदिवस व विभागीय सोहळ्यांची छायाचित्रे.",
      },
      { property: "og:title", content: "गॅलरी | Sarathi Events & Celebrations" },
      {
        property: "og:description",
        content: "Photos from recent weddings, birthdays and department functions.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useLang();
  const tiles = [
    { img: heroImg, caption: t.services[0]?.title ?? "", span: "md:col-span-2 md:row-span-2" },
    { img: sangeetImg, caption: t.events[0]?.title ?? "", span: "" },
    { img: birthdayImg, caption: t.events[1]?.title ?? "", span: "" },
    { img: corporateImg, caption: t.events[2]?.title ?? "", span: "md:col-span-2" },
  ];


  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-bold md:text-5xl">{t.galleryPage.title}</h1>
      <p className="mt-3 max-w-lg text-foreground/60">{t.galleryPage.body}</p>

      <div className="mt-10 grid auto-rows-[220px] gap-5 md:grid-cols-4">
        {tiles.map((tile) => (
          <figure
            key={tile.caption}
            className={`glass group relative overflow-hidden rounded-3xl ${tile.span}`}
          >
            <img
              src={tile.img}
              alt={tile.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4 text-sm font-semibold">
              {tile.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
