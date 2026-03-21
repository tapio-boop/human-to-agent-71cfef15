import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Plus, Trash2, RotateCcw, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Process {
  id: string;
  name: string;
  frequency: number | null; // 1-3
  standardization: number | null; // 1-3
}

const freqLabels = ["Harvoin", "Usein", "Jatkuvasti"];
const stdLabels = ["Matala", "Kohtalainen", "Korkea"];

const gridCells: Record<string, { label: string; className: string }> = {
  "3-1": { label: "Harkitse — redesign ensin", className: "bg-warning/15 border-warning/30" },
  "3-2": { label: "Automatisoi — Monitor/Audit", className: "bg-success/15 border-success/30" },
  "3-3": { label: "⭐ Automatisoi — korkea ROI", className: "bg-success/20 border-success/40" },
  "2-1": { label: "Collaborative tuki", className: "bg-secondary/15 border-secondary/30" },
  "2-2": { label: "Approve/Monitor", className: "bg-warning/15 border-warning/30" },
  "2-3": { label: "⭐ Hyvä kohde — Approve", className: "bg-success/15 border-success/30" },
  "1-1": { label: "Pysyy ihmisellä ✗", className: "bg-destructive/10 border-destructive/20" },
  "1-2": { label: "Collaborative tuki", className: "bg-secondary/15 border-secondary/30" },
  "1-3": { label: "Collaborative tuki", className: "bg-secondary/15 border-secondary/30" },
};

function createEmptyProcess(): Process {
  return { id: crypto.randomUUID(), name: "", frequency: null, standardization: null };
}

const Portfoliokartta = () => {
  const [step, setStep] = useState(0);
  const [processes, setProcesses] = useState<Process[]>([
    createEmptyProcess(),
    createEmptyProcess(),
    createEmptyProcess(),
  ]);

  const updateProcess = (id: string, field: keyof Process, value: string | number | null) => {
    setProcesses((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addProcess = () => {
    if (processes.length < 15) setProcesses((prev) => [...prev, createEmptyProcess()]);
  };

  const removeProcess = (id: string) => {
    if (processes.length > 3) setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const allComplete = processes.every((p) => p.name.trim() && p.frequency && p.standardization);
  const validProcesses = processes.filter((p) => p.name.trim() && p.frequency && p.standardization);

  const priorityList = [...validProcesses]
    .sort((a, b) => ((b.frequency || 0) + (b.standardization || 0)) - ((a.frequency || 0) + (a.standardization || 0)))
    .slice(0, 3);

  const reset = () => {
    setStep(0);
    setProcesses([createEmptyProcess(), createEmptyProcess(), createEmptyProcess()]);
  };

  return (
    <ToolLayout title="Portfoliokartta" currentStep={step + 1} totalSteps={2}>
      <p className="text-muted-foreground mb-8 text-sm italic">
        Kartoita toimintosi 8–15 tärkeintä prosessia kerralla. Saat visuaalisen matriisin, joka näyttää missä automatisointipotentiaali on suurin. Vie noin 10 minuuttia.
      </p>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="input" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary">Lisää prosessit</h2>
              <span className="text-sm text-muted-foreground">{processes.length} prosessia lisätty</span>
            </div>

            <div className="space-y-3 mb-6">
              {processes.map((proc, i) => (
                <div key={proc.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-muted-foreground w-6">{i + 1}.</span>
                    <Input
                      value={proc.name}
                      onChange={(e) => updateProcess(proc.id, "name", e.target.value)}
                      placeholder="Prosessin nimi"
                      className="flex-1"
                    />
                    {processes.length > 3 && (
                      <button onClick={() => removeProcess(proc.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 ml-8">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1.5">Toistuvuus</p>
                      <div className="flex gap-1.5">
                        {freqLabels.map((label, vi) => (
                          <button
                            key={vi}
                            onClick={() => updateProcess(proc.id, "frequency", vi + 1)}
                            className={cn(
                              "px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex-1",
                              proc.frequency === vi + 1
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-muted-foreground hover:border-primary/30"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1.5">Standardoitavuus</p>
                      <div className="flex gap-1.5">
                        {stdLabels.map((label, vi) => (
                          <button
                            key={vi}
                            onClick={() => updateProcess(proc.id, "standardization", vi + 1)}
                            className={cn(
                              "px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex-1",
                              proc.standardization === vi + 1
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-muted-foreground hover:border-primary/30"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {processes.length < 15 && (
              <Button variant="outline" onClick={addProcess} className="mb-6">
                <Plus className="w-4 h-4 mr-1" /> Lisää prosessi
              </Button>
            )}

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} disabled={!allComplete} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Näytä portfoliokartta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-lg font-bold text-primary mb-6">Portfoliomatriisi</h2>

            {/* 3x3 Grid */}
            <div className="overflow-x-auto mb-8">
              <div className="min-w-[600px]">
                {/* Header row */}
                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 mb-1">
                  <div />
                  {freqLabels.map((l) => (
                    <div key={l} className="text-center text-xs font-semibold text-muted-foreground py-2">{l}</div>
                  ))}
                </div>

                {/* Grid rows (standardization high to low) */}
                {[3, 2, 1].map((std) => (
                  <div key={std} className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 mb-1">
                    <div className="flex items-center text-xs font-semibold text-muted-foreground pr-2 justify-end">
                      {stdLabels[std - 1]}
                    </div>
                    {[1, 2, 3].map((freq) => {
                      const key = `${std}-${freq}`;
                      const cell = gridCells[key];
                      const cellProcesses = validProcesses.filter(
                        (p) => p.standardization === std && p.frequency === freq
                      );
                      return (
                        <div
                          key={key}
                          className={cn(
                            "border rounded-lg p-3 min-h-[80px]",
                            cell.className
                          )}
                        >
                          <p className="text-[10px] text-muted-foreground mb-2">{cell.label}</p>
                          <div className="flex flex-wrap gap-1">
                            {cellProcesses.map((p) => (
                              <span
                                key={p.id}
                                className="inline-block px-2 py-0.5 bg-primary text-primary-foreground rounded text-[11px] font-medium"
                              >
                                {p.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Axis labels */}
                <div className="grid grid-cols-[100px_1fr] gap-1 mt-2">
                  <div />
                  <p className="text-center text-xs text-muted-foreground font-medium">Toistuvuus →</p>
                </div>
              </div>
            </div>

            {/* Priority list */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Aloita näistä ensin
              </h3>
              <div className="space-y-3">
                {priorityList.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-primary text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Toistuvuus: {freqLabels[(p.frequency || 1) - 1]} · Standardoitavuus: {stdLabels[(p.standardization || 1) - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>Muokkaa prosesseja</Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" /> Aloita alusta
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
};

export default Portfoliokartta;
