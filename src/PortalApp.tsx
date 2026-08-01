import { useEffect, useState } from 'react';
import App from './App';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Entrepreneurs Portal', path: '/entrepreneurs' },
  { label: 'Marketing Portal', path: '/marketing' },
];

function navigate(path: string, setPathname: (value: string) => void) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  setPathname(path);
}

function PortalNav({ pathname, onNavigate }: { pathname: string; onNavigate: (path: string) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#fdfaf6]/95 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('/')}
          className="font-serif text-2xl font-extrabold tracking-tight text-[#1a1a1a] transition-colors hover:text-[#8a1f3d]"
        >
          Yuukke<span className="text-[#8a1f3d]">.</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          {NAV_LINKS.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 ${
                pathname === item.path
                  ? 'border-[#8a1f3d] bg-[#8a1f3d] text-white'
                  : 'border-[#8a1f3d] text-[#8a1f3d] hover:bg-[#8a1f3d] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

function LandingPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-[#8a1f3d]/20 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#8a1f3d]">Yuukke Platform</p>
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] sm:text-5xl">
          Empowering entrepreneurs and marketing teams to grow together.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-700">
          Yuukke exists to help women-led businesses launch faster, sell better, and build sustainable growth. Use the
          Entrepreneurs Portal for the current Yuukke experience, or enter the Marketing Portal scaffold as we prepare
          the merged campaign workflows.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('/entrepreneurs')}
            className="rounded-full bg-[#8a1f3d] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#721831]"
          >
            Entrepreneurs Portal
          </button>
          <button
            onClick={() => onNavigate('/marketing')}
            className="rounded-full border border-[#8a1f3d] px-6 py-3 text-sm font-bold text-[#8a1f3d] transition-colors hover:bg-[#8a1f3d] hover:text-white"
          >
            Marketing Portal
          </button>
        </div>
      </section>
    </main>
  );
}

function MarketingPlaceholder() {
  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-[#8a1f3d]/20 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Marketing Portal</h1>
        <p className="mt-4 text-base text-gray-700">
          This portal scaffold is ready for campaignOS integration in a follow-up PR. No campaignOS feature logic is
          imported in PR-1.
        </p>
      </section>
    </main>
  );
}

export default function PortalApp() {
  const [pathname, setPathname] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (path: string) => navigate(path, setPathname);

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#1a1a1a] font-sans selection:bg-[#8a1f3d] selection:text-white">
      <PortalNav pathname={pathname} onNavigate={handleNavigate} />
      {pathname === '/' && <LandingPage onNavigate={handleNavigate} />}
      {pathname === '/entrepreneurs' && <App />}
      {pathname === '/marketing' && <MarketingPlaceholder />}
      {!['/', '/entrepreneurs', '/marketing'].includes(pathname) && <LandingPage onNavigate={handleNavigate} />}
    </div>
  );
}
