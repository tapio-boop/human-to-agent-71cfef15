import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RoleArchitectureCard } from "@/components/tools/RoleArchitectureCard";
import { EmailCapture } from "@/components/tools/EmailCapture";
import { OversightMode, oversightModeLabels, roleArchitectures, nextStepRecommendations } from "@/lib/har-tools-data";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "har-process-assessment";

type Repetitiveness = "harvoin" | "usein" | "jatkuvasti" | null;
type StdA = "ei" | "osittain" | "kylla" | null;
type StdB = "kylla_jatkuvasti" | "joskus" | "ei_juuri" | null;
type OversightA = "helposti" | "vakava" | null;
type OversightB = "ei" | "kylla" | null;

const hoursOptions = [
  { label: "Alle 5 tuntia", value: "alle5" },
  { label: "5–20 tuntia", value: "5-20" },
  { label: "20–40 tuntia", value: "20-40" },
  { label: "Yli 40 tuntia", value: "yli40" },
];

function determineMode(
  repetitiveness: Repetitiveness,
  stdA: StdA,
  stdB: StdB,
  ovA: OversightA,
  ovB: OversightB
): OversightMode {
  // Low standardizability → Collaborate
  if (stdA === "ei" || stdB === "kylla_jatkuvasti") return "collaborate";

  // Medium standardizability → Approve (default for moderate)
  if (stdA === "osittain" && stdB === "joskus") return "approve";

  // High standardizability → check oversight (Step 3)
  if (ovA === "vakava" || ovB === "kylla") return "approve";

  // Low risk + high standardizability → Monitor or Audit based on repetitiveness
  if (repetitiveness === "jatkuvasti") return "audit";
  return "monitor";
}

function shouldSkipOversight(stdA: StdA, stdB: StdB): boolean {
  // Low standardizability → skip to results with Collaborate
  if (stdA === "ei" || stdB === "kylla_jatkuvasti") return true;
  // Medium standardizability → skip to results with Approve
  if (stdA === "osittain" && stdB === "joskus") return true;
  return false;
}

function getStandardizabilityLabel(stdA: StdA, stdB: StdB): { label: string; description: string } {
  if (stdA === "ei" || stdB === "kylla_jatkuvasti") {
    return { label: "Matala standardoitavuus", description: "Prosessi vaatii paljon tilannekohtaista harkintaa ja soveltuu parhaiten yhteistyömalliin." };
  }
  if (stdA === "osittain" && stdB === "joskus") {
    return { label: "Kohtalainen standardoitavuus", description: "Prosessissa on automatisoitavia osia, mutta se vaatii ihmisen harkintaa kriittisissä kohdissa." };
  }
  return { label: "Korkea standardoitavuus", description: "Prosessi on hyvin strukturoitu ja soveltuu pitkälle menevään automatisointiin." };
}

export default function ProcessAssessment() {
  const [step, setStep] = useState(0);
  const [processName, setProcessName] = useState("");
  const [repetitiveness, setRepetitiveness] = useState<Repetitiveness>(null);
  const [stdA, setStdA] = useState<StdA>(null);
  const [stdB, setStdB] = useState<StdB>(null);
  const [ovA, setOvA] = useState<OversightA>(null);
  const [ovB, setOvB] = useState<OversightB>(null);
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
        setRepetitiveness(data.repetitiveness || null);
        setStdA(data.stdA || null);
        setStdB(data.stdB || null);
        setOvA(data.ovA || null);
        setOvB(data.ovB || null);
        setHoursAnswer(data.hoursAnswer || null);
        setStopped(data.stopped || false);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      step, processName, repetitiveness, stdA, stdB, ovA, ovB, hoursAnswer, stopped,
    }));
  }, [step, processName, repetitiveness, stdA, stdB, ovA, ovB, hoursAnswer, stopped]);

  const totalSteps = 4; // steps 1-4

  const oversightMode: OversightMode = determineMode(repetitiveness, stdA, stdB, ovA, ovB);
  const skipOversight = shouldSkipOversight(stdA, stdB);
  const stdLabel = getStandardizabilityLabel(stdA, stdB);

  const handleStep1Next = () => {
    if (repetitiveness === "harvoin") {
      setStopped(true);
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (skipOversight) {
      // Skip step 3, go to capacity (step 4)
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const handleStep3Next = () => {
    setStep(4);
  };

  const handleShowResults = async () => {
    setStep(5);

    // Save to database
    try {
      await supabase.from("tool_results").insert({
        tool_name: "prosessiarviointi",
        answers: { repetitiveness, stdA, stdB, ovA, ovB, hoursAnswer },
        result: { mode: oversightMode, processName },
      });
    } catch (e) {
      console.error("Failed to save results:", e);
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStep(0);
    setProcessName("");
    setRepetitiveness(null);
    setStdA(null);
    setStdB(null);
    setOvA(null);
    setOvB(null);
    setHoursAnswer(null);
    setStopped(false);
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      await supabase.from("tool_results").insert({
        tool_name: "prosessiarviointi",
        email,
        answers: { repetitiveness, stdA, stdB, ovA, ovB, hoursAnswer },
        result: { mode: oversightMode, processName },
      });
    } catch (e) {
      console.error("Failed to save email results:", e);
    }
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
              Vie noin 3 minuuttia.
            </p>
            <Input
              placeholder="esim. Tarjousten luonti, Laskujen käsittely..."
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              className="max-w-md text-base"
            />
            <div className="mt-6">
              <Button onClick={() => setStep(1)} disabled={!processName.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
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

        {/* STEP 1: Repetitiveness (1 question) */}
        {step === 1 && !stopped && (
          <StepWrapper key="step1">
            <h2 className="text-2xl font-bold text-primary mb-1">Toistuvuus</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 1/4 · {processName}</p>
            <p className="font-medium text-primary mb-4 text-lg">Kuinka usein tämä prosessi toteutuu?</p>
            <div className="space-y-3">
              {([
                { label: "Harvoin", desc: "Kerran kuukaudessa tai harvemmin", value: "harvoin" as const },
                { label: "Usein", desc: "Viikoittain tai useita kertoja viikossa", value: "usein" as const },
                { label: "Jatkuvasti", desc: "Päivittäin tai automaattisesti laukeavana", value: "jatkuvasti" as const },
              ]).map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-colors ${
                    repetitiveness === opt.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="repetitiveness"
                      checked={repetitiveness === opt.value}
                      onChange={() => setRepetitiveness(opt.value)}
                      className="accent-accent"
                    />
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground ml-7 mt-1">{opt.desc}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>Takaisin</Button>
              <Button onClick={handleStep1Next} disabled={!repetitiveness} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 2: Standardizability (2 questions on same screen) */}
        {step === 2 && (
          <StepWrapper key="step2">
            <h2 className="text-2xl font-bold text-primary mb-1">Standardoitavuus</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 2/4 · {processName}</p>

            {/* Q2a */}
            <div className="mb-8">
              <p className="font-medium text-primary mb-4">
                Jos kirjoittaisit tästä prosessista askel askeleelta -ohjeen, voiko kuka tahansa seurata sitä luotettavasti?
              </p>
              <div className="space-y-2">
                {([
                  { label: "Ei — liian paljon poikkeuksia ja tilannekohtaista harkintaa", value: "ei" as const },
                  { label: "Osittain — runko on selkeä, mutta merkittäviä poikkeuksia", value: "osittain" as const },
                  { label: "Kyllä — prosessi on toistettavissa johdonmukaisesti", value: "kylla" as const },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      stdA === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input type="radio" name="stdA" checked={stdA === opt.value} onChange={() => setStdA(opt.value)} className="accent-accent" />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q2b */}
            <div className="mb-6">
              <p className="font-medium text-primary mb-4">
                Vaatiiko prosessi merkittävää inhimillistä harkintaa, empatiaa tai luovuutta?
              </p>
              <div className="space-y-2">
                {([
                  { label: "Kyllä, jatkuvasti", value: "kylla_jatkuvasti" as const },
                  { label: "Joskus", value: "joskus" as const },
                  { label: "Ei juuri koskaan", value: "ei_juuri" as const },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      stdB === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input type="radio" name="stdB" checked={stdB === opt.value} onChange={() => setStdB(opt.value)} className="accent-accent" />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Show standardizability label when both answered */}
            {stdA && stdB && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-xl border border-border bg-card">
                <p className="font-semibold text-primary">{stdLabel.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{stdLabel.description}</p>
              </motion.div>
            )}

            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Takaisin</Button>
              <Button onClick={handleStep2Next} disabled={!stdA || !stdB} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 3: Oversight (2 questions on same screen) */}
        {step === 3 && (
          <StepWrapper key="step3">
            <h2 className="text-2xl font-bold text-primary mb-1">Valvontamodi</h2>
            <p className="text-sm text-muted-foreground mb-6">Vaihe 3/4 · {processName}</p>

            {/* Q3a */}
            <div className="mb-8">
              <p className="font-medium text-primary mb-4">
                Mitä tapahtuu jos agentti tekee virheen tässä prosessissa?
              </p>
              <div className="space-y-2">
                {([
                  { label: "Helposti korjattava — pieni vaikutus, nopea korjaus", value: "helposti" as const },
                  { label: "Vakava — vaikea peruuttaa tai merkittävät seuraukset", value: "vakava" as const },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      ovA === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input type="radio" name="ovA" checked={ovA === opt.value} onChange={() => setOvA(opt.value)} className="accent-accent" />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q3b */}
            <div className="mb-6">
              <p className="font-medium text-primary mb-4">
                Onko prosessi säännelty, tai onko vastuu siitä erityisen korkea?
              </p>
              <div className="space-y-2">
                {([
                  { label: "Ei — normaali liiketoimintaprosessi", value: "ei" as const },
                  { label: "Kyllä — compliance-vaatimuksia tai korkea vastuu", value: "kylla" as const },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      ovB === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input type="radio" name="ovB" checked={ovB === opt.value} onChange={() => setOvB(opt.value)} className="accent-accent" />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>Takaisin</Button>
              <Button onClick={handleStep3Next} disabled={!ovA || !ovB} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Seuraava
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 4: Capacity (optional) */}
        {step === 4 && (
          <StepWrapper key="step4">
            <h2 className="text-2xl font-bold text-primary mb-1">Kapasiteetti</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {skipOversight ? "Vaihe 3/4" : "Vaihe 4/4"} · {processName} · Valinnainen
            </p>
            <p className="font-medium text-primary mb-4">
              Kuinka monta tuntia viikossa tiimisi käyttää tähän prosessiin tällä hetkellä?
            </p>
            <div className="space-y-2">
              {hoursOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    hoursAnswer === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <input type="radio" name="hours" checked={hoursAnswer === opt.value} onChange={() => setHoursAnswer(opt.value)} className="accent-accent" />
                  <span className="text-sm text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(skipOversight ? 2 : 3)}>Takaisin</Button>
              <Button onClick={handleShowResults} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {hoursAnswer ? "Näytä tulokset" : "Ohita ja näytä tulokset"}
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* RESULTS */}
        {isResults && (
          <StepWrapper key="results">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Tulokset: {processName}</h2>
            <RoleArchitectureCard
              mode={oversightMode}
              processName={processName}
              hours={hoursAnswer || undefined}
              showCapacity={!!hoursAnswer}
            />
            <div className="mt-8">
              <EmailCapture
                onSubmit={handleEmailSubmit}
                templateData={{
                  toolName: "Prosessiarviointi",
                  processName,
                  resultLabel: oversightModeLabels[oversightMode],
                  resultDescription: roleArchitectures[oversightMode].collaborationModel,
                  nextStep: nextStepRecommendations[oversightMode],
                }}
              />
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
