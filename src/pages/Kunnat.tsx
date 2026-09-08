import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PDF_URL = "/paatoskartta-tyopohja.pdf";

const groupSizes = [
  { value: "yksin", label: "Yksin" },
  { value: "2-4", label: "2–4" },
  { value: "5-9", label: "5–9" },
  { value: "10+", label: "10 tai enemmän" },
];

export default function Kunnat() {
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Päätöskartta – Tekoälyagenttivalmius kunnissa | HAR";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Työpohja kunnan prosessin päätösten listaamiseen. Tekoälyagenttivalmius kunnissa 6.11.2026, FCG ja Kuntaliitto."
    );
  }, []);

  const downloadPdf = () => {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "paatoskartta-tyopohja.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Tulos ensin: lataus käynnistyy heti.
    downloadPdf();
    setDone(true);

    try {
      await supabase.from("event_leads").insert({
        event_slug: "kunnat-2026-11-06",
        email,
        organization,
        group_size: groupSize,
        first_name: firstName || null,
      });
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "kunnat-tyopohja",
          recipientEmail: email,
          idempotencyKey: `kunnat-tyopohja-${email}-${Date.now()}`,
          templateData: { firstName, organization },
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-border bg-white px-3 py-3 text-base text-primary placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

  return (
    <main className="min-h-screen bg-white text-primary">
      <div className="mx-auto w-full max-w-2xl px-5 py-12 md:py-20">
        {/* 1. Yläosa */}
        <p className="text-sm text-muted-foreground">
          Tekoälyagenttivalmius kunnissa · FCG ja Kuntaliitto · 6.11.2026
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Kiitos, että tulitte
        </h1>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
          Puheenvuoro käsitteli sitä, että muutos ei kaadu tekniikkaan vaan epäselviin
          vastuisiin. Tältä sivulta löytyy se harjoitus, jonka voitte tehdä ensi viikolla.
        </p>

        {/* 2. Päätöskartta */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Ottakaa yksi prosessi ja listatkaa sen päätökset
          </h2>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <li className="border-l-2 border-accent pl-4">
              Ei tehtäviä eikä järjestelmiä — päätöksiä. Kohtia, joissa joku valitsee,
              hyväksyy tai hylkää.
            </li>
            <li className="border-l-2 border-accent pl-4">
              Tehkää se ryhmässä, 45 minuuttia. Erimielisyys on tulos, ei ongelma.
            </li>
            <li className="border-l-2 border-accent pl-4">
              Nimetkää jokaiselle päätökselle ihminen. Nimi, ei rooli.
            </li>
          </ul>
          <a
            href="#lataa"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-foreground"
          >
            Lataa työpohja (PDF)
          </a>
        </section>

        {/* 3. Latauslomake */}
        <section id="lataa" className="mt-16 scroll-mt-8 border-t border-border pt-10">
          {done ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Työpohja on ladattu</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Työpohja on sähköpostissasi. Jos teette sen ryhmässä, kuulisin mielelläni
                miten meni.
              </p>
              <button
                type="button"
                onClick={downloadPdf}
                className="mt-4 text-base font-medium text-secondary underline underline-offset-4"
              >
                Lataa uudelleen
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold tracking-tight">Lataa työpohja</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Lataus alkaa heti lähetyksen jälkeen, ja työpohja tulee myös sähköpostiin.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Sähköposti
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium">
                    Organisaatio
                  </label>
                  <input
                    id="organization"
                    type="text"
                    required
                    autoComplete="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <fieldset>
                  <legend className="text-sm font-medium">
                    Montako ihmistä aiotte tehdä tämän kanssa?
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {groupSizes.map((g) => (
                      <label
                        key={g.value}
                        className={`cursor-pointer rounded-md border px-3 py-3 text-center text-sm ${
                          groupSize === g.value
                            ? "border-secondary text-secondary font-medium"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        <input
                          type="radio"
                          name="groupSize"
                          value={g.value}
                          required
                          checked={groupSize === g.value}
                          onChange={() => setGroupSize(g.value)}
                          className="sr-only"
                        />
                        {g.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    Etunimi <span className="text-muted-foreground">(vapaaehtoinen)</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-foreground disabled:opacity-60 sm:w-auto"
                >
                  Lataa työpohja (PDF)
                </button>
              </form>
            </>
          )}
        </section>

        {/* 4. Valvontakompassi */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-lg font-semibold tracking-tight">Valvontakompassi</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Kolme minuuttia, neljä kysymystä: saat valvontatavan yhdelle päätökselle.
          </p>
          <Link
            to="/tyokalut/valvontakompassi"
            className="mt-3 inline-block text-base font-medium text-secondary underline underline-offset-4"
          >
            Avaa valvontakompassi
          </Link>
        </section>

        {/* 5. Kirja */}
        <section className="mt-14 border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ihmisten ja agenttien organisaatio, Tapio Nissilä ja Niklas Nordling,
            Professional Publishing Finland. Ilmestyi 6.11.2026.{" "}
            <Link to="/" className="text-secondary underline underline-offset-4">
              Lisätietoja
            </Link>
          </p>
        </section>

        {/* 6. Alaosa */}
        <footer className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Yhteydenotot:{" "}
            <a href="mailto:tapio@h2a.fi" className="text-secondary underline underline-offset-4">
              tapio@h2a.fi
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
