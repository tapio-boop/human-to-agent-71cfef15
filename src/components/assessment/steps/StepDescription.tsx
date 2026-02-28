import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AssessmentData } from "../AssessmentWizard";

const industries = [
  { value: "myynti", label: "Myynti" },
  { value: "markkinointi", label: "Markkinointi" },
  { value: "asiakaspalvelu", label: "Asiakaspalvelu" },
  { value: "talous", label: "Talous" },
  { value: "hr", label: "HR" },
  { value: "it", label: "IT" },
  { value: "tuotanto", label: "Tuotanto" },
  { value: "muu", label: "Muu" },
];

interface Props {
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
}

export function StepDescription({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Tehtävän kuvaus</h2>
        <p className="text-sm text-muted-foreground">Kuvaile tehtävä tai prosessi, jota haluat arvioida.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Kuvaile tehtävä tai prosessi
          </label>
          <Textarea
            value={data.taskDescription}
            onChange={(e) => updateData({ taskDescription: e.target.value })}
            placeholder="Esim. Asiakaskyselyiden käsittely ja vastausten laatiminen..."
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Toimiala
          </label>
          <Select value={data.industry} onValueChange={(v) => updateData({ industry: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind.value} value={ind.value}>
                  {ind.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
