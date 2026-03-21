// Shared data for HAR tools

export type OversightMode = "command" | "collaborate" | "approve" | "monitor" | "audit";

export const oversightModeLabels: Record<OversightMode, string> = {
  command: "Command",
  collaborate: "Collaborate",
  approve: "Approve",
  monitor: "Monitor",
  audit: "Audit",
};

export const roleArchitectures: Record<OversightMode, {
  humanRole: string;
  agentRole: string;
  collaborationModel: string;
  responsibility: string;
}> = {
  command: {
    humanRole: "Direktiivijohtaja — määrittelee jokaisen askeleen, agentti ei tee itsenäisiä päätöksiä",
    agentRole: "Työkalu — suorittaa eksplisiittisiä komentoja",
    collaborationModel: "Ihminen komentaa → agentti suorittaa → ihminen arvioi → seuraava komento",
    responsibility: "Täysi vastuu ihmisellä jokaisessa vaiheessa.",
  },
  collaborate: {
    humanRole: "Ajattelukumppani ja päätöksentekijä — tuo kontekstin, arvioinnin ja vastuun",
    agentRole: "Analyyttinen kumppani — tuo laajuuden, tiedonhaun ja vaihtoehdot",
    collaborationModel: "Iteratiivinen vuoropuhelu — ratkaisu kehittyy yhdessä",
    responsibility: "Ihminen tekee lopulliset päätökset, mutta agentti vaikuttaa aktiivisesti prosessiin.",
  },
  approve: {
    humanRole: "Tarkistaja ja hyväksyjä — lukee ehdotuksen, päättää ennen toimeenpanoa, vastaa lopputuloksesta",
    agentRole: "Valmistelija — kokoaa tiedon, rakentaa ehdotuksen, odottaa hyväksyntää",
    collaborationModel: "Agentti valmistelee → sinä hyväksyt → agentti toteuttaa",
    responsibility: "Ihminen vastaa jokaisesta hyväksytystä toimenpiteestä.",
  },
  monitor: {
    humanRole: "Poikkeamien käsittelijä — seuraa reaaliaikaisesti, puuttuu kun agentti liputtaa tai poikkeaa odotuksesta",
    agentRole: "Itsenäinen suorittaja — tekee, raportoi, liputtaa poikkeamat",
    collaborationModel: "Agentti suorittaa jatkuvasti → liputtaa poikkeamat → sinä puutut tarvittaessa",
    responsibility: "Agentti toimii itsenäisesti, ihminen vastaa poikkeamatilanteista.",
  },
  audit: {
    humanRole: "Laadunvarmistaja — pistotarkistaa otoksia, korjaa systemaattiset ongelmat",
    agentRole: "Autonominen suorittaja — toimii alusta loppuun itsenäisesti",
    collaborationModel: "Agentti suorittaa → sinä pistotarkistat → korjaat jos systemaattinen ongelma",
    responsibility: "Agentti vastaa operatiivisesta suorituksesta, ihminen systemaattisesta laadunvarmistuksesta.",
  },
};

export const capacityDescriptions: Record<string, string> = {
  "audit_yli40": "Tiimisi tämänhetkinen viikottainen työmäärä voi kohdentua laadunvarmistukseen suorittamisen sijaan. Sama tai suurempi volyymi on mahdollista saavuttaa kun ihmisen aika vapautuu tekemisestä valvontaan.",
  "audit_20-40": "Työn luonne muuttuu suorittamisesta valvontaan. Tiimisi voi käsitellä merkittävästi suurempaa volyymia — tai suunnata vapautuvaa kapasiteettia monimutkaisempiin tehtäviin.",
  "audit_5-20": "Ihmisen aika siirtyy tuottamisesta laadunvarmistukseen. Voit kasvattaa volyymia merkittävästi.",
  "audit_alle5": "Pienellä volyymilla automatisoinnin hyöty on rajallinen, mutta laadunvarmistus vapautuu muihin tehtäviin.",
  "monitor_yli40": "Työn luonne muuttuu suorittamisesta valvontaan. Tiimisi voi käsitellä merkittävästi suurempaa volyymia — tai suunnata vapautuvaa kapasiteettia monimutkaisempiin tehtäviin.",
  "monitor_20-40": "Työn luonne muuttuu suorittamisesta valvontaan. Tiimisi voi käsitellä merkittävästi suurempaa volyymia — tai suunnata vapautuvaa kapasiteettia monimutkaisempiin tehtäviin.",
  "monitor_5-20": "Ihmisen aika siirtyy tuottamisesta valvontaan. Voit kasvattaa volyymia pitäen ihmisen vastuun poikkeamatilanteista.",
  "monitor_alle5": "Pienellä volyymilla valvonnan automatisointi vapauttaa aikaa, mutta hyöty on maltillinen.",
  "approve_yli40": "Ihmisen aika siirtyy tuottamisesta päätöksentekoon. Voit kasvattaa volyymia pitäen ihmisen vastuun jokaisesta toimenpiteestä.",
  "approve_20-40": "Ihmisen aika siirtyy tuottamisesta päätöksentekoon. Voit kasvattaa volyymia pitäen ihmisen vastuun jokaisesta toimenpiteestä.",
  "approve_5-20": "Ihmisen aika siirtyy tuottamisesta päätöksentekoon. Voit kasvattaa volyymia pitäen ihmisen vastuun jokaisesta toimenpiteestä.",
  "approve_alle5": "Pienellä volyymilla hyöty on rajallinen, mutta prosessin laatu paranee kun agentti valmistelee.",
  "collaborate": "Työn luonne säilyy inhimillisesti intensiivisenä — agentti laajentaa mitä on mahdollista tehdä, ei nopeuta mekaanista suorittamista.",
  "command": "Kapasiteetti kasvaa marginaalisesti. Agentti toimii työkaluna, ei itsenäisenä toimijana.",
};

export const nextStepRecommendations: Record<OversightMode, string> = {
  approve: "Arvioi uudelleen 6 kuukauden kuluttua tai jos agentin virheaste ylittää sovitun rajan.",
  monitor: "Arvioi uudelleen 6 kuukauden kuluttua tai jos prosessin volyymi muuttuu merkittävästi.",
  audit: "Arvioi uudelleen 12 kuukauden kuluttua tai jos uusi sääntely astuu voimaan.",
  command: "Arvioi uudelleen kun prosessi vakiintuu tai standardoitavuus paranee.",
  collaborate: "Arvioi uudelleen kun prosessi vakiintuu tai standardoitavuus paranee.",
};

export function getCapacityDescription(mode: OversightMode, hours?: string): string | null {
  if (!hours) return null;
  if (mode === "collaborate") return capacityDescriptions["collaborate"];
  if (mode === "command") return capacityDescriptions["command"];
  const key = `${mode}_${hours}`;
  return capacityDescriptions[key] || null;
}
