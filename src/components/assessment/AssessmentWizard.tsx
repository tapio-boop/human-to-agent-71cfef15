import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepDescription } from "./steps/StepDescription";
import { StepFrequency } from "./steps/StepFrequency";
import { StepStandardization } from "./steps/StepStandardization";
import { StepSupervision } from "./steps/StepSupervision";
import { StepCosts } from "./steps/StepCosts";
import { AssessmentResult } from "./AssessmentResult";

export interface AssessmentData {
  // Step 0
  taskDescription: string;
  industry: string;
  // Step 1
  frequency: number; // 1-3
  repetitionsPerPeriod: number;
  killSwitchTriggered: boolean;
  continueDespiteKillSwitch: boolean;
  // Step 2
  standardization: number; // 1-3
  clearDataIO: string; // yes/partial/no
  exceptions: string; // rarely/sometimes/often
  // Step 3
  errorCost: string; // low/medium/high
  customerContact: boolean;
  confidentialData: boolean;
  humanJudgment: string; // much/some/little
  recommendedSupervision: number; // 1-5
  // Step 4
  weeklyHours: number;
  numberOfPeople: number;
  hourlyCost: number;
}

const initialData: AssessmentData = {
  taskDescription: "",
  industry: "myynti",
  frequency: 2,
  repetitionsPerPeriod: 5,
  killSwitchTriggered: false,
  continueDespiteKillSwitch: false,
  standardization: 2,
  clearDataIO: "yes",
  exceptions: "sometimes",
  errorCost: "medium",
  customerContact: false,
  confidentialData: false,
  humanJudgment: "some",
  recommendedSupervision: 3,
  weeklyHours: 10,
  numberOfPeople: 1,
  hourlyCost: 75,
};

const stepTitles = [
  "Tehtävän kuvaus",
  "Toistuvuus",
  "Standardoitavuus",
  "Valvonnan luonne",
  "Nykyiset kustannukset",
];

export function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(initialData);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = 5;

  const updateData = (partial: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setData(initialData);
    setStep(0);
    setShowResult(false);
  };

  if (showResult) {
    return <AssessmentResult data={data} onRestart={restart} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          {stepTitles.map((title, i) => (
            <span key={i} className={i === step ? "text-primary font-semibold" : ""}>
              {i + 1}. {title}
            </span>
          ))}
        </div>
        <Progress value={((step + 1) / totalSteps) * 100} className="h-2" />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-card border border-border rounded-xl p-6 md:p-8"
        >
          {step === 0 && <StepDescription data={data} updateData={updateData} />}
          {step === 1 && <StepFrequency data={data} updateData={updateData} onNext={next} onRestart={restart} />}
          {step === 2 && <StepStandardization data={data} updateData={updateData} />}
          {step === 3 && <StepSupervision data={data} updateData={updateData} />}
          {step === 4 && <StepCosts data={data} updateData={updateData} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!(step === 1 && data.killSwitchTriggered && !data.continueDespiteKillSwitch) && (
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Edellinen
          </Button>
          <Button onClick={next}>
            {step === totalSteps - 1 ? "Näytä tulokset" : "Seuraava"} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
