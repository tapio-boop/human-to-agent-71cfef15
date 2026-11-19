export const ORDER_URL =
  "https://propublishing.fi/products/ihmisten-ja-agenttien-organisaatio-miten-muotoilet-toimintamallin?utm_source=h2a.fi&utm_medium=referral&utm_campaign=julkistus";

const MAX_UTM_CONTENT_LENGTH = 100;

/**
 * Kustantajan tilauslinkki. Jos sivun osoitteessa on utm_content, sama arvo lisätään
 * tilauslinkkiin, jotta näkyy, mistä sähköpostiryhmästä ostaja tuli. Tyhjä tai liian
 * pitkä arvo jätetään pois.
 */
export function orderUrl(search: string): string {
  const value = (new URLSearchParams(search).get("utm_content") ?? "").trim();
  if (value.length === 0 || value.length > MAX_UTM_CONTENT_LENGTH) return ORDER_URL;
  return `${ORDER_URL}&utm_content=${encodeURIComponent(value)}`;
}

export type Panelist = { name: string; title: string; quotes: readonly [string, string] };

// Julkistuksen (11.11.2026) paneeli. Lainaukset julkaistu panelistien luvalla (18.–19.11.2026).
export const PANELISTS: readonly Panelist[] = [
  {
    name: "Timo Ritakallio",
    title: "pääjohtaja, OP Pohjola",
    quotes: [
      "”Generatiivisen tekoälyn murroksessa puhutaan liikaa teknologiasta. Ennen kaikkea tässä on kysymys erittäin suuresta organisatorisesta muutoksesta.”",
      "”Internet demokratisoi tiedon. Generatiivinen tekoäly demokratisoi ekspertiisin – me olemme kaikki paljon kyvykkäämpiä.”",
    ],
  },
  {
    name: "Outi Sivonen",
    title: "ihmisymmärrystoimisto Sofuksen perustaja, HR-johtaja, johtamisen asiantuntija",
    quotes: [
      "”Mitä nopeammin organisaatiot ottavat tekoälyä käyttöön, sitä nopeammin ne samankaltaistuvat. Kielimallin käyttö ei ole erottumistekijä.”",
      "”Jos ratsastajalle annetaan auto, hänen on vaikea vastata, onko ratsastaminen nyt helpompaa vai vaikeampaa. Muutoksessa on koko työn kohde.”",
    ],
  },
  {
    name: "Mikael Jungner",
    title: "toimitusjohtaja, Kreab Oy",
    quotes: [
      "”Vanhassa maailmassa ihannetyöntekijä oli tarhattu kani. Uudessa maailmassa tarvitaan villejä jänöpupuja, jotka ratkovat ongelmia lennosta.”",
      "”Tekoälyn hallusinaatiot ja muut virheet eivät ole bugi vaan feature. Organisaatio vahvistuu siitä, kun sitä pommitetaan haasteilla.”",
    ],
  },
];
