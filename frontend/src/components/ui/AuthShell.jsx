import React from 'react';
import { Link } from 'react-router-dom';

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

const points = [
  'One page. Every place you live on the internet.',
  'Reorder destinations in seconds — buttons, not spreadsheets.',
  'A dark, fast public page visitors actually finish scrolling.',
];

/**
 * Shell for /signin, /signup and the reset flow.
 * Form on the left, quiet brand statement on the right.
 */
export default function AuthShell({ title, subtitle, children, footerHint }) {
  return (
    <div className="min-h-screen bg-ink-950 lg:grid lg:grid-cols-2">
      {/* Form column */}
      <div className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:px-16 xl:px-24">
        <Link to="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
          <Mark />
          <span className="text-[15px]">
            My<span className="text-ion">Link</span>Space
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[380px]">
            <h1 className="text-[26px] font-bold tracking-tight sm:text-[28px]">{title}</h1>
            {subtitle && <p className="mt-2 text-[14px] leading-relaxed text-mist-500">{subtitle}</p>}
            {children}
            {footerHint}
          </div>
        </div>
      </div>

      {/* Brand column */}
      <div className="relative hidden overflow-hidden border-l border-line bg-ink-900 lg:block">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 55% at 70% 0%, rgba(182,242,76,0.08), transparent 60%)',
          }}
        />
        <div className="mls-dotgrid pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative flex h-full flex-col justify-center gap-10 px-16 xl:px-24">
          <div className="mls-hairline h-px w-24" />
          <blockquote className="max-w-md text-[30px] font-semibold leading-snug tracking-tight text-mist-50">
            Your links deserve better than a grid of icons.
            <span className="text-ion"> Stack them.</span>
          </blockquote>
          <ul className="max-w-md space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[14px] leading-relaxed text-mist-300">
                <svg viewBox="0 0 12 12" className="mt-1.5 h-2.5 w-2.5 shrink-0 fill-ion">
                  <circle cx="6" cy="6" r="6" opacity="0.5" />
                  <circle cx="6" cy="6" r="2.4" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="mls-hairline h-px w-full" />
        </div>
      </div>
    </div>
  );
}
