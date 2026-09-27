import { AnimatePresence, MotionConfig } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollManager } from "./components/ScrollManager";
import { ScrollProgress } from "./components/ScrollProgress";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";
import { NotFound } from "./pages/NotFound";
import { pageTransition } from "./lib/animations/variants";

export function App() {
  const location = useLocation();

  return (
    <MotionConfig transition={pageTransition} reducedMotion="user">
      <>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-white"
        >
          pular para o conteúdo
        </a>
        <ScrollManager />
        <ScrollProgress />
        <Navbar />
        <main id="conteudo">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projetos/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </>
    </MotionConfig>
  );
}