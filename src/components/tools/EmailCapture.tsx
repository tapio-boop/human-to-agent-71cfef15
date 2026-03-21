import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

interface EmailCaptureProps {
  onSubmit?: (email: string) => void;
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // For now, just simulate — backend will be added later
    onSubmit?.(email);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
          <Check className="w-6 h-6 text-accent" />
        </div>
        <p className="font-semibold text-primary">Tulokset lähetetty!</p>
        <p className="text-sm text-muted-foreground mt-1">Tarkista sähköpostisi.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5" />
        Lähetän tulokset sähköpostiisi
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
        <Input
          type="email"
          placeholder="sähköposti@yritys.fi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Lähetä
        </Button>
      </form>
    </div>
  );
}
