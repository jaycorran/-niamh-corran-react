import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero, CTA } from "../components/Shared";
import { Reveal, EASE } from "../components/Reveal";
import "./Faq.css";

const faqs = [
  {
    q: "Is acupuncture safe?",
    a: "Yes. At the clinic, acupuncture is carried out by a chartered physiotherapist with specific training and qualifications in the technique. The needles are sterile, single-use and safely disposed of after every treatment.",
  },
  {
    q: "Does it hurt?",
    a: "It isn't a painful treatment. The fine needles are usually inserted just a few millimetres and produce a mild sensation at most. You may notice a small scratch as a needle goes in, and it's usually pain-free on removal.",
  },
  {
    q: "Are there side effects?",
    a: "Side effects are few, though some people feel a little tired or relaxed afterwards. Niamh will talk through anything relevant to you before treatment begins.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, loose-fitting clothing is best, so Niamh can assess and treat the affected area easily. Please also bring a pair of shorts to every appointment.",
  },
  {
    q: "Can it be combined with physiotherapy?",
    a: "Absolutely. Chartered physiotherapists are university-qualified healthcare professionals, and acupuncture is studied at postgraduate level. That puts Niamh in a rare position: able to combine acupuncture with hands-on physiotherapy, exercise and relaxation techniques within a single, joined-up plan.",
  },
  {
    q: "Is it a replacement for medical advice?",
    a: "No. Acupuncture is a complementary therapy and is not a replacement for medical advice. If you're unsure whether it's right for you, get in touch and Niamh will be happy to talk it through.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={f.q}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {f.q}
              <span className="plus" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  return (
    <>
      <PageHero
        compact
        title={
          <>
            Good <em>questions</em>
          </>
        }
        lead="A few things people often ask before their first visit. If your question isn't here, just get in touch."
      />

      <section className="section">
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">Reassurance</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                Before your <em>first visit</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTA
        title={
          <>
            Still have <em>questions?</em>
          </>
        }
        sub="Get in touch and Niamh will be happy to help you decide what's right for you."
      />
    </>
  );
}
