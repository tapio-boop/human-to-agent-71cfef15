import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RoleArchitectureCard } from "@/components/tools/RoleArchitectureCard";
import { EmailCapture } from "@/components/tools/EmailCapture";
import { OversightMode } from "@/lib/har-tools-data";
import { RotateCcw } from "lucide-react";

const STORAGE_KEY = "har-oversight-compass";

const questions = [
  {
    question: "Kuinka suuri on yksittäisen virheen vaikutus?",
    options: [
      { label: "Merkityksetön — korjattavissa helposti", value: "low" },
      { label: "Kohtalainen — vaatii korjaustoimenpiteitä", value: "medium" },
      { label: "Merkittävä — taloudellinen tai oikeudellinen riski", value: "high" },
      { label: "Kriittinen — peruuttamaton vahinko", value: "critical" },
    ],
  },
  {
    question: "Onko prosessi säännelty tai auditoinnin piirissä?",
    options: [
      { label: "Ei sääntelyä", value: "none" },
      { label: "Kevyt sääntely tai sisäiset ohjeet", value: "light" },
      { label: "Merkittävä sääntely (esim. GDPR, finanssisääntely)", value: "heavy" },
      { label: "Kriittinen sääntely (esim. terveydenhuolto, turvallisuus)", value: "critical" },
    ],
  },
  {
    question: "Onko tekoälyagentti jo osoittanut luotettavuutensa tässä prosessissa?",
    options: [
      { label: "Ei kokemusta — täysin uusi käyttökohde", value: "none" },
      { label: "Pilotoitu — alustavat tulokset lupaavia", value: "piloted" },
      { label: "Tuotannossa — toiminut luotettavasti kuukausia", value: "production" },
      { label: "Vakiintunut — pitkä historia luotettavasta suorituksesta", value: "established" },
    ],
  },
  {
    question: "Kuinka nopeasti prosessin pitää reagoida?",
    options: [
      { label: "Ei kiire — päivien tai viikkojen aikajänne", value: "slow" },
      { label: "Kohtuullinen — tuntien aikajänne", value: "moderate" },
      { label: "Nopea — minuuttien aikajänne", value: "fast" },
      { label: "Reaaliaikainen — sekuntien aikajänne", value: "realtime" },
    ],
  },
];

function determineMode(answers: string[]): OversightMode {
  const [impact, regulation, trust, speed] = answers;

  if (impact === "critical" || regulation === "critical") {
    if (trust === "none" || trust === "piloted") return "command";
    return "approve";
  }

  if (impact === "high" || regulation === "heavy") {
    if (trust === "none") return "command";
    if (trust === "piloted") return "approve";
    return "approve";
  }

  if (impact === "medium" || regulation === "light") {
    if (trust === "established" || trust === "production") return "monitor";
    if (trust === "piloted") return "approve";
    return "collaborate";
  }

  if (trust === "established") return "audit";
  if (trust === "production") return "monitor";
  if (trust === "piloted") return "approve";

  if (speed === "realtime" || speed === "fast") {
    if (trust === "production" || trust === "established") return "monitor";
  }

  return "collaborate";
}

function generateWhyText(answers: string[], mode: OversightMode): string {
  const [impact, regulation, trust] = answers;

  const impactTexts: Record<string, string> = {
    critical: "prosessiin liittyy kriittinen virheriski",
    high: "yksittäisen virheen vaikutus on merkittävä",
    medium: "virheillä on kohtalainen vaikutus",
    low: "virheet ovat helposti korjattavissa",
  };

  const regulationTexts: Record<string, string> = {
    critical: "prosessi on kriittisen sääntelyn piirissä",
    heavy: "prosessiin kohdistuu merkittävä sääntely",
    light: "sääntelyvaatimukset ovat kevyitä",
    none: "prosessiin ei kohdistu erityistä sääntelyä",
  };

  const trustTexts: Record<string, string> = {
    none: "agentti ei ole vielä osoittanut luotettavuuttaan",
    piloted: "agentti on vasta pilotointivaiheessa",
    production: "agentti on osoittanut luotettavuutensa tuotantokäytössä",
    established: "agentilla on pitkä historia luotettavasta suorituksesta",
  };

  const modeNames: Record<OversightMode, string> = {
    command: "Command",
    collaborate: "Collaborate",
    approve: "Approve",
    monitor: "Monitor",
    audit: "Audit",
  };

  return `Koska ${impactTexts[impact]}, ${regulationTexts[regulation]} ja ${trustTexts[trust]}, ${modeNames[mode]}-malli on sopivin lähtöpiste. Tämä varmistaa oikean tasapainon tehokkuuden ja riskienhallinnan välillä.`;
}

export default function OversightCompass() {
  const [processName, setProcessName] = useState("");
  const [step, setStep] = useState<"name" | "questions" | "results">("name");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null, null]);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProcessName(data.processName || "");
        setStep(data.step || "name");
        setCurrentQ(data.currentQ || 0);
        setAnswers(data.answers || [null, null, null, null]);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ processName, step, currentQ, answers }));
  }, [processName, step, currentQ, answers]);

  const handleAnswer = (value: string) => {
    const next = [...answers];
    next[currentQ] = value;
    setAnswers(next);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("results");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
    else setStep("name");
  };

  const handleReset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setProcessName("");
    setStep("name");
    setCurrentQ(0);
    setAnswers([null, null, null, null]);
  };

  const mode: OversightMode | null = answers.every(a => a !== null)
    ? determineMode(answers as string[])
    : null;

  return (
    <ToolLayout
      title="Valvontakompassi"
      currentStep={step === "name" ? 0 : step === "questions" ? currentQ + 1 : 5}
      totalSteps={5}
    >
      <AnimatePresence mode="wait">
        {step === "name" && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Valvontakompassi</h2>
            <p className="text-muted-foreground mb-6">
              Olet päättänyt ottaa agentin käyttöön — mutta millä valvontatasolla?
              Neljä kysymystä ohjaa sinut oikeaan yhteistyömalliin. Vie noin 3 minuuttia.
            </p>
            <Input
              placeholder="Minkä prosessin valvontamallia arvioit?"
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              className="max-w-md text-base"
            />
            <div className="mt-6">
              <Button
                onClick={() => setStep("questions")}
                disabled={!processName.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Aloita
              </Button>
            </div>
          </motion.div>
        )}

        {step === "questions" && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-sm text-muted-foreground mb-1">Kysymys {currentQ + 1}/4 · {processName}</p>
            <h2 className="text-xl font-bold text-primary mb-6">{questions[currentQ].question}</h2>
            <div className="space-y-2">
              {questions[currentQ].options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    answers[currentQ] === opt.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`compass-q-${currentQ}`}
                    checked={answers[currentQ] === opt.value}
                    onChange={() => handleAnswer(opt.value)}
                    className="accent-accent"
                  />
                  <span className="text-sm text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={handleBack}>Takaisin</Button>
              <Button
                onClick={handleNext}
                disabled={answers[currentQ] === null}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {currentQ < questions.length - 1 ? "Seuraava" : "Näytä tulokset"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === "results" && mode && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Suositeltu valvontamalli: {processName}
            </h2>
            <RoleArchitectureCard
              mode={mode}
              processName={processName}
              showNextStep
              whyText={generateWhyText(answers as string[], mode)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
}
