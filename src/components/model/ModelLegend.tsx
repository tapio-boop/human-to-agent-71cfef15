import { motion } from "framer-motion";

const legendItems = [
  { color: "#22c55e", label: "Audit", desc: "Agentti toimii itsenäisesti" },
  { color: "#84cc16", label: "Monitor", desc: "Ihminen seuraa reaaliajassa" },
  { color: "#eab308", label: "Approve", desc: "Ihminen hyväksyy ennen toimintaa" },
  { color: "#f97316", label: "Collaborate", desc: "Ihminen ja agentti yhdessä" },
  { color: "#ef4444", label: "Command", desc: "Ihminen ohjaa suoraan" },
];

const sizeItems = [
  { size: "w-3 h-3", label: "Harvoin" },
  { size: "w-4 h-4", label: "Usein" },
  { size: "w-5 h-5", label: "Jatkuvasti" },
];

export function ModelLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-5 space-y-4"
    >
      <div>
        <h3 className="text-sm font-semibold text-primary mb-2">Värit — Valvontataso (Supervision Level)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <p className="text-xs font-medium text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-primary mb-2">Koko — Toistuvuus (Frequency)</h3>
        <div className="flex items-center gap-4">
          {sizeItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`${item.size} rounded-full bg-muted-foreground`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
