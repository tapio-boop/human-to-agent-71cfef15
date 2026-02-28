import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ModelLegend } from "@/components/model/ModelLegend";
import { HARCube } from "@/components/model/HARCube";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ModelPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="container-narrow text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tighter text-primary mb-4"
            >
              HAR 2.0 — Interaktiivinen malli
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Kolme päätösulottuvuutta ratkaisevat, miten ihmisten ja agenttien työnjako muodostuu.
              Resursointi on <strong className="text-foreground">lopputulos</strong>, ei lähtökohta.
            </motion.p>
          </div>

          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="container-narrow"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden" style={{ height: isMobile ? 350 : 500 }}>
              <Canvas
                camera={{ position: [3, 2.5, 3], fov: 45 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[-3, 3, -3]} intensity={0.4} />
                <Suspense fallback={null}>
                  <HARCube />
                </Suspense>
                <OrbitControls
                  autoRotate
                  autoRotateSpeed={0.5}
                  enableZoom={true}
                  enablePan={false}
                  minDistance={2.5}
                  maxDistance={8}
                />
              </Canvas>
            </div>
          </motion.div>

          {/* Legend */}
          <div className="container-narrow mt-6">
            <ModelLegend />
          </div>

          {/* Explanation */}
          <div className="container-narrow mt-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-2">X: Toistuvuus</h3>
                <p className="text-sm text-muted-foreground mb-2">"Kannattaako tämä?"</p>
                <p className="text-sm text-foreground">
                  Liiketoiminnallisen oikeutuksen ja ROI:n akseli. Mitä useammin tehtävä toistuu, sitä nopeammin agentti-investointi maksaa itsensä takaisin.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Y: Standardoitavuus</h3>
                <p className="text-sm text-muted-foreground mb-2">"Voiko tämän tehdä luotettavasti?"</p>
                <p className="text-sm text-foreground">
                  Teknologisen toteutettavuuden akseli. Korkea standardoitavuus mahdollistaa täysautomaation — matala ei tarkoita umpikujaa, vaan yhteistyömallia.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Z: Valvonta</h3>
                <p className="text-sm text-muted-foreground mb-2">"Kuka kantaa vastuun?"</p>
                <p className="text-sm text-foreground">
                  Mallin inhimillisin ulottuvuus. Viisiportainen asteikko Auditista Commandiin määrittää, miten paljon ihminen on mukana prosessissa.
                </p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-extrabold tracking-tighter text-primary mb-6"
            >
              Mitä malli paljastaa?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-background-muted border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-primary mb-3">📊 Resursointi lopputuloksena</h3>
                <div className="space-y-2 text-sm text-foreground">
                  <p>
                    <strong>Korkea toistuvuus + standardoitavuus + Audit-valvonta</strong> → suuri agenttiresurssi, minimaalinen ihmisresurssi.
                  </p>
                  <p>
                    <strong>Korkea toistuvuus + matala standardoitavuus</strong> → yhteistyömalli, ei umpikuja. Agentti apupilottina, ihminen ohjaa.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-background-muted border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-primary mb-3">🧠 Kognitiivinen ergonomia</h3>
                <div className="space-y-2 text-sm text-foreground">
                  <p>
                    Malli osoittaa, missä agentit <strong>keventävät kognitiivista kuormaa</strong> — ja missä ihmisen ajattelu on korvaamatonta.
                  </p>
                  <p>
                    Audit-tasolla agentti vapauttaa ihmisen rutiineista. Command-tasolla ihminen käyttää syvää asiantuntemustaan, agentti toimii muistina ja tiedonkerääjänä.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-background-muted border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-primary mb-3">🎯 Johtaminen</h3>
                <div className="space-y-2 text-sm text-foreground">
                  <p>
                    Valvonta-akseli on samalla <strong>johtamisen akseli</strong>. Se vastaa kysymykseen: miten johdan työtä, jossa osa tekijöistä on agentteja?
                  </p>
                  <p>
                    Audit = delegointi ja laadunvarmistus. Collaborate = tiimityö agentin kanssa. Command = strateginen päätöksenteko, jossa agentti on tukifunktio.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-background-muted border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-primary mb-3">👤 Ihmisen rooli</h3>
                <div className="space-y-2 text-sm text-foreground">
                  <p>
                    Malli tekee näkyväksi, ettei ihminen katoa — <strong>rooli muuttuu</strong>. Kuution eri osissa ihminen on eri asiassa:
                  </p>
                  <p>
                    <strong>Laadunvarmistaja</strong> (Audit), <strong>valmentaja</strong> (Monitor), <strong>portinvartija</strong> (Approve), <strong>tiimikaveri</strong> (Collaborate) tai <strong>päätöksentekijä</strong> (Command).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
