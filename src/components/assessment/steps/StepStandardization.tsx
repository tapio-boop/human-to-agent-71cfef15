import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AssessmentData } from "../AssessmentWizard";

interface Props {
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
}

export function StepStandardization({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Kuinka vakioitavissa prosessi on?</h2>
        <p className="text-sm text-muted-foreground">Standardoitavuus määrittää, voiko agentti toimia itsenäisesti vai tarvitseeko se ihmisen ohjausta.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Prosessin standardoitavuus</label>
          <RadioGroup value={String(data.standardization)} onValueChange={(v) => updateData({ standardization: parseInt(v) })} className="space-y-2">
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="1" id="std-1" className="mt-0.5" />
              <label htmlFor="std-1" className="text-sm cursor-pointer">
                <span className="font-medium">Matala</span>
                <span className="text-muted-foreground block">Joka kerta erilainen, vaatii luovuutta, empatiaa tai monimutkaista harkintaa</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="2" id="std-2" className="mt-0.5" />
              <label htmlFor="std-2" className="text-sm cursor-pointer">
                <span className="font-medium">Keskimääräinen</span>
                <span className="text-muted-foreground block">Perusrakenne sama, mutta vaatii tapauskohtaista soveltamista</span>
              </label>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="3" id="std-3" className="mt-0.5" />
              <label htmlFor="std-3" className="text-sm cursor-pointer">
                <span className="font-medium">Korkea</span>
                <span className="text-muted-foreground block">Selkeät säännöt, toistettavissa samalla tavalla joka kerta</span>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Onko prosessilla selkeä data-input ja -output?</label>
          <RadioGroup value={data.clearDataIO} onValueChange={(v) => updateData({ clearDataIO: v })} className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="yes" id="io-yes" />
              <label htmlFor="io-yes" className="text-sm cursor-pointer">Kyllä</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="partial" id="io-partial" />
              <label htmlFor="io-partial" className="text-sm cursor-pointer">Osittain</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="no" id="io-no" />
              <label htmlFor="io-no" className="text-sm cursor-pointer">Ei</label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Kuinka paljon poikkeuksia prosessissa tyypillisesti ilmenee?</label>
          <RadioGroup value={data.exceptions} onValueChange={(v) => updateData({ exceptions: v })} className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="rarely" id="ex-rarely" />
              <label htmlFor="ex-rarely" className="text-sm cursor-pointer">Harvoin</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="sometimes" id="ex-sometimes" />
              <label htmlFor="ex-sometimes" className="text-sm cursor-pointer">Joskus</label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="often" id="ex-often" />
              <label htmlFor="ex-often" className="text-sm cursor-pointer">Usein</label>
            </div>
          </RadioGroup>
        </div>

        {data.standardization === 1 && data.frequency >= 2 && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>Huom:</strong> Matala standardoitavuus yhdistettynä korkeaan toistuvuuteen ei tarkoita umpikujaa. Suosittelemme yhteistyömallia (Collaborate), jossa agentti toimii apupilottina.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
