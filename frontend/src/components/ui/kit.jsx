import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const buttonVariants = {
  primary:
    'bg-ion text-ink-950 hover:bg-ion-deep active:translate-y-px font-semibold shadow-[0_6px_20px_-8px_rgba(182,242,76,0.5)] disabled:bg-ion/50 disabled:text-ink-950/60 disabled:shadow-none',
  secondary:
    'bg-ink-600/60 text-mist-50 border border-line-strong hover:bg-ink-600 hover:border-mist-700 font-medium active:translate-y-px',
  ghost:
    'bg-transparent text-mist-300 hover:text-mist-50 hover:bg-ink-600/40 font-medium',
  danger:
    'bg-transparent text-rose-400/90 border border-rose-500/25 hover:bg-rose-500/10 hover:border-rose-500/40 font-medium',
  accentGhost:
    'bg-ion-dim text-ion border border-ion/20 hover:bg-ion/20 font-medium',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-[15px] rounded-xl gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-150 disabled:cursor-not-allowed ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

export function Label({ htmlFor, children, hint }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-baseline justify-between text-[13px] font-medium text-mist-300"
    >
      <span>{children}</span>
      {hint && <span className="text-[11px] text-mist-700">{hint}</span>}
    </label>
  );
}

export const inputClasses =
  'w-full rounded-xl border border-line bg-ink-800 px-3.5 text-sm text-mist-50 placeholder-mist-700 outline-none transition-colors duration-150 focus:border-ion/60 focus:bg-ink-700 disabled:opacity-50';

export function Input({ invalid, className = '', ...props }) {
  return (
    <input
      className={`${inputClasses} h-10 ${invalid ? 'border-rose-500/60 focus:border-rose-400' : ''} ${className}`}
      {...props}
    />
  );
}

export function Textarea({ invalid, className = '', rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`${inputClasses} py-2.5 resize-none ${invalid ? 'border-rose-500/60 focus:border-rose-400' : ''} ${className}`}
      {...props}
    />
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-ion' : 'bg-ink-600 border border-line-strong'
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ink-950 transition-all duration-200 ${
          checked ? 'left-[26px] bg-ink-900' : 'left-1 bg-mist-300'
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Avatar with graceful fallback (initial letter)                      */
/* ------------------------------------------------------------------ */

export function Avatar({ src, name = '', size = 48, className = '' }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase();

  useEffect(() => setFailed(false), [src]);

  const style = { width: size, height: size };
  if (!src || failed) {
    return (
      <span
        style={style}
        className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-ink-700 font-semibold text-ion ${className}`}
      >
        <span style={{ fontSize: size * 0.42 }} className="select-none">
          {initial}
        </span>
      </span>
    );
  }
  return (
    <img
      style={style}
      src={src}
      alt={name ? `${name}'s avatar` : 'avatar'}
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Loading skeleton                                                    */
/* ------------------------------------------------------------------ */

export function Skeleton({ className = '' }) {
  return <div className={`mls-skeleton ${className}`} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

export function EmptyState({ icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-ink-900/60 px-6 py-12 text-center">
      {icon && <div className="mb-3 text-mist-500">{icon}</div>}
      <p className="text-sm font-semibold text-mist-100">{title}</p>
      {body && <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-mist-500">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toasts (global, zero-dependency)                                    */
/* ------------------------------------------------------------------ */

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const push = useCallback((message, tone = 'success') => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 px-4">
          {toasts.map((t) => (
            <div
              key={t.id}
              role="status"
              className={`animate-fade-up pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm shadow-pop backdrop-blur-md ${
                t.tone === 'error'
                  ? 'border-rose-500/30 bg-rose-500/15 text-rose-100'
                  : 'border-ion/25 bg-ink-850/95 text-mist-50'
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  t.tone === 'error' ? 'bg-rose-400' : 'bg-ion'
                }`}
              />
              {t.message}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

/* ------------------------------------------------------------------ */
/* Inline error banner                                                 */
/* ------------------------------------------------------------------ */

export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="animate-fade-up flex items-start gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-[13px] text-rose-200">
      <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 fill-none stroke-rose-400" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 5v3.6M8 10.8v.2" strokeLinecap="round" />
      </svg>
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading used across dashboard pages                          */
/* ------------------------------------------------------------------ */

export function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">{eyebrow}</p>
        )}
        <h2 className="text-[17px] font-semibold text-mist-50">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export default function Kit() {
  return null;
}
