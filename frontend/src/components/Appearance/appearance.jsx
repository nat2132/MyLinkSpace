import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import ProfileRenderer from '../ProfileRenderer';
import {
  Avatar,
  Button,
  ErrorBanner,
  Input,
  Label,
  Skeleton,
  Textarea,
  Toggle,
  useToast,
} from '../ui/kit';
import {
  applyCustomTheme,
  createCustomTheme,
  getCustomThemePreview,
  getLinks,
  getProfiles,
  getStoredUser,
  getStoredUserId,
  updateProfile,
} from '../../lib/api';

const FONT_OPTIONS = [
  { value: 'system', label: 'System — crisp, neutral', css: '' },
  { value: 'Georgia', label: 'Georgia — editorial serif', css: 'Georgia' },
  { value: '"Courier New"', label: 'Mono — terminal mood', css: '"Courier New"' },
  { value: 'Verdana', label: 'Verdana — sturdy sans', css: 'Verdana' },
  { value: '"Palatino Linotype"', label: 'Palatino — classic', css: '"Palatino Linotype"' },
  { value: '"Trebuchet MS"', label: 'Trebuchet — friendly', css: '"Trebuchet MS"' },
];

// Hand-picked, non-generic starting points (deep charcoal + accents that
// avoid the default purple/pink AI gradient slather).
const PRESETS = [
  { name: 'Carbon', background_color: '#0d0f13', text_color: '#f3f5f8', button_color: '#b6f24c', button_text_color: '#0a0c10' },
  { name: 'Slate', background_color: '#151a21', text_color: '#d9dee6', button_color: '#e4e8ee', button_text_color: '#101318' },
  { name: 'Moss', background_color: '#101408', text_color: '#e5f0d8', button_color: '#88c05a', button_text_color: '#101408' },
  { name: 'Ember', background_color: '#160e0a', text_color: '#f5e9de', button_color: '#e8672c', button_text_color: '#160e0a' },
  { name: 'Glacier', background_color: '#081218', text_color: '#dfeef2', button_color: '#59c4d6', button_text_color: '#081218' },
];

const FALLBACK_THEME = {
  background_color: '#0d0f13',
  text_color: '#f3f5f8',
  button_color: '#b6f24c',
  button_text_color: '#0a0c10',
  font_family: 'system',
};

function ColorField({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-ink-800 p-2.5">
      <input
        type="color"
        aria-label={label}
        value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-transparent"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-mist-100">{label}</p>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck="false"
          className="w-full bg-transparent font-mono text-[11px] text-mist-500 outline-none"
        />
      </div>
    </div>
  );
}

function Appearance() {
  const navigate = useNavigate();
  const toast = useToast();
  const userId = useMemo(() => getStoredUserId(), []);
  const user = useMemo(() => getStoredUser(), []);

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile fields
  const [form, setForm] = useState({ title: '', bio: '', avatar_url: '', is_public: true });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Theme fields
  const [theme, setTheme] = useState(FALLBACK_THEME);
  const [themeId, setThemeId] = useState(null);
  const [savingTheme, setSavingTheme] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate('/signin', { replace: true });
      return;
    }
    (async () => {
      setLoading(true);
      const [{ data: profiles }, { data: linkList }] = await Promise.all([
        getProfiles(userId),
        getLinks(userId),
      ]);
      const p = Array.isArray(profiles) ? profiles[0] : null;
      setProfile(p);
      const sorted = (linkList || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter((l) => l.is_active !== false);
      setLinks(sorted);
      if (p) {
        setForm({
          title: p.title === 'Default Title' ? '' : p.title || '',
          bio: p.bio === 'Default Bio' ? '' : p.bio || '',
          avatar_url: p.avatar_url || '',
          is_public: p.is_public !== false,
        });
        if (p.custom_theme_id) {
          setThemeId(p.custom_theme_id);
          const { data: preview } = await getCustomThemePreview(p.custom_theme_id);
          if (preview) {
            setTheme({
              background_color: preview.background_color || FALLBACK_THEME.background_color,
              text_color: preview.text_color || FALLBACK_THEME.text_color,
              button_color: preview.button_color || FALLBACK_THEME.button_color,
              button_text_color: preview.button_text_color || FALLBACK_THEME.button_text_color,
              font_family: preview.font_family || 'system',
            });
          }
        }
      }
      setLoading(false);
    })();
  }, [userId, navigate]);

  if (!loading && !profile) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-[42rem] px-4 pt-16 text-center sm:px-6">
          <ErrorBanner message="We couldn't find a profile for your account. Try again shortly." />
        </main>
      </div>
    );
  }

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    const payload = {
      title: form.title.trim() || null,
      bio: form.bio.trim() === '' ? null : form.bio.trim(),
      avatar_url: form.avatar_url.trim() === '' ? null : form.avatar_url.trim(),
      is_public: form.is_public,
    };
    if (payload.avatar_url && !/^https?:\/\//i.test(payload.avatar_url)) {
      setProfileError('The avatar must be a full URL starting with http(s)://');
      return;
    }
    setSavingProfile(true);
    const { error } = await updateProfile(profile.id, payload);
    setSavingProfile(false);
    if (error) {
      setProfileError(error);
      return;
    }
    setProfile((p) => ({ ...p, ...payload }));
    toast('Profile saved');
  };

  const applyTheme = async (source) => {
    setSavingTheme(true);
    try {
      const payload = {
        name: source.name || `Theme ${new Date().toLocaleDateString()}`,
        background_color: source.background_color,
        text_color: source.text_color,
        button_color: source.button_color,
        button_text_color: source.button_text_color,
        font_family: source.font_family,
      };
      const { data: created, error: createError } = await createCustomTheme(payload);
      if (createError) {
        const is500 = /status code 500/i.test(createError) || /server/i.test(createError);
        toast(
          is500
            ? 'The server could not save this theme yet (500). Your colors stay applied to the preview — a backend fix is in progress.'
            : createError,
          'error',
        );
        return;
      }
      const applied = await applyCustomTheme(created.id);
      if (applied.error) {
        toast(
          /status code 500/.test(applied.error)
            ? 'Saved the theme but applying it failed — the backend may need that fix deployed.'
            : applied.error,
          'error',
        );
        return;
      }
      setThemeId(created.id);
      setTheme({ ...source });
      toast('Theme applied — your page is wearing it now');
    } finally {
      setSavingTheme(false);
    }
  };

  const publicUrl = profile?.id ? `${window.location.origin}/p/${profile.id}` : null;

  const previewTheme = {
    background_color: theme.background_color,
    text_color: theme.text_color,
    button_color: theme.button_color,
    button_text_color: theme.button_text_color,
    font_family: FONT_OPTIONS.find((f) => f.value === theme.font_family)?.css || theme.font_family,
  };

  const previewProfile = {
    ...profile,
    title: form.title || profile?.title,
    bio: form.bio || profile?.bio,
    avatar_url: form.avatar_url || profile?.avatar_url,
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="page-enter mx-auto max-w-shell px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">Appearance</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Design your page</h1>
          <p className="mt-1.5 text-[13px] text-mist-500">
            Text, avatar, visibility and theme. The preview updates as you type.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Left column: editors */}
          <div className="space-y-8">
            {/* Profile editor */}
            <section className="rounded-2xl border border-line bg-ink-850 p-5 shadow-card sm:p-6">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">Profile</p>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <form onSubmit={saveProfile} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={form.avatar_url || profile?.avatar_url} name={form.title || user?.name || 'U'} size={56} />
                    <div className="min-w-0 flex-1">
                      <Label htmlFor="avatar-url" hint="Falls back to your initial if the image fails">
                        Avatar image URL
                      </Label>
                      <Input
                        id="avatar-url"
                        type="url"
                        value={form.avatar_url}
                        placeholder="https://…/me.jpg"
                        onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="title">Display title</Label>
                    <Input
                      id="title"
                      maxLength={120}
                      value={form.title}
                      placeholder="Natoli — maker on the internet"
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" hint={`${form.bio.length}/1000`}>
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      maxLength={1000}
                      rows={3}
                      value={form.bio}
                      placeholder="One or two lines about what people will find behind these links."
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-line bg-ink-800 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-mist-100">Public page</p>
                      <p className="text-xs text-mist-500">
                        {form.is_public ? 'Anyone with your link can view it.' : 'Visitors will be told the page is private.'}
                      </p>
                    </div>
                    <Toggle
                      checked={form.is_public}
                      onChange={(v) => setForm({ ...form, is_public: v })}
                      label="Toggle public page"
                    />
                  </div>
                  {profileError && <ErrorBanner message={profileError} />}
                  <div className="flex justify-end pt-1">
                    <Button type="submit" size="md" disabled={savingProfile}>
                      {savingProfile ? 'Saving…' : 'Save profile'}
                    </Button>
                  </div>
                </form>
              )}
            </section>

            {/* Theme builder */}
            <section className="rounded-2xl border border-line bg-ink-850 p-5 shadow-card sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">Theme</p>
                {themeId && (
                  <span className="rounded-full bg-ion-dim px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ion">
                    Applied #{themeId}
                  </span>
                )}
              </div>

              <p className="mb-2.5 text-[13px] font-medium text-mist-100">Starting points</p>
              <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                {PRESETS.map((preset) => {
                  const selected =
                    preset.background_color === theme.background_color &&
                    preset.button_color === theme.button_color;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setTheme((t) => ({ ...preset, font_family: t.font_family }))}
                      className={`group overflow-hidden rounded-xl border transition-all duration-150 ${
                        selected ? 'border-ion glare' : 'border-line hover:border-line-strong'
                      }`}
                      title={`${preset.name} theme`}
                    >
                      <div className="h-14 w-full" style={{ background: preset.background_color }}>
                        <div className="flex h-full flex-col items-center justify-center gap-1 pt-4">
                          <span className="block h-1.5 w-3/4 rounded-full" style={{ background: preset.text_color, opacity: 0.85 }} />
                          <span className="block h-1.5 w-2/3 rounded-full" style={{ background: preset.text_color, opacity: 0.4 }} />
                        </div>
                      </div>
                      <div className="bg-ink-800 px-2 py-1.5">
                        <span className="block truncate rounded-full py-1 text-center text-[11px] font-semibold" style={{ backgroundColor: preset.button_color, color: preset.button_text_color }}>
                          Link
                        </span>
                      </div>
                      <p className="bg-ink-800 border-t border-line py-1.5 text-center text-[10px] text-mist-500">{preset.name}</p>
                    </button>
                  );
                })}
              </div>

              <p className="mb-2.5 text-[13px] font-medium text-mist-100">Fine tuning</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <ColorField label="Background" value={theme.background_color} onChange={(v) => setTheme({ ...theme, background_color: v })} />
                <ColorField label="Text" value={theme.text_color} onChange={(v) => setTheme({ ...theme, text_color: v })} />
                <ColorField label="Link button" value={theme.button_color} onChange={(v) => setTheme({ ...theme, button_color: v })} />
                <ColorField label="Link button text" value={theme.button_text_color} onChange={(v) => setTheme({ ...theme, button_text_color: v })} />
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-[13px] font-medium text-mist-100">Typeface</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setTheme({ ...theme, font_family: f.value })}
                      className={`rounded-lg border px-3 py-2 text-left text-[12.5px] transition-colors ${
                        theme.font_family === f.value
                          ? 'border-ion/60 bg-ion-dim text-ion'
                          : 'border-line bg-ink-800 text-mist-300 hover:border-line-strong'
                      }`}
                    >
                      <span className="block truncate" style={f.css ? { fontFamily: f.css } : undefined}>
                        {f.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button size="md" onClick={() => applyTheme(theme)} disabled={savingTheme}>
                  {savingTheme ? 'Applying…' : themeId ? 'Save & reapply theme' : 'Apply theme to my page'}
                </Button>
              </div>
            </section>
          </div>

          {/* Right column: live preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">Live preview</p>
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-line-strong bg-ink-900 shadow-pop">
              <div className="flex h-[560px] overflow-y-auto">
                <ProfileRenderer
                  profile={previewProfile}
                  links={links}
                  theme={previewTheme}
                  standalone={false}
                />
              </div>
            </div>

            {publicUrl && (
              <div className="mx-auto mt-4 w-full max-w-[320px] rounded-xl border border-line bg-ink-850 p-3.5">
                <p className="mb-2 text-[11px] text-mist-500">Public address</p>
                <div className="flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-lg bg-ink-800 px-2.5 py-2 font-mono text-[11px] text-mist-100">
                    {publicUrl}
                  </code>
                  <div className="flex gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="!px-2"
                      title="Copy"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(publicUrl);
                          toast('Public link copied');
                        } catch {
                          toast('Copy failed', 'error');
                        }
                      }}
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
                        <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" strokeLinecap="round" />
                      </svg>
                    </Button>
                    <a
                      href={`/p/${profile.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 items-center justify-center rounded-lg border border-line-strong bg-ink-600/60 px-2.5 text-xs font-medium text-mist-50 transition-colors hover:bg-ink-600"
                      title="Open public page"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M6.5 9.5 11 5M6.9 5H11v4.1" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.5 9.5v3a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 4 3.5h3" strokeLinecap="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Appearance;
