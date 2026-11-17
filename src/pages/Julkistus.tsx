import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { orderUrl } from "@/lib/julkistus";

const TALKS_VIDEO_ID = "YKGG3txU5yQ";
const SUMMARY_PDF = "/julkistus/HAR_julkistus_11112026_tiivistelma.pdf";
const COVER = "/media/nissila-nordling-ihmisten-ja-agenttien-organisaatio-kansi.jpg";
const PAGE_TITLE = "Kirjan julkistus 11.11.2026 | Ihmisten ja agenttien organisaatio";
const INTRO =
  "Kiseleffin sali täyttyi keskiviikkoaamuna 11.11. Tapio Nissilä ja Niklas Nordling avasivat kirjan keskeiset ajatukset, ja paneeli pohti, mitä tekoälyagentit vaativat johtamiselta. Tälle sivulle on koottu aamun puheenvuorot, tiivistelmä ja tunnelmat.";

const conclusions = [
  ["Älä skaalaa kaaosta.", "Tekoäly vahvistaa myös nykyisen toimintamallin puutteita."],
  ["Älä tee ihmisestä automaation pullonkaulaa.", "Huomio, harkinta ja vastuu on mitoitettava uudelleen."],
  ["Muotoile päätöspolut uudelleen.", "Jaa työ ja vastuu; johda autonomia seurauksesta."],
];

const panelQuestions = [
  "Tehostammeko vanhaa organisaatiota vai rakennammeko uudenlaista kilpailukykyä?",
  "Helpottaako tekoäly työtä vai tekeekö se siitä vaativampaa?",
  "Kuinka paljon päätösvaltaa uskallamme antaa tekoälylle – ja kuka kantaa vastuun?",
];

const panelists = [
  { name: "Timo Ritakallio", title: "pääjohtaja, OP Pohjola" },
  { name: "Outi Sivonen", title: "kokenut HR-johtaja, työkulttuurin kehittäjä ja johtamisen asiantuntija" },
  { name: "Mikael Jungner", title: "toimitusjohtaja, Kreab Oy" },
];

const heroPhoto = {
  src: "/julkistus/sali-ja-paneeli.jpg",
  alt: "Kiseleffin sali kristallikruunuineen ja lavalla julkistuksen paneeli",
  width: 1600,
  height: 914,
};

const talkHighlights = [
  {
    name: "Tapio Nissilä",
    title: "Kaaosta ei kannata skaalata",
    quote:
      "”Jos asiat ovat vähän sinne päin, syntyy helposti paljon tuotoksia ja paljon kaaosta. Eli: ei skaalata kaaosta.”",
    clip: "https://drive.google.com/file/d/1aT1qwRyUvhpv7ec5gi5oNJNYGuNvVdGz/view",
  },
  {
    name: "Tapio Nissilä",
    title: "Ihminen on huono valvoja",
    quote:
      "”Ihminen on aika huono tekemään valvontatyötä. Aika harva toivoo, että omat lapset päätyisivät järjestelmävalvojan hienoon ammattiin.”",
    clip: "https://drive.google.com/file/d/1niwN6zVfqyPwK9HbwMT3OhYK8RLo7gnd/view",
  },
  {
    name: "Niklas Nordling",
    title: "Miksi puhutaan vain teknologiasta?",
    quote:
      "”Miksi puhutaan vain teknologiasta? Kukaan ei vielä tarttunut siihen, mitä tämä tarkoittaa minulle työntekijänä, asiantuntijana, ihmisenä.”",
    clip: "https://drive.google.com/file/d/1-UDzQZRFsDjfSdpgrUXcd4Y-1R1ATenS/view",
  },
  {
    name: "Niklas Nordling",
    title: "Inhimillinen huomio on heikoin lenkki",
    quote:
      "”Ihmiset tulevat omistamaan yritykset ja istumaan hallituksissa. Meidän inhimillinen huomio on se meidän heikoin lenkki.”",
    clip: "https://drive.google.com/file/d/1IzqZz2gtO27ANsXnAVt6_nNVvn5ZgCag/view",
  },
  {
    name: "Niklas Nordling",
    title: "Vastuutyhjiöt",
    quote:
      "”Me annamme ihmisille tehtäviä, joita he eivät pysty täyttämään. Heillä ei ole vaikutusvaltaa, päätäntävaltaa eikä osaamista.”",
    clip: "https://drive.google.com/file/d/1N4OMDzEEocLl9JdiC5k1fga8NSS8bna5/view",
  },
  {
    name: "Niklas Nordling",
    title: "Oletko muotoilija?",
    quote:
      "”Haastan kaikkia johtajia: oletko muotoilija? Kun muotoilet, sinun pitää ymmärtää materiaalit – ihminen, ihmisen kapasiteetti, riskit ja heikkoudet.”",
    clip: "https://drive.google.com/file/d/1x7P8_lVRiXuqavc_kHxxPy7b6E3GdGLT/view",
  },
];

// Galleria: kuvassa saa näkyä lavalla olleet, ei tunnistettavia yleisön jäseniä.
// Jokaisesta kuvasta on pieni versio (-pieni.jpg, leveys 640) ja suuri versio (pitkä sivu 1600).
const photos = [
  {
    file: "02-tapio-lavalla",
    alt: "Tapio Nissilä puhumassa lavalla, valkokankaalla kirjan kansi",
    thumb: [640, 853],
  },
  {
    file: "07-kirjoittajat-lavalla",
    alt: "Tapio Nissilä ja Niklas Nordling lavalla",
    thumb: [640, 480],
  },
  {
    file: "06-avainviesti-ja-tapio",
    alt: "Tapio Nissilä lavalla, valkokankaalla viesti: Agentit skaalautuvat. Ihmisen huomio ja vastuu eivät.",
    thumb: [640, 853],
  },
  {
    file: "15-timo-puhuu-outi-kuuntelee",
    alt: "Timo Ritakallio puhuu paneelissa, Outi Sivonen ja Mikael Jungner kuuntelevat, vasemmalla moderaattori Riina Ollila",
    thumb: [640, 853],
  },
  {
    file: "04-paneeli",
    alt: "Paneeli lavalla: moderaattori Riina Ollila, Timo Ritakallio, Outi Sivonen ja Mikael Jungner",
    thumb: [640, 480],
  },
  {
    file: "14-paneeli-kruunujen-valista",
    alt: "Paneeli kristallikruunujen välistä: Riina Ollila, Timo Ritakallio, Outi Sivonen ja Mikael Jungner",
    thumb: [640, 588],
  },
  {
    file: "10-signeeraus",
    alt: "Tapio Nissilä signeeraa kirjaa",
    thumb: [640, 853],
  },
  {
    file: "03-kirjoittajat-ja-kirja",
    alt: "Niklas Nordling ja Tapio Nissilä kirjan kanssa",
    thumb: [640, 853],
  },
  {
    file: "08-kirja-kadessa",
    alt: "Ihmisten ja agenttien organisaatio -kirja kädessä",
    thumb: [640, 853],
  },
  {
    file: "09-kirjapino",
    alt: "Pino Ihmisten ja agenttien organisaatio -kirjoja",
    thumb: [640, 853],
  },
  {
    file: "13-sofian-julkisivu",
    alt: "Sofian julkisivu, Sofia, Helsinki",
    thumb: [640, 853],
  },
];

const coverage = [
  {
    date: "9.11.2026",
    outlet: "Verkkouutiset",
    title: "Tekoälyn piti vapauttaa aikaa – se voikin kuormittaa enemmän",
    href: "https://www.verkkouutiset.fi/a/tekoalyn-piti-vapauttaa-aikaa-se-voikin-kuormittaa-enemman/",
    who: "Tapio Nissilä haastateltavana",
  },
  {
    date: "7.11.2026",
    outlet: "Hufvudstadsbladet",
    title: "Våra hjärnor är inte gjorda för snabba robotsvar",
    href: "https://www.hbl.fi/ekonomi/vara-hjarnor-ar-inte-gjorda-for-snabba-robotsvar/",
    who: "Niklas Nordling haastateltavana",
  },
  {
    date: "26.10.2026",
    outlet: "Kuntalehti",
    title: "Kunnan tekoälyagentti tarvitsee nimetyn vastuuhenkilön",
    href: "https://www.kuntalehti.fi/mielipide/mielipide-kunnan-tekoaelyagentti-tarvitsee-nimetyn-vastuuhenkiloen/327980",
    who: "Tapio Nissilän mielipidekirjoitus",
  },
  {
    date: "17.10.2026",
    outlet: "Svenska Yle",
    title: "AI kan bli som en drog på jobbet: Så skyddar du hjärnan",
    href: "https://yle.fi/a/7-10106890",
    who: "Niklas Nordling haastateltavana",
  },
];

const card = "bg-card border border-border rounded-2xl shadow-sm";
const tag = "inline-block text-xs font-semibold tracking-wider uppercase text-secondary mb-3";
const btnPrimary =
  "inline-flex items-center justify-center px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnOutline =
  "inline-flex items-center justify-center px-5 py-3 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const textLink = "text-secondary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded";

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 md:py-16 border-t border-border scroll-mt-16 md:scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function VideoEmbed({ src, title, allow }: { src: string; title: string; allow: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow={allow}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

const Julkistus = () => {
  const { search } = useLocation();
  const buyUrl = orderUrl(search);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", INTRO);
    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null) meta.setAttribute("content", prevDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="container-narrow pt-24 md:pt-32 pb-16">
        {/* 1. Yläosa */}
        <div className="pb-10 md:pb-12 grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10 items-center">
          <div>
            <span className={tag}>Kirjan julkistus · 11.11.2026 · Sofia, Helsinki</span>
            <h1 className="text-3xl md:text-5xl lg:text-[2.75rem] lg:leading-tight font-extrabold text-primary tracking-tight mb-5">
              Ihmisten ja agenttien organisaatio julkaistiin Sofiassa
            </h1>
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">{INTRO}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#puheenvuorot" className={btnPrimary}>
                Katso puheenvuorot
              </a>
              <a href={buyUrl} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                Tilaa kirja
              </a>
            </div>
          </div>
          <img
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            className="w-full h-auto rounded-2xl border border-border shadow-sm"
          />
        </div>

        {/* 2. Puheenvuorot */}
        <Section id="puheenvuorot" title="Tapion ja Niklaksen puheenvuorot">
          <VideoEmbed
            src={`https://www.youtube-nocookie.com/embed/${TALKS_VIDEO_ID}`}
            title="Tapion ja Niklaksen puheenvuorot"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
          <p className="text-foreground/90 leading-relaxed max-w-2xl mt-6 mb-4">
            Tiivistelmä puheenvuoroista noin kymmenessä minuutissa. Tapio kertoo, miksi toimintamalli on muotoiltava
            uudelleen: älä skaalaa kaaosta, ja aloita päätöspoluista. Niklas jatkaa siitä, mitä muutos tarkoittaa
            ihmiselle: päätöskompressio, huomio heikoimpana lenkkinä ja vastuutyhjiöt.
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${TALKS_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            Katso YouTubessa
          </a>
        </Section>

        {/* Nostoja puheenvuoroista */}
        <Section title="Nostoja puheenvuoroista">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {talkHighlights.map((h) => (
              <figure key={h.clip} className={`${card} p-5 md:p-6 flex flex-col`}>
                <span className={tag}>{h.name}</span>
                <h3 className="text-lg font-bold text-primary mb-3">{h.title}</h3>
                <blockquote className="border-l-4 border-l-accent pl-4 text-foreground/90 leading-relaxed mb-5">
                  {h.quote}
                </blockquote>
                <a
                  href={h.clip}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Katso leike: ${h.title}`}
                  className={`${textLink} mt-auto self-start inline-flex items-center gap-2`}
                >
                  <PlayCircle className="w-5 h-5" aria-hidden="true" />
                  Katso leike
                </a>
              </figure>
            ))}
          </div>
        </Section>

        {/* 4. Tiivistelmä */}
        <Section title="Tiivistelmä">
          <p className="text-foreground/90 leading-relaxed max-w-2xl mb-6">
            Yhdeksän kalvon tiivistelmä niille, jotka eivät päässeet paikalle: kirjan lähtökysymys, puheenvuorojen ydin,
            paneelin teemat ja kirjoittajien kolme johtopäätöstä.
          </p>
          <a href={SUMMARY_PDF} download className={btnPrimary}>
            Lataa tiivistelmä (PDF, 4 Mt)
          </a>
        </Section>

        {/* 5. Kolme johtopäätöstä */}
        <Section title="Kolme johtopäätöstä">
          <ol className="grid md:grid-cols-3 gap-5">
            {conclusions.map(([title, body], i) => (
              <li key={title} className={`${card} p-5 md:p-6`}>
                <span className="block text-3xl font-extrabold text-accent mb-3" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                <p className="text-foreground/90 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 6. Paneeli */}
        <Section title="Paneeli: Mitä tekoälyagentit vaativat johtamiselta?">
          <p className="text-foreground/90 leading-relaxed max-w-2xl mb-4">
            Moderaattorina Riina Ollila, FCG. Paneeli keskusteli kolmesta kysymyksestä:
          </p>
          <ol className="space-y-3 max-w-2xl mb-8">
            {panelQuestions.map((q, i) => (
              <li key={q} className="flex gap-3 text-foreground/90 leading-relaxed">
                <span className="font-bold text-accent shrink-0 w-5" aria-hidden="true">
                  {i + 1}.
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <div className="grid md:grid-cols-3 gap-5">
            {panelists.map((p) => (
              <article key={p.name} className={`${card} p-5 md:p-6`}>
                <h3 className="text-lg font-bold text-primary">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.title}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* 7. Kuvat */}
        <Section title="Kuvat">
          <div className="columns-2 md:columns-3 gap-3 md:gap-4">
            {photos.map((ph) => (
              <a
                key={ph.file}
                href={`/julkistus/${ph.file}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-muted hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={`/julkistus/${ph.file}-pieni.jpg`}
                  alt={ph.alt}
                  width={ph.thumb[0]}
                  height={ph.thumb[1]}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
              </a>
            ))}
          </div>
        </Section>

        {/* 8. Mediassa */}
        <Section title="Mediassa">
          <ul className={`${card} divide-y divide-border`}>
            {coverage.map((c) => (
              <li key={c.href} className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-1">
                  {c.date} · {c.outlet}
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {c.title}
                </a>
                <p className="text-sm text-muted-foreground mt-1">{c.who}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 9. Kirja ja jatko */}
        <section className="pt-12 md:pt-16 border-t border-border">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <img
              src={COVER}
              alt="Kirjan Ihmisten ja agenttien organisaatio kansi"
              width={1305}
              height={1885}
              loading="lazy"
              decoding="async"
              className="w-32 md:w-44 h-auto rounded-md shadow-md mx-auto"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Ihmisten ja agenttien organisaatio – Miten muotoilet toimintamallin
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Tapio Nissilä ja Niklas Nordling. Professional Publishing Finland 2026.
              </p>
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-accent-foreground text-base font-semibold shadow-md hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Tilaa kirja kustantajalta
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                <a
                  href="https://www.linkedin.com/company/112510385/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-foreground underline underline-offset-4 hover:opacity-80"
                >
                  Seuraa HARia LinkedInissä
                </a>
                <a
                  href="https://www.linkedin.com/newsletters/har-human-agent-relationship-7441134902617563136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-foreground underline underline-offset-4 hover:opacity-80"
                >
                  Tilaa HAR-uutiskirje
                </a>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mt-8">
            Kiitos panelisteille, moderaattori Riina Ollilalle, haastatelluille, kustantaja Professional Publishingille ja
            kaikille aamuun osallistuneille.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Julkistus;
