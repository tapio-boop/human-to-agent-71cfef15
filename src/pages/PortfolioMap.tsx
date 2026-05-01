import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { EmailCapture } from "@/components/tools/EmailCapture";
import { Plus, X, RotateCcw, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "har-portfolio-map";

interface ProcessEntry {
  id: string;
  name: string;
  repetitiveness: number; // 1-3
  standardizability: number; // 1-3
}

const repOptions = [
  { label: "Matala", value: 1, desc: "Harvoin toistuva, pieni volyymi" },
  { label: "Keskitaso", value: 2, desc: "Viikoittain, kohtalainen volyymi" },
  { label: "Korkea", value: 3, desc: "Päivittäin, suuri volyymi" },
];

const stdOptions = [
  { label: "Matala", value: 1, desc: "Vaatii paljon harkintaa" },
  { label: "Keskitaso", value: 2, desc: "Osittain strukturoitu" },
  { label: "Korkea", value: 3, desc: "Täysin sääntöpohjainen" },
];

const matrixLabels: Record<string, { label: string; color: string }> = {
  "3-3": { label: "Priorisoi — korkein potentiaali", color: "bg-accent text-accent-foreground" },
  "3-2": { label: "Korkea potentiaali", color: "bg-accent/80 text-accent-foreground" },
  "2-3": { label: "Korkea potentiaali", color: "bg-accent/80 text-accent-foreground" },
  "2-2": { label: "Kohtalainen potentiaali", color: "bg-secondary/20 text-secondary" },
  "3-1": { label: "Kohtalainen potentiaali", color: "bg-secondary/20 text-secondary" },
  "1-3": { label: "Kohtalainen potentiaali", color: "bg-secondary/20 text-secondary" },
  "1-2": { label: "Pidä ihmisellä — ei automatisointipotentiaalia", color: "bg-muted text-muted-foreground" },
  "2-1": { label: "Pidä ihmisellä — ei automatisointipotentiaalia", color: "bg-muted text-muted-foreground" },
  "1-1": { label: "Pidä ihmisellä — ei automatisointipotentiaalia", color: "bg-muted text-muted-foreground" },
};

function getCellKey(rep: number, std: number) {
  return `${rep}-${std}`;
}

export default function PortfolioMap() {
  const [step, setStep] = useState<"input" | "results">("input");
  const [processes, setProcesses] = useState<ProcessEntry[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProcesses(data.processes || []);
        setStep(data.step || "input");
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ processes, step }));
  }, [processes, step]);

  const addProcess = () => {
    if (!newName.trim() || processes.length >= 15) return;
    setProcesses([...processes, {
      id: crypto.randomUUID(),
      name: newName.trim(),
      repetitiveness: 2,
      standardizability: 2,
    }]);
    setNewName("");
  };

  const removeProcess = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const updateProcess = (id: string, field: "repetitiveness" | "standardizability", value: number) => {
    setProcesses(processes.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleReset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setProcesses([]);
    setStep("input");
    setNewName("");
  };

  const handleShowResults = () => {
    setStep("results");
    // Tulokset tallennetaan vasta kun käyttäjä lähettää ne sähköpostiinsa.
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      await supabase.from("tool_results").insert({
        tool_name: "portfoliokartta",
        email,
        answers: { processes: processes.map(p => ({ name: p.name, repetitiveness: p.repetitiveness, standardizability: p.standardizability })) },
        result: { priorityOrder: sortedByPriority.map(p => p.name) },
      });
    } catch (e) {
      console.error("Failed to save email results:", e);
    }
  };

  const sortedByPriority = [...processes].sort((a, b) => {
    const scoreA = a.repetitiveness + a.standardizability;
    const scoreB = b.repetitiveness + b.standardizability;
    return scoreB - scoreA;
  });

  return (
    <ToolLayout title="Portfoliokartta">
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Portfoliokartta</h2>
            <p className="text-muted-foreground mb-6">
              Kartoita toimintosi tärkeimmät prosessit kerralla. Lisää 3–15 prosessia ja arvioi niiden
              toistuvuus ja standardoitavuus. Näet visuaalisesti missä automatisointipotentiaali on suurin.
            </p>

            {/* Add process */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Prosessin nimi..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addProcess()}
                className="flex-1"
              />
              <Button onClick={addProcess} disabled={!newName.trim() || processes.length >= 15} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-4 h-4" />
                Lisää
              </Button>
            </div>

            {/* Process list */}
            {processes.length > 0 && (
              <div className="space-y-3 mb-8">
                {processes.map((p) => (
                  <div key={p.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-primary">{p.name}</span>
                      <button onClick={() => removeProcess(p.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Toistuvuus</p>
                        <div className="flex gap-1">
                          {repOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateProcess(p.id, "repetitiveness", opt.value)}
                              className={`flex-1 px-2 py-1.5 text-xs rounded-md border transition-colors ${
                                p.repetitiveness === opt.value
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border text-muted-foreground hover:border-muted-foreground/30"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Standardoitavuus</p>
                        <div className="flex gap-1">
                          {stdOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateProcess(p.id, "standardizability", opt.value)}
                              className={`flex-1 px-2 py-1.5 text-xs rounded-md border transition-colors ${
                                p.standardizability === opt.value
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border text-muted-foreground hover:border-muted-foreground/30"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-4">{processes.length}/15 prosessia</p>

            <Button
              onClick={handleShowResults}
              disabled={processes.length < 3}
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Näytä portfoliokartta
              <ArrowRight className="w-4 h-4" />
            </Button>
            {processes.length < 3 && processes.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">Lisää vähintään 3 prosessia</p>
            )}
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Portfoliokartta</h2>

            {/* 3x3 Matrix */}
            <div className="mb-8">
              <div className="flex items-end mb-2">
                <span className="text-xs text-muted-foreground w-24 text-right pr-2">Standardoitavuus ↑</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[3, 2, 1].map((std) =>
                  [1, 2, 3].map((rep) => {
                    const key = getCellKey(rep, std);
                    const cellInfo = matrixLabels[key];
                    const cellProcesses = processes.filter(
                      p => p.repetitiveness === rep && p.standardizability === std
                    );
                    return (
                      <div
                        key={key}
                        className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center text-center ${cellInfo.color} border border-border/50`}
                      >
                        {cellProcesses.length > 0 ? (
                          <div className="space-y-0.5">
                            {cellProcesses.map(p => (
                              <p key={p.id} className="text-[10px] md:text-xs font-medium leading-tight">{p.name}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[9px] opacity-50">{cellInfo.label}</p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex justify-center mt-2">
                <span className="text-xs text-muted-foreground">Toistuvuus →</span>
              </div>
            </div>

            {/* Priority List */}
            <div className="rounded-xl border border-border bg-card p-6 mb-8">
              <h3 className="text-lg font-semibold text-primary mb-4">Priorisoitu lista</h3>
              <div className="space-y-2">
                {sortedByPriority.map((p, i) => {
                  const key = getCellKey(p.repetitiveness, p.standardizability);
                  const cellInfo = matrixLabels[key];
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}.</span>
                      <span className="flex-1 text-sm font-medium text-primary">{p.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${cellInfo.color}`}>
                        {cellInfo.label.split("—")[0].trim()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <EmailCapture
              onSubmit={handleEmailSubmit}
              templateData={{
                toolName: "Portfoliokartta",
                resultLabel: "Priorisoitu lista",
                resultDescription: sortedByPriority.map((p, i) => `${i + 1}. ${p.name}`).join(", "),
              }}
            />

            <div className="mt-6 text-center flex gap-3 justify-center">
              <Button onClick={() => setStep("input")} variant="outline">
                Muokkaa prosesseja
              </Button>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Aloita alusta
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
}
