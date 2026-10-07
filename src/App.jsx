import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileActionBar } from "./components/MobileActionBar";
import { useNoOrphans } from "./components/useNoOrphans";
import { site } from "./data/site";
import { buildJsonLd, setPageSeo } from "./seo";
import Home from "./pages/Home";
import Physiotherapy from "./pages/Physiotherapy";
import Acupuncture from "./pages/Acupuncture";
import MeetNiamh from "./pages/MeetNiamh";
import Fees from "./pages/Fees";
import Faq from "./pages/Faq";
import Booking from "./pages/Booking";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

// Dev-only internal poster tool. The dynamic import() lives INSIDE the
// `import.meta.env.DEV` guard, so in production Vite inlines DEV as `false`,
// Rollup never sees the import() specifier, and no Poster chunk/asset is
// emitted into dist/. Guarding only the *usage* of a top-level import() is not
// enough — Rollup emits a chunk for every import() it can see — so the call
// itself must be in the dead branch.
const Poster = import.meta.env.DEV ? lazy(() => import("./pages/Poster.jsx")) : null;
// Dev-only business-card designer, gated exactly like the poster.
const BusinessCard = import.meta.env.DEV
  ? lazy(() => import("./pages/BusinessCard.jsx"))
  : null;

const SITE_TITLE_SUFFIX = "Niamh Corran — Physiotherapy & Acupuncture, Kinsale & Carrigaline";
const jsonLd = buildJsonLd(site);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
};

function Page({ children, title, description }) {
  useEffect(() => {
    setPageSeo({
      title: title ? `${title} | ${SITE_TITLE_SUFFIX}` : SITE_TITLE_SUFFIX,
      description: description || site.brandLine,
      jsonLd,
    });
  }, [title, description]);
  return (
    <motion.main id="main" variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  // The dev-only /poster and /card routes are static pages: none of the
  // Header/Footer chrome, rendered on their own, above everything else.
  const DevTool = import.meta.env.DEV
    ? { "/poster": Poster, "/card": BusinessCard }[location.pathname]
    : null;
  const isDevTool = Boolean(DevTool);

  useNoOrphans(!isDevTool);

  // Native scroll only (no Lenis); reset to top on every route change.
  useEffect(() => {
    if (isDevTool) return;
    window.scrollTo(0, 0);
  }, [location.pathname, isDevTool]);

  if (isDevTool) {
    return (
      <Suspense fallback={null}>
        <DevTool />
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page description={site.brandLine}>
                <Home />
              </Page>
            }
          />
          <Route
            path="/physiotherapy"
            element={
              <Page
                title="Physiotherapy"
                description="Expert, hands-on care to relieve pain, restore movement and get you back to doing what you love, with a plan built around your goals."
              >
                <Physiotherapy />
              </Page>
            }
          />
          <Route
            path="/acupuncture"
            element={
              <Page
                title="Acupuncture"
                description="A gentle, natural therapy that supports the body's own ability to heal, ease pain and restore balance."
              >
                <Acupuncture />
              </Page>
            }
          />
          <Route
            path="/meet-niamh"
            element={
              <Page
                title="Meet Niamh"
                description="Chartered physiotherapist with over 20 years' experience and a qualified acupuncturist, bringing both disciplines together with warmth and genuine care."
              >
                <MeetNiamh />
              </Page>
            }
          />
          <Route
            path="/fees"
            element={
              <Page
                title="Fees"
                description="Every session includes time to talk, treat and plan, and receipts are provided for private health insurance."
              >
                <Fees />
              </Page>
            }
          />
          <Route
            path="/faq"
            element={
              <Page
                title="FAQs"
                description="A few things people often ask before their first visit. If your question isn't here, just get in touch."
              >
                <Faq />
              </Page>
            }
          />
          <Route
            path="/booking"
            element={
              <Page
                title="Book an appointment"
                description="Get in touch by email or phone and Niamh will get back to you within one working day to arrange a time."
              >
                <Booking />
              </Page>
            }
          />
          <Route
            path="/privacy"
            element={
              <Page title="Privacy Policy">
                <Privacy />
              </Page>
            }
          />
          <Route
            path="/cookies"
            element={
              <Page title="Cookie Policy">
                <Cookies />
              </Page>
            }
          />
          <Route
            path="/terms"
            element={
              <Page title="Terms & Disclaimer">
                <Terms />
              </Page>
            }
          />
          <Route
            path="/accessibility"
            element={
              <Page title="Accessibility">
                <Accessibility />
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
      <MobileActionBar />
    </>
  );
}
