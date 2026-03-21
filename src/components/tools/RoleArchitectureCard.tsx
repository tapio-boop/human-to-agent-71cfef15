import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { OversightMode, roleArchitectures, oversightModeLabels, getCapacityDescription, nextStepRecommendations } from "@/lib/har-tools-data";

interface RoleArchitectureCardProps {
  mode: OversightMode;
  processName?: string;
  hours?: string;
  showCapacity?: boolean;
  showNextStep?: boolean;
  whyText?: string;
}

export function RoleArchitectureCard({
  mode,
  processName,
  hours,
  showCapacity = false,
  showNextStep = false,
  whyText,
}: RoleArchitectureCardProps) {
  const arch = roleArchitectures[mode];
  const capacityDesc = showCapacity ? getCapacityDescription(mode, hours) : null;
  const showAutomationWarning = mode === "monitor" || mode === "audit";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Mode Header */}
      <div className="text-center">
        {processName && (
          <p className="text-sm text-muted-foreground mb-2">{processName}</p>
        )}
        <div className="inline-block px-6 py-3 rounded-2xl bg-primary text-primary-foreground">
          <span className="text-2xl md:text-3xl font-bold">{oversightModeLabels[mode]}</span>
        </div>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          {arch.collaborationModel}
        </p>
      </div>

      {/* Role Architecture */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Rooliarkitehtuuri</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-background-muted">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Ihmisen rooli</p>
            <p className="text-sm text-foreground font-medium">{arch.humanRole}</p>
          </div>
          <div className="p-4 rounded-lg bg-background-muted">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Agentin rooli</p>
            <p className="text-sm text-foreground font-medium">{arch.agentRole}</p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg border border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Yhteistyömalli</p>
          <p className="text-sm text-foreground">{arch.collaborationModel}</p>
        </div>
        <div className="mt-3 p-4 rounded-lg border border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Vastuu</p>
          <p className="text-sm text-foreground">{arch.responsibility}</p>
        </div>
      </div>

      {/* Why this mode */}
      {whyText && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Miksi tämä malli tälle prosessille</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{whyText}</p>
        </div>
      )}

      {/* Capacity Description */}
      {capacityDesc && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Kapasiteettikuvaus</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{capacityDesc}</p>
        </div>
      )}

      {/* Automation Bias Warning */}
      {showAutomationWarning && (
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            Muista: kun agentti toimii luotettavasti pitkään, valvonta voi muuttua nimelliseksi.
            Rakenna mekanismit, jotka pitävät ihmisen valvonnan aitona — esimerkiksi työkierto
            valvontatehtävissä ja pakollinen satunnaisotostarkistus.
          </p>
        </div>
      )}

      {/* Next Step */}
      {showNextStep && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Seuraava askel
          </h3>
          <p className="text-sm text-muted-foreground">{nextStepRecommendations[mode]}</p>
        </div>
      )}
    </motion.div>
  );
}
