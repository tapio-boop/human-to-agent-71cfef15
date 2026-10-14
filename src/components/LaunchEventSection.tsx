import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

// Julkistustilaisuuden tiedot. Ilmoittautumisnappi näkyy, kun registrationUrl asetetaan.
const launchEvent = {
  date: "Keskiviikko 11.11.2026",
  time: "klo 8.30–10.30",
  place: "Sofia, Sofiankatu 4 C, Helsinki",
  registrationUrl: "",
};

const details = [
  { icon: CalendarDays, text: launchEvent.date },
  { icon: Clock, text: launchEvent.time },
  { icon: MapPin, text: launchEvent.place },
];

export function LaunchEventSection() {
  return (
    <section id="julkistus" className="section-padding bg-primary scroll-mt-16 md:scroll-mt-20">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Julkistustilaisuus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tighter mb-6">
              Ihmisten ja agenttien organisaatio — kirjan julkistus
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Kirjan kirjoittajat avaavat teoksen keskeiset ajatukset. Paneelissa keskustellaan
              siitä, mitä tekoälyagentit vaativat johtamiselta.
            </p>
            <ul className="space-y-3">
              {details.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-primary-foreground">
                  <item.icon className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-base md:text-lg font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-6 md:p-8 border border-primary-foreground/20 bg-primary-foreground/5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-5">
              Ilmoittautuminen
            </h3>
            <div className="mt-auto">
              {launchEvent.registrationUrl ? (
                <a
                  href={launchEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-base font-semibold shadow-md hover:opacity-90 transition"
                >
                  Ilmoittaudu
                </a>
              ) : (
                <p className="text-primary-foreground/80">
                  Ohjelma ja ilmoittautuminen julkaistaan pian.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
