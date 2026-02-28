import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { motion } from "framer-motion";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <section className="section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-primary mb-4">
                HAR Assessment Tool
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Arvioi tehtäväsi tai prosessisi ja selvitä, miten ihmisen ja agentin yhteistyö kannattaa järjestää — ja mikä on ROI.
              </p>
            </motion.div>

            <AssessmentWizard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
