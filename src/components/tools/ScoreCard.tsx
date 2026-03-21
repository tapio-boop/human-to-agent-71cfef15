import { motion } from "framer-motion";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  ranges: { min: number; max: number; color: string; label: string }[];
}

export function ScoreCard({ title, score, maxScore, ranges }: ScoreCardProps) {
  const activeRange = ranges.find((r) => score >= r.min && score <= r.max);
  const colorMap: Record<string, string> = {
    red: "bg-destructive text-destructive-foreground",
    yellow: "bg-warning text-warning-foreground",
    green: "bg-success text-success-foreground",
    blue: "bg-secondary text-secondary-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-primary">{title}</h3>
        <span className="text-2xl font-bold text-primary">
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            activeRange ? colorMap[activeRange.color] || "bg-accent" : "bg-accent"
          }`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        />
      </div>
      {activeRange && (
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            colorMap[activeRange.color] || "bg-accent text-accent-foreground"
          }`}
        >
          {activeRange.label}
        </div>
      )}
    </motion.div>
  );
}
