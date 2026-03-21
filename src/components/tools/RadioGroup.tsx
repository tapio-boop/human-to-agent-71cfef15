import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  question: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  layout?: "horizontal" | "vertical";
}

export function RadioGroup({ question, options, value, onChange, layout = "horizontal" }: RadioGroupProps) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-primary mb-3">{question}</p>
      <div className={cn(
        "flex gap-2",
        layout === "vertical" ? "flex-col" : "flex-col sm:flex-row"
      )}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all text-left",
              value === option.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-card text-muted-foreground hover:border-primary/30"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
