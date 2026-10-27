import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import {
  Avatar,
  Button,
  ErrorBanner,
  EmptyState,
  Skeleton,
  SectionTitle,
  useToast,
} from '../../components/ui/kit';
import { getLinks, getProfiles, getStoredUser, getStoredUserId, reorderLinks } from '../../lib/api';

function StatCard({ label, value, accent, loading }) {
  return (
    <div className="rounded-2xl border border-line bg-ink-850 p-5 shadow-card">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">{label}</p>
      {loading ? (
        <Skeleton className="mt-2 h-8 w-16" />
      ) : (
        <p className={`mt-2 text-[28px] font-bold tabular-nums leading-none ${accent || 'text-mist-50'}`}>
          {value}
        </p>
      )}
    </div>
  );
}

function DashBoard() {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useMemo(() => getStoredUser(), []);
  const userId = useMemo(() => getStoredUserId(), []);

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      if (!userId) {
        navigate('/signin', { replace: true });
        return;
      }
      const [{ data: profiles }, { data: linkList }] = await Promise.all([
        getProfiles(userId),
        getLinks(userId),
      ]);
      if (cancelled) return;
      setProfile(Array.isArray(profiles) ? profiles[0] : null);
      const sorted = (linkList || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setLinks(sorted);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, navigate]);

  const publicUrl = profile?.id ? `${window.location.origin}/p/${profile.id}` : null;

  const copyPublicUrl = async () => {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast('Public page link copied to clipboard');
    } catch {
      toast('Copy failed — the link is ' + publicUrl, 'error');
    }
  };

  /** Reuse the backend reorder contract: PUT /users/{id}/links/reorder */
  const move = async (index, direction) => {
    const next = links.slice();
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLinks(next.map((l, i) => ({ ...l, order: i })));
    const moved = next[index];
    setBusyId(moved.id);
    const { error } = await reorderLinks(userId, next.map((l) => l.id));
    setBusyId(null);
    if (error) {
      const { data } = await getLinks(userId);
      if (data) setLinks(data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      toast(error, 'error');
    } else {
      toast('Order updated');
    }
  };

  const totalClicks = links.reduce((acc, l) => acc + (l.click_count || 0), 0);
  const activeCount = links.filter((l) => l.is_active !== false).length;

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="page-enter mx-auto max-w-shell px-4 pt-8 sm:px-6 sm:pt-10">
        {/* Identity strip */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {loading ? (
              <Skeleton className="h-14 w-14 rounded-full" />
            ) : (
              <Avatar name={user?.name || profile?.title || 'U'} src={profile?.avatar_url} size={56} />
            )}
            <div>
              {loading ? (
                <>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="mt-2 h-3.5 w-56" />
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold tracking-tight">
                    {user?.name || 'Welcome back'}
                  </h1>
                  <p className="mt-0.5 text-[13px] text-mist-500">
                    {profile?.title && profile.title !== 'Default Title'
                      ? profile.title
                      : 'Your link in bio is waiting for a title.'}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {publicUrl && (
              <button
                onClick={copyPublicUrl}
                className="group flex h-10 min-w-0 items-center gap-2.5 rounded-xl border border-line bg-ink-850 px-3.5 text-left transition-colors hover:border-line-strong"
                title="Copy your public page URL"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 stroke-mist-500 group-hover:stroke-ion dark" fill="none" strokeWidth="1.5">
                  <path d="M6.5 9.5A3 3 0 0 1 6.5 4.5L8 3a3 3 0 0 1 4.2 4.2L11.4 8" strokeLinecap="round" />
                  <path d="M9.5 6.5A3 3 0 0 1 9.5 11.5L8 13a3 3 0 0 1-4.2-4.2L4.6 8" strokeLinecap="round" />
                </svg>
                <span className="max-w-[11rem] truncate font-mono text-xs text-mist-300 sm:max-w-[14rem]">
                  /p/{profile.id}
                </span>
                <span className="hidden whitespace-nowrap text-xs font-medium text-ion sm:block">Copy</span>
              </button>
            )}
            <Link to="/links">
              <Button size="md">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 3.5v9M3.5 8h9" strokeLinecap="round" />
                </svg>
                Add link
              </Button>
            </Link>
          </div>
        </section>

        {error && <div className="mt-6"><ErrorBanner message={error} /></div>}

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total links" value={links.length} loading={loading} />
          <StatCard label="Active links" value={activeCount} accent="text-ion" loading={loading} />
          <StatCard label="Total clicks" value={totalClicks} loading={loading} />
        </section>

        {/* Links panel */}
        <section className="mt-10">
          <SectionTitle
            eyebrow="Your space"
            title="Links on your bio page"
            action={
              links.length > 0 ? (
                <div className="flex gap-2">
                  <Link to="/links"><Button variant="ghost" size="sm">Manage all</Button></Link>
                  <Link to="/appearance"><Button variant="ghost" size="sm">Style page</Button></Link>
                </div>
              ) : null
            }
          />

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-[68px] rounded-2xl" />
              <Skeleton className="h-[68px] rounded-2xl" />
              <Skeleton className="h-[68px] rounded-2xl" />
            </div>
          ) : links.length === 0 ? (
            <EmptyState
              icon={
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2" strokeLinecap="round" />
                  <path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" strokeLinecap="round" />
                </svg>
              }
              title="No links yet"
              body="Add your first destination — a page, a product, a social profile — and it shows up on your public bio page instantly."
              action={<Link to="/links"><Button size="md">Add your first link</Button></Link>}
            />
          ) : (
            <ul className="space-y-2.5">
              {links.map((link, i) => (
                <li
                  key={link.id}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-ink-850 p-4 shadow-card transition-colors duration-150 hover:border-line-strong"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3.5">
                    <span className="font-mono text-[11px] text-mist-700">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-mist-50">{link.title || link.url}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block max-w-[18rem] truncate text-xs text-mist-500 hover:text-ion sm:max-w-xs"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.is_active === false && (
                      <span className="rounded-full bg-ink-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mist-500">
                        Off
                      </span>
                    )}
                    {typeof link.click_count === 'number' && link.click_count > 0 && (
                      <span className="hidden rounded-full bg-ion-dim px-2 py-0.5 text-[10px] font-semibold text-ion sm:block">
                        {link.click_count} clicks
                      </span>
                    )}
                    <div className="flex flex-col overflow-hidden rounded-lg border border-line">
                      <button
                        aria-label="Move up"
                        disabled={i === 0 || busyId === link.id}
                        onClick={() => move(i, -1)}
                        className="px-1.5 py-0.5 text-mist-500 hover:bg-ink-600 hover:text-mist-50 disabled:opacity-30"
                      >
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 7.5 6 4l3.5 3.5" /></svg>
                      </button>
                      <button
                        aria-label="Move down"
                        disabled={i === links.length - 1 || busyId === link.id}
                        onClick={() => move(i, 1)}
                        className="border-t border-line px-1.5 py-0.5 text-mist-500 hover:bg-ink-600 hover:text-mist-50 disabled:opacity-30"
                      >
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashBoard;
