import { Input } from "@/components/ui/input";
import type { AssessmentData } from "../AssessmentWizard";

interface Props {
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
}

export function StepCosts({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Nykyinen resursointi</h2>
        <p className="text-sm text-muted-foreground">Näiden tietojen perusteella laskemme ROI-arvion.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Kuinka monta tuntia tehtävään kuluu viikossa yhteensä?
          </label>
          <Input
            type="number"
            min={1}
            value={data.weeklyHours}
            onChange={(e) => updateData({ weeklyHours: parseInt(e.target.value) || 0 })}
            className="max-w-[200px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Kuinka monen henkilön työpanosta tarvitaan?
          </label>
          <Input
            type="number"
            min={1}
            value={data.numberOfPeople}
            onChange={(e) => updateData({ numberOfPeople: parseInt(e.target.value) || 1 })}
            className="max-w-[200px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Arvioitu tuntikustannus per henkilö, sisältäen sivukulut (€)
          </label>
          <Input
            type="number"
            min={1}
            value={data.hourlyCost}
            onChange={(e) => updateData({ hourlyCost: parseInt(e.target.value) || 0 })}
            className="max-w-[200px]"
          />
        </div>
      </div>

      <div className="bg-background-muted border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Nykyiset viikkokustannukset: <strong className="text-foreground">{(data.weeklyHours * data.numberOfPeople * data.hourlyCost).toLocaleString("fi-FI")} €</strong>
        </p>
      </div>
    </div>
  );
}
