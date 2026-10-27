import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, useToast } from '../ui/kit';
import { getProfiles, getStoredUser, getStoredUserId, logout } from '../../lib/api';

function Mark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-ink-700" />
      <path
        d="M10 21.5c4.5 0 6.5-4 8.5-4h3.5"
        className="stroke-ion"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="21.5" cy="10.5" r="3" className="fill-ion" />
      <path d="M10 10.5h6" className="stroke-mist-100" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/links', label: 'Links' },
  { to: '/appearance', label: 'Appearance' },
  { to: '/analytics', label: 'Analytics' },
];

/**
 * App shell header for authenticated pages.
 * (Previously an unstyled image sprite; rewritten for the dark design
 * system. Nav targets preserved; /analysis typo fixed to /analytics.)
 */
function Header() {
  const user = useMemo(() => getStoredUser(), []);
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  const handleOpenPage = async () => {
    setOpen(false);
    setOpening(true);
    const { data } = await getProfiles(getStoredUserId());
    setOpening(false);
    const profile = Array.isArray(data) ? data[0] : null;
    if (profile?.id) {
      navigate(`/p/${profile.id}`);
    } else {
      toast('Public page not available yet — try again in a moment.', 'error');
    }
  };

  const handleLogout = async () => {
    setSigningOut(true);
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-shell items-center gap-6 px-4 sm:px-6">
        <Link to="/dashboard" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Mark />
          <span className="hidden text-[15px] sm:block">
            My<span className="text-ion">Link</span>Space
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-ink-700/80 text-ion'
                    : 'text-mist-300 hover:bg-ink-700/50 hover:text-mist-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Button variant="secondary" size="sm" onClick={handleOpenPage} disabled={opening} className="hidden sm:inline-flex">
            {opening ? 'Opening…' : 'View my page'}
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Account menu"
            className="rounded-full transition-transform duration-150 hover:scale-105"
          >
            <Avatar name={user?.name || 'U'} size={34} src={user?.avatar_url} />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute right-4 top-[68px] w-56 overflow-hidden rounded-xl border border-line bg-ink-850 shadow-pop sm:right-6">
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-semibold text-mist-50">{user?.name || 'Signed in'}</p>
            <p className="truncate text-xs text-mist-500">{user?.email || ''}</p>
          </div>
          <div className="p-1 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-lg px-3 py-2 text-sm text-mist-300 hover:bg-ink-700 hover:text-mist-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="p-1">
            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-400/90 hover:bg-rose-500/10 disabled:opacity-50"
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
