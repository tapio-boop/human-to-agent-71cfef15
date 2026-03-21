import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RoleArchitectureCard } from "@/components/tools/RoleArchitectureCard";
import { EmailCapture } from "@/components/tools/EmailCapture";
import { OversightMode } from "@/lib/har-tools-data";
import { AlertTriangle, RotateCcw } from "lucide-react";

const STORAGE_KEY = "har-process-assessment";

interface RadioQuestion {
  question: string;
  options: { label: string; value: number }[];
}

const repetitivenessQuestions: RadioQuestion[] = [
  {
    question: "Kuinka usein tämä prosessi toistetaan?",
    options: [
      { label: "Harvoin (muutaman kerran vuodessa)", value: 0 },
      { label: "Kuukausittain", value: 1 },
      { label: "Viikoittain", value: 2 },
      { label: "Päivittäin tai useammin", value: 3 },
    ],
  },
  {
    question: "Kuinka samankaltainen prosessi on joka kerralla?",
    options: [
      { label: "Joka kerta erilainen", value: 0 },
      { label: "Perusrakenne sama, yksityiskohdat vaihtelevat", value: 1 },
      { label: "Pääosin samanlainen, pieniä poikkeuksia", value: 2 },
      { label: "Lähes identtinen joka kerta", value: 3 },
    ],
  },
  {
    question: "Kuinka suuri volyymi prosessilla on?",
    options: [
      { label: "Yksittäisiä tapauksia", value: 0 },
      { label: "Kymmeniä kuukaudessa", value: 1 },
      { label: "Satoja kuukaudessa", value: 2 },
      { label: "Tuhansia tai enemmän", value: 3 },
    ],
  },
];

const standardizabilityQuestions: RadioQuestion[] = [
  {
    question: "Onko prosessi dokumentoitu?",
    options: [
      { label: "Ei dokumentaatiota", value: 0 },
      { label: "Osittain dokumentoitu", value: 1 },
      { label: "Hyvin dokumentoitu", value: 2 },
      { label: "Täysin standardoitu ohjeistus", value: 3 },
    ],
  },
  {
    question: "Vaatiiko prosessi tilannekohtaista harkintaa?",
    options: [
      { label: "Jatkuvasti — jokainen tapaus on uniikki", value: 0 },
      { label: "Usein — poikkeuksia tulee säännöllisesti", value: 1 },
      { label: "Harvoin — suurin osa on rutiinia", value: 2 },
      { label: "Ei koskaan — puhtaasti sääntöpohjainen", value: 3 },
    ],
  },
  {
    question: "Ovatko prosessin syötteet ja tuotokset selkeitä?",
    options: [
      { label: "Epämääräisiä ja vaihtelevia", value: 0 },
      { label: "Pääosin selkeitä, mutta poikkeuksia on", value: 1 },
      { label: "Selkeästi määriteltyjä", value: 2 },
      { label: "Täysin strukturoituja ja mitattavia", value: 3 },
    ],
  },
  {
    question: "Kuinka paljon luovuutta tai empatiaa prosessi vaatii?",
    options: [
      { label: "Paljon — ihmissuhdetaitoja tai luovaa ongelmanratkaisua", value: 0 },
      { label: "Jonkin verran — tarvitaan ajoittain", value: 1 },
      { label: "Vähän — lähinnä teknistä suorittamista", value: 2 },
      { label: "Ei lainkaan", value: 3 },
    ],
  },
  {
    question: "Onko prosessin data digitaalisessa muodossa?",
    options: [
      { label: "Pääosin analogista tai epästrukturoitua", value: 0 },
      { label: "Osittain digitaalista", value: 1 },
      { label: "Pääosin digitaalista", value: 2 },
      { label: "Täysin digitaalista ja integroitua", value: 3 },
    ],
  },
];

const oversightQuestions = [
  {
    question: "Kuinka suuri on yksittäisen virheen vaikutus?",
    options: [
      { label: "A) Merkityksetön — korjattavissa helposti", value: "low" },
      { label: "B) Kohtalainen — vaatii korjaustoimenpiteitä", value: "medium" },
      { label: "C) Merkittävä — taloudellinen tai oikeudellinen riski", value: "high" },
      { label: "D) Kriittinen — peruuttamaton vahinko", value: "critical" },
    ],
  },
  {
    question: "Onko prosessi säännelty tai auditoinnin piirissä?",
    options: [
      { label: "A) Ei sääntelyä", value: "none" },
      { label: "B) Kevyt sääntely tai sisäiset ohjeet", value: "light" },
      { label: "C) Merkittävä sääntely (esim. GDPR, finanssisääntely)", value: "heavy" },
      { label: "D) Kriittinen sääntely (esim. terveydenhuolto, turvallisuus)", value: "critical" },
    ],
  },
  {
    question: "Onko tekoälyagentti jo osoittanut luotettavuutensa tässä prosessissa?",
    options: [
      { label: "A) Ei kokemusta — täysin uusi käyttökohde", value: "none" },
      { label: "B) Pilotoitu — alustavat tulokset lupaavia", value: "piloted" },
      { label: "C) Tuotannossa — toiminut luotettavasti kuukausia", value: "production" },
      { label: "D) Vakiintunut — pitkä historia luotettavasta suorituksesta", value: "established" },
    ],
  },
  {
    question: "Kuinka nopeasti prosessin pitää reagoida?",
    options: [
      { label: "A) Ei kiire — päivien tai viikkojen aikajänne", value: "slow" },
      { label: "B) Kohtuullinen — tuntien aikajänne", value: "moderate" },
      { label: "C) Nopea — minuuttien aikajänne", value: "fast" },
      { label: "D) Reaaliaikainen — sekuntien aikajänne", value: "realtime" },
    ],
  },
];

const hoursOptions = [
  { label: "Alle 5 tuntia", value: "alle5" },
  { label: "5–20 tuntia", value: "5-20" },
  { label: "20–40 tuntia", value: "20-40" },
  { label: "Yli 40 tuntia", value: "yli40" },
];

function determineOversightMode(answers: string[]): OversightMode {
  const [impact, regulation, trust, speed] = answers;
  
  // High risk + heavy regulation → Command or Approve
  if (impact === "critical" || regulation === "critical") {
    if (trust === "none" || trust === "piloted") return "command";
    return "approve";
  }
  
  if (impact === "high" || regulation === "heavy") {
    if (trust === "none") return "command";
    if (trust === "piloted") return "approve";
    return "approve";
  }
  
  // Medium risk
  if (impact === "medium" || regulation === "light") {
    if (trust === "established" || trust === "production") return "monitor";
    if (trust === "piloted") return "approve";
    return "collaborate";
  }
  
  // Low risk
  if (trust === "established") return "audit";
  if (trust === "production") return "monitor";
  if (trust === "piloted") return "approve";
  
  // Speed factor
  if (speed === "realtime" || speed === "fast") {
    if (trust === "production" || trust === "established") return "monitor";
  }
  
  return "collaborate";
}

function getStandardizabilityLabel(score: number): { label: string; description: string } {
  if (score <= 5) return { label: "Matala standardoitavuus", description: "Prosessi vaatii paljon tilannekohtaista harkintaa ja on vaikea automatisoida sellaisenaan." };
  if (score <= 10) return { label: "Kohtalainen standardoitavuus", description: "Prosessissa on automatisoitavia osia, mutta se vaatii ihmisen harkintaa kriittisissä kohdissa." };
  return { label: "Korkea standardoitavuus", description: "Prosessi on hyvin strukturoitu ja soveltuu pitkälle menevään automatisointiin." };
}

export default function ProcessAssessment() {
  const [step, setStep] = useState(0);
  const [processName, setProcessName] = useState("");
  const [repetitivenessAnswers, setRepetitivenessAnswers] = useState<(number | null)[]>([null, null, null]);
  const [standardAnswers, setStandardAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [oversightAnswers, setOversightAnswers] = useState<(string | null)[]>([null, null, null, null]);
  const [hoursAnswer, setHoursAnswer] = useState<string | null>(null);
  const [stopped, setStopped] = useState(false);

  // Persist state in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStep(data.step || 0);
        setProcessName(data.processName || "");
        setRepetitivenessAnswers(data.repetitivenessAnswers || [null, null, null]);
        setStandardAnswers(data.standardAnswers || [null, null, null, null, null]);
        setOversightAnswers(data.oversightAnswers || [null, null, null, null]);
        setHoursAnswer(data.hoursAnswer || null);
        setStopped(data.stopped || false);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      step, processName, repetitivenessAnswers, standardAnswers, oversightAnswers, hoursAnswer, stopped,
    }));
  }, [step, processName, repetitivenessAnswers, standardAnswers, oversightAnswers, hoursAnswer, stopped]);

  const repetitivenessScore = repetitivenessAnswers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const standardScore = standardAnswers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const standardLabel = getStandardizabilityLabel(standardScore);

  const oversightMode: OversightMode | null = oversightAnswers.every(a => a !== null)
    ? determineOversightMode(oversightAnswers as string[])
    : null;

  const totalSteps = 5; // 0: name, 1: repetitiveness, 2: standardizability, 3: oversight, 4: capacity

  const canProceedStep0 = processName.trim().length > 0;
  const canProceedStep1 = repetitivenessAnswers.every(a => a !== null);
  const canProceedStep2 = standardAnswers.every(a => a !== null);
  const canProceedStep3 = oversightAnswers.every(a => a !== null);

  const handleNext = () => {
    if (step === 1 && repetitivenessScore <= 1) {
      setStopped(true);
      return;
    }
    setStep(step + 1);
  };

  const handleReset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStep(0);
    setProcessName("");
    setRepetitivenessAnswers([null, null, null]);
    setStandardAnswers([null, null, null, null, null]);
    setOversightAnswers([null, null, null, null]);
    setHoursAnswer(null);
    setStopped(false);
  };

  const isResults = step === 5;

  return (
    <ToolLayout
      title="Prosessiarviointi"
      currentStep={isResults ? totalSteps : step}
      totalSteps={totalSteps}
    >
      <AnimatePresence mode="wait">
        {/* STEP 0: Process Name */}
        {step === 0 && (
          <StepWrapper key="step0">
            <h2 className="text-2xl font-bold text-primary mb-2">Minkä prosessin arvioit?</h2>
            <p className="text-muted-foreground mb-6">
              Arvioi yksittäinen prosessi kolmella akselilla. Saat kuvauksen siitä, miten ihminen ja
              tekoälyagentti työskentelevät yhdessä tässä prosessissa — ja miten työn luonne muuttuu.
              Vie noin 5 minuuttia.
            </p>
            <Input
              placeholder="esim. Tarjousten luonti, Laskujen käsittely..."
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              className="max-w-md text-base"
            />
            <div className="mt-6">
              <Button onClick={() => setStep(1)} disabled={!canProceedStep0} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Aloita arviointi
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STOP screen */}
        {stopped && (
          <StepWrapper key="stopped">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Pidä prosessi ihmisellä</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Tämä prosessi kannattaa pitää ihmisellä. Automatisoinnin investointi ei maksa
                itseään takaisin tällä toistuvuudella.
              </p>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Arvioi toinen prosessi
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 1: Repetitiveness */}
        {step === 1 && !stopped && (
          <StepWrapper key="step1">
            <h2 className="text-2xl font-bold text-primary mb-1">Toistuvuus</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 1/4 · {processName}</p>
            <RadioQuestionGroup
              questions={repetitivenessQuestions}
              answers={repetitivenessAnswers}
              onChange={(i, v) => {
                const next = [...repetitivenessAnswers];
                next[i] = v;
                setRepetitivenessAnswers(next);
              }}
            />
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>Takaisin</Button>
              <Button onClick={handleNext} disabled={!canProceedStep1} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 2: Standardizability */}
        {step === 2 && (
          <StepWrapper key="step2">
            <h2 className="text-2xl font-bold text-primary mb-1">Standardoitavuus</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 2/4 · {processName}</p>
            <RadioQuestionGroup
              questions={standardizabilityQuestions}
              answers={standardAnswers}
              onChange={(i, v) => {
                const next = [...standardAnswers];
                next[i] = v;
                setStandardAnswers(next);
              }}
            />
            {standardAnswers.every(a => a !== null) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 rounded-xl border border-border bg-card"
              >
                <p className="font-semibold text-primary">{standardLabel.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{standardLabel.description}</p>
              </motion.div>
            )}
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Takaisin</Button>
              <Button onClick={handleNext} disabled={!canProceedStep2} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 3: Oversight */}
        {step === 3 && (
          <StepWrapper key="step3">
            <h2 className="text-2xl font-bold text-primary mb-1">Valvontamodi</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 3/4 · {processName}</p>
            {oversightQuestions.map((q, qi) => (
              <div key={qi} className="mb-6">
                <p className="font-medium text-primary mb-3">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        oversightAnswers[qi] === opt.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`oversight-${qi}`}
                        checked={oversightAnswers[qi] === opt.value}
                        onChange={() => {
                          const next = [...oversightAnswers];
                          next[qi] = opt.value;
                          setOversightAnswers(next);
                        }}
                        className="accent-accent"
                      />
                      <span className="text-sm text-foreground">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>Takaisin</Button>
              <Button onClick={handleNext} disabled={!canProceedStep3} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 4: Capacity (optional) */}
        {step === 4 && (
          <StepWrapper key="step4">
            <h2 className="text-2xl font-bold text-primary mb-1">Kapasiteetti</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 4/4 · {processName} · Valinnainen</p>
            <p className="font-medium text-primary mb-4">
              Kuinka monta tuntia viikossa tiimisi käyttää tähän prosessiin tällä hetkellä?
            </p>
            <div className="space-y-2">
              {hoursOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    hoursAnswer === opt.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="hours"
                    checked={hoursAnswer === opt.value}
                    onChange={() => setHoursAnswer(opt.value)}
                    className="accent-accent"
                  />
                  <span className="text-sm text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>Takaisin</Button>
              <Button onClick={() => setStep(5)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {hoursAnswer ? "Näytä tulokset" : "Ohita ja näytä tulokset"}
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* RESULTS */}
        {isResults && oversightMode && (
          <StepWrapper key="results">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Tulokset: {processName}</h2>
            <RoleArchitectureCard
              mode={oversightMode}
              processName={processName}
              hours={hoursAnswer || undefined}
              showCapacity={!!hoursAnswer}
            />
            <div className="mt-8">
              <EmailCapture />
            </div>
            <div className="mt-6 text-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Arvioi toinen prosessi
              </Button>
            </div>
          </StepWrapper>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      {children}
    </motion.div>
  );
}

function RadioQuestionGroup({
  questions,
  answers,
  onChange,
}: {
  questions: RadioQuestion[];
  answers: (number | null)[];
  onChange: (index: number, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={qi}>
          <p className="font-medium text-primary mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  answers[qi] === opt.value
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${qi}`}
                  checked={answers[qi] === opt.value}
                  onChange={() => onChange(qi, opt.value)}
                  className="accent-accent"
                />
                <span className="text-sm text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
