import React, { useEffect, useState } from 'react';
import { Avatar } from './ui/kit';
import { trackLinkClick } from '../lib/api';

const DEFAULTS = {
  bg: 'var(--mls-bg)',
  text: 'var(--mls-text)',
  muted: 'var(--mls-muted)',
  buttonBg: 'rgba(243, 245, 248, 0.04)',
  buttonText: 'var(--mls-text)',
  buttonBorder: 'rgba(243, 245, 248, 0.1)',
  buttonBgHover: 'rgba(182, 242, 76, 0.1)',
};

/**
 * The actual "link in bio" page a visitor sees.
 *
 * Styling rules:
 *  - If `theme` (custom-theme preview data) is present, its palette drives the
 *    background / text / button colors and font.
 *  - Otherwise (or when theme fields are NULL) a sane dark default is rendered.
 *
 * `standalone` renders a full-bleed page; otherwise it is used as a phone
 * preview inside the dashboard.
 */
function ProfileRenderer({ profile, links = [], theme, standalone = true }) {
  const t = {
    background: theme?.background_color || DEFAULTS.bg,
    text: theme?.text_color || DEFAULTS.text,
    buttonBg: theme?.button_color || DEFAULTS.buttonBg,
    buttonText: theme?.button_text_color || DEFAULTS.buttonText,
    font: theme?.font_family || 'var(--font-sans, system-ui)',
  };
  const themed = Boolean(theme?.background_color);

  const containerStyle = {
    color: t.text,
    fontFamily: t.font,
    ...(standalone
      ? { minHeight: '100%' }
      : {}),
  };

  const buttonStyle = {
    color: t.buttonText,
    fontFamily: t.font,
  };

  if (themed) {
    buttonStyle.backgroundColor = t.buttonBg;
    buttonStyle.border = '1px solid transparent';
  } else {
    buttonStyle.backgroundColor = DEFAULTS.buttonBg;
    buttonStyle.border = `1px solid ${DEFAULTS.buttonBorder}`;
    buttonStyle.backdropFilter = 'blur(4px)';
  }

  const handleLinkClick = (link) => {
    if (profile?.user_id) trackLinkClick(profile.user_id, link.id);
  };

  const visibleLinks = links.filter((l) => l.is_active !== false);

  return (
    <div
      style={containerStyle}
      className={`relative overflow-hidden ${
        standalone ? 'min-h-screen w-full' : 'h-full w-full rounded-3xl'
      }`}
    >
      {/* background layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={
          themed
            ? { background: t.background }
            : {
                background:
                  'radial-gradient(120% 60% at 50% -10%, rgba(182,242,76,0.07), transparent 55%), var(--mls-bg)',
              }
        }
      />
      {!themed && <div className="mls-dotgrid pointer-events-none absolute inset-0 opacity-60" />}

      <div
        className={`relative mx-auto flex w-full max-w-[34rem] flex-col items-center px-5 pb-16 ${
          standalone ? 'min-h-screen pt-20 sm:pt-24' : 'pt-10'
        }`}
        style={{ color: t.text }}
      >
        <Avatar src={profile?.avatar_url} name={profile?.title || profile?.username || 'M'} size={88} className="mb-4" />

        <h1
          className="text-center text-[22px] font-bold leading-tight tracking-tight sm:text-[24px]"
          style={{ color: t.text }}
        >
          {profile?.title && profile.title !== 'Default Title' ? profile.title : profile?.username || 'My LinkSpace'}
        </h1>

        {profile?.bio && profile.bio !== 'Default Bio' && (
          <p className="mt-2 max-w-sm whitespace-pre-line text-center text-[14px] leading-relaxed" style={{ color: themed ? t.text : 'var(--mls-muted)' }}>
            {profile.bio}
          </p>
        )}

        <div className={`mt-7 w-full space-y-3 ${standalone ? '' : 'px-1'}`}>
          {visibleLinks.map((link, i) => (
            <a
              key={link.id ?? i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link)}
              className="group animate-fade-up flex h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 text-center text-[14.5px] font-medium tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
              style={{ ...buttonStyle, animationDelay: `${Math.min(i * 60, 420)}ms` }}
              onMouseEnter={(e) => {
                if (!themed) e.currentTarget.style.backgroundColor = DEFAULTS.buttonBgHover;
                if (!themed) e.currentTarget.style.borderColor = 'rgba(182, 242, 76, 0.45)';
              }}
              onMouseLeave={(e) => {
                if (!themed) e.currentTarget.style.backgroundColor = DEFAULTS.buttonBg;
                if (!themed) e.currentTarget.style.borderColor = DEFAULTS.buttonBorder;
              }}
            >
              <span className="truncate">{link.title || link.url}</span>
              <svg
                viewBox="0 0 16 16"
                className="ml-1.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}

          {visibleLinks.length === 0 && (
            <div
              className="rounded-xl border border-dashed px-6 py-8 text-center text-[13px] leading-relaxed"
              style={{ borderColor: 'currentColor', opacity: 0.4 }}
            >
              Nothing here yet.
            </div>
          )}
        </div>

        {/* Brand footer */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-80"
          style={{ borderColor: 'currentColor', opacity: 0.45, color: t.text }}
        >
          <span>MyLinkSpace</span>
        </a>
      </div>
    </div>
  );
}

export default ProfileRenderer;
