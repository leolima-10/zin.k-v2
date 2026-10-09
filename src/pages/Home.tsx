import { motion } from "framer-motion";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Pricing } from "../sections/Pricing";
import { Portfolio } from "../sections/Portfolio";
import { Process } from "../sections/Process";
import { CtaBand } from "../sections/CtaBand";
import { Contact } from "../sections/Contact";
import { pageVariants } from "../lib/animations/variants";

export function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Portfolio />
      <Process />
      <CtaBand />
      <Contact />
    </motion.div>
  );
}