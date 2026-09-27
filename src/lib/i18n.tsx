import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "mr" | "hi" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
];

type Service = { title: string; desc: string };
type EventItem = { tag: string; title: string };
type Post = { tag: string; title: string; excerpt: string; date: string };

export type Dict = {
  brand: string;
  tagline: string;
  nav: { home: string; gallery: string; blog: string; book: string };
  bookNow: string;
  hero: {
    badge: string;
    titleA: string;
    titleAccent: string;
    titleB: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    nextUp: string;
    nextUpName: string;
    nextUpMeta: string;
    heroAlt: string;
  };
  quick: {
    type: string;
    typeValue: string;
    date: string;
    dateValue: string;
    guests: string;
    guestsValue: string;
    cta: string;
    note: string;
  };
  servicesTitle: string;
  services: Service[];
  eventsTitle: string;
  eventsAccent: string;
  seeAll: string;
  events: EventItem[];
  blogTitle: string;
  blogAccent: string;
  posts: Post[];
  form: {
    title: string;
    body: string;
    name: string;
    phone: string;
    date: string;
    type: string;
    guests: string;
    message: string;
    submit: string;
    success: string;
  };
  galleryPage: { title: string; body: string };
  blogPage: { title: string; body: string; read: string };
  footerContact: string;
  rights: string;
};

const mr: Dict = {
  brand: "सारथी इव्हेंट्स ॲन्ड सेलिब्रेशन्स",
  tagline: "कर्तव्यदक्षांच्या कुटुंबाचा, हक्काचा विरंगुळा!",
  nav: { home: "मुख्यपृष्ठ", gallery: "गॅलरी", blog: "ब्लॉग", book: "बुकिंग" },
  bookNow: "आता बुक करा",
  hero: {
    badge: "मराठमोळ्या सोहळ्यांचे तज्ज्ञ",
    titleA: "आनंदाचा क्षण,",
    titleAccent: "मनापासून",
    titleB: "साजरा.",
    body: "लग्न, वाढदिवस, विभागीय समारंभ आणि सांस्कृतिक कार्यक्रम — प्रत्येक क्षणाचं नेटकं, उबदार नियोजन.",
    ctaPrimary: "कार्यक्रम बुक करा",
    ctaSecondary: "गॅलरी पहा",
    stat1: "४५०+",
    stat1Label: "पार पडलेले सोहळे",
    stat2: "१२",
    stat2Label: "वर्षांचा विश्वास",
    nextUp: "पुढील सोहळा",
    nextUpName: "सावंत–देशमुख विवाह",
    nextUpMeta: "२४ नोव्हेंबर · पुणे",
    heroAlt: "झेंडूच्या माळा व दिव्यांनी सजलेला मराठी विवाह सोहळा",
  },
  quick: {
    type: "कार्यक्रमाचा प्रकार",
    typeValue: "विवाह",
    date: "दिनांक",
    dateValue: "२४ नोव्हेंबर २०२६",
    guests: "पाहुणे",
    guestsValue: "१८०",
    cta: "उपलब्धता तपासा →",
    note: "२ तासांत उत्तर · स्थळ पाहणी मोफत",
  },
  servicesTitle: "आमच्या सेवा",
  services: [
    { title: "विवाह सोहळे", desc: "पारंपरिक मराठमोळ्या विधींसह संपूर्ण नियोजन." },
    { title: "वाढदिवस", desc: "लहानग्यांपासून सहस्रचंद्रदर्शनापर्यंत." },
    { title: "विभागीय समारंभ", desc: "खात्यांसाठी शिस्तबद्ध, वेळेत पार पडणारे कार्यक्रम." },
    { title: "सांस्कृतिक कार्यक्रम", desc: "गणेशोत्सव, दिवाळी व वार्षिक मेळावे." },
  ],
  eventsTitle: "अलीकडील",
  eventsAccent: "आयोजने",
  seeAll: "सर्व पहा →",
  events: [
    { tag: "संगीत", title: "कुलकर्णी संगीत, नाशिक" },
    { tag: "वाढदिवस", title: "आरोहीचा ५वा वाढदिवस, पुणे" },
    { tag: "विभागीय", title: "वार्षिक स्नेहसंमेलन, मुंबई" },
  ],
  blogTitle: "आमचा",
  blogAccent: "ब्लॉग",
  posts: [
    {
      tag: "मार्गदर्शन",
      date: "१२ फेब्रुवारी",
      title: "मराठी लग्नाचं नियोजन: संपूर्ण यादी",
      excerpt: "हळदीच्या वेळेपासून मांडव सजावटीपर्यंत — कुटुंब निवांत ठेवणारी यादी.",
    },
    {
      tag: "कल",
      date: "२८ जानेवारी",
      title: "यंदा गाजणाऱ्या पाच सजावट संकल्पना",
      excerpt: "झेंडू मिनिमलिझम, रत्नरंग आणि अंगणातील सोहळ्यांचं पुनरागमन.",
    },
    {
      tag: "अनुभव",
      date: "१० जानेवारी",
      title: "पहाटेपर्यंत रंगलेलं एक संगीत",
      excerpt: "नाशिकच्या छोट्या हॉलचं २०० जणांच्या डान्स फ्लोअरमध्ये रूपांतर.",
    },
  ],
  form: {
    title: "आपल्या सोहळ्याचं नियोजन सुरू करूया",
    body: "चौकशी भरा — आमचा समन्वयक २४ तासांत आपल्याशी संपर्क करेल.",
    name: "आपलं नाव",
    phone: "मोबाईल क्रमांक",
    date: "कार्यक्रमाचा दिनांक",
    type: "कार्यक्रमाचा प्रकार",
    guests: "अंदाजे पाहुणे",
    message: "कार्यक्रमाविषयी थोडक्यात",
    submit: "चौकशी पाठवा",
    success: "धन्यवाद! आम्ही लवकरच संपर्क करू.",
  },
  galleryPage: {
    title: "अलीकडील आयोजनांची झलक",
    body: "आमच्या टीमने साकारलेल्या काही आठवणी.",
  },
  blogPage: {
    title: "ब्लॉग व मार्गदर्शन",
    body: "सोहळ्यांचं नियोजन सोपं करणारे लेख.",
    read: "वाचा →",
  },
  footerContact: "संपर्क",
  rights: "सर्व हक्क राखीव.",
};

const hi: Dict = {
  brand: "सारथी इवेंट्स एंड सेलिब्रेशन्स",
  tagline: "कर्तव्यनिष्ठ परिवारों का, अपना हक़ का उत्सव!",
  nav: { home: "होम", gallery: "गैलरी", blog: "ब्लॉग", book: "बुकिंग" },
  bookNow: "अभी बुक करें",
  hero: {
    badge: "समारोह आयोजन विशेषज्ञ",
    titleA: "हर पल,",
    titleAccent: "दिल से",
    titleB: "सजाया।",
    body: "शादी, जन्मदिन, विभागीय समारोह और सांस्कृतिक कार्यक्रम — हर आयोजन का गर्मजोशी भरा नियोजन।",
    ctaPrimary: "कार्यक्रम बुक करें",
    ctaSecondary: "गैलरी देखें",
    stat1: "450+",
    stat1Label: "सफल आयोजन",
    stat2: "12",
    stat2Label: "वर्षों का भरोसा",
    nextUp: "अगला आयोजन",
    nextUpName: "सावंत–देशमुख विवाह",
    nextUpMeta: "24 नवंबर · पुणे",
    heroAlt: "गेंदे की मालाओं और रोशनी से सजा विवाह समारोह",
  },
  quick: {
    type: "आयोजन का प्रकार",
    typeValue: "विवाह",
    date: "तारीख",
    dateValue: "24 नवंबर 2026",
    guests: "मेहमान",
    guestsValue: "180",
    cta: "उपलब्धता देखें →",
    note: "2 घंटे में जवाब · स्थल भ्रमण निःशुल्क",
  },
  servicesTitle: "हमारी सेवाएँ",
  services: [
    { title: "विवाह समारोह", desc: "पारंपरिक रीति-रिवाजों के साथ पूरा नियोजन।" },
    { title: "जन्मदिन", desc: "बच्चों से लेकर बुज़ुर्गों तक, हर जन्मदिन खास।" },
    { title: "विभागीय समारोह", desc: "विभागों के लिए अनुशासित और समयबद्ध आयोजन।" },
    { title: "सांस्कृतिक कार्यक्रम", desc: "गणेशोत्सव, दिवाली और वार्षिक मिलन समारोह।" },
  ],
  eventsTitle: "हाल के",
  eventsAccent: "आयोजन",
  seeAll: "सभी देखें →",
  events: [
    { tag: "संगीत", title: "कुलकर्णी संगीत, नासिक" },
    { tag: "जन्मदिन", title: "आरोही का 5वाँ जन्मदिन, पुणे" },
    { tag: "विभागीय", title: "वार्षिक स्नेह मिलन, मुंबई" },
  ],
  blogTitle: "हमारा",
  blogAccent: "ब्लॉग",
  posts: [
    {
      tag: "गाइड",
      date: "12 फरवरी",
      title: "शादी की तैयारी: पूरी चेकलिस्ट",
      excerpt: "हल्दी के समय से मंडप सजावट तक — परिवार को निश्चिंत रखने वाली सूची।",
    },
    {
      tag: "ट्रेंड",
      date: "28 जनवरी",
      title: "इस साल छाए पाँच सजावट थीम",
      excerpt: "गेंदा मिनिमलिज़्म, जूल टोन और आँगन समारोहों की वापसी।",
    },
    {
      tag: "कहानी",
      date: "10 जनवरी",
      title: "भोर तक चला एक संगीत",
      excerpt: "नासिक का छोटा हॉल 200 लोगों का डांस फ्लोर कैसे बना।",
    },
  ],
  form: {
    title: "आइए आपके आयोजन की शुरुआत करें",
    body: "पूछताछ भरें — हमारा समन्वयक 24 घंटे में संपर्क करेगा।",
    name: "आपका नाम",
    phone: "मोबाइल नंबर",
    date: "आयोजन की तारीख",
    type: "आयोजन का प्रकार",
    guests: "अनुमानित मेहमान",
    message: "आयोजन के बारे में संक्षेप में",
    submit: "पूछताछ भेजें",
    success: "धन्यवाद! हम जल्द संपर्क करेंगे।",
  },
  galleryPage: {
    title: "हाल के आयोजनों की झलक",
    body: "हमारी टीम द्वारा सजाई गई कुछ यादें।",
  },
  blogPage: {
    title: "ब्लॉग और गाइड",
    body: "आयोजन को आसान बनाने वाले लेख।",
    read: "पढ़ें →",
  },
  footerContact: "संपर्क",
  rights: "सर्वाधिकार सुरक्षित।",
};

const en: Dict = {
  brand: "Sarathi Events & Celebrations",
  tagline: "The joy that families of the dutiful truly deserve!",
  nav: { home: "Home", gallery: "Gallery", blog: "Blog", book: "Book" },
  bookNow: "Book now",
  hero: {
    badge: "Marathi celebration specialists",
    titleA: "Celebrations,",
    titleAccent: "crafted",
    titleB: "with heart.",
    body: "Weddings, birthdays, departmental functions and cultural evenings — every moment planned with warmth and precision.",
    ctaPrimary: "Book an event",
    ctaSecondary: "View gallery",
    stat1: "450+",
    stat1Label: "Events hosted",
    stat2: "12",
    stat2Label: "Years of trust",
    nextUp: "Next up",
    nextUpName: "Sawant–Deshmukh Wedding",
    nextUpMeta: "Nov 24 · Pune",
    heroAlt: "Marathi wedding celebration with marigold garlands and warm lights",
  },
  quick: {
    type: "Event type",
    typeValue: "Wedding",
    date: "Date",
    dateValue: "24 Nov 2026",
    guests: "Guests",
    guestsValue: "180",
    cta: "Check availability →",
    note: "We reply within 2 hours · Free venue scouting",
  },
  servicesTitle: "What we do",
  services: [
    { title: "Weddings", desc: "Full planning with traditional Marathi rituals." },
    { title: "Birthdays", desc: "From first birthdays to golden jubilees." },
    { title: "Department functions", desc: "Disciplined, on-time events for services and offices." },
    { title: "Cultural programmes", desc: "Ganeshotsav, Diwali and annual gatherings." },
  ],
  eventsTitle: "Recent",
  eventsAccent: "events",
  seeAll: "See all →",
  events: [
    { tag: "Sangeet", title: "Kulkarni Sangeet, Nashik" },
    { tag: "Birthday", title: "Aarohi's 5th Birthday, Pune" },
    { tag: "Department", title: "Annual Function, Mumbai" },
  ],
  blogTitle: "From the",
  blogAccent: "blog",
  posts: [
    {
      tag: "Guide",
      date: "12 Feb",
      title: "Planning a Marathi wedding: the full checklist",
      excerpt: "From haldi timings to mandap décor — the list that keeps families calm.",
    },
    {
      tag: "Trends",
      date: "28 Jan",
      title: "Five décor themes making waves",
      excerpt: "Marigold minimalism, jewel tones and the return of the courtyard.",
    },
    {
      tag: "Story",
      date: "10 Jan",
      title: "A sangeet that went till dawn",
      excerpt: "How we turned a small Nashik hall into a dance floor for 200.",
    },
  ],
  form: {
    title: "Let's start planning your celebration",
    body: "Send an enquiry — our coordinator calls back within 24 hours.",
    name: "Your name",
    phone: "Mobile number",
    date: "Event date",
    type: "Event type",
    guests: "Approx. guests",
    message: "Tell us about the event",
    submit: "Send enquiry",
    success: "Thank you! We'll be in touch shortly.",
  },
  galleryPage: {
    title: "Recent events",
    body: "A few memories our team helped create.",
  },
  blogPage: {
    title: "Blog & guides",
    body: "Articles that make planning simpler.",
    read: "Read →",
  },
  footerContact: "Contact",
  rights: "All rights reserved.",
};

export const dictionaries: Record<Lang, Dict> = { mr, hi, en };

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "mr", setLang: () => {}, t: mr });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mr");

  useEffect(() => {
    const saved = window.localStorage.getItem("sarathi-lang") as Lang | null;
    if (saved && saved in dictionaries) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sarathi-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
