import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MailX, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    const validate = async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`;
        const res = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        });
        const data = await res.json();
        if (res.ok && data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("error");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto text-muted-foreground animate-spin" />
            <p className="text-muted-foreground">Ladataan...</p>
          </>
        )}
        {status === "valid" && (
          <>
            <MailX className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-2xl font-bold text-primary">Peruuta sähköpostitilaus</h1>
            <p className="text-muted-foreground">
              Haluatko lopettaa sähköpostiviestien vastaanottamisen Human-to-Agent -palvelusta?
            </p>
            <Button
              onClick={handleUnsubscribe}
              disabled={submitting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Vahvista peruutus
            </Button>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
            <h1 className="text-2xl font-bold text-primary">Tilaus peruutettu</h1>
            <p className="text-muted-foreground">Et saa enää sähköposteja meiltä.</p>
          </>
        )}
        {status === "already" && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold text-primary">Tilaus on jo peruutettu</h1>
            <p className="text-muted-foreground">Olet jo peruuttanut sähköpostitilauksesi.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold text-primary">Virheellinen linkki</h1>
            <p className="text-muted-foreground">Tämä peruutuslinkki on virheellinen tai vanhentunut.</p>
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold text-primary">Jokin meni pieleen</h1>
            <p className="text-muted-foreground">Yritä myöhemmin uudelleen.</p>
          </>
        )}
      </div>
    </div>
  );
}
