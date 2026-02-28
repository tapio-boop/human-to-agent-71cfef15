import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, RotateCcw, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { AssessmentData } from "./AssessmentWizard";

const supervisionMeta: Record<number, {
  label: string;
  color: string;
  timeSaving: number;
  monthlyCost: number;
  implementationCost: number;
  humanRole: string;
  agentRole: string;
  description: string;
  humanTimePercent: string;
}> = {
  1: {
    label: "Audit",
    color: "#22c55e",
    timeSaving: 0.85,
    monthlyCost: 800,
    implementationCost: 5000,
    humanRole: "Laadunvarmistaja — tarkistaa tulokset satunnaisotannalla tai säännöllisillä auditoinneilla.",
    agentRole: "Suorittaja — hoitaa tehtävän itsenäisesti alusta loppuun.",
    description: "Agentti hoitaa tehtävän itsenäisesti alusta loppuun. Ihminen tarkistaa tulokset satunnaisotannalla tai säännöllisillä auditoinneilla.",
    humanTimePercent: "~5–10% nykyisestä",
  },
  2: {
    label: "Monitor",
    color: "#84cc16",
    timeSaving: 0.70,
    monthlyCost: 1200,
    implementationCost: 8000,
    humanRole: "Valvoja — seuraa dashboardilta ja puuttuu tarvittaessa.",
    agentRole: "Suorittaja — tekee työn, raportoi poikkeamat.",
    description: "Agentti suorittaa tehtävän, ihminen seuraa reaaliajassa dashboardilta ja puuttuu tarvittaessa.",
    humanTimePercent: "~15–25% nykyisestä",
  },
  3: {
    label: "Approve",
    color: "#eab308",
    timeSaving: 0.55,
    monthlyCost: 1500,
    implementationCost: 12000,
    humanRole: "Päättäjä — tarkistaa ja hyväksyy ennen toteutusta.",
    agentRole: "Valmistelija — tekee ehdotuksen, esittää vaihtoehdot.",
    description: "Agentti valmistelee ja esittää ehdotuksen, ihminen tarkistaa ja hyväksyy ennen toteutusta.",
    humanTimePercent: "~30–40% nykyisestä",
  },
  4: {
    label: "Collaborate",
    color: "#f97316",
    timeSaving: 0.35,
    monthlyCost: 2000,
    implementationCost: 18000,
    humanRole: "Ohjaaja — päättää, ohjaa ja viimeistelee.",
    agentRole: "Apupilotti — kerää tietoa, tekee luonnoksia, ehdottaa vaihtoehtoja.",
    description: "Agentti toimii apupilottina — kerää tietoa, tekee luonnoksia, ehdottaa vaihtoehtoja. Ihminen ohjaa, päättää ja viimeistelee.",
    humanTimePercent: "~50–70% nykyisestä",
  },
  5: {
    label: "Command",
    color: "#ef4444",
    timeSaving: 0.10,
    monthlyCost: 500,
    implementationCost: 3000,
    humanRole: "Suorittaja — ohjaa työtä suoraan, tekee päätökset.",
    agentRole: "Työkalu — haku, analyysi, muotoilu ihmisen pyynnöstä.",
    description: "Ihminen ohjaa työtä suoraan, agentti toimii älykäs työkaluna (haku, analyysi, muotoilu).",
    humanTimePercent: "~80–95% nykyisestä",
  },
};

const frequencyLabels: Record<number, string> = { 1: "Harvoin", 2: "Usein", 3: "Jatkuvasti" };
const standardizationLabels: Record<number, string> = { 1: "Matala", 2: "Keskimääräinen", 3: "Korkea" };

interface Props {
  data: AssessmentData;
  onRestart: () => void;
}

export function AssessmentResult({ data, onRestart }: Props) {
  const sup = data.recommendedSupervision;
  const meta = supervisionMeta[sup];

  // ROI calculation
  const weeklyCost = data.weeklyHours * data.numberOfPeople * data.hourlyCost;
  const cost6m = weeklyCost * 26;
  const cost12m = weeklyCost * 52;

  const newHumanCost6m = cost6m * (1 - meta.timeSaving);
  const newHumanCost12m = cost12m * (1 - meta.timeSaving);

  const agentCost6m = meta.monthlyCost * 6 + meta.implementationCost;
  const agentCost12m = meta.monthlyCost * 12 + meta.implementationCost;

  const totalNew6m = newHumanCost6m + agentCost6m;
  const totalNew12m = newHumanCost12m + agentCost12m;

  const netSaving6m = cost6m - totalNew6m;
  const netSaving12m = cost12m - totalNew12m;

  const roi6m = agentCost6m > 0 ? (netSaving6m / agentCost6m) * 100 : 0;
  const roi12m = agentCost12m > 0 ? (netSaving12m / agentCost12m) * 100 : 0;

  const monthlySaving = (weeklyCost * 4.33 * meta.timeSaving) - meta.monthlyCost;
  const paybackMonths = monthlySaving > 0 ? Math.ceil(meta.implementationCost / monthlySaving) : Infinity;

  const chartData = [
    { name: "6 kk", "Nykyiset kustannukset": Math.round(cost6m), "Uudet kustannukset": Math.round(totalNew6m) },
    { name: "12 kk", "Nykyiset kustannukset": Math.round(cost12m), "Uudet kustannukset": Math.round(totalNew12m) },
  ];

  const balancePercent = Math.round((1 - meta.timeSaving) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-primary mb-2">
          HAR 2.0 Assessment — Tulokset
        </h2>
        {data.taskDescription && (
          <p className="text-sm text-muted-foreground">"{data.taskDescription}"</p>
        )}
      </div>

      {data.killSwitchTriggered && data.continueDespiteKillSwitch && (
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <strong>Varoitus:</strong> Tämän tehtävän toistuvuus on matala, joten ROI voi olla negatiivinen.
          </p>
        </div>
      )}

      {/* A) HAR 2.0 Profile */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-primary mb-4">HAR 2.0 -profiili</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-background-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Toistuvuus</p>
            <p className="text-lg font-bold text-primary">{frequencyLabels[data.frequency]}</p>
          </div>
          <div className="text-center p-3 bg-background-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Standardoitavuus</p>
            <p className="text-lg font-bold text-primary">{standardizationLabels[data.standardization]}</p>
          </div>
          <div className="text-center p-3 bg-background-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Valvonta</p>
            <Badge className="text-sm px-3 py-1 mt-1" style={{ backgroundColor: meta.color, color: "#fff", border: "none" }}>
              {meta.label}
            </Badge>
          </div>
        </div>
      </div>

      {/* B) Cognitive Ergonomics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-primary mb-4">Kognitiivinen ergonomia — Yhteistyömalli</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Ihmisen rooli</p>
              <p className="text-sm text-foreground">{meta.humanRole}</p>
            </div>
            <div className="p-4 bg-background-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Agentin rooli</p>
              <p className="text-sm text-foreground">{meta.agentRole}</p>
            </div>
          </div>
          <div className="p-4 bg-background-muted rounded-lg">
            <p className="text-sm text-foreground mb-3">{meta.description}</p>
            <p className="text-xs text-muted-foreground mb-1">Ihmisen aika: <strong className="text-foreground">{meta.humanTimePercent}</strong></p>
          </div>

          {/* Balance bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Agentti</span>
              <span>Ihminen</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden flex">
              <div
                className="h-full rounded-l-full transition-all"
                style={{ width: `${100 - balancePercent}%`, backgroundColor: meta.color }}
              />
              <div
                className="h-full rounded-r-full bg-primary"
                style={{ width: `${balancePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="font-medium" style={{ color: meta.color }}>{100 - balancePercent}%</span>
              <span className="font-medium text-primary">{balancePercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* C) ROI */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-primary mb-4">ROI-laskelma</h3>

        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium"></th>
                <th className="text-right py-2 text-muted-foreground font-medium">6 kk</th>
                <th className="text-right py-2 text-muted-foreground font-medium">12 kk</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border">
                <td className="py-2">Nykyiset kustannukset</td>
                <td className="text-right py-2 font-medium">{Math.round(cost6m).toLocaleString("fi-FI")} €</td>
                <td className="text-right py-2 font-medium">{Math.round(cost12m).toLocaleString("fi-FI")} €</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Uudet kustannukset (yhteensä)</td>
                <td className="text-right py-2 font-medium">{Math.round(totalNew6m).toLocaleString("fi-FI")} €</td>
                <td className="text-right py-2 font-medium">{Math.round(totalNew12m).toLocaleString("fi-FI")} €</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Nettosäästö</td>
                <td className={`text-right py-2 font-bold ${netSaving6m >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {Math.round(netSaving6m).toLocaleString("fi-FI")} €
                </td>
                <td className={`text-right py-2 font-bold ${netSaving12m >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {Math.round(netSaving12m).toLocaleString("fi-FI")} €
                </td>
              </tr>
              <tr>
                <td className="py-2">ROI</td>
                <td className={`text-right py-2 font-bold ${roi6m >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {Math.round(roi6m)}%
                </td>
                <td className={`text-right py-2 font-bold ${roi12m >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {Math.round(roi12m)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => `${value.toLocaleString("fi-FI")} €`} />
              <Legend />
              <Bar dataKey="Nykyiset kustannukset" fill="hsl(223, 43%, 21%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Uudet kustannukset" fill={meta.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payback */}
        <div className="bg-background-muted border border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Takaisinmaksuaika</p>
          <p className="text-2xl font-extrabold text-primary">
            {paybackMonths === Infinity ? "Ei saavutettavissa" : `${paybackMonths} kk`}
          </p>
        </div>

        {roi12m < 0 && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mt-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Tämän tehtävän automatisoinnin ROI on haastava. Harkitse yhteistyömallia (Collaborate) tai pidä tehtävä ihmistyönä.
            </p>
          </div>
        )}
      </div>

      {/* D) CTA */}
      <div className="bg-card border border-border rounded-xl p-6 text-center space-y-4">
        <h3 className="text-lg font-bold text-primary">Mitä seuraavaksi?</h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
              <Calendar className="w-4 h-4 mr-2" />
              Varaa 30 min sparraus
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Arvioi toinen tehtävä
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
