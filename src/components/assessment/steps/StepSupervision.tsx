import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import type { AssessmentData } from "../AssessmentWizard";

interface Props {
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
}

const supervisionLabels: Record<number, { label: string; colorHsl: string }> = {
  1: { label: "Audit", colorHsl: "hsl(231, 43%, 55%)" },
  2: { label: "Monitor", colorHsl: "hsl(231, 43%, 55%)" },
  3: { label: "Approve", colorHsl: "hsl(291, 43%, 50%)" },
  4: { label: "Collaborate", colorHsl: "hsl(351, 76%, 61%)" },
  5: { label: "Command", colorHsl: "hsl(351, 76%, 45%)" },
};

function calculateSupervision(data: AssessmentData): number {
  const { errorCost, customerContact, confidentialData, humanJudgment } = data;

  if (errorCost === "high" && confidentialData && customerContact) return 5;
  if (errorCost === "high" || humanJudgment === "much") return 4;
  if (errorCost === "medium" || customerContact) return 3;
  if (errorCost === "low" && !customerContact && !confidentialData && humanJudgment === "little") return 1;
  return 2;
}

export function StepSupervision({ data, updateData }: Props) {
  useEffect(() => {
    const rec = calculateSupervision(data);
    if (rec !== data.recommendedSupervision) {
      updateData({ recommendedSupervision: rec });
    }
  }, [data.errorCost, data.customerContact, data.confidentialData, data.humanJudgment]);

  const rec = supervisionLabels[data.recommendedSupervision];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Mikä valvontataso vaaditaan?</h2>
        <p className="text-sm text-muted-foreground">Vastauksiesi perusteella suosittelemme sopivaa valvontatasoa.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Mikä on hyväksyttävä virheen hinta?</label>
          <RadioGroup value={data.errorCost} onValueChange={(v) => updateData({ errorCost: v })} className="space-y-2">
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="low" id="err-low" className="mt-0.5" />
              <label htmlFor="err-low" className="text-sm cursor-pointer">
                <span className="font-medium">Matala</span>
                <span className="text-muted-foreground block">Voidaan korjata helposti, ei merkittäviä seurauksia</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="medium" id="err-med" className="mt-0.5" />
              <label htmlFor="err-med" className="text-sm cursor-pointer">
                <span className="font-medium">Keskimääräinen</span>
                <span className="text-muted-foreground block">Vaatii korjausta, voi vaikuttaa asiakassuhteeseen</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="high" id="err-high" className="mt-0.5" />
              <label htmlFor="err-high" className="text-sm cursor-pointer">
                <span className="font-medium">Korkea</span>
                <span className="text-muted-foreground block">Virheet ovat kalliita, peruuttamattomia tai maineriski</span>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Liittyykö tehtävään suora asiakaskontakti?</label>
          <RadioGroup value={data.customerContact ? "yes" : "no"} onValueChange={(v) => updateData({ customerContact: v === "yes" })} className="flex gap-4">
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1">
              <RadioGroupItem value="yes" id="cc-yes" />
              <label htmlFor="cc-yes" className="text-sm cursor-pointer">Kyllä</label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1">
              <RadioGroupItem value="no" id="cc-no" />
              <label htmlFor="cc-no" className="text-sm cursor-pointer">Ei</label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Vaatiiko tehtävä luottamuksellisen tai säännellyn tiedon käsittelyä?</label>
          <RadioGroup value={data.confidentialData ? "yes" : "no"} onValueChange={(v) => updateData({ confidentialData: v === "yes" })} className="flex gap-4">
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1">
              <RadioGroupItem value="yes" id="cd-yes" />
              <label htmlFor="cd-yes" className="text-sm cursor-pointer">Kyllä</label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors flex-1">
              <RadioGroupItem value="no" id="cd-no" />
              <label htmlFor="cd-no" className="text-sm cursor-pointer">Ei</label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Tarvitaanko lopputuloksessa inhimillistä harkintaa tai luovuutta?</label>
          <RadioGroup value={data.humanJudgment} onValueChange={(v) => updateData({ humanJudgment: v })} className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="much" id="hj-much" />
              <label htmlFor="hj-much" className="text-sm cursor-pointer">Paljon</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="some" id="hj-some" />
              <label htmlFor="hj-some" className="text-sm cursor-pointer">Jonkin verran</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="little" id="hj-little" />
              <label htmlFor="hj-little" className="text-sm cursor-pointer">Ei juuri</label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-muted border border-border rounded-xl p-5">
        <p className="text-sm text-muted-foreground mb-2">Suositeltu valvontataso:</p>
        <div className="flex items-center gap-3">
          <Badge
            className="text-sm px-3 py-1"
            style={{ backgroundColor: rec.colorHsl, color: "#fff", border: "none" }}
          >
            {rec.label}
          </Badge>
          <span className="text-sm font-medium text-foreground">
            Taso {data.recommendedSupervision}/5
          </span>
        </div>
      </div>
    </div>
  );
}
