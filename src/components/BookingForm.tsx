import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function BookingForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const field =
    "w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-accent";

  return (
    <div className="glass rounded-[2rem] p-6 md:p-10">
      <h2 className="text-2xl font-bold md:text-3xl">{t.form.title}</h2>
      <p className="mt-2 max-w-md text-sm text-foreground/60">{t.form.body}</p>

      <form
        className="mt-8 grid gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <input required placeholder={t.form.name} className={field} />
        <input required type="tel" placeholder={t.form.phone} className={field} />
        <input required type="date" aria-label={t.form.date} className={field} />
        <select aria-label={t.form.type} className={field} defaultValue="">
          <option value="" disabled>
            {t.form.type}
          </option>
          {t.services.map((s) => (
            <option key={s.title} value={s.title} className="bg-popover">
              {s.title}
            </option>
          ))}
        </select>
        <input type="number" min="1" placeholder={t.form.guests} className={field} />
        <input placeholder={t.form.message} className={field} />
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 md:col-span-2 md:justify-self-start"
        >
          {t.form.submit}
        </button>
      </form>

      {sent && <p className="mt-4 text-sm text-accent">{t.form.success}</p>}
    </div>
  );
}
