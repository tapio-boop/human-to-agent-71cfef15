import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const authors = [
  {
    name: "Tapio Nissilä",
    role: "Kirjoittaja",
    background: "Yrittäjä, konsultti, tietokirjailija",
    linkedin: "https://linkedin.com/in/tapio-nissila",
  },
  {
    name: "Niklas Nordling",
    role: "Kirjoittaja",
    background: "PhD (Psykologia), yrittäjä, ex-Nokia",
    linkedin: "https://www.linkedin.com/in/niklas-nordling-8ba2224/",
  },
];

export function AuthorsSection() {
  return (
    <section className="py-12 bg-background-muted border-b border-border">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tighter mb-2">
            Kirjoittajat
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {authors.map((author, index) => (
            <motion.div
              key={author.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">
                  {author.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-1">
                {author.name}
              </h3>
              <p className="text-sm text-secondary font-medium mb-2">
                {author.role}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {author.background}
              </p>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
