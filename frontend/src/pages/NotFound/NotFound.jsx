import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-enter grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist-500">404</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">This space is empty</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-mist-500">
          The page you're looking for was moved, renamed or never existed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-ion px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-ion-deep"
        >
          Back to MyLinkSpace
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
