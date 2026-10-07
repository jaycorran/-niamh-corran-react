import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal, EASE } from "../components/Reveal";
import { ClosingRoom, MarginNoteSection, TypographicPageHero } from "../components/Shared";
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
  const reduceMotion = useReducedMotion();

  return (
    <div className="consultation-notes">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const answerId = `faq-${index}`;
        return (
          <div className="consultation-note" key={faq.q}>
            <button
              className="consultation-question"
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span>{faq.q}</span>
              <span className="consultation-toggle" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  className="consultation-answer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }}
                >
                  <p>{faq.a}</p>
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
      <TypographicPageHero
        marginNote="Reassurance"
        eyebrow="FAQs"
        title={
          <>
            Good <em>questions</em>
          </>
        }
        lead="A few things people often ask before their first visit. If your question isn't here, just get in touch."
      />

      <MarginNoteSection as="section" note="Reassurance" className="faq-consultation">
        <Reveal>
          <h2>
            Before your <em>first visit</em>
          </h2>
          <FAQ />
        </Reveal>
      </MarginNoteSection>

      <ClosingRoom
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
