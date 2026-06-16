import { motion } from "framer-motion";
import harPerustaImg from "@/assets/har-tieteellinen-perusta.svg";
import harKerroksetImg from "@/assets/har-tutkimusalat-kerrokset.svg";

type CoreTopic = {
  title: string;
  intro: string;
  relevance: string;
};

const coreTopics: CoreTopic[] = [
  {
    title: "Systeemiajattelu ja takaisinkytkennät",
    intro:
      "Järjestelmän käyttäytyminen seuraa sen rakennetta — viiveitä, varantoja ja takaisinkytkentöjä — ei yksittäisten toimijoiden aikomuksia. Ihminen lukee kasautumista ja epälineaarisuutta systemaattisesti väärin.",
    relevance:
      "Ihmisten ja agenttien hybridi on järjestelmä; HAR johtaa rakennetta, ei yksittäisiä tapahtumia.",
  },
  {
    title: "Kognitiotiede ja ennustava mieli",
    intro:
      "Aivot ovat ennustuskone: kognitiivinen kuormitus syntyy yllätyksestä, ja työmuisti on niukka. Tuore fMRI-näyttö kognitiivisesta velasta osoittaa, että kritiikitön ulkoistaminen heikentää mitattavasti ajattelua.",
    relevance:
      "\"Hallinnan menetys\" on kyvyttömyyttä ennustaa agentin seuraavaa siirtoa; valvonta-akseli mitoittaa ihmisen kuorman kestäväksi.",
  },
  {
    title: "Päätösväsymys ja valvonnan rajat",
    intro:
      "Ihminen pystyy aidosti valvomaan vain rajallista määrää toimijoita (span of control), ja valvontasuoritus romahtaa jo minuuteissa (vigilance). Rutiinin automatisointi jättää ihmiselle vaikeimman jäännöksen (automaation ironia).",
    relevance:
      "Nämä asettavat katon sille, montako agenttia ihminen voi todella valvoa — HAR johtaa resursoinnin tästä katosta.",
  },
  {
    title: "Ihminen–kone-vuorovaikutus ja kalibroitu luottamus",
    intro:
      "Tavoite ei ole maksimaalinen vaan oikein mitoitettu luottamus — sekä yli- että alivarausta vältellen. Ihminen osoittaa kontekstista riippuen sekä algoritmikammoa että algoritmi-ihastusta.",
    relevance:
      "HAR:n valvontamodit (Audit → Command) ovat käytännön mekanismi perustellun, kalibroidun luottamuksen ansaitsemiseen.",
  },
  {
    title: "Tiedon luominen organisaatiossa",
    intro:
      "Eksplisiittinen tieto siirtyy ja skaalautuu helposti; hiljainen tieto vastustaa. SECI-malli kuvaa tiedon muuntumisen, ja Ba — jaettu konteksti — on tiedon luomisen edellytys.",
    relevance:
      "Erottelu ennustaa, mikä työ liukuu agentille ja mikä pysyy ihmisellä; Ba on suoraan agenttien kontekstin rakentamisen kulmakivi.",
  },
  {
    title: "Johtamiskäytäntöjen taloustiede",
    intro:
      "Johtaminen on mitattava, kausaalinen tuottavuustekijä — ei kansanperinnettä. Maailmanlaajuinen johtamistutkimus ja satunnaistettu koe osoittavat sen.",
    relevance:
      "Tekoälyn omaksumisen tulokset ovat johtamis- ja organisaatiosuunnittelun kysymys, ei teknologiakysymys — tämä on teesin empiirinen selkäranka.",
  },
];

const supportDisciplines = [
  {
    name: "Lean ja oppimiskäyrät",
    detail:
      "Virtauksen, hukan ja oppimisen taloustiede ennakoi ihmisen ja koneen yhteistyötä vuosikymmeniä.",
  },
  {
    name: "Strateginen johtaminen ja dynaamiset kyvykkyydet",
    detail:
      "Kyky aistia, tarttua ja konfiguroida uudelleen ympäristön muuttuessa; omaksuminen on organisaation uudistumista, ei hankintatapahtuma.",
  },
  {
    name: "Sosiotekniset järjestelmät",
    detail: "Sosiaalista ja teknistä järjestelmää on optimoitava yhdessä, ei erikseen.",
  },
  {
    name: "Työ- ja organisaatiopsykologia",
    detail:
      "Mitä ihminen tarvitsee kukoistaakseen: psykologinen turvallisuus, autonomia, kompetenssi ja yhteenkuuluvuus.",
  },
  {
    name: "Affektiivinen tiede ja tunnesäätely",
    detail:
      "Tunteet rakentuvat ennusteena kehon tilasta ja opituista käsitteistä; epävarmuuden kuormitus on yhtä lailla kehollista kuin kognitiivista.",
  },
  {
    name: "Sosiaalinen kognitio ja kiintymys",
    detail:
      "Ihminen kohtelee agentteja sosiaalisina toimijoina ja soveltaa niihin ihmissuhteiden psykologiaa.",
  },
  {
    name: "Päätöksenteko ja merkityksellistäminen kompleksisuudessa",
    detail:
      "Miten päättää, kun tahti ylittää ymmärryksen; viive ei ole datassa vaan merkityksenannossa.",
  },
  {
    name: "Kollektiivinen äly ja ihmis-AI-tiimit",
    detail:
      "Tuoretta näyttöä siitä, miten ihmiset ja tekoäly tuottavat yhdessä ja milloin yhdistelmä ylittää osiensa summan.",
  },
];

const contextDisciplines = [
  {
    name: "Tekoälyn etiikka ja vastuullisuus",
    detail:
      "Kun päätös syntyy ihmisen ja agentin yhteistyönä, vastuun, läpinäkyvyyden ja tilivelvollisuuden kysymykset terävöityvät.",
  },
  {
    name: "Sosiologia ja työn murros",
    detail:
      "Organisaatioiden ja yhteiskunnan rakenteet järjestyvät uudelleen, kun toimijoiksi tulee ihmisten lisäksi agentteja.",
  },
  {
    name: "Hallinta ja sääntely",
    detail:
      "Nopeasti muuttuva sääntely-ympäristö asettaa reunaehtoja sille, mitä autonomisilta järjestelmiltä voidaan sallia.",
  },
];

const references: { area: string; items: string }[] = [
  {
    area: "Systeemiajattelu",
    items: "Forrester (1961); Senge (1990); Meadows (2008).",
  },
  {
    area: "Kognitiotiede & kognitiivinen velka",
    items: "Friston (2010); Clark (2013/2016); Barrett (2017); Sweller; Kosmyna ym. (2025).",
  },
  {
    area: "Automaation ironia, vigilance, span of control",
    items: "Bainbridge (1983); Mackworth (1948); Graicunas (1933)/Urwick.",
  },
  {
    area: "Luottamus automaatioon",
    items: "Lee & See (2004); Parasuraman & Riley (1997); Dietvorst (2015); Logg (2019).",
  },
  {
    area: "SECI / Ba",
    items: "Nonaka & Takeuchi (1995).",
  },
  {
    area: "Johtamisen taloustiede",
    items: "Drucker (1954); Bloom, Sadun & Van Reenen (2012–2013).",
  },
  {
    area: "Lean",
    items: "Ohno; Womack & Jones (1996); Wright (1936).",
  },
  {
    area: "Dynaamiset kyvykkyydet",
    items: "Teece, Pisano & Shuen (1997).",
  },
  {
    area: "Sosiotekniset järjestelmät",
    items: "Trist & Bamforth (1951).",
  },
  {
    area: "Työ- & organisaatiopsykologia",
    items: "Edmondson; Deci & Ryan; JD-R; Luthans.",
  },
  {
    area: "Affekti & tunnesäätely",
    items: "Barrett (2017); Gross (1998/2015); Damasio (1994).",
  },
  {
    area: "Sosiaalinen kognitio & kiintymys",
    items: "Bandura (1986/1997); Bowlby/Ainsworth; Yang & Oshio (2025).",
  },
  {
    area: "Päätöksenteko kompleksisuudessa",
    items: "Klein; Weick; Snowden & Boone (2007, Cynefin); Boyd (OODA).",
  },
  {
    area: "Kollektiivinen äly & ihmis-AI-tiimit",
    items: "Woolley ym. (2010); Dell'Acqua ym. (2025).",
  },
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
            HAR (Human Agent Relationship) rakentuu kolmelle tasolle. Ydin määrittää kirjan teoreettisen
            selkärangan, tuki tuo tieteellisen syvyyden, konteksti varmistaa vastuullisuuden.
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

        {/* YDIN (Core) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-primary rounded-2xl p-6 md:p-8 mb-6">
            <h3 className="text-2xl font-bold text-primary-foreground tracking-tight mb-4">
              YDIN <span className="text-primary-foreground/60 font-normal text-lg">(Core)</span>
            </h3>
            <p className="text-primary-foreground/80 italic">
              HAR-malli tukeutuu näihin elimellisesti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {coreTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 border-2 border-primary shadow-md"
              >
                <h4 className="text-lg font-semibold text-primary mb-3">{topic.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{topic.intro}</p>
                <div className="border-l-4 border-accent pl-3">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                    HAR-relevanssi
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{topic.relevance}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TUKI (Support) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-secondary/10 rounded-2xl p-6 md:p-8 mb-6 border border-secondary/30">
            <h3 className="text-2xl font-bold text-secondary tracking-tight mb-4">
              TUKI <span className="text-secondary/60 font-normal text-lg">(Support)</span>
            </h3>
            <p className="text-muted-foreground italic">
              Tuo syvyyttä ja selittää mallia eri näkökulmista tieteen keinoin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {supportDisciplines.map((discipline) => (
              <div
                key={discipline.name}
                className="bg-background-muted rounded-lg p-4 border border-border"
              >
                <h4 className="font-semibold text-primary text-sm mb-1">{discipline.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{discipline.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* KONTEKSTI (Context) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-muted/50 rounded-2xl p-6 md:p-8 mb-6 border border-border">
            <h3 className="text-2xl font-bold text-muted-foreground tracking-tight mb-4">
              KONTEKSTI <span className="text-muted-foreground/60 font-normal text-lg">(Context)</span>
            </h3>
            <p className="text-muted-foreground/80 italic">
              Varmistavat vastuullisuuden ja laajemman näkökulman.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {contextDisciplines.map((discipline) => (
              <div
                key={discipline.name}
                className="bg-muted/30 rounded-lg p-4 border border-border/50"
              >
                <h4 className="font-semibold text-muted-foreground text-sm mb-1">
                  {discipline.name}
                </h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">
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

        {/* Lähteet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-12"
        >
          <div className="bg-background-muted rounded-2xl p-6 md:p-8 border border-border">
            <h3 className="text-2xl font-bold text-primary tracking-tight mb-6">Lähteet</h3>
            <dl className="space-y-3">
              {references.map((ref) => (
                <div
                  key={ref.area}
                  className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-1 sm:gap-4 pb-3 border-b border-border/50 last:border-0 last:pb-0"
                >
                  <dt className="font-semibold text-primary text-sm">{ref.area}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{ref.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>

        {/* Call for researchers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-primary mb-3">Oletko tutkija näillä aloilla?</h3>
          <p className="text-muted-foreground leading-relaxed">
            Etsimme tutkijoita sparraamaan ja kommentoimaan HAR-viitekehystä. Jos tunnistat itsesi
            näistä tutkimusaloista, otamme mielellämme yhteyttä.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
