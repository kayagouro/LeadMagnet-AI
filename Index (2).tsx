import { useMemo, useState } from "react";

const features = [
  {
    title: "Génération guidée par IA",
    description:
      "Créez des lead magnets personnalisés en quelques minutes grâce à des prompts métier prêts à l'emploi.",
  },
  {
    title: "A/B testing intégré",
    description:
      "Testez vos titres, visuels et CTA pour améliorer vos taux de conversion sans effort technique.",
  },
  {
    title: "Capture multicanal",
    description:
      "Publiez vos campagnes sur landing pages, emails et réseaux sociaux depuis une interface unifiée.",
  },
];

const testimonials = [
  {
    quote: "Nous avons doublé nos leads qualifiés en 6 semaines.",
    author: "Camille, Head of Growth",
  },
  {
    quote: "L'équipe marketing publie ses campagnes 3x plus vite.",
    author: "Nassim, CMO",
  },
  {
    quote: "On voit enfin clairement ce qui convertit.",
    author: "Sarah, Demand Gen Manager",
  },
];

const monthlyPlans = [
  { name: "Starter", price: 29, users: "1 utilisateur", cta: "Commencer" },
  { name: "Growth", price: 79, users: "5 utilisateurs", cta: "Essayer 14 jours" },
  { name: "Scale", price: 159, users: "Utilisateurs illimités", cta: "Parler à un expert" },
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [yearlyBilling, setYearlyBilling] = useState(true);

  const plans = useMemo(
    () =>
      monthlyPlans.map((plan) => ({
        ...plan,
        displayPrice: yearlyBilling ? Math.round(plan.price * 0.8) : plan.price,
      })),
    [yearlyBilling],
  );

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen scroll-smooth bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a className="text-lg font-semibold tracking-tight" href="#hero">
            LeadMagnet AI
          </a>

          <button
            aria-controls="mobile-nav"
            aria-expanded={mobileMenuOpen}
            aria-label="Ouvrir le menu"
            className="rounded-md border border-slate-700 px-3 py-2 text-sm md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
          >
            Menu
          </button>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a className="hover:text-cyan-300" href="#features">
              Fonctionnalités
            </a>
            <a className="hover:text-cyan-300" href="#proof">
              Résultats
            </a>
            <a className="hover:text-cyan-300" href="#pricing">
              Tarifs
            </a>
            <a className="hover:text-cyan-300" href="#footer">
              Contact
            </a>
            <a
              className="rounded-md bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
              href="#pricing"
            >
              Essayer gratuitement
            </a>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="space-y-3 border-t border-slate-800 px-6 py-4 md:hidden" id="mobile-nav">
            <a className="block text-sm" href="#features" onClick={closeMobileMenu}>
              Fonctionnalités
            </a>
            <a className="block text-sm" href="#proof" onClick={closeMobileMenu}>
              Résultats
            </a>
            <a className="block text-sm" href="#pricing" onClick={closeMobileMenu}>
              Tarifs
            </a>
            <a className="block text-sm" href="#footer" onClick={closeMobileMenu}>
              Contact
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-20" id="hero">
          <p className="mb-4 inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-medium text-cyan-300">
            +2 300 équipes marketing utilisent LeadMagnet AI
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Transformez vos visiteurs en leads qualifiés avec une landing page moderne.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
            Concevez, testez et optimisez vos lead magnets avec une expérience plus fluide, plus rapide et orientée conversion.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="rounded-md bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400" href="#pricing">
              Essayer gratuitement
            </a>
            <a className="rounded-md border border-slate-700 px-5 py-3 font-semibold hover:border-slate-500" href="#features">
              Voir la démo
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="features">
          <h2 className="text-3xl font-semibold tracking-tight">Fonctionnalités orientées performance</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-500/60"
                key={feature.title}
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="proof">
          <h2 className="text-3xl font-semibold tracking-tight">Des résultats mesurables</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure className="rounded-xl border border-slate-800 bg-slate-900/50 p-6" key={item.author}>
                <blockquote className="text-slate-200">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-cyan-300">{item.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="pricing">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">Tarifs transparents</h2>
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 px-4 py-2 text-sm">
              <span>Mensuel</span>
              <button
                aria-checked={yearlyBilling}
                aria-label="Basculer vers facturation annuelle"
                className={`h-6 w-11 rounded-full p-1 transition ${yearlyBilling ? "bg-cyan-500" : "bg-slate-700"}`}
                onClick={() => setYearlyBilling((current) => !current)}
                role="switch"
                type="button"
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white transition ${yearlyBilling ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
              <span>Annuel (-20%)</span>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-6" key={plan.name}>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-slate-300">{plan.users}</p>
                <p className="mt-5 text-4xl font-bold">
                  {plan.displayPrice}€
                  <span className="text-sm font-normal text-slate-400"> /mois</span>
                </p>
                <button
                  className="mt-6 w-full rounded-md bg-slate-100 px-4 py-3 font-semibold text-slate-950 hover:bg-white"
                  type="button"
                >
                  {plan.cta}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 px-6 py-10 text-center text-sm text-slate-400" id="footer">
        © {new Date().getFullYear()} LeadMagnet AI — Une expérience repensée pour convertir mieux.
      </footer>
    </div>
  );
};

export default Index;
