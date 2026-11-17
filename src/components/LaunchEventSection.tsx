import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Julkistustilaisuuden (11.11.2026) paneeli.
const panel = [
  { name: "Timo Ritakallio", title: "pääjohtaja, OP Pohjola" },
  {
    name: "Outi Sivonen",
    title: "kokenut HR-johtaja, työkulttuurin kehittäjä ja johtamisen asiantuntija",
  },
  { name: "Mikael Jungner", title: "toimitusjohtaja, Kreab Oy" },
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
              Julkistus 11.11.2026
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tighter mb-6">
              Kirja julkaistiin täydelle salille
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Kirjoittajat avasivat kirjan keskeiset ajatukset, ja paneelissa Timo Ritakallio, Outi Sivonen ja
              Mikael Jungner keskustelivat siitä, mitä tekoälyagentit vaativat johtamiselta.
            </p>
          </div>

          <div className="rounded-xl p-6 md:p-8 border border-primary-foreground/20 bg-primary-foreground/5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-5">
              Paneelissa
            </h3>
            <ul className="space-y-5 mb-6">
              {panel.map((person) => (
                <li key={person.name}>
                  <p className="text-lg font-semibold text-primary-foreground">{person.name}</p>
                  <p className="text-sm text-primary-foreground/70">{person.title}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/julkistus"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-base font-semibold shadow-md hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Katso puheenvuorot ja tunnelmat
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
