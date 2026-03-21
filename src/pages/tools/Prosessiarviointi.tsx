import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RadioGroup } from "@/components/tools/RadioGroup";
import { ScoreCard } from "@/components/tools/ScoreCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";

const axis1Questions = [
  {
    question: "Kuinka usein tämä prosessi toteutuu?",
    options: [
      { label: "Harvemmin kuin viikoittain", value: "0" },
      { label: "Viikoittain", value: "1" },
      { label: "Päivittäin tai useammin", value: "2" },
    ],
  },
  {
    question: "Tapahtuuko prosessi säännöllisesti vai satunnaisesti?",
    options: [
      { label: "Satunnaisesti tai ennustamattomasti", value: "0" },
      { label: "Säännöllisesti tai automaattisesti laukeavana", value: "1" },
    ],
  },
  {
    question: "Paljonko henkilötyötunteja prosessi kuluttaa kuukaudessa?",
    options: [
      { label: "Alle 8 tuntia", value: "0" },
      { label: "8–40 tuntia", value: "1" },
      { label: "Yli 40 tuntia", value: "2" },
    ],
  },
];

const axis2Questions = [
  {
    question: "Voidaanko prosessin askeleet dokumentoida selkeänä ohjeena, jota kuka tahansa voisi seurata?",
    options: [
      { label: "Ei", value: "0" },
      { label: "Osittain", value: "1" },
      { label: "Kyllä", value: "2" },
    ],
  },
  {
    question: "Ovatko prosessin syötteet (data, dokumentit, pyynnöt) yhdenmukaisia ja ennustettavia?",
    options: [
      { label: "Harvoin", value: "0" },
      { label: "Yleensä", value: "1" },
      { label: "Aina", value: "2" },
    ],
  },
  {
    question: "Kuinka paljon poikkeustapauksia prosessissa on?",
    options: [
      { label: "Yli 30% tilanteista on poikkeuksia", value: "0" },
      { label: "10–30%", value: "1" },
      { label: "Alle 10%", value: "2" },
    ],
  },
  {
    question: "Voiko prosessin onnistumisen arvioida objektiivisesti ilman inhimillistä tulkintaa?",
    options: [
      { label: "Ei", value: "0" },
      { label: "Osittain", value: "1" },
      { label: "Kyllä", value: "2" },
    ],
  },
  {
    question: "Vaatiiko prosessi merkittävää luovuutta, empatiaa tai tilannekohtaista harkintaa?",
    options: [
      { label: "Kyllä, jatkuvasti", value: "0" },
      { label: "Joskus", value: "1" },
      { label: "Ei juuri koskaan", value: "2" },
    ],
  },
];

const axis3Questions = [
  {
    question: "Mitä tapahtuu jos agentti tekee virheen?",
    options: [
      { label: "Helposti korjattava, pieni vaikutus", value: "A" },
      { label: "Korjattavissa, mutta vaatii työtä", value: "B" },
      { label: "Vaikea peruuttaa tai merkittävä riski", value: "C" },
      { label: "Ei voi peruuttaa tai kriittinen seuraus", value: "D" },
    ],
  },
  {
    question: "Kuka on juridisesti tai taloudellisesti vastuussa lopputuloksesta?",
    options: [
      { label: "Vastuu hajautettu tai epäselvä", value: "A" },
      { label: "Tiiminvetäjä tai prosessinomistaja", value: "B" },
      { label: "Liiketoimintayksikön johtaja", value: "C" },
      { label: "Toimitusjohtaja tai hallitus", value: "D" },
    ],
  },
  {
    question: "Kuinka nopeasti virhe pitää havaita?",
    options: [
      { label: "Viikon sisällä riittää", value: "A" },
      { label: "Saman päivän sisällä", value: "B" },
      { label: "Tunnin sisällä", value: "C" },
      { label: "Välittömästi", value: "D" },
    ],
  },
  {
    question: "Soveltuuko prosessiin erityissääntely tai compliance-vaatimukset?",
    options: [
      { label: "Ei", value: "A" },
      { label: "Kevyt sääntely", value: "B" },
      { label: "Merkittävä sääntely", value: "C" },
      { label: "Tiukka / toimialakohtainen sääntely", value: "D" },
    ],
  },
];

function calculateAxis3Result(answers: (string | null)[]) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => {
    if (a && a in counts) counts[a as keyof typeof counts]++;
  });

  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const hasMixed = Object.values(counts).filter((v) => v > 0).length >= 3;

  if (counts.D === max) return { mode: "Command / Collaborate", har: "1–3", hasMixed };
  if (counts.C === max) return { mode: "Approve", har: "2–10", hasMixed };
  if (counts.B === max) return { mode: "Monitor", har: "5–20", hasMixed };
  return { mode: "Audit", har: "10–50+", hasMixed };
}

const modeDescriptions: Record<string, string> = {
  "Command / Collaborate": "Prosessi vaatii tiivistä ihmisohjausta. Agentti toimii avustavassa roolissa ja jokainen toimenpide edellyttää ihmisen aktiivista päätöstä.",
  "Approve": "Agentti valmistelee ja ehdottaa, ihminen hyväksyy jokaisen kriittisen vaiheen ennen etenemistä. Sopii säänneltyihin ja korkean riskin prosesseihin.",
  "Monitor": "Agentti toimii itsenäisesti, mutta ihminen seuraa reaaliaikaisesti ja voi puuttua tarvittaessa. Virheet havaitaan nopeasti.",
  "Audit": "Agentti toimii lähes itsenäisesti. Ihminen tarkistaa tulokset jälkikäteen säännöllisin väliajoin. Sopii matalan riskin, korkean volyymin prosesseihin.",
};

const Prosessiarviointi = () => {
  const [step, setStep] = useState(0);
  const [processName, setProcessName] = useState("");
  const [axis1Answers, setAxis1Answers] = useState<(string | null)[]>(Array(3).fill(null));
  const [axis2Answers, setAxis2Answers] = useState<(string | null)[]>(Array(5).fill(null));
  const [axis3Answers, setAxis3Answers] = useState<(string | null)[]>(Array(4).fill(null));

  const axis1Score = axis1Answers.reduce((sum, a) => sum + (a ? parseInt(a) : 0), 0);
  const axis2Score = axis2Answers.reduce((sum, a) => sum + (a ? parseInt(a) : 0), 0);

  const axis1Complete = axis1Answers.every((a) => a !== null);
  const axis2Complete = axis2Answers.every((a) => a !== null);
  const axis3Complete = axis3Answers.every((a) => a !== null);

  const stoppedEarly = axis1Complete && axis1Score <= 1;
  const totalSteps = stoppedEarly ? 2 : 4;

  const setAnswer = useCallback(
    (axis: 1 | 2 | 3, index: number, value: string) => {
      if (axis === 1) setAxis1Answers((prev) => { const n = [...prev]; n[index] = value; return n; });
      if (axis === 2) setAxis2Answers((prev) => { const n = [...prev]; n[index] = value; return n; });
      if (axis === 3) setAxis3Answers((prev) => { const n = [...prev]; n[index] = value; return n; });
    },
    []
  );

  const reset = () => {
    setStep(0);
    setProcessName("");
    setAxis1Answers(Array(3).fill(null));
    setAxis2Answers(Array(5).fill(null));
    setAxis3Answers(Array(4).fill(null));
  };

  const axis3Result = axis3Complete ? calculateAxis3Result(axis3Answers) : null;

  return (
    <ToolLayout title="Prosessikohtainen HAR-arviointi" currentStep={Math.min(step + 1, totalSteps)} totalSteps={totalSteps}>
      <p className="text-muted-foreground mb-8 text-sm italic">
        Arvioi yksittäinen prosessi kolmella akselilla. Saat selkeän suosituksen: kannattaako automatisoida, miten, ja millä valvontatasolla. Vie noin 5 minuuttia.
      </p>

      <AnimatePresence mode="wait">
        {/* Step 0: Process name */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-primary mb-4">Minkä prosessin arvioit?</h2>
            <Input
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              placeholder='esim. "Myyntiraportointi" tai "Rekrytointiprosessi"'
              className="max-w-md mb-6"
            />
            <Button onClick={() => setStep(1)} disabled={!processName.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Seuraava <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Step 1: Axis 1 - Toistuvuus */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-primary mb-1">AKSELI 1: Toistuvuus</h2>
            <p className="text-muted-foreground text-sm mb-6">Kannattaako tämä automatisoida?</p>

            {axis1Questions.map((q, i) => (
              <RadioGroup
                key={i}
                question={q.question}
                options={q.options}
                value={axis1Answers[i]}
                onChange={(v) => setAnswer(1, i, v)}
              />
            ))}

            {axis1Complete && (
              <ScoreCard
                title="Toistuvuus-pisteet"
                score={axis1Score}
                maxScore={5}
                ranges={[
                  { min: 0, max: 1, color: "red", label: "Prosessi pysyy ihmisellä" },
                  { min: 2, max: 3, color: "yellow", label: "Jatketaan arviointia" },
                  { min: 4, max: 5, color: "green", label: "Vahva automatisointikandidaatti" },
                ]}
              />
            )}

            {stoppedEarly && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-destructive mb-2">STOP — ei agenttia tässä prosessissa</h3>
                <p className="text-sm text-muted-foreground">
                  Prosessi "{processName}" ei toistu riittävän usein tai kuluta riittävästi resursseja, jotta automatisointi olisi järkevää. Keskity prosesseihin, jotka toistuvat usein ja kuluttavat merkittävästi henkilötyötunteja.
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(0)}>Takaisin</Button>
              {!stoppedEarly && (
                <Button onClick={() => setStep(2)} disabled={!axis1Complete} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Seuraava <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
              {stoppedEarly && (
                <Button onClick={reset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-1" /> Arvioi toinen prosessi
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Axis 2 - Standardoitavuus */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-primary mb-1">AKSELI 2: Standardoitavuus</h2>
            <p className="text-muted-foreground text-sm mb-6">Voiko tämän tehdä luotettavasti?</p>

            {axis2Questions.map((q, i) => (
              <RadioGroup
                key={i}
                question={q.question}
                options={q.options}
                value={axis2Answers[i]}
                onChange={(v) => setAnswer(2, i, v)}
              />
            ))}

            {axis2Complete && (
              <ScoreCard
                title="Standardoitavuus-pisteet"
                score={axis2Score}
                maxScore={10}
                ranges={[
                  { min: 0, max: 3, color: "blue", label: "Collaborative-malli — agentti tukee, ihminen päättää" },
                  { min: 4, max: 6, color: "yellow", label: "Hybrid-malli — ihminen validoi" },
                  { min: 7, max: 10, color: "green", label: "Automatisointi mahdollinen" },
                ]}
              />
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>Takaisin</Button>
              <Button onClick={() => setStep(3)} disabled={!axis2Complete} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Axis 3 - Valvontamodi */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-primary mb-1">AKSELI 3: Valvontamodi</h2>
            <p className="text-muted-foreground text-sm mb-6">Kuka kantaa vastuun?</p>

            {axis3Questions.map((q, i) => (
              <RadioGroup
                key={i}
                question={q.question}
                options={q.options}
                value={axis3Answers[i]}
                onChange={(v) => setAnswer(3, i, v)}
                layout="vertical"
              />
            ))}

            {axis3Complete && (
              <Button onClick={() => setStep(4)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Näytä tulokset <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>Takaisin</Button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {step === 4 && axis3Result && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-1">Tulokset: {processName}</h2>
              <p className="text-sm text-muted-foreground mb-6">HAR-arvioinnin yhteenveto</p>

              {/* Axis scores */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Toistuvuus</p>
                  <p className="text-2xl font-bold text-primary">{axis1Score}/5</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Standardoitavuus</p>
                  <p className="text-2xl font-bold text-primary">{axis2Score}/10</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Valvontamodi</p>
                  <p className="text-2xl font-bold text-accent">{axis3Result.mode}</p>
                </div>
              </div>

              {/* Recommended mode */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Suositeltu valvontamodi</p>
                <p className="text-3xl font-extrabold text-accent mb-2">{axis3Result.mode}</p>
                <p className="text-sm text-muted-foreground">
                  HAR-taso: <span className="font-semibold text-primary">{axis3Result.har} agenttia per ihminen</span>
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {modeDescriptions[axis3Result.mode]}
              </p>

              {axis3Result.hasMixed && (
                <div className="flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Akselin 3 vastaukset ovat hajanaisia. Tämä voi viitata siihen, että prosessi sisältää osia, jotka vaativat eri valvontatasoja. Harkitse prosessin pilkkomista osiin.
                  </p>
                </div>
              )}

              <Button onClick={reset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" /> Arvioi toinen prosessi
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
};

export default Prosessiarviointi;
