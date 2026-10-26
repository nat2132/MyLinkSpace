import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';

export default function Hero_1() {
  const [username, setUsername] = useState("");

  return (
    <Layout backgroundType="blackhole">
      <div className="min-h-screen w-full relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Heading & CTA */}
        <div className="lg:w-1/2 flex flex-col items-start text-left z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            ✨ Everything you are, in one link
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            All that you are, <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              captured in one link.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
            Join thousands using <strong className="text-white">MyLinkSpace</strong> to share everything they create, curate, and sell across Instagram, TikTok, YouTube, and all social platforms.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/signup?username=${encodeURIComponent(username)}`;
            }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
          >
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono">
                mylinkspace.co/
              </span>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourname"
                className="bg-slate-900/80 border-slate-700 text-white pl-32 pr-4 h-14 rounded-2xl text-base focus:border-purple-500 w-full"
              />
            </div>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white rounded-2xl h-14 px-8 text-base font-bold transition-all shadow-lg shadow-purple-500/30 whitespace-nowrap w-full sm:w-auto"
            >
              Claim Space
            </Button>
          </form>
        </div>

        {/* Right Column: Sleek Linktree Phone Mockup */}
        <div className="lg:w-1/2 relative w-full flex items-center justify-center z-10">
          <div className="relative w-72 sm:w-80 rounded-[40px] border-4 border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-28 bg-slate-900 rounded-full border border-slate-800" />

            {/* Profile Header */}
            <div className="flex flex-col items-center mt-6 mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 mb-3 shadow-lg">
                <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-2xl border-2 border-slate-950">
                  NA
                </div>
              </div>
              <h3 className="text-white font-bold text-lg">@natoli_dev</h3>
              <p className="text-xs text-slate-400 mt-1 text-center">Full-Stack Software Developer &amp; Creator</p>
            </div>

            {/* Links Stack */}
            <div className="space-y-3">
              {[
                { name: "🚀 Portfolio & Projects", url: "#", color: "from-purple-600/30 to-indigo-600/30 border-purple-500/40" },
                { name: "⚡ GitHub Code Repos", url: "#", color: "from-slate-800/80 to-slate-800/50 border-slate-700" },
                { name: "💬 Telegram & Direct Chat", url: "#", color: "from-blue-600/30 to-sky-600/30 border-blue-500/40" },
                { name: "👔 LinkedIn Professional Profile", url: "#", color: "from-slate-800/80 to-slate-800/50 border-slate-700" },
              ].map((link, idx) => (
                <div
                  key={idx}
                  className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${link.color} border text-white text-xs font-semibold text-center shadow-sm hover:scale-[1.02] transition-transform cursor-pointer`}
                >
                  {link.name}
                </div>
              ))}
            </div>

            {/* Footer Badge */}
            <div className="mt-8 text-center text-[10px] text-slate-500 font-medium">
              Powered by <span className="text-purple-400 font-bold">MyLinkSpace</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
