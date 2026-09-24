import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import harCoverImg from "@/assets/har-kirjankansi.png.asset.json";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--background-muted)),hsl(var(--background)))]" />

      <div className="container-narrow relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Authors */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-4"
            >
              Tapio Nissilä &amp; Niklas Nordling
            </motion.p>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-[1.05]">
              Ihmisten ja{" "}
              <span className="text-accent">agenttien</span>{" "}
              organisaatio
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Miten muotoilla toimintamalli? HAR tarjoaa kielen, mallit ja
              periaatteet ihmisten ja tekoälyagenttien muodostamien
              hybridijärjestelmien johtamiseen.
            </p>

            {/* Release info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex flex-col items-center lg:items-start gap-2"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-background-muted border border-border text-secondary text-sm font-medium">
                Kirja ilmestyy 6.11.2026
              </span>
              <span className="text-sm text-muted-foreground">
                Ennakkomyynti alkaa lähikuukausina.
              </span>
            </motion.div>
          </motion.div>

          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={harCoverImg.url}
              alt="Kirjan kansikuva: Ihmisten ja agenttien organisaatio — HAR, Human Agent Relationship. Don't Scale Chaos."
              className="w-64 sm:w-72 lg:w-full max-w-md rounded-lg shadow-xl shadow-primary/20"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 lg:mt-12 flex justify-center"
        >
          <a
            href="#ongelma"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Lue lisää</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
