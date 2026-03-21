import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, RotateCcw, Shield, Eye, CheckCircle, AlertTriangle, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrailEntry {
  question: string;
  answer: string;
}

type Mode = "Command" | "Approve" | "Monitor" | "Audit";

const modeConfig: Record<Mode, { icon: React.ElementType; har: string; description: string; showWarning: boolean }> = {
  Command: {
    icon: Command,
    har: "1–2",
    description: "Ihminen ohjaa jokaista agentin toimenpidettä aktiivisesti. Agentti toimii käytännössä avustavana työkaluna, joka toteuttaa tarkkoja ohjeita. Tämä on turvallisin mutta hitain malli.",
    showWarning: false,
  },
  Approve: {
    icon: CheckCircle,
    har: "2–10",
    description: "Agentti valmistelee ja ehdottaa toimenpiteitä, mutta ihminen hyväksyy jokaisen kriittisen vaiheen ennen etenemistä. Sopii säänneltyihin prosesseihin ja tilanteisiin, joissa virheillä on merkittäviä seurauksia.",
    showWarning: false,
  },
  Monitor: {
    icon: Eye,
    har: "5–20",
    description: "Agentti toimii itsenäisesti reaaliajassa, mutta ihminen seuraa ja voi puuttua tarvittaessa. Virheet havaitaan nopeasti, mutta valvoja voi kuormittua suurella volyymillä.",
    showWarning: true,
  },
  Audit: {
    icon: Shield,
    har: "10–50+",
    description: "Agentti toimii lähes täysin itsenäisesti. Ihminen tarkastaa tulokset jälkikäteen säännöllisin väliajoin. Sopii matalan riskin, korkean volyymin prosesseihin, joissa virhe on helposti korjattavissa.",
    showWarning: true,
  },
};

const Valvontakompassi = () => {
  const [processName, setProcessName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [trail, setTrail] = useState<TrailEntry[]>([]);
  const [result, setResult] = useState<Mode | null>(null);
  const [q3Path, setQ3Path] = useState<string | null>(null);

  const totalSteps = 6; // name + up to 5 questions

  const addTrailAndResult = (question: string, answer: string, mode: Mode) => {
    setTrail((prev) => [...prev, { question, answer }]);
    setResult(mode);
  };

  const addTrailAndNext = (question: string, answer: string, nextQ: number) => {
    setTrail((prev) => [...prev, { question, answer }]);
    setCurrentQuestion(nextQ);
  };

  const reset = () => {
    setProcessName("");
    setStarted(false);
    setCurrentQuestion(1);
    setTrail([]);
    setResult(null);
    setQ3Path(null);
  };

  const currentStep = result ? totalSteps : (started ? trail.length + 2 : 1);

  return (
    <ToolLayout title="Valvontamodin valintakompassi" currentStep={Math.min(currentStep, totalSteps)} totalSteps={totalSteps}>
      <p className="text-muted-foreground mb-8 text-sm italic">
        Olet päättänyt ottaa agentin käyttöön — mutta millä valvontatasolla? Kompassi ohjaa sinut oikeaan modiin neljän kysymyksen avulla. Vie noin 3 minuuttia.
      </p>

      <AnimatePresence mode="wait">
        {/* Step 0: Process name */}
        {!started && (
          <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-primary mb-4">Minkä prosessin tai tehtäväkokonaisuuden valvontamodia arvioit?</h2>
            <Input
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              placeholder='esim. "Asiakasviestien vastaaminen"'
              className="max-w-md mb-6"
            />
            <Button onClick={() => setStarted(true)} disabled={!processName.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Aloita arviointi <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Trail */}
        {started && !result && (
          <motion.div key={`q${currentQuestion}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {/* Previous answers trail */}
            {trail.length > 0 && (
              <div className="mb-6 space-y-2">
                {trail.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <div>
                      <span className="text-muted-foreground">{t.question}</span>
                      <span className="text-primary font-medium ml-2">→ {t.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Q1 */}
            {currentQuestion === 1 && (
              <QuestionCard
                question="Voiko agentin virhe aiheuttaa peruuttamattoman vahingon — taloudellisen, juridisen, maineellisen tai turvallisuuteen liittyvän?"
                options={[
                  { label: "Ei", action: () => addTrailAndNext("Peruuttamaton vahinko?", "Ei", 2) },
                  { label: "Kyllä", action: () => addTrailAndResult("Peruuttamaton vahinko?", "Kyllä", "Command") },
                ]}
              />
            )}

            {/* Q2 */}
            {currentQuestion === 2 && (
              <QuestionCard
                question="Onko prosessi säännelty tai vaatiiko se tiukan compliance-velvoitteen?"
                options={[
                  { label: "Ei", action: () => addTrailAndNext("Sääntely/compliance?", "Ei", 3) },
                  { label: "Kyllä", action: () => addTrailAndResult("Sääntely/compliance?", "Kyllä", "Approve") },
                ]}
              />
            )}

            {/* Q3 */}
            {currentQuestion === 3 && (
              <QuestionCard
                question="Kuinka nopeasti virhe pitää havaita?"
                options={[
                  {
                    label: "Viikon sisällä riittää",
                    action: () => { setQ3Path("fast"); addTrailAndNext("Virheen havaitseminen?", "Viikon sisällä", 4); },
                  },
                  {
                    label: "Saman päivän sisällä",
                    action: () => { setQ3Path("middle"); addTrailAndNext("Virheen havaitseminen?", "Saman päivän sisällä", 4); },
                  },
                  {
                    label: "Tunnin sisällä tai välittömästi",
                    action: () => { setQ3Path("strict"); addTrailAndNext("Virheen havaitseminen?", "Tunnin sisällä tai välittömästi", 4); },
                  },
                ]}
              />
            )}

            {/* Q4 */}
            {currentQuestion === 4 && (
              <QuestionCard
                question="Onko agentti osoittanut luotettavuutensa vastaavassa tehtävässä vähintään 3 kuukauden ajan?"
                options={[
                  { label: "Ei", action: () => addTrailAndResult("Agentti todistetusti luotettava?", "Ei", "Approve") },
                  { label: "Kyllä", action: () => addTrailAndNext("Agentti todistetusti luotettava?", "Kyllä", 5) },
                ]}
              />
            )}

            {/* Q5 */}
            {currentQuestion === 5 && (
              <QuestionCard
                question="Kuinka suuri on agentin volyymi — montako päätöstä tai toimenpidettä agentti tekee päivässä?"
                options={[
                  { label: "Alle 100 / päivä", action: () => addTrailAndResult("Agentin volyymi?", "Alle 100 / päivä", "Monitor") },
                  { label: "Yli 100 / päivä", action: () => addTrailAndResult("Agentin volyymi?", "Yli 100 / päivä", "Audit") },
                ]}
              />
            )}
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Trail */}
            <div className="mb-6 space-y-2">
              {trail.map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <div>
                    <span className="text-muted-foreground">{t.question}</span>
                    <span className="text-primary font-medium ml-2">→ {t.answer}</span>
                  </div>
                </div>
              ))}
            </div>

            <ResultCard mode={result} processName={processName} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
};

function QuestionCard({ question, options }: { question: string; options: { label: string; action: () => void }[] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-primary mb-6">{question}</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map((opt) => (
          <Button
            key={opt.label}
            onClick={opt.action}
            variant="outline"
            className="justify-start text-left hover:border-accent hover:text-accent transition-all"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ mode, processName, onReset }: { mode: Mode; processName: string; onReset: () => void }) {
  const config = modeConfig[mode];
  const Icon = config.icon;

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">{processName}</p>
        <h2 className="text-3xl font-extrabold text-accent mb-2">{mode}</h2>
        <p className="text-sm text-muted-foreground">
          HAR-taso: <span className="font-semibold text-primary">{config.har} agenttia per ihminen</span>
        </p>
      </div>

      <p className="text-sm text-muted-foreground mb-6 text-center max-w-lg mx-auto">
        {config.description}
      </p>

      {config.showWarning && (
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Muista: kun agentti toimii luotettavasti pitkään, ihmisvalvoja lakkaa oikeasti valvomasta. Auditoi säännöllisesti myös valvojan käyttäytymistä — ei vain agentin.
          </p>
        </div>
      )}

      <div className="text-center">
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-1" /> Aloita alusta
        </Button>
      </div>
    </div>
  );
}

export default Valvontakompassi;
