import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AssessmentData } from "../AssessmentWizard";

interface Props {
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
  onRestart: () => void;
}

export function StepFrequency({ data, updateData, onNext, onRestart }: Props) {
  const handleFrequencyChange = (value: string) => {
    const freq = parseInt(value);
    const triggered = freq === 1;
    updateData({ frequency: freq, killSwitchTriggered: triggered, continueDespiteKillSwitch: false });
  };

  const showKillSwitch = data.killSwitchTriggered && !data.continueDespiteKillSwitch;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Kannattaako agentti tähän tehtävään?</h2>
        <p className="text-sm text-muted-foreground">Toistuvuus on tärkein tekijä ROI:n kannalta.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Kuinka usein tämä tehtävä toistuu?
          </label>
          <RadioGroup value={String(data.frequency)} onValueChange={handleFrequencyChange} className="space-y-2">
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="1" id="freq-1" className="mt-0.5" />
              <label htmlFor="freq-1" className="text-sm cursor-pointer flex-1">
                <span className="font-medium">Harvoin</span>
                <span className="text-muted-foreground block">Muutaman kerran kuukaudessa tai harvemmin</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="2" id="freq-2" className="mt-0.5" />
              <label htmlFor="freq-2" className="text-sm cursor-pointer flex-1">
                <span className="font-medium">Viikoittain</span>
                <span className="text-muted-foreground block">Useita kertoja viikossa</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="3" id="freq-3" className="mt-0.5" />
              <label htmlFor="freq-3" className="text-sm cursor-pointer flex-1">
                <span className="font-medium">Päivittäin tai useammin</span>
                <span className="text-muted-foreground block">Jatkuvasti toistuva, usein päivän aikana</span>
              </label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {showKillSwitch && (
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">ROI-varoitus</p>
              <p className="text-sm text-muted-foreground mt-1">
                Harvoin toistuvan tehtävän automatisoinnin takaisinmaksuaika on tyypillisesti pitkä. Agentti voi silti parantaa työn laatua ja vapauttaa aikaa muihin tehtäviin.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateData({ continueDespiteKillSwitch: true })}
            >
              Jatka silti →
            </Button>
            <Button size="sm" onClick={onRestart}>
              Arvioi toinen tehtävä →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
