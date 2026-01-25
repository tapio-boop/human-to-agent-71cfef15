import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  {
    id: "teoria",
    title: "Teoreettinen ydin",
    question: "Miten järjestelmä käyttäytyy kun agentit tulevat mukaan?",
    disciplines: [
      {
        name: "Systeemiteoria",
        connection: "Koko viitekehyksen teoreettinen selkäranka. Organisaatio on järjestelmä, jonka tasapaino muuttuu kun agentti tuodaan mukaan.",
        concepts: "Emergenssi, palautesilmukat, järjestelmän vakaus",
        thinkers: "Donella Meadows, Peter Senge",
      },
      {
        name: "Kybernetiikka",
        connection: "Kontrolli ja säätely ihminen-kone -järjestelmässä. HAR:n ydinkysymys 'kuka päättää, kuka valvoo, kuka pysäyttää' on klassista kybernetiikkaa.",
        concepts: "Feedback-ohjaus, Ashbyn laki, Viable System Model",
        thinkers: "Norbert Wiener, Stafford Beer",
      },
      {
        name: "Päätöksenteon teoria",
        connection: "Päätöksenteon nopeus vs. laatu. HAR:n väite: tekoäly muuttaa nopeutta mutta ei automaattisesti laatua.",
        concepts: "Bounded rationality, OODA-loop, Orient-gap",
        thinkers: "Herbert Simon, Daniel Kahneman, John Boyd",
      },
    ],
  },
  {
    id: "rajapinta",
    title: "Ihminen-kone",
    question: "Mitkä ovat ihmisen tiedonkäsittelyn rajat?",
    disciplines: [
      {
        name: "Kognitiotiede",
        connection: "Ihmisen tiedonkäsittelyn rajoitteet. Agenttien kasvaessa ihmisen kognitiivinen kapasiteetti muodostuu pullonkaulaksi.",
        concepts: "Työmuistin rajoitteet, tarkkaavaisuuden jakaminen, kognitiivinen kuormitus",
        thinkers: "George Miller, Daniel Kahneman",
      },
      {
        name: "Human Factors",
        connection: "Ihmisen ja teknologian rajapinnan suunnittelu monimutkaisissa järjestelmissä.",
        concepts: "Human-in-the-loop, situation awareness, mode confusion",
        thinkers: "Mica Endsley, Sidney Dekker",
      },
      {
        name: "Automaatiotutkimus",
        connection: "Automaation vaikutukset ihmisen suorituskykyyn ja virheisiin.",
        concepts: "Automation bias, skill degradation, automaation ironiat",
        thinkers: "Thomas Sheridan, Lisanne Bainbridge",
      },
    ],
  },
  {
    id: "organisaatio",
    title: "Organisaatiotaso",
    question: "Miten hybridijärjestelmä organisoidaan ja johdetaan?",
    disciplines: [
      {
        name: "Organisaatioteoria",
        connection: "Rakenteet, roolit ja koordinaatio hybridijärjestelmässä.",
        concepts: "Työn jakaminen, päätösvallan hajauttaminen, organisaation oppiminen",
        thinkers: "James March, Henry Mintzberg",
      },
      {
        name: "Luotettavuustekniikka",
        connection: "Virheiden hallinta ja järjestelmän kyky toimia häiriötilanteissa.",
        concepts: "High Reliability Organizations, graceful degradation, normal accidents",
        thinkers: "Charles Perrow, Karl Weick",
      },
      {
        name: "Sosiaalipsykologia",
        connection: "Luottamus, kontrollin tunne ja muutosvastarinta.",
        concepts: "Psykologinen turvallisuus, luottamuksen rakentuminen",
        thinkers: "Amy Edmondson, Kurt Lewin",
      },
    ],
  },
];

export function ScienceSection() {
  return (
    <section id="tieteelliset" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            Tieteelliset perusteet
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            HAR-viitekehys rakentuu usean tieteenalan varaan. Monitieteinen lähestymistapa 
            on välttämätön, koska ihmisen ja tekoälyn yhteistyö on yhtä aikaa tekninen, 
            kognitiivinen ja organisatorinen haaste.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="teoria" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="bg-background-muted rounded-2xl p-6 md:p-8 border border-border mb-6">
                  <p className="text-center text-lg font-medium text-primary">
                    {category.question}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {category.disciplines.map((discipline, index) => (
                    <motion.div
                      key={discipline.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-xl p-6 border border-border"
                    >
                      <h4 className="text-lg font-semibold text-primary mb-3">
                        {discipline.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {discipline.connection}
                      </p>
                      <div className="space-y-2 text-xs">
                        <p>
                          <span className="font-medium text-secondary">Käsitteet: </span>
                          <span className="text-muted-foreground">{discipline.concepts}</span>
                        </p>
                        <p>
                          <span className="font-medium text-secondary">Ajattelijat: </span>
                          <span className="text-muted-foreground">{discipline.thinkers}</span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
