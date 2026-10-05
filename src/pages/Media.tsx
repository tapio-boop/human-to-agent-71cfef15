import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BUY_URL =
  "https://propublishing.fi/products/ihmisten-ja-agenttien-organisaatio-miten-muotoilet-toimintamallin";
const COVER = "/media/nissila-nordling-ihmisten-ja-agenttien-organisaatio-kansi.jpg";
const MAILTO =
  "mailto:tapio.a.nissila@gmail.com?subject=Ennakkokappale%3A%20Ihmisten%20ja%20agenttien%20organisaatio&body=Nimi%3A%0AMedia%3A%0AToimitusosoite%3A%0A";
const ONE_LINER =
  "Ihmisten ja agenttien organisaatio on johtamisen ja organisaatiosuunnittelun kirja siitä, miten työ, päätöksenteko, vastuut ja valvonta suunnitellaan, kun ihmiset ja tekoälyagentit tekevät työtä yhdessä.";

const sections = [
  ["perustiedot", "Perustiedot"],
  ["esittely", "Esittely"],
  ["kirjoittajat", "Kirjoittajat"],
  ["kuvat", "Kuvat"],
  ["kasitteet", "Käsitteet"],
  ["juttukulmat", "Juttukulmat"],
  ["kommentoitavaa", "Kommentoitavaa"],
  ["esiintymiset", "Esiintymiset"],
  ["yhteystiedot", "Yhteystiedot"],
];

const facts: [string, React.ReactNode][] = [
  ["Nimi", "Ihmisten ja agenttien organisaatio. Miten muotoilet toimintamallin"],
  ["Kirjoittajat", "Tapio Nissilä, Niklas Nordling"],
  ["Kustantaja", "Professional Publishing Finland Oy"],
  ["Ilmestyy", "6.11.2026"],
  ["Sidosasu", "Pehmeäkantinen"],
  ["ISBN", "978-952-7401-46-0"],
  ["Ohjeellinen hinta", "49 €"],
  ["Kieli", "suomi"],
  [
    "Kustantajan sivu",
    <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className="text-secondary underline break-all">
      propublishing.fi
    </a>,
  ],
];

const SHORT = `Tekoäly nopeuttaa organisaatiota, ja nopeus paljastaa rakenteen heikkoudet. Kun ihmisten ja agenttien roolit ovat epäselviä, päätöksiä syntyy nopeammin kuin kukaan ehtii ymmärtää, ja vastuu jää paikkaan, jossa sitä ei voi kantaa. Tapio Nissilän ja Niklas Nordlingin kirja näyttää, miten toimintamalli muotoillaan: kuka päättää mitä, millä rajoilla ja kuka valvoo. Työn yksikkönä on päätöspolku, jota arvioidaan kolmella akselilla: toistuvuus, standardoitavuus ja seuraus. Niistä johdetaan työnjako ihmisen, agentin ja automaation välillä sekä sopiva valvontamodi. Kirjassa on kuudentoista suomalaisen johtajan, asiantuntijan ja tutkijan haastattelut.`;

const LONG = `Tekoäly ei tuo organisaatioon järjestystä. Se nostaa nopeutta, ja nopeus paljastaa sen, mikä rakenteessa jo oli. Kun ihmisten ja agenttien roolit ovat epäselviä, tekoäly skaalaa epäselvyyttä: päätöksiä syntyy nopeammin kuin kukaan ehtii ymmärtää, ja vastuu jää kohtaan, jossa sitä ei voi kantaa.

Ihmisten ja agenttien organisaatio kertoo, miten toimintamalli muotoillaan, kun osa työstä ja päätöksistä siirtyy tekoälyagenteille. Työn yksikkönä on päätöspolku: koko kaari valmistelusta päätökseen, toimeenpanoon ja seurauksiin. Jokainen päätös arvioidaan kolmella akselilla: kuinka usein se toistuu, kuinka luotettavasti sen voi standardoida ja mitä virhe maksaa. Arvioista johdetaan työnjako ihmisen, agentin ja automaation välillä sekä yksi viidestä valvontamodista.

Kirja käsittelee myös sitä, mikä tekoälykeskustelusta usein puuttuu: valvonta on työtä, ja se osuu juuri niihin kohtiin, joissa ihmisen tarkkaavaisuus, muisti ja arviointikyky ovat heikoimmillaan. Kirja selittää nämä rajat kognitiotieteen ja neurotieteen avulla ja tekee niistä suunnitteluperusteita. Jokaiselle päätöspolulle nimetään ihminen, joka vastaa lopputuloksesta, ja valvonnan kuorma mitoitetaan sen mukaan, mitä ihmiset oikeasti ehtivät kantaa.

Kirja perustuu tutkimukseen, kuudentoista suomalaisen johtajan, asiantuntijan ja tutkijan haastatteluihin sekä kirjoittajien omaan kokemukseen agenttityöstä. Mukana ovat lomakkeet, joilla suunnittelun voi tehdä omassa organisaatiossa. Kirja on tarkoitettu johtajille, esihenkilöille ja kehitys- ja HR-johdolle, jotka vastaavat siitä, että ihmiset ja agentit toimivat yhdessä hallitusti.`;

const authors = [
  {
    name: "Tapio Nissilä",
    img: "/media/tapio-nissila.jpg",
    short:
      "Tapio Nissilä on kaupallinen ja liiketoimintajohtaja, jonka erikoisosaamista on uuden teknologian kääntäminen liiketoimintatulokseksi. Hän on arvioinut kahdentoista kuukauden aikana yli sadan suomalaisen yrityksen tekoälykypsyyttä.",
    long: `Tapio Nissilä on kaupallinen ja liiketoimintajohtaja, joka työskentelee teknologian ja liiketoiminnan rajapinnalla. Hänellä on yli kahdenkymmenen vuoden kokemus B2B-teknologialiiketoiminnan rakentamisesta ja kansainvälistämisestä. Hän on johtanut myyntiä ja liiketoimintaa Tiedolla, vastannut myynnin johtamisesta IBM:llä ja työskennellyt liikkeenjohdon konsulttina PricewaterhouseCoopersilla ja Vectialla.

Uransa hän aloitti yrittäjänä, ja hänen perustamansa yritys myytiin vuonna 1999. Sen jälkeen hän on ollut rakentamassa useita kasvuyhtiöitä: hän on toiminut kolmesti toimitusjohtajana, ollut mukana kolmessa yrityskaupassa ja hankkinut kasvuyrityksille yli 25 miljoonan euron rahoituksen. Hän toimii hallitustehtävissä ja sijoittaa kasvuyrityksiin, mikä tuo kirjan aiheeseen myös omistajan näkökulman. Hän on Lean Sales -kirjan (2013) pääkirjoittaja ja Pricing and the Sales Force -teoksen (Routledge 2016) toinen kirjoittaja. Koulutukseltaan hän on diplomi-insinööri, ja hän on opiskellut INSEADissa.

Läpi uran hänen työtään on ohjannut sama kysymys kuin tätä kirjaa: miten uusi teknologia käännetään liiketoimintatulokseksi, eli euroiksi, asiakkaiksi ja nopeammiksi päätöksiksi. Kahdentoista kuukauden aikana hän on arvioinut yli sadan suomalaisen yrityksen tekoälykypsyyttä. Se aineisto on kirjan lähtökohta: organisaatioita pysäyttää rakenne, ei teknologia.`,
    langs: "suomi, englanti",
  },
  {
    name: "Niklas Nordling",
    img: "/media/niklas-nordling.jpg",
    short:
      "Niklas Nordling on psykologian tohtori ja muutosjohtamisen asiantuntija, joka on johtanut henkilöstön ja organisaation kehittämistä sekä yrityskulttuurin uudistamista globaalisti.",
    long: `Niklas Nordling on psykologian tohtori ja muutosjohtamisen asiantuntija, jolla on yli kahdenkymmenen vuoden kokemus strategisesta organisaation kehittämisestä kansainvälisesti toimivissa yrityksissä. Nokialla hän vastasi henkilöstön ja organisaation kehittämisestä ja johti yrityskulttuurin uudistamista ja kehittämistä: käytännössä toimintamallien uudistamista, uusien kyvykkyyksien rakentamista ja yritysostojen integrointia globaalissa organisaatiossa. Sitä ennen hän työskenteli liikkeenjohdon konsulttina PricewaterhouseCoopersilla ja johti strategiakonsultointia IBM:llä.

Hän on ollut perustamassa mielenterveyspalveluja tuottavaa ohjelmistoyritystä ja toiminut sen toimitusjohtajana sekä hallitustehtävissä liike-elämässä ja akateemisessa maailmassa. Läpi uran hänen työtään on ohjannut sama pyrkimys kuin tätä kirjaa: kääntää tutkimustieto johtamisen käytännöiksi, jotka rakentavat kyvykkyyttä ja pitävät huolta sekä tuottavuudesta että ihmisistä.`,
    langs: "suomi, ruotsi",
  },
];

const images = [
  { src: COVER, alt: "Kirjan Ihmisten ja agenttien organisaatio kansi", caption: "Kansikuva", size: "88 kt · 1305 × 1885" },
  { src: "/media/tapio-nissila.jpg", alt: "Tapio Nissilä", caption: "Tapio Nissilä, kirjoittajakuva", size: "120 kt · 800 × 800" },
  { src: "/media/niklas-nordling.jpg", alt: "Niklas Nordling", caption: "Niklas Nordling, kirjoittajakuva", size: "111 kt · 800 × 800" },
];

const concepts = [
  ["Päätöspolku", "Työn analyysiyksikkö: koko kaari valmistelusta päätökseen, toimeenpanoon ja seurauksiin."],
  ["Kolme akselia", "Toistuvuus (kuinka usein päätös tehdään), standardoitavuus (voiko sen tehdä luotettavasti sääntöjen ja datan varassa) ja seuraus (mitä väärässä oleminen maksaa)."],
  ["Viisi valvontamodia", "Command, Collaborate, Approve, Monitor ja Audit. Modi johdetaan päätöksen seurauksesta."],
  ["Vastuun ankkuripiste", "Nimetty ihminen, joka vastaa päätöspolun lopputuloksista ja jolla on siihen edellytykset."],
  ["Valvontakuorma", "Agenttien valvonta on työtä, ja ihmisen tarkkaavaisuus asettaa sille kapasiteettirajan."],
  ["Modin valuminen", "Valvonta löystyy vähitellen ilman, että kukaan päättää siitä."],
  ["Päätöskompressio", "Päätöksiä tulee nopeammin kuin niiden vaatima ajattelu ehtii."],
  ["Resursointi lopputuloksena", "Ihmisten ja agenttien määrä on suunnittelulaskelman tulos."],
];

const quotes = [
  "Tekoäly ei tuo organisaatioon järjestystä. Se nostaa nopeutta, ja nopeus paljastaa sen, mikä rakenteessa jo oli.",
  "Valvonta on työtä, ja se osuu juuri niihin kohtiin, joissa ihmisen tarkkaavaisuus, muisti ja arviointikyky ovat heikoimmillaan.",
  "Tekoäly ei korvaa johtamista. Se paljastaa, kuka osaa johtaa.",
  "Tekoälyn seuraava suuri ongelma on organisaatiosuunnittelu.",
];

const angles = [
  ["Kuka vastaa, kun tekoälyagentti päättää?", "Kun agentti hoitaa päätöksen, jonkun nimetyn ihmisen on vastattava sen seurauksista."],
  ["Miksi tekoäly ei näy tuottavuudessa?", "Agenttien valvonta vie ihmisten aikaa. Kun sitä ei lasketa, säästetyt tunnit eivät näy tuloksena."],
  ["Kun ihmisestä tulee kumileimasin.", "Tarkistaminen ohenee vähitellen, kun tulokset näyttävät hyviltä, ja lopulta hyväksyntä on pelkkä muodollisuus."],
  ["Henkilöstön mitoitus tekoälyn aikana.", "Ensin suunnitellaan päätökset ja niiden valvonta, ja ihmisten määrä seuraa siitä."],
  ["Esihenkilön uusi työ.", "Kun tiimissä on agentteja, esihenkilö suunnittelee, mitkä päätökset tekee ihminen ja mitkä agentti, ja kuka valvoo."],
];

const topics = [
  "Tekoälyagenttien vastuu- ja valvontakysymykset organisaatioissa ja julkisella sektorilla",
  "Tekoälyn tuottavuus: miksi hyödyt jäävät usein saamatta ja miten niitä kannattaa mitata",
  "Johtaminen agenttiaikana, kun rajoite on ihmisen kapasiteetti",
  "Keskijohdon ja esihenkilötyön muutos",
  "Henkilöstön mitoitus ja tekoälyyn perustuvat irtisanomiset",
  "Muutosjohtaminen, kun ihmiset huolestuvat omasta työstään",
  "Ihmisen tarkkaavaisuuden ja arviointikyvyn rajat valvontatyössä",
  "Tekoäly myynnissä ja kaupallisessa toiminnassa",
];

const appearances = [
  { id: "JNo9k7-_T7Y", show: "Ilmiö Podcast", title: "Tekoälyasiantuntija: Kollegasi on pian koodia", meta: "Tapio Nissilä, 7.4.2026" },
  { id: "BBfOkHuiVPc", show: "Neuvottelija 402", title: "Kun agentteja on enemmän kuin työntekijöitä", meta: "Tapio Nissilä, 21.8.2026" },
];

const card = "bg-card border border-border rounded-2xl shadow-sm";
const tag = "inline-block text-xs font-semibold tracking-wider uppercase text-secondary mb-3";
const btnPrimary =
  "inline-flex items-center justify-center px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnOutline =
  "inline-flex items-center justify-center px-5 py-3 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      className="shrink-0 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-secondary hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-live="polite"
    >
      {done ? "Kopioitu" : "Kopioi"}
    </button>
  );
}

function Section({ id, title, label, children }: { id: string; title: string; label?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-24 border-t border-border">
      {label && <span className={tag}>{label}</span>}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function ConceptDiagram() {
  const modes = ["Command", "Collaborate", "Approve", "Monitor", "Audit"];
  const axes = ["Toistuvuus", "Standardoitavuus", "Seuraus"];
  const Arrow = () => (
    <div className="flex items-center justify-center text-muted-foreground py-2 md:py-0 md:px-2" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" className="rotate-90 md:rotate-0">
        <path d="M4 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  return (
    <figure
      className={`${card} p-5 md:p-8 mb-8`}
      aria-label="Kaavio: päätöspolku arvioidaan kolmella akselilla, joista johdetaan yksi viidestä valvontamodista"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:flex-1 rounded-xl bg-primary text-primary-foreground p-4 text-center">
          <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Yksikkö</div>
          <div className="font-bold text-lg">Päätöspolku</div>
          <div className="text-xs opacity-80 mt-1">valmistelu → päätös → toimeenpano → seuraukset</div>
        </div>
        <Arrow />
        <div className="md:flex-1 flex flex-col gap-2">
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold text-center">Kolme akselia</div>
          {axes.map((a) => (
            <div key={a} className="rounded-lg border border-secondary/40 text-secondary font-semibold text-sm text-center py-2">
              {a}
            </div>
          ))}
        </div>
        <Arrow />
        <div className="md:flex-1 flex flex-col gap-1.5">
          <div className="text-xs uppercase tracking-wider text-accent font-semibold text-center">Viisi valvontamodia</div>
          {modes.map((m, i) => (
            <div key={m} className="flex items-center gap-2 rounded-lg bg-muted text-primary text-sm font-medium px-3 py-1.5">
              <span className="text-xs text-accent font-bold w-4">{i + 1}</span>
              {m}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

const Media = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Medialle – Ihmisten ja agenttien organisaatio";
    const setMeta = (sel: string, attr: string, key: string, val: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      const prev = el?.getAttribute("content") ?? null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
      return () => (prev === null ? el!.remove() : el!.setAttribute("content", prev));
    };
    const img = `${window.location.origin}${COVER}`;
    const restores = [
      setMeta('meta[name="description"]', "name", "description", ONE_LINER),
      setMeta('meta[property="og:title"]', "property", "og:title", "Medialle – Ihmisten ja agenttien organisaatio"),
      setMeta('meta[property="og:description"]', "property", "og:description", ONE_LINER),
      setMeta('meta[property="og:image"]', "property", "og:image", img),
    ];
    return () => {
      document.title = prevTitle;
      restores.forEach((r) => r());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="container-narrow pt-24 md:pt-32 pb-16">
        {/* Yläosa */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center pb-10">
          <div>
            <span className={tag}>Medialle</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight mb-3">
              Ihmisten ja agenttien organisaatio
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 mb-4">Miten muotoilet toimintamallin</p>
            <p className="text-muted-foreground mb-6">
              Tapio Nissilä ja Niklas Nordling · Professional Publishing Finland · ilmestyy 6.11.2026
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#yhteystiedot" className={btnPrimary}>Pyydä ennakkokappale</a>
              <a href={COVER} download className={btnOutline}>Lataa kansikuva</a>
            </div>
          </div>
          <img
            src={COVER}
            alt="Kirjan Ihmisten ja agenttien organisaatio kansi"
            className="w-40 md:w-56 rounded-md border border-border shadow-sm mx-auto"
          />
        </div>

        <nav aria-label="Sivun osiot" className="flex flex-wrap gap-x-3 gap-y-2 text-sm pb-8">
          {sections.map(([id, label], i) => (
            <span key={id} className="flex items-center gap-3">
              <a href={`#${id}`} className="text-secondary hover:underline">{label}</a>
              {i < sections.length - 1 && <span className="text-muted-foreground" aria-hidden="true">·</span>}
            </span>
          ))}
        </nav>

        <Section id="perustiedot" title="Perustiedot">
          <dl className={`${card} divide-y divide-border`}>
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 px-5 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-primary font-medium min-w-0">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="esittely" title="Esittely kolmessa pituudessa">
          <div className="space-y-5">
            {[
              ["Yksi lause", ONE_LINER],
              ["Lyhyt esittely (noin 100 sanaa)", SHORT],
              ["Pidempi esittely (noin 250 sanaa)", LONG],
            ].map(([t, body]) => (
              <article key={t} className={`${card} p-5 md:p-6`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-primary">{t}</h3>
                  <CopyButton text={body} />
                </div>
                <div className="text-foreground/90 leading-relaxed space-y-3">
                  {body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="kirjoittajat" title="Kirjoittajat">
          <div className="grid md:grid-cols-2 gap-5">
            {authors.map((a) => (
              <article key={a.name} className={`${card} p-5 md:p-6 flex flex-col`}>
                <img src={a.img} alt={a.name} className="w-24 h-24 rounded-full object-cover mb-4" loading="lazy" />
                <h3 className="text-lg font-bold text-primary mb-2">{a.name}</h3>
                <p className="text-foreground/90 leading-relaxed mb-3">{a.short}</p>
                <div className="mb-3"><CopyButton text={a.short} /></div>
                <button
                  type="button"
                  aria-expanded={!!open[a.name]}
                  onClick={() => setOpen((o) => ({ ...o, [a.name]: !o[a.name] }))}
                  className="self-start text-sm font-semibold text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {open[a.name] ? "Näytä vähemmän" : "Lue lisää"}
                </button>
                {open[a.name] && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
                      {a.long.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">Haastattelukielet: {a.langs}.</p>
                    <div className="mt-3"><CopyButton text={a.long} /></div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="kuvat" title="Kuvat ladattaviksi">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {images.map((im) => (
              <figure key={im.src} className={`${card} p-4 flex flex-col`}>
                <div className="aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden mb-3">
                  <img src={im.src} alt={im.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <figcaption className="text-sm font-medium text-primary">{im.caption}</figcaption>
                <p className="text-xs text-muted-foreground mb-3">JPG · {im.size}</p>
                <a href={im.src} download className={`${btnOutline} py-2 mt-auto`}>Lataa</a>
              </figure>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-5">
            Kuvat ovat vapaasti käytettävissä kirjaa ja sen kirjoittajia koskevassa toimituksellisessa aineistossa. Mainitse kuvaaja, jos kuvaaja on ilmoitettu.
          </p>
        </Section>

        <Section id="kasitteet" title="Keskeiset käsitteet">
          <ConceptDiagram />
          <div className="grid sm:grid-cols-2 gap-4">
            {concepts.map(([t, d]) => (
              <div key={t} className={`${card} p-5`}>
                <h3 className="font-semibold text-primary mb-1">{t}</h3>
                <p className="text-sm text-foreground/90 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="lainattavaa" title="Lainattavaa">
          <div className="grid md:grid-cols-2 gap-4">
            {quotes.map((q) => (
              <figure key={q} className={`${card} p-5 md:p-6 flex flex-col gap-4 border-l-4 border-l-accent`}>
                <blockquote className="text-lg text-primary font-medium leading-snug">”{q}”</blockquote>
                <div className="mt-auto"><CopyButton text={`”${q}” – Tapio Nissilä ja Niklas Nordling, Ihmisten ja agenttien organisaatio (2026)`} /></div>
              </figure>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Tapio Nissilä ja Niklas Nordling, Ihmisten ja agenttien organisaatio (2026).
          </p>
        </Section>

        <Section id="juttukulmat" title="Ajankohtaisia kulmia">
          <div className="space-y-4">
            {angles.map(([t, d]) => (
              <div key={t} className={`${card} p-5`}>
                <h3 className="font-semibold text-primary mb-1">{t}</h3>
                <p className="text-foreground/90 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="kommentoitavaa" title="Kirjoittajat kommentoivat mielellään">
          <ul className={`${card} divide-y divide-border`}>
            {topics.map((t) => (
              <li key={t} className="px-5 py-3 text-foreground/90 flex gap-3">
                <span className="text-accent font-bold" aria-hidden="true">–</span>
                {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="esiintymiset" title="Esiintymiset">
          <div className="grid sm:grid-cols-2 gap-5">
            {appearances.map((a) => (
              <a
                key={a.id}
                href={`https://www.youtube.com/watch?v=${a.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} overflow-hidden hover:border-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${a.id}/hqdefault.jpg`}
                  alt={`${a.show}: ${a.title}`}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-secondary mb-1">{a.show}</div>
                  <div className="font-semibold text-primary">”{a.title}”</div>
                  <div className="text-sm text-muted-foreground mt-1">{a.meta}</div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm">
            Puhujavaraukset:{" "}
            <a
              href="https://speakersfactory.fi/esiintyjat-ja-ohjelma/tapio-nissila/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline"
            >
              Speakers Factory
            </a>
          </p>
        </Section>

        <Section id="yhteystiedot" title="Ennakkokappaleet ja yhteystiedot">
          <p className="text-foreground/90 mb-5 max-w-2xl">
            Lähetämme ennakkokappaleen toimittajille ja kriitikoille. Kerro viestissä nimesi, mediasi ja toimitusosoite.
          </p>
          <a href={MAILTO} className={`${btnPrimary} mb-8`}>Pyydä ennakkokappale</a>
          <div className={`${card} p-5 max-w-md`}>
            <h3 className="font-semibold text-primary">Tapio Nissilä</h3>
            <p className="text-sm text-muted-foreground mb-2">kirjoittaja</p>
            <p className="text-sm"><a href="tel:+358407010458" className="text-secondary hover:underline">040 701 0458</a></p>
            <p className="text-sm break-all"><a href="mailto:tapio.a.nissila@gmail.com" className="text-secondary hover:underline">tapio.a.nissila@gmail.com</a></p>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Media;
