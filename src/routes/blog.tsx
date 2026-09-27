import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "ब्लॉग | सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स" },
      {
        name: "description",
        content: "विवाह नियोजन, सजावट संकल्पना व विभागीय कार्यक्रमांविषयी सारथी इव्हेंट्सचे लेख.",
      },
      { property: "og:title", content: "ब्लॉग | Sarathi Events & Celebrations" },
      {
        property: "og:description",
        content: "Planning guides, décor trends and stories from our celebrations.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-bold md:text-5xl">{t.blogPage.title}</h1>
      <p className="mt-3 max-w-lg text-foreground/60">{t.blogPage.body}</p>

      <div className="mt-10 grid gap-5">
        {t.posts.map((p) => (
          <article key={p.title} className="glass rounded-3xl p-6 md:p-8">
            <span className="text-xs tracking-widest text-accent">
              {p.tag} · {p.date}
            </span>
            <h2 className="mt-2 text-2xl leading-snug font-bold">{p.title}</h2>
            <p className="mt-3 text-foreground/65">{p.excerpt}</p>
            <button className="mt-4 text-sm font-semibold text-accent hover:underline">
              {t.blogPage.read}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
