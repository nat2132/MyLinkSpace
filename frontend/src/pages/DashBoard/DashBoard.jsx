import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/header';
import { getLinks, createLink, getStoredUserId } from '../../lib/api';
import { CiCircleRemove } from "react-icons/ci";
import { GoPencil, GoShare } from "react-icons/go";
import { BsTiktok } from "react-icons/bs";
import { CiImageOn, CiStar, CiLock } from "react-icons/ci";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";

function DashBoard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addForm, setAddForm] = useState({ title: '', url: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      setError('');
      const userId = getStoredUserId();
      if (!userId) {
        setError('You are not logged in. Please log in to view your links.');
        setLoading(false);
        return;
      }
      const { data, error: fetchError } = await getLinks(userId);
      if (fetchError) {
        setError(fetchError);
      } else {
        setLinks(data || []);
      }
      setLoading(false);
    };

    fetchLinks();
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    setAddError('');
    if (!addForm.url.trim()) {
      setAddError('Enter a URL first.');
      return;
    }
    const userId = getStoredUserId();
    if (!userId) {
      setAddError('You are not logged in.');
      return;
    }
    setAdding(true);
    const title = addForm.title.trim() || addForm.url.trim();
    const { error: createError } = await createLink(userId, { title, url: addForm.url.trim() });
    setAdding(false);
    if (createError) {
      setAddError(createError);
      return;
    }
    setAddForm({ title: '', url: '' });
    const { data } = await getLinks(userId);
    if (data) setLinks(data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-28">
        {/* Top Header Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Links &amp; Analytics Dashboard</h1>
            <p className="text-sm text-slate-400 mt-1">Manage your active bio links, track click counts, and customize your profile.</p>
          </div>
          <button
            onClick={() => {
              const url = window.location.origin;
              navigator.clipboard?.writeText(url);
              alert(`Bio Link copied: ${url}`);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-500/20"
          >
            <GoShare /> Share My Bio Link
          </button>
        </div>

        {/* Analytics Card */}
        <div className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Click Analytics</h3>
          {loading ? (
            <div className="animate-pulse h-32 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 text-sm">
              Loading real-time analytics...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-slate-400">Total Bio Links</span>
                <p className="text-3xl font-extrabold text-white mt-1">{links.length}</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-slate-400">Total Link Clicks</span>
                <p className="text-3xl font-extrabold text-emerald-400 mt-1">{links.reduce((acc, l) => acc + (l.clicks || 0), 0)}</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-slate-400">Active Status</span>
                <p className="text-3xl font-extrabold text-purple-400 mt-1">100% Online</p>
              </div>
            </div>
          )}
        </div>

        {/* Add Link Form & List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add New Bio Link</h3>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Link Title</label>
                <input
                  type="text"
                  placeholder="e.g. My GitHub Repository"
                  value={addForm.title}
                  onChange={(e) => setAddForm({...addForm, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Destination URL *</label>
                <input
                  type="url"
                  placeholder="https://github.com/nat2132"
                  value={addForm.url}
                  onChange={(e) => setAddForm({...addForm, url: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              {addError && <p className="text-xs text-rose-400">{addError}</p>}

              <button
                type="submit"
                disabled={adding}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-500/20"
              >
                {adding ? 'Adding Link...' : '+ Add Link to Profile'}
              </button>
            </form>
          </div>

          {/* Links List */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Your Bio Links</h3>
              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse h-12 bg-slate-950 rounded-xl" />
                  <div className="animate-pulse h-12 bg-slate-950 rounded-xl" />
                </div>
              ) : links.length > 0 ? (
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.id || link.url} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="overflow-hidden pr-2">
                        <p className="font-semibold text-sm text-white line-clamp-1">{link.title || link.url}</p>
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-purple-400 hover:underline line-clamp-1">
                          {link.url}
                        </a>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                        Active
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center text-slate-400 text-sm bg-slate-950 rounded-xl border border-slate-800">
                  No links added yet. Use the form to add your first link.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;
