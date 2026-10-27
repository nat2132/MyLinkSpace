import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileRenderer from '../../components/ProfileRenderer';
import { ErrorBanner, Skeleton } from '../../components/ui/kit';
import { getCustomThemePreview, getLinks, getPublicProfile } from '../../lib/api';

/**
 * Public "link in bio" page: /p/:profileId
 * Guest-noauth data: GET /api/profile/{id} → profile (has user_id).
 * Links: GET /api/users/{userId}/links (public endpoint).
 * Optional styling: GET /api/custom-themes/{customThemeId}/preview.
 */
function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState(null);
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [linksError, setLinksError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');

      if (!/^\d+$/.test(String(id))) {
        setError('This link is not a valid profile address.');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await getPublicProfile(id);
      if (cancelled) return;
      if (fetchError || !data) {
        setError(fetchError || 'Profile not found.');
        setLoading(false);
        return;
      }
      setProfile(data);

      // Style: custom theme (if applied). Everything else falls back to the
      // default dark treatment inside the renderer.
      if (data.custom_theme_id) {
        const { data: themeData } = await getCustomThemePreview(data.custom_theme_id);
        if (!cancelled && themeData) setTheme(themeData);
      }

      try {
        const { data: list, error: linksFetchError } = await getLinks(data.user_id);
        if (!cancelled) {
          const items = list || [];
          items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setLinks(items);
          if (linksFetchError) setLinksError('Links could not be loaded — this page may look empty.');
        }
      } catch {
        if (!cancelled) {
          setLinks([]);
          setLinksError('Links could not be loaded — this page may look empty.');
        }
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (profile) document.title = `${profile.title || 'Profile'} — MyLinkSpace`;
    return () => {
      document.title = 'MyLinkSpace — Your Links, Dark & Fast';
    };
  }, [profile]);

  if (error) {
    return (
      <div className="page-enter grid min-h-screen place-items-center px-6">
        <div className="w-full max-w-sm">
          <ErrorBanner message={error} />
          <a
            href="/"
            className="mt-4 block rounded-xl border border-line bg-ink-800 px-4 py-2.5 text-center text-sm text-mist-50 hover:border-line-strong"
          >
            Go to MyLinkSpace
          </a>
        </div>
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="mx-auto max-w-[34rem] px-5 pt-20">
        <div className="flex flex-col items-center">
          <Skeleton className="h-[88px] w-[88px] rounded-full" />
          <Skeleton className="mt-4 h-6 w-44" />
          <Skeleton className="mt-3 h-4 w-64" />
          <div className="mt-8 w-full space-y-3">
            <Skeleton className="h-[52px] w-full rounded-xl" />
            <Skeleton className="h-[52px] w-full rounded-xl" />
            <Skeleton className="h-[52px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen">
      {linksError && (
        <div className="mx-auto max-w-md px-5 pt-8">
          <ErrorBanner message={linksError} />
        </div>
      )}
      <ProfileRenderer profile={profile} links={links || []} theme={theme} standalone />
    </div>
  );
}

export default PublicProfile;
