import { motion } from "framer-motion";
import harFrameworkImage from "@/assets/har-framework.png";

const coreIdeas = [
  {
    text: "Organisaatiot eivät ole enää pelkästään ihmisten muodostamia järjestelmiä. Niistä on nopeasti tulossa",
    highlight: "hybridejä",
    suffix: ", joissa ihmiset ja tekoälyagentit toimivat rinnakkain.",
  },
  {
    text: "Tekoäly ei ole vain uusi työkalu. Se on",
    highlight: "uudenlainen toimija",
    suffix: ", jonka nopeus, skaala ja autonomia muuttavat koko järjestelmän dynamiikkaa.",
  },
  {
    text: "HAR on viitekehys, jonka avulla voidaan ymmärtää, suunnitella ja johtaa organisaatioita, joissa tekoälyagentit eivät ole vain taustalla toimivia työkaluja, vaan",
    highlight: "aktiivisia toimijoita",
    suffix: ".",
  },
];

export function CoreIdeaSection() {
  return (
    <section id="ydinajatus" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            Ydinajatus
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {coreIdeas.map((idea, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {idea.text}{" "}
                <span className="font-semibold text-primary">{idea.highlight}</span>
                {idea.suffix}
              </p>
            ))}
            
            <div className="pt-4">
              <p className="text-xl font-semibold text-primary border-l-4 border-accent pl-4">
                Kestävin ja tuottavin malli ei ole maksimaalinen automaatio, 
                vaan tietoinen orkestrointi.
              </p>
            </div>
          </motion.div>

          {/* Right column - Framework visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <img 
                src={harFrameworkImage} 
                alt="HAR Framework - Nelikenttä: Visionaries, Orchestrators, Traditionalists, Automators" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
