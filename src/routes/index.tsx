import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { BookingForm } from "@/components/BookingForm";
import heroImg from "@/assets/hero-celebration.jpg";
import culturalImg from "@/assets/event-cultural.jpg";
import birthdayImg from "@/assets/event-birthday.jpg";
import corporateImg from "@/assets/event-corporate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स | Sarathi Events & Celebrations" },
      {
        name: "description",
        content:
          "कर्तव्यदक्षांच्या कुटुंबाचा, हक्काचा विरंगुळा! वाढदिवस, विभागीय व सांस्कृतिक कार्यक्रमांचे संपूर्ण नियोजन — पुणे.",
      },
      { property: "og:title", content: "सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स" },
      {
        property: "og:description",
        content: "Birthdays and department functions planned with heart in Pune.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const gallery = [culturalImg, birthdayImg, corporateImg];

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="anim-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-[0.2em] text-foreground/70">
            <span className="size-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </span>
          <h1 className="anim-up mt-6 text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl">
            {t.hero.titleA} <span className="text-accent">{t.hero.titleAccent}</span>{" "}
            {t.hero.titleB}
          </h1>
          <p className="anim-up mt-6 max-w-md text-lg leading-relaxed text-foreground/70">
            {t.tagline} {t.hero.body}
          </p>
          <div className="anim-up mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-colors hover:bg-brand/90"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              to="/gallery"
              className="glass rounded-full px-6 py-3 font-semibold transition-colors hover:bg-secondary"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
          <div className="anim-up mt-10 flex gap-10 text-sm text-foreground/60">
            <div>
              <span className="block font-display text-2xl font-bold text-foreground">
                {t.hero.stat1}
              </span>
              {t.hero.stat1Label}
            </div>
            <div>
              <span className="block font-display text-2xl font-bold text-foreground">
                {t.hero.stat2}
              </span>
              {t.hero.stat2Label}
            </div>
          </div>
        </div>

        <div className="anim-up">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-brand/40 via-rose/30 to-accent/30 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <img
                src={heroImg}
                alt={t.hero.heroAlt}
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rounded-3xl object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-6 w-56 rounded-2xl p-4">
              <p className="text-xs tracking-widest text-foreground/50">{t.hero.nextUp}</p>
              <p className="mt-1 font-semibold">{t.hero.nextUpName}</p>
              <p className="text-xs text-accent">{t.hero.nextUpMeta}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="glass rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-xs tracking-widest text-foreground/50">{t.quick.type}</p>
              <p className="mt-1 font-semibold">{t.quick.typeValue}</p>
            </div>
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-xs tracking-widest text-foreground/50">{t.quick.date}</p>
              <p className="mt-1 font-semibold">{t.quick.dateValue}</p>
            </div>
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-xs tracking-widest text-foreground/50">{t.quick.guests}</p>
              <p className="mt-1 font-semibold">{t.quick.guestsValue}</p>
            </div>
            <Link
              to="/book"
              className="flex items-center justify-center rounded-2xl bg-accent p-4 text-center font-bold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {t.quick.cta}
            </Link>
          </div>
          <p className="mt-4 text-xs text-foreground/40">{t.quick.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">{t.servicesTitle}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map((s, i) => (
            <div key={s.title} className="glass rounded-3xl p-6">
              <span className="font-display text-3xl font-bold text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-foreground/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">
            {t.eventsTitle} <span className="text-accent">{t.eventsAccent}</span>
          </h2>
          <Link to="/gallery" className="text-sm text-foreground/60 hover:text-foreground">
            {t.seeAll}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.events.map((e, i) => (
            <div key={e.title} className="glass overflow-hidden rounded-3xl">
              <img
                src={gallery[i]}
                alt={e.title}
                loading="lazy"
                width={944}
                height={704}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs text-accent">{e.tag}</p>
                <p className="mt-1 font-semibold">{e.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          {t.blogTitle} <span className="text-brand-foreground/70">{t.blogAccent}</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {t.posts.map((p) => (
            <article key={p.title} className="glass rounded-3xl p-6">
              <span className="text-xs tracking-widest text-accent">
                {p.tag} · {p.date}
              </span>
              <h3 className="mt-2 text-lg leading-snug font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <BookingForm />
      </section>
    </>
  );
}
