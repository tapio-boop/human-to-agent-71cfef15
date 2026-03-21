import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const tools = [
  {
    number: "01",
    name: "Prosessikohtainen HAR-arviointi",
    description: "Arvioi yksittäinen prosessi kolmella akselilla ja saa selkeä suositus automatisoinnista ja valvontatasosta.",
    time: "~5 min",
    path: "/tyokalut/prosessiarviointi",
  },
  {
    number: "02",
    name: "Portfoliokartta",
    description: "Kartoita toimintosi tärkeimmät prosessit ja näe visuaalisesti, missä automatisointipotentiaali on suurin.",
    time: "~10 min",
    path: "/tyokalut/portfoliokartta",
  },
  {
    number: "03",
    name: "Valvontamodin valintakompassi",
    description: "Olet päättänyt ottaa agentin käyttöön — kompassi ohjaa sinut oikeaan valvontatasoon.",
    time: "~3 min",
    path: "/tyokalut/valvontakompassi",
  },
];

const Tyokalut = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
              HAR-työkalut
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              HAR-työkalut auttavat sinua tekemään selkeitä päätöksiä siitä, missä prosesseissa
              tekoälyagentti kannattaa ottaa käyttöön, miten, ja millä valvontatasolla.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={tool.path}
                  className="group block h-full bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-sm font-bold text-accent mb-3 block">
                    {tool.number}
                  </span>
                  <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {tool.time}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                      Aloita <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tyokalut;
