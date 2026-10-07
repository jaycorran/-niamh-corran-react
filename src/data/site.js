const locations = [
  {
    name: "Kinsale",
    line1: "Powerhouse Studio",
    line2: "The Old Brewery, Chairman's Lane",
    line3: "Townplots, Kinsale",
    line4: "Co. Cork, P17 DE00",
    mapsUrl: "https://maps.google.com/?q=Powerhouse+Studio+The+Old+Brewery+Kinsale",
  },
  {
    name: "Carrigaline",
    line1: "Head 2 Toe Chiropractic Clinic",
    line2: "Old Waterpark",
    line3: "Carrigaline Middle",
    line4: "Co. Cork, P43 RP79",
    mapsUrl: "https://maps.google.com/?q=Head+2+Toe+Chiropractic+Clinic+Old+Waterpark+Carrigaline",
  },
];

export const site = {
  name: "Niamh Corran",
  tagline: "Physiotherapy & Acupuncture",
  brandLine: "Restore balance. Support wellbeing. Naturally.",
  phone: "087 251 7767",
  phoneHref: "tel:+353872517767",
  email: "niamhcorran1@gmail.com",
  legalName: "Niamh Corran Physio Limited",
  registeredAddress: {
    line1: "Ballybogey",
    line2: "Nohoval",
    line3: "Co. Cork",
    line4: "Ireland",
  },
  locations,
  // Primary location kept as `address` for backward compatibility.
  address: locations[0],
  // dayIndex uses JS getDay(): 0 = Sunday
  hours: [
    { day: "Tuesday", dayIndex: 2, open: "8:00", close: "21:00", openH: 8, closeH: 21 },
    { day: "Wednesday", dayIndex: 3, open: "8:00", close: "21:00", openH: 8, closeH: 21 },
    { day: "Friday", dayIndex: 5, open: "8:00", close: "17:00", openH: 8, closeH: 17 },
  ],
  fees: [
    {
      name: "Initial treatment",
      price: 80,
      duration: "60 min",
      includes: ["Full assessment & history", "First treatment included", "Personalised treatment plan"],
    },
    {
      name: "Follow-up treatment",
      price: 65,
      duration: "40 min",
      includes: ["Focused, hands-on treatment", "Progress review", "Updated plan & aftercare"],
      featured: true,
    },
  ],
  insurers: ["VHI", "Laya", "Irish Life Health"],
  credentials: [
    "CORU Registered Physiotherapist",
    "ISCP Chartered Member",
    "BSc (Hons) Physiotherapy, Keele University",
    "Licentiate in Acupuncture (Distinction)",
    "20+ years' experience",
    "Fully insured",
  ],
};

export function formatCompactHours(hours = site.hours) {
  const grouped = hours.reduce((groups, hour) => {
    const previous = groups.at(-1);
    if (previous?.open === hour.open && previous.close === hour.close) {
      previous.days.push(hour.day.slice(0, 3));
      return groups;
    }
    return [...groups, { days: [hour.day.slice(0, 3)], open: hour.open, close: hour.close }];
  }, []);

  return grouped
    .map(({ days, open, close }) => `${days.join(" & ")} ${open.replace(":00", "")}–${close.replace(":00", "")}`)
    .join(" · ");
}

export function formatClosingHours(hours = site.hours) {
  const grouped = hours.reduce((groups, hour) => {
    const previous = groups.at(-1);
    if (previous?.close === hour.close) {
      previous.days.push(hour.day);
      return groups;
    }
    return [...groups, { days: [hour.day], close: hour.close }];
  }, []);
  const formatClose = (time) => {
    const hour = Number.parseInt(time, 10);
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
  };

  return grouped.map(({ days, close }) => `${days.join(" and ")} until ${formatClose(close)}`).join(", ");
}

export const nav = [
  { to: "/physiotherapy", label: "Physiotherapy", num: "01" },
  { to: "/acupuncture", label: "Acupuncture", num: "02" },
  { to: "/meet-niamh", label: "Meet Niamh", num: "03" },
  { to: "/fees", label: "Fees", num: "04" },
  { to: "/faq", label: "FAQs", num: "05" },
  { to: "/booking", label: "Book a visit", num: "06", cta: true },
];

/** Returns whether the clinic is open right now (Irish time approximated by the browser clock). */
export function openNow(date = new Date()) {
  const d = date.getDay();
  const h = date.getHours() + date.getMinutes() / 60;
  const today = site.hours.find((x) => x.dayIndex === d);
  if (!today) return { open: false, label: "Closed today" };
  if (h >= today.openH && h < today.closeH) return { open: true, label: `Open until ${today.close}` };
  if (h < today.openH) return { open: false, label: `Opens at ${today.open}` };
  return { open: false, label: "Closed for today" };
}

// Summarised treatment areas (the category headings) — used in the Home marquee.
export const physioAreas = [
  "Neck & back pain",
  "Muscle & joint pain",
  "Chronic pain",
  "Older Persons Rehab",
  "Post-operative rehab",
  "Neurological conditions",
];

export const acupunctureAreas = [
  "Stress & anxiety",
  "Sleep support",
  "Women's health",
  "Pain management",
  "Headaches & migraine",
  "Respiratory",
  "Other conditions",
];

// Detailed conditions treated, shown in full on the dedicated pages.
export const physioConditions = [
  "Low back pain & sciatica",
  "Neck pain",
  "Whiplash",
  "Prolapsed disc",
  "Upper & lower limb joint pain",
  "Post-surgery care",
  "Arthritis",
  "Osteoarthritis",
  "Rheumatoid arthritis",
  "Ankylosing spondylitis",
  "Frozen shoulder",
  "Falls & balance issues",
  "Fractures",
  "Poor mobility",
];

export const acupunctureConditions = [
  "Headaches & migraine",
  "Back, neck & pelvic pain",
  "Arthritic & joint pain",
  "Frozen shoulder",
  "Sciatica & nerve pain",
  "Sinus problems",
  "Menstrual problems",
  "Menopausal symptoms",
  "Fertility & pregnancy-related issues",
  "Incontinence",
  "Sleep problems",
  "Stress, low mood & anxiety",
  "Digestive complaints",
  "Bell's palsy",
  "IBS",
  "Dizziness",
  "Tonsillitis",
  "Cough, cold & sore throat",
  "Hayfever",
];
