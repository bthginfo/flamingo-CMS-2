import { Marquee, Reveal } from "./ShowcaseFx";

const pageMeta = {
  angebot: {
    eyebrow: "Angebot",
    headline: "Premium-Websites, die wie ein eigenes Produkt wirken.",
    body: "Templates geben Tempo. CMS, Designsystem, Content und Launch-Prozess machen daraus eine Website, die dauerhaft gepflegt und erweitert werden kann.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
    marquee: ["Launch", "Growth", "Signature", "CMS", "Vercel", "Neon", "Blob"]
  },
  prozess: {
    eyebrow: "Ablauf",
    headline: "Ein klarer Prozess fuer Websites mit echtem Wow-Faktor.",
    body: "Von Branchen-Blueprint ueber echte Inhalte bis zum Vercel-Launch: jedes Detail bekommt einen Platz im System, nicht nur in einem Mockup.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85",
    marquee: ["Blueprint", "Content", "Design", "Admin", "QA", "Launch", "Pflege"]
  },
  kontakt: {
    eyebrow: "Kontakt",
    headline: "Sag kurz, welche Marke digital endlich besser aussehen soll.",
    body: "Wir klären Branche, Ziel, Content, Foerderoptionen und den sinnvollsten Startpunkt. Danach gibt es einen konkreten Plan statt Verkaufsgelaber.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1800&q=85",
    marquee: ["Projekt", "Template", "Foerderung", "Launch", "CMS", "Anfrage"]
  },
  beispiele: {
    eyebrow: "Templates",
    headline: "Branchen-Previews, die nicht nach Demo aussehen sollen.",
    body: "Jede Vorschau zeigt echte Kundenseiten-Logik: Angebote, Speisekarten, Zimmer, Kurse, Referenzen, Termine, Galerien und Kontaktwege.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    marquee: ["Restaurant", "Hotel", "Handwerk", "Praxis", "Salon", "Fitness", "Immobilien"]
  }
};

export function SubpageHero({ page }: { page: keyof typeof pageMeta }) {
  const meta = pageMeta[page];

  return (
    <section className="relative isolate overflow-hidden bg-[#08080b] px-5 py-20 text-white md:px-8 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-55"
        style={{ backgroundImage: `url(${meta.image})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-black/25" />
      <div className="hero-grid -z-10 opacity-70" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-5xl">
          <p className="showcase-eyebrow text-white/70">{meta.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(4rem,10vw,9rem)] font-black leading-[0.82]">
            {meta.headline}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 md:text-xl md:leading-9">
            {meta.body}
          </p>
        </Reveal>
        <div className="mt-14 border-y border-white/10 py-4">
          <Marquee items={meta.marquee} speed={34} className="text-white/70" />
        </div>
      </div>
    </section>
  );
}
