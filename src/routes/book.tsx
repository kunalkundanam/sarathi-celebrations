import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/BookingForm";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "बुकिंग | सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स" },
      {
        name: "description",
        content: "आपल्या वाढदिवस किंवा विभागीय कार्यक्रमासाठी सारथी इव्हेंट्सकडे चौकशी नोंदवा.",
      },
      { property: "og:title", content: "बुकिंग | Sarathi Events & Celebrations" },
      {
        property: "og:description",
        content: "Send an enquiry for your birthday or department function.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <BookingForm />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {t.services.slice(0, 3).map((s) => (
          <div key={s.title} className="glass rounded-2xl p-5">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-foreground/60">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
