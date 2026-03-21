import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolLayoutProps {
  title: string;
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export function ToolLayout({ title, children, currentStep, totalSteps }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container-narrow py-4 flex items-center gap-4">
          <Link
            to="/tyokalut"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Työkalut
          </Link>
          <span className="text-border">/</span>
          <span className="text-sm font-medium text-primary">{title}</span>
        </div>
        {currentStep !== undefined && totalSteps !== undefined && (
          <div className="container-narrow pb-4">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="container-narrow py-8 md:py-12">
        {children}
      </div>
    </div>
  );
}
