import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Sitaatit haastateltujen hyväksymässä muodossa. Älä muokkaa, lyhennä tai oikolue.
const interviewees = [
  {
    name: "Pekka Lundmark",
    title: "Board member, private investor, former CEO of Nokia",
    quote: "Tämä ei ole IT-haaste. Se on strateginen johtamishaaste, jonka edessä kaikki ovat.",
  },
  {
    name: "Timo Ritakallio",
    title: "Pääjohtaja, OP Pohjola",
    quote:
      "Jos hevosaikana tekoälyn olisi pitänyt ratkaista, miten maataloustyöt tehdään tehokkaammin, se olisi miettinyt vain, miten hevonen saadaan juoksemaan nopeammin. Se ei olisi koskaan keksinyt traktoria.",
  },
  {
    name: "Sari Heinonen",
    title: "Pääjohtaja, LähiTapiola",
    quote: "Ihminen pystyy ottamaan kierrepallon kiinni. Tekoäly ei vielä.",
  },
  {
    name: "Minttu Sinisalo",
    title: "EVP People and Culture, Kesko",
    quote:
      "Mä en usko mihinkään ismeihin enkä siihen, että nyt tekoäly kaikkialle. Meidän pitää miettiä, mihin laitetaan paukut ja missä saadaan vaikuttavuutta.",
  },
  {
    name: "Hannakaisa Länsisalmi",
    title: "Henkilöstöjohtaja, OP Pohjola",
    quote:
      "Tämä on ensimmäinen teknologia, joka todella haastaa minut ihmisenä — olenko minä vielä se päätöksentekijä.",
  },
  {
    name: "Anna-Mari Ylihurula",
    title: "SVP, Yritysliiketoiminta, DNA",
    quote: "Tuleeko IT-osastosta tekoälyjen HR-osasto?",
  },
  {
    name: "Mikael Jungner",
    title: "Toimitusjohtaja, Kreab Oy",
    quote:
      "Tekoäly tekee heikosta ihmisestä keskinkertaisen, mutta hyvästä erinomaisen. Se antaa supervoimat — edellyttäen että sä olet jossain hyvä.",
  },
  {
    name: "Magnus Pettersson",
    title: "Development Director, Elisa Consumer Business",
    quote:
      "Mitä enemmän luotat järjestelmään, sitä enemmän pystyt antamaan sille autonomiaa — jolloin se tuottaa entistä enemmän.",
  },
  {
    name: "Piia Säylä",
    title: "Learning and Development Lead, Elisa",
    quote:
      "Kysymys ei tosiaan ole teknologiasta vaan työn ja työelämän murroksesta, jonka teknologia mahdollistaa, jos vaan uskallamme ajatella isosti ja haastaa vallitsevat rakenteet.",
  },
  {
    name: "Frank Martela",
    title: "Apulaisprofessori, Aalto-yliopisto",
    quote:
      "Onko tekoäly renki vai isäntä. Jos koen että tekoäly on hyvä apulainen, joka auttaa monissa jutuissa, niin se voi lisätä mun aikaansaavuuden tuntua. Edelleen 'I'm in charge' ja se vain auttaa minua. Silloin autonomia pysyy korkealla tasolla.",
  },
  {
    name: "Teppo Valtonen",
    title: "Työn ja tekoälyn kehittäjä, Työterveyslaitos ja Aalto-yliopisto",
    quote:
      "Tekoälyn hallinnasta on tullut yksilön ongelma — ja siinä on mennyt jo ennen tekoälyä pikkasen liian pitkälle.",
  },
  {
    name: "Jukka Ala-Mutka",
    title: "Managentics",
    quote:
      "Insinööristä tulee laadunvarmistaja. — — Tulee identiteettikriisi siitä, kuka olet, koska ammatti-identiteetti liittyi käsin tekemiseen.",
  },
  {
    name: "Janne Ikola",
    title: "Founder, Verstos Oy",
    quote:
      "Agenttisuudella ei ole itseisarvoa. Sillä on välinearvo — saavuttaa asioita paremmin ja tehokkaammin — mutta ei se ole päämäärä itsessään.",
  },
  {
    name: "Mikko Alasaarela",
    title: "Co-Founder & Chairman, Agion",
    quote:
      "Synteettistä kollegaa on teknisesti helpompi johtaa kuin ihmistä. Malli saattaa hallusinoida, mutta se ei kanna egoa.",
  },
];

const AUTOPLAY_MS = 7000;

export function InterviewsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnapCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <section id="haastatellut" className="section-padding bg-background scroll-mt-16 md:scroll-mt-20">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Kirjassa haastatellut
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            Johtajat ja tutkijat kirjan takana
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kirja perustuu suomalaisten johtajien ja tutkijoiden haastatteluihin.
          </p>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            aria-label="Haastateltujen sitaatit"
            className="mx-auto max-w-4xl"
          >
            <CarouselContent>
              {interviewees.map((person) => (
                <CarouselItem key={person.name} className="md:basis-1/2">
                  <figure className="h-full flex flex-col bg-card rounded-xl p-6 md:p-8 border border-border">
                    <Quote className="w-8 h-8 text-accent mb-4 shrink-0" aria-hidden="true" />
                    <blockquote className="flex-1 text-base md:text-lg italic text-foreground leading-relaxed mb-6">
                      "{person.quote}"
                    </blockquote>
                    <figcaption className="pt-4 border-t border-border">
                      <p className="font-semibold text-primary">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.title}</p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious
                className="static translate-y-0"
                aria-label="Edellinen sitaatti"
              />
              <div className="flex gap-2">
                {Array.from({ length: snapCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Siirry sitaattiin ${index + 1}`}
                    aria-current={index === selected}
                    className={`h-2 rounded-full transition-all ${
                      index === selected ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0" aria-label="Seuraava sitaatti" />
            </div>
          </Carousel>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Sitaatit ovat haastateltujen hyväksymässä muodossa.
        </p>
      </div>
    </section>
  );
}
