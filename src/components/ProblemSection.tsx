import { motion } from "framer-motion";
import { BarChart3, Wrench, Zap } from "lucide-react";

const problems = [
  {
    icon: BarChart3,
    title: "AI-strategiat eivät ole konkreettisia",
    description:
      "Jokaiselta yritykseltä löytyy AI-strategia. Se on ylätasolla, suuntaa-antava tahdonilmaus eikä mitenkään konkreettinen.",
  },
  {
    icon: Wrench,
    title: "Bolt-on ajattelu",
    description:
      "Tekoälyä liimataan vanhojen, rikkinäisten prosessien päälle. Tekoäly vahvistaa organisaation kaaosta ja virheitä, jos perusta ei ole kunnossa.",
  },
  {
    icon: Zap,
    title: "Ihminen menettää kontrollin",
    description:
      "Päätöksiä syntyy nopeammin kuin ihminen ehtii ymmärtää. Ihmisen kognitiivinen kapasiteetti ei riitä. Syntyy vastustusta ja epäluottamusta.",
  },
];

export function ProblemSection() {
  return (
    <section id="ongelma" className="section-padding bg-background-muted">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter mb-4">
            Ongelma
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Teknologia kehittyy päätä huimaavalla vauhdilla, mutta meiltä puuttuu 
            viitekehykset ja käsitteet sen johtamiselle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
