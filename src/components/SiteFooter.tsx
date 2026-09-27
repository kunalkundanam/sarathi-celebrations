import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-10 text-center">
        <p className="text-sm text-foreground/70">
          {t.brand} — {t.tagline}
        </p>
        <p className="text-xs text-foreground/45">
          {t.footerContact}: +91 98765 43210 · namaskar@sarathievents.in · पुणे, महाराष्ट्र
        </p>
        <p className="text-xs text-foreground/35">© 2026 Sarathi Events. {t.rights}</p>
      </div>
    </footer>
  );
}
