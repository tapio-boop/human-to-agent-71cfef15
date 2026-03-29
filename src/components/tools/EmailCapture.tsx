import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EmailCaptureProps {
  onSubmit?: (email: string) => void;
  templateData?: Record<string, any>;
}

export function EmailCapture({ onSubmit, templateData }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);

    try {
      // Save to DB
      onSubmit?.(email);

      // Send transactional email
      if (templateData) {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "tool-results",
            recipientEmail: email,
            idempotencyKey: `tool-results-${email}-${Date.now()}`,
            templateData,
          },
        });
      }
    } catch (e) {
      console.error("Failed to send email:", e);
    } finally {
      setSending(false);
      setSent(true);
    }
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
        <Button type="submit" disabled={sending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lähetä"}
        </Button>
      </form>
    </div>
  );
}
