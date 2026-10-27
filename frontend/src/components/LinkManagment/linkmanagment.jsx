import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import {
  Button,
  EmptyState,
  ErrorBanner,
  Input,
  Label,
  Skeleton,
  useToast,
} from '../ui/kit';
import {
  createLink,
  deleteLink,
  getLinks,
  getStoredUserId,
  reorderLinks,
  updateLink,
} from '../../lib/api';

const sortLinks = (list) => list.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

function LinkCard({
  link,
  index,
  count,
  busy,
  onMove,
  onEdited,
  onDelete,
  draggingId,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: link.title || '', url: link.url || '' });
  const [active, setActive] = useState(link.is_active !== false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editing) {
      setForm({ title: link.title || '', url: link.url || '' });
      setActive(link.is_active !== false);
    }
  }, [editing, link.title, link.url, link.is_active]);

  const saveEdits = async () => {
    setError('');
    const url = form.url.trim();
    let title = form.title.trim();
    if (!url) {
      setError('A destination URL is required.');
      return;
    }
    if (!title) title = url;
    setSaving(true);
    const payload = { title, url, is_active: active };
    const { error: updateError } = await updateLink(link.user_id, link.id, payload);
    setSaving(false);
    if (updateError) {
      setError(updateError);
      return;
    }
    setEditing(false);
    onEdited({ ...link, ...payload });
  };

  return (
    <li
      draggable={!editing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`rounded-2xl border bg-ink-850 shadow-card transition-all duration-150 ${
        draggingId === link.id
          ? 'border-ion/40 opacity-60'
          : dragOverIndex === index
            ? 'border-ion/60'
            : 'border-line hover:border-line-strong'
      }`}
    >
      {!editing ? (
        <div className="flex flex-wrap items-center gap-3 px-4 py-3.5">
          <button
            aria-label="Drag to reorder"
            className="cursor-grab text-mist-700 transition-colors hover:text-mist-300 active:cursor-grabbing"
            title="Drag to reorder"
          >
            <svg viewBox="0 0 10 14" className="h-3.5 w-3.5" fill="currentColor">
              <circle cx="3" cy="3" r="1.2" /><circle cx="7" cy="3" r="1.2" />
              <circle cx="3" cy="7" r="1.2" /><circle cx="7" cy="7" r="1.2" />
              <circle cx="3" cy="11" r="1.2" /><circle cx="7" cy="11" r="1.2" />
            </svg>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium text-mist-50">{link.title || link.url}</p>
              {link.is_active === false && (
                <span className="shrink-0 rounded-full bg-ink-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mist-500">
                  Off
                </span>
              )}
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block max-w-[16rem] truncate text-xs text-mist-500 hover:text-ion sm:max-w-md"
            >
              {link.url}
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex flex-col overflow-hidden rounded-lg border border-line max-sm:hidden">
              <button
                aria-label="Move up"
                disabled={index === 0 || busy}
                onClick={() => onMove(index, -1)}
                className="px-1.5 py-0.5 text-mist-500 hover:bg-ink-600 hover:text-mist-50 disabled:opacity-30"
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 7.5 6 4l3.5 3.5" /></svg>
              </button>
              <button
                aria-label="Move down"
                disabled={index === count - 1 || busy}
                onClick={() => onMove(index, 1)}
                className="border-t border-line px-1.5 py-0.5 text-mist-500 hover:bg-ink-600 hover:text-mist-50 disabled:opacity-30"
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
              </button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete} disabled={busy}>
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5 p-4">
          <div>
            <Label htmlFor={`title-${link.id}`}>Title</Label>
            <Input
              id={`title-${link.id}`}
              value={form.title}
              placeholder="Title shown on your page (defaults to the URL)"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`url-${link.id}`}>Destination URL</Label>
            <Input
              id={`url-${link.id}`}
              type="url"
              value={form.url}
              invalid={Boolean(error)}
              placeholder="https://…"
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => setActive(!active)}
            className={`flex items-center gap-2.5 text-[13px] transition-colors ${
              active ? 'text-mist-100' : 'text-mist-500'
            }`}
          >
            <span className={`relative h-5 w-9 rounded-full transition-colors ${active ? 'bg-ion' : 'bg-ink-600 border border-line-strong'}`}>
              <span className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all ${active ? 'left-[20px] bg-ink-900' : 'left-0.5 bg-mist-300'}`} />
            </span>
            {active ? 'Visible on your page' : 'Hidden from your page'}
          </button>

          {error && <ErrorBanner message={error} />}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="md" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button size="md" onClick={saveEdits} disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

function LinkManagment() {
  const navigate = useNavigate();
  const toast = useToast();
  const userId = useMemo(() => getStoredUserId(), []);

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [addForm, setAddForm] = useState({ title: '', url: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [busy, setBusy] = useState(false);

  const [draggingId, setDraggingId] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate('/signin', { replace: true });
      return;
    }
    (async () => {
      setLoading(true);
      const { data, error: fetchError } = await getLinks(userId);
      setLinks(sortLinks(data || []));
      if (fetchError) setError(fetchError);
      setLoading(false);
    })();
  }, [userId, navigate]);

  const refetch = async () => {
    const { data } = await getLinks(userId);
    if (data) setLinks(sortLinks(data));
  };

  /** Commit a new id order through PUT /users/{id}/links/reorder */
  const commitOrder = async (nextByOrder) => {
    const ids = nextByOrder.map((l) => l.id);
    setLinks(nextByOrder.map((l, i) => ({ ...l, order: i })));
    setBusy(true);
    const { error } = await reorderLinks(userId, ids);
    setBusy(false);
    if (error) {
      await refetch();
      toast(error, 'error');
      return false;
    }
    return true;
  };

  const move = async (index, direction) => {
    const next = links.slice();
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    const ok = await commitOrder(next);
    if (ok) toast('Order updated');
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (draggingId === null || dragOverIndex === null) {
      setDraggingId(null);
      setDragOverIndex(null);
      return;
    }
    const from = links.findIndex((l) => l.id === draggingId);
    const to = dragOverIndex;
    setDraggingId(null);
    setDragOverIndex(null);
    if (from === -1 || to >= links.length || from === to) return;
    const next = links.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    const ok = await commitOrder(next);
    if (ok) toast('Order saved');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddError('');
    const url = addForm.url.trim();
    if (!url) {
      setAddError('A destination URL is required.');
      return;
    }
    let title = addForm.title.trim();
    if (!title) title = url;
    setAdding(true);
    const { data, error: createError } = await createLink(userId, { title, url, is_active: true });
    setAdding(false);
    if (createError) {
      setAddError(createError);
      return;
    }
    setAddForm({ title: '', url: '' });
    setLinks((prev) => sortLinks([...prev, data]));
    toast('Link added to your page');
  };

  const handleDelete = async (link) => {
    setDeletingId(link.id);
    const { error } = await deleteLink(userId, link.id);
    setDeletingId(null);
    setConfirmId(null);
    if (error) {
      toast(error, 'error');
      return;
    }
    setLinks((prev) => prev.filter((l) => l.id !== link.id));
    toast('Link removed');
  };

  const handleEdited = (updated) => {
    setLinks((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)));
    toast('Link updated');
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="page-enter mx-auto max-w-[52rem] px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">Links</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Manage destinations</h1>
          <p className="mt-1.5 text-[13px] text-mist-500">
            Drag to reorder, or use the arrows. Changes appear on your public page immediately.
          </p>
        </div>

        {error && <div className="mb-6"><ErrorBanner message={error} /></div>}

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-[64px] rounded-2xl" />
            <Skeleton className="h-[64px] rounded-2xl" />
            <Skeleton className="h-[64px] rounded-2xl" />
          </div>
        ) : (
          <>
            {/* Add form */}
            <form
              onSubmit={handleAdd}
              className="mb-10 rounded-2xl border border-line bg-ink-850 p-5 shadow-card"
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">
                New link
              </p>
              <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end">
                <div>
                  <Label htmlFor="add-title">Title</Label>
                  <Input
                    id="add-title"
                    value={addForm.title}
                    placeholder="Portfolio, GitHub, Podcast…"
                    onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="add-url">Destination URL</Label>
                  <Input
                    id="add-url"
                    type="url"
                    value={addForm.url}
                    invalid={Boolean(addError)}
                    placeholder="https://…"
                    onChange={(e) => setAddForm({ ...addForm, url: e.target.value })}
                  />
                </div>
                <Button type="submit" size="md" disabled={adding} className="max-sm:w-full">
                  {adding ? 'Adding…' : 'Add link'}
                </Button>
              </div>
              {addError && <div className="mt-3"><ErrorBanner message={addError} /></div>}
            </form>

            {/* List */}
            {links.length === 0 ? (
              <EmptyState
                title="Your list is empty"
                body="Every link you add above is stacked here in order and rendered as a button on your public bio page."
              />
            ) : (
              <ul
                className="space-y-2.5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {links.map((link, i) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    index={i}
                    count={links.length}
                    busy={busy || deletingId === link.id}
                    onMove={move}
                    onEdited={handleEdited}
                    onDelete={() => {
                      if (confirmId === link.id) {
                        handleDelete(link);
                      } else {
                        setConfirmId(link.id);
                        toast('Click delete again to confirm removal.', 'error');
                      }
                    }}
                    draggingId={draggingId}
                    dragOverIndex={dragOverIndex}
                    onDragStart={() => setDraggingId(link.id)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverIndex(i);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOverIndex(null);
                    }}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default LinkManagment;
