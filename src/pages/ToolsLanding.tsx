import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Map, Compass, ArrowLeft } from "lucide-react";

const tools = [
  {
    icon: ClipboardCheck,
    title: "Prosessiarviointi",
    description: "Arvioi yksittäinen prosessi ja saat kuvauksen siitä, miten ihminen ja tekoälyagentti työskentelevät yhdessä — ja miten työn luonne muuttuu.",
    time: "~5 min",
    href: "/tyokalut/prosessiarviointi",
  },
  {
    icon: Map,
    title: "Portfoliokartta",
    description: "Kartoita toimintosi tärkeimmät prosessit kerralla. Näet visuaalisesti missä automatisointipotentiaali on suurin ja mistä kannattaa aloittaa.",
    time: "~10 min",
    href: "/tyokalut/portfoliokartta",
  },
  {
    icon: Compass,
    title: "Valvontakompassi",
    description: "Olet päättänyt ottaa agentin käyttöön — mutta millä valvontatasolla? Neljä kysymystä ohjaa sinut oikeaan yhteistyömalliin.",
    time: "~3 min",
    href: "/tyokalut/valvontakompassi",
  },
];

export default function ToolsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container-narrow py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Etusivu
          </Link>
        </div>
      </div>

      <div className="container-narrow py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">
            HAR-työkalut
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            HAR-työkalut auttavat tekemään selkeitä päätöksiä siitä, miten ihminen ja tekoälyagentti
            työskentelevät yhdessä. Tuloksena ei ole lukumäärä — vaan kuvaus yhteistyömallista ja
            siitä, miten työn luonne muuttuu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={tool.href}
                className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-accent/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{tool.time}</span>
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
