import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------- */
/* Shared bits                                                     */
/* -------------------------------------------------------------- */

function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-ink-700" />
      <path d="M10 21.5c4.5 0 6.5-4 8.5-4h3.5" className="stroke-ion" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="21.5" cy="10.5" r="3" className="fill-ion" />
      <path d="M10 10.5h6" className="stroke-mist-100" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <Mark />
      <span className="text-[15px]">
        My<span className="text-ion">Link</span>Space
      </span>
    </Link>
  );
}

function SignupCta({ children = 'Claim your space', size = 'lg' }) {
  return (
    <Link
      to="/signup"
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-ion font-semibold text-ink-950 transition-all duration-150 hover:bg-ion-deep active:translate-y-px ${
        size === 'lg' ? 'h-12 px-6 text-[15px]' : 'h-10 px-4 text-sm'
      }`}
    >
      {children}
    </Link>
  );
}

const heroLinks = [
  'Portfolio',
  'Newsletter',
  'Latest video',
  'GitHub',
  'Curated shops',
];

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
];

/* -------------------------------------------------------------- */
/* Sections                                                        */
/* -------------------------------------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'border-b border-line bg-ink-950/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:px-6">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-mist-300 transition-colors hover:text-mist-50"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            to="/signin"
            className="hidden h-9 items-center rounded-lg px-3.5 text-[13px] font-medium text-mist-300 transition-colors hover:bg-ink-700/60 hover:text-mist-50 sm:inline-flex"
          >
            Sign in
          </Link>
          <SignupCta size="md">Get started</SignupCta>
        </div>
      </div>
    </header>
  );
}

function MiniPhone({ offset }) {
  return (
    <div
      className="pointer-events-none absolute w-[280px] overflow-hidden rounded-[2rem] border border-line-strong bg-ink-850 shadow-pop sm:w-[300px]"
      style={{ top: offset.top, left: offset.left, transform: `rotate(${offset.rot}deg)`, opacity: offset.op }}
    >
      <div className="h-[520px] overflow-hidden">
        <div className="flex flex-col items-center pt-10">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-line bg-ink-700 text-lg font-semibold text-ion">N</div>
          <p className="mt-3 text-[15px] font-bold tracking-tight">natoli.makes</p>
          <p className="mt-1 text-[11.5px] text-mist-500">Building at the weekend.</p>
          <div className="mt-6 w-full space-y-2.5 px-4">
            {heroLinks.map((t, i) => (
              <div
                key={t}
                className="flex h-11 items-center justify-center rounded-xl border border-mist-300/10 bg-mist-300/5 text-[12.5px] text-mist-100"
                style={{ opacity: 1 - i * 0.13 }}
              >
                {t}
              </div>
            ))}
          </div>
          <p className="mt-auto pb-5 pt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-mist-700">
            MyLinkSpace
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 55% at 50% -5%, rgba(182,242,76,0.07), transparent 60%)',
        }}
      />
      <div className="mls-dotgrid pointer-events-none absolute inset-0 opacity-50" />
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-850 py-1.5 pl-2 pr-3.5 text-[12px] text-mist-300">
              <span className="rounded-full bg-ion px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-950">
                New
              </span>
              Dark-mode bio pages with a real design system
            </p>
            <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[56px]">
              One page for
              <br />
              everything you make.
              <span className="text-ion">.</span>
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-mist-300">
              MyLinkSpace turns your scattered links into a fast, dark, single page you're
              proud to put in a bio. Reorder in seconds. Style it once. Ship it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignupCta>Claim your space — free</SignupCta>
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-line-strong px-5 text-sm font-medium text-mist-100 transition-colors hover:border-mist-500"
              >
                See how it works
              </a>
            </div>
            <p className="mt-5 text-[12.5px] text-mist-700">
              No credit card. No template bloat. Your page, your palette.
            </p>
          </div>

          <div className="relative hidden h-[560px] lg:block" aria-hidden="true">
            <MiniPhone offset={{ top: 20, left: '55%', rot: 3, op: 0.35 }} />
            <MiniPhone offset={{ top: 60, left: '18%', rot: -4, op: 1 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="border-y border-line bg-ink-900 py-4">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist-700">
        <span>No builder accounts</span>
        <span className="text-ion">·</span>
        <span>Loads everywhere, even on 3G</span>
        <span className="text-ion">·</span>
        <span>Mobile-first by design</span>
        <span className="text-ion">·</span>
        <span>Free to start</span>
      </div>
    </section>
  );
}

const features = [
  {
    title: 'Links that respect the order you chose',
    body: 'Add destinations once, then drag or arrow them into place. What you see in the manager is exactly what visitors scroll.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h12M20 17h0" strokeLinecap="round" />
        <circle cx="16" cy="7" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="8" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'A public page that looks designed',
    body: 'Pick a palette, a typeface and a button color. Your theme — not a theme store regurgitated — is what people land on.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3.5" y="5" width="17" height="14" rx="3" />
        <path d="M3.5 10.5h17" />
        <circle cx="7" cy="7.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Signals without surveillance',
    body: 'See how many people clicked and which links deserve the top slot. One number per link, no dashboards you never open.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19V9M10 19V5M16 19v-8M21 19H3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-shell px-5 py-24 sm:px-6">
      <div className="max-w-lg">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ion">Why MyLinkSpace</p>
        <h2 className="mt-3 text-[30px] font-bold tracking-tight sm:text-[34px]">
          Small surface, sharp craft
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-mist-500">
          A link in bio page should do exactly three things beautifully — hold attention for one
          more scroll, hand you the click, and never get in your way.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {features.map((f, i) => (
          <article
            key={f.title}
            className="group rounded-2xl border border-line bg-ink-850 p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-line-strong"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-800 text-ion transition-colors group-hover:border-ion/40">
              {f.icon}
            </div>
            <h3 className="text-[15.5px] font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-mist-500">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: '01', t: 'Create the account', d: 'Name, email, password. Your page goes live immediately with a sensible dark default.' },
  { n: '02', t: 'Stack your links', d: 'Titles and URLs. Drag to order. Toggle a link off without deleting it.' },
  { n: '03', t: 'Make it yours', d: 'Set title, bio, and avatar. Fine-tune the theme colors until the preview feels right.' },
  { n: '04', t: 'Ship the URL', d: 'Drop /p/yourpage into every bio you own. Check back occasionally — clicks stack up.' },
];

function HowItWorks() {
  return (
    <section id="how" className="border-y border-line bg-ink-900 py-24">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <div className="max-w-lg">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ion">Process</p>
          <h2 className="mt-3 text-[30px] font-bold tracking-tight sm:text-[34px]">
            Four steps, one coffee
          </h2>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-ink-850 p-5 shadow-card">
              <p className="font-mono text-[11px] tracking-[0.2em] text-ion">{s.n}</p>
              <h3 className="mt-3 text-[15px] font-semibold">{s.t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-mist-500">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: 'What does the free plan include?',
    a: 'Everything you need to run a full page: unlimited links, reordering, the theme editor, avatar, bio, and a public page that loads fast on any connection.',
  },
  {
    q: 'Can I replay or duplicate my theme later?',
    a: 'Custom themes are saved to your account, so once you find a palette you like it stays applied until you change it — and the live preview shows exactly what visitors will see.',
  },
  {
    q: 'How is this different from a link list buried in my social profile?',
    a: 'A MyLinkSpace page is a single address with your ordering and your design. It is metered by nothing except the links you put on it, and it loads instantly because there is nothing heavy behind it.',
  },
  {
    q: 'Do my uploaded avatars keep working?',
    a: 'Your avatar URL renders whenever reachable; if the image ever fails to load, the page automatically falls back to a clean initial-letter avatar instead of a broken image.',
  },
];

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[64rem] px-5 py-24 sm:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ion">Questions</p>
      <h2 className="mt-3 text-[30px] font-bold tracking-tight sm:text-[34px]">
        Before you ask
      </h2>
      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-line bg-ink-850 px-5 open:border-line-strong"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[14.5px] font-medium text-mist-100 marker:hidden [&::-webkit-details-marker]:hidden">
              {f.q}
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 shrink-0 text-mist-500 transition-transform duration-200 group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 1.5v9M1.5 6h9" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="pb-5 text-[13.5px] leading-relaxed text-mist-500">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 100% at 50% 100%, rgba(182,242,76,0.08), transparent 65%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-6">
        <h2 className="text-[32px] font-bold tracking-tight sm:text-[38px]">
          Your bio deserves
          <span className="text-ion"> one home.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-mist-500">
          Set it up before the day ends and never update a social profile bio again — change
          the page, and every bio updates instantly.
        </p>
        <div className="mt-8 flex justify-center">
          <SignupCta>Get started — free</SignupCta>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Logo />
          <p className="text-[12px] text-mist-700">© {new Date().getFullYear()} MyLinkSpace</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-mist-500">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-mist-100">
              {l.label}
            </a>
          ))}
          <Link to="/signin" className="transition-colors hover:text-mist-100">
            Sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------- */

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

export default LandingPage;
