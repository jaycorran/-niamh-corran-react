import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cursor, Preloader } from "./components/Shared";
import Home from "./pages/Home";
import Physiotherapy from "./pages/Physiotherapy";
import Acupuncture from "./pages/Acupuncture";
import MeetNiamh from "./pages/MeetNiamh";
import Fees from "./pages/Fees";
import Faq from "./pages/Faq";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

/* Smooth scrolling via Lenis; resets to top on route change */
function useSmoothScroll(pathname) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const l = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = l;
    let raf;
    const loop = (t) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
};

function Page({ children, title }) {
  useEffect(() => {
    document.title = title ? `${title} | Niamh Corran — Physiotherapy & Acupuncture, Kinsale & Carrigaline` : "Niamh Corran — Physiotherapy & Acupuncture, Kinsale & Carrigaline";
  }, [title]);
  return (
    <motion.main id="main" variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll(location.pathname);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <AnimatePresence>{!loaded && <Preloader onDone={() => setLoaded(true)} />}</AnimatePresence>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/physiotherapy"
            element={
              <Page title="Physiotherapy">
                <Physiotherapy />
              </Page>
            }
          />
          <Route
            path="/acupuncture"
            element={
              <Page title="Acupuncture">
                <Acupuncture />
              </Page>
            }
          />
          <Route
            path="/meet-niamh"
            element={
              <Page title="Meet Niamh">
                <MeetNiamh />
              </Page>
            }
          />
          <Route
            path="/fees"
            element={
              <Page title="Fees">
                <Fees />
              </Page>
            }
          />
          <Route
            path="/faq"
            element={
              <Page title="FAQs">
                <Faq />
              </Page>
            }
          />
          <Route
            path="/booking"
            element={
              <Page title="Book an appointment">
                <Booking />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page title="Page not found">
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
