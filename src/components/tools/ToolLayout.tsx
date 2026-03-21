import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ToolLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
}

export function ToolLayout({ children, currentStep, totalSteps, title }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-narrow">
          <Link
            to="/tyokalut"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Takaisin työkaluihin
          </Link>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-primary">{title}</h1>
              <span className="text-sm text-muted-foreground">
                Vaihe {currentStep} / {totalSteps}
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
