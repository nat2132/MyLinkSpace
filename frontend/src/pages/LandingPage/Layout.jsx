import { useState, useEffect } from 'react';
import Header from './Header'
import PropTypes from 'prop-types';
import BlackHoleBackground from '../../components/ui/BlackHoleBackground';

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#04071D] relative overflow-hidden">
      {mounted && (
        <div className="fixed inset-0 z-0">
          <BlackHoleBackground />
        </div>
      )}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32">
          {children}
        </main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
