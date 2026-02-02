import { motion } from "framer-motion";
import harPerustaImg from "@/assets/har-tieteellinen-perusta.svg";
import harKerroksetImg from "@/assets/har-tutkimusalat-kerrokset.svg";

const coreTopics = [
  {
    title: "Aivot ja kognitio",
    subtitle: "Cognition and Brain",
    description: "Ihmismielen toiminta, sen rajat ja mahdollisuudet. Miksi tietotyö ylikuormittaa – ja miten AI-agentit voivat toimia ulkoisena prosessorina.",
  },
  {
    title: "Työn tulevaisuus ja tuottavuus",
    subtitle: "Future Work and Productivity",
    description: "Miten tietotyö muuttuu AI-agenttien aikakaudella. Uusi työnjako ihmisen ja koneen välillä.",
  },
  {
    title: "Johtaminen AI-aikakaudella",
    subtitle: "Leadership in the Era of AI Agents",
    description: "Miten organisaatioita johdetaan, kun osa työvoimasta on autonomisia agentteja. Strateginen ketteryys ja johtajan uusi rooli.",
  },
];

const supportDisciplines = [
  { name: "Kognitiotiede", detail: "Information Processing Theory, päätöksenteko" },
  { name: "Neuropsykologia", detail: "Kognitiivinen kuormitus, stressi, palautuminen" },
  { name: "Human-Computer Interaction", detail: "Ihmisen ja koneen yhteistyö, Joint Cognitive Systems" },
  { name: "Työ- ja organisaatiopsykologia", detail: "Job Demands-Resources, työn imu" },
  { name: "Strateginen johtaminen", detail: "Dynamic Capabilities" },
];

const contextDisciplines = [
  { name: "Sosiologia", detail: "Tiimidynamiikka, luottamus digitaaliseen kollegaan" },
  { name: "Etiikka", detail: "Johtajuuden mandaatti, vastuu virheistä" },
];

export function ScienceSection() {
  return (
    <section id="tieteelliset" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            Tieteellinen perusta
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            HAR-viitekehys yhdistää kolme tieteenalaa ja rakentuu kolmelle tasolle. 
            Ydin määrittää kirjan fokuksen, tuki tuo tieteellisen syvyyden, konteksti varmistaa vastuullisuuden.
          </p>
        </motion.div>

        {/* First image: Three pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <img 
            src={harPerustaImg} 
            alt="HAR Tieteellinen perusta - Kolme pilaria: Miksi, Mitä, Miten" 
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* YDIN (Core) - 90-100% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-primary rounded-2xl p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h3 className="text-2xl font-bold text-primary-foreground tracking-tight">
                YDIN <span className="text-primary-foreground/60 font-normal text-lg">(Core)</span>
              </h3>
              <span className="text-accent font-semibold text-lg">90–100%</span>
            </div>
            <p className="text-primary-foreground/80 italic">
              Kirjan pääsisältö. Ilman näitä kirjaa ei voi kirjoittaa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {coreTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border-2 border-primary shadow-md"
              >
                <h4 className="text-lg font-semibold text-primary mb-1">
                  {topic.title}
                </h4>
                <p className="text-sm text-secondary italic mb-3">
                  {topic.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TUKI (Support) - 50-70% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-secondary/10 rounded-2xl p-6 md:p-8 mb-6 border border-secondary/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h3 className="text-2xl font-bold text-secondary tracking-tight">
                TUKI <span className="text-secondary/60 font-normal text-lg">(Support)</span>
              </h3>
              <span className="text-secondary font-semibold text-lg">50–70%</span>
            </div>
            <p className="text-muted-foreground italic">
              Tuovat syvyyttä ja tieteellistä uskottavuutta.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {supportDisciplines.map((discipline) => (
              <div
                key={discipline.name}
                className="bg-background-muted rounded-lg p-4 border border-border"
              >
                <h4 className="font-semibold text-primary text-sm mb-1">
                  {discipline.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {discipline.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* KONTEKSTI (Context) - 10-30% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-muted/50 rounded-2xl p-6 md:p-8 mb-6 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h3 className="text-2xl font-bold text-muted-foreground tracking-tight">
                KONTEKSTI <span className="text-muted-foreground/60 font-normal text-lg">(Context)</span>
              </h3>
              <span className="text-muted-foreground font-semibold text-lg">10–30%</span>
            </div>
            <p className="text-muted-foreground/80 italic">
              Varmistavat vastuullisuuden ja laajemman näkökulman.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {contextDisciplines.map((discipline) => (
              <div
                key={discipline.name}
                className="bg-muted/30 rounded-lg p-4 border border-border/50"
              >
                <h4 className="font-semibold text-muted-foreground text-sm mb-1">
                  {discipline.name}
                </h4>
                <p className="text-xs text-muted-foreground/80">
                  {discipline.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Second image: Concentric circles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <img 
            src={harKerroksetImg} 
            alt="HAR Tutkimusalat kerrokset - Ydin, Tuki, Konteksti" 
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Call for researchers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-primary mb-3">
            Oletko tutkija näillä aloilla?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Etsimme tutkijoita sparraamaan ja kommentoimaan HAR-viitekehystä. 
            Jos tunnistat itsesi näistä tutkimusaloista, otamme mielellämme yhteyttä.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
