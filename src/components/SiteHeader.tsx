import { Link } from "@tanstack/react-router";
import logo from "@/assets/sarathi-logo.jpeg.asset.json";
import { LANGS, useLang } from "@/lib/i18n";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();

  const linkClass = "text-sm text-foreground/70 transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt={t.brand} className="size-10 rounded-xl object-cover" />
          <span className="hidden text-sm font-semibold tracking-wide sm:block">
            {t.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={linkClass} activeProps={{ className: "text-sm text-foreground" }}>
            {t.nav.home}
          </Link>
          <Link to="/gallery" className={linkClass}>
            {t.nav.gallery}
          </Link>
          <Link to="/blog" className={linkClass}>
            {t.nav.blog}
          </Link>
          <Link to="/book" className={linkClass}>
            {t.nav.book}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-border bg-card/60 p-0.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  lang === l.code
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link
            to="/book"
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:block"
          >
            {t.bookNow}
          </Link>
        </div>
      </div>
    </header>
  );
}
