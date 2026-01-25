import { motion } from "framer-motion";

const myths = [
  {
    myth: "Tekoäly tekee päätöksenteosta parempaa.",
    reality: "Tekoäly tekee päätöksenteosta nopeampaa. Laatu paranee vain, jos ihminen ehtii ymmärtää seuraukset.",
  },
  {
    myth: "Automaatio poistaa työtä.",
    reality: "Automaatio siirtää työn näkyvästä tekemisestä näkymättömään vastuuseen, valvontaan ja poikkeamien käsittelyyn.",
  },
  {
    myth: "Ihminen on pullonkaula, joka pitää poistaa.",
    reality: "Ihminen on järjestelmän ankkuri. Kun hänet ohitetaan, järjestelmä menettää kykynsä oppia ja korjata itseään.",
  },
  {
    myth: "Jos pilotti toimii, sitä kannattaa skaalata nopeasti.",
    reality: "Pilotti toimii usein siksi, että HAR on vielä matala. Skaalaus ilman järjestelmäymmärrystä monistaa virheet.",
  },
  {
    myth: "AI-strategia on teknologiastrategia.",
    reality: "AI-strategia on päätöksenteon, vastuun ja riskin strategia. Teknologia on vasta kolmas kysymys.",
  },
  {
    myth: "Nopeus on kilpailuetu.",
    reality: "Hallitsematon nopeus on haavoittuvuus. Kilpailuetu syntyy järjestelmistä, jotka kestävät nopeuden.",
  },
  {
    myth: "Virheet tarkoittavat, että järjestelmä ei toimi.",
    reality: "Virheet ovat väistämättömiä. Toimiva järjestelmä on sellainen, joka huomaa ja oppii niistä ajoissa.",
  },
  {
    myth: "AI governance on compliance-kysymys.",
    reality: "AI governance on johtamisen ydintehtävä: kuka päättää, kuka vastaa ja kuka pysäyttää.",
  },
  {
    myth: "Viiveetön organisaatio on aina parempi.",
    reality: "Kaikki viiveet eivät ole hukkaa. Osa viiveistä suojaa harkintaa, laatua ja vastuuta.",
  },
];

export function MythsSection() {
  return (
    <section id="uskomukset" className="section-padding bg-background-muted">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            9 uskomusta, jotka HAR kumoaa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            HAR-ajattelu haastaa vallitsevat oletukset tekoälyn roolista organisaatioissa.
          </p>
        </motion.div>

        <div className="space-y-4">
          {myths.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl p-5 md:p-6 border border-border flex gap-4 md:gap-6 items-start hover:shadow-sm transition-shadow"
            >
              {/* Number */}
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-secondary">{index + 1}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-2">
                <p className="text-muted-foreground line-through decoration-muted-foreground/50">
                  "{item.myth}"
                </p>
                <p className="text-primary">
                  <span className="text-accent font-semibold">Todellisuudessa: </span>
                  {item.reality}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
