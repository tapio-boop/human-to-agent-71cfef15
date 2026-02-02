import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Linkedin, Calendar, FileText, Users, Handshake } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ctaCards = [
  {
    icon: FileText,
    title: "Case-esimerkit",
    description: "Onko organisaatiossanne kokemusta ihmisten ja tekoälyagenttien yhteistyöstä? Haluamme kuulla tarinasi.",
  },
  {
    icon: Users,
    title: "Haastattelut",
    description: "Etsimme johtajia ja asiantuntijoita, jotka haluavat jakaa näkemyksiään hybridijärjestelmien johtamisesta.",
  },
  {
    icon: Handshake,
    title: "Yhteistyö",
    description: "Oletko kiinnostunut viitekehyksen kehittämisestä tai sen soveltamisesta omassa organisaatiossasi?",
  },
];

const contactLinks = [
  {
    icon: Mail,
    label: "Sähköposti (Tapio)",
    value: "tapio@leansalesmethod.com",
    href: "mailto:tapio@leansalesmethod.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn (Tapio)",
    value: "linkedin.com/in/tapio-nissila",
    href: "https://linkedin.com/in/tapio-nissila",
  },
  {
    icon: Linkedin,
    label: "LinkedIn (Niklas)",
    value: "linkedin.com/in/niklas-nordling",
    href: "https://www.linkedin.com/in/niklas-nordling-8ba2224/",
  },
  {
    icon: Calendar,
    label: "Calendly",
    value: "Varaa aika keskusteluun",
    href: "https://calendly.com/tapio-nissila",
  },
];

export function ParticipateSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Viesti lähetetty!",
        description: "Kiitos yhteydenotostasi. Palaamme asiaan pian.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="osallistu" className="section-padding bg-primary">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tighter mb-4">
            Tule mukaan rakentamaan HAR-viitekehystä
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            HAR on avoin kirjaprojekti. Etsimme case-esimerkkejä, haastateltavia ja yhteistyökumppaneita.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl p-6 border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm"
            >
              <card.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Form and Contact */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Ota yhteyttä</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Nimi *"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Sähköposti *"
                    required
                    className="bg-background"
                  />
                </div>
              </div>
              <div>
                <Input
                  placeholder="Organisaatio"
                  className="bg-background"
                />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Kiinnostuksen kohde" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case">Haluan jakaa case-esimerkin</SelectItem>
                    <SelectItem value="interview">Olen kiinnostunut haastattelusta</SelectItem>
                    <SelectItem value="collaboration">Haluan keskustella yhteistyöstä</SelectItem>
                    <SelectItem value="other">Muu aihe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Viesti"
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isSubmitting ? "Lähetetään..." : "Lähetä viesti"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h3 className="text-xl font-semibold text-primary-foreground mb-2">
              Tai ota yhteyttä suoraan
            </h3>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-primary-foreground font-medium group-hover:text-accent transition-colors">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
