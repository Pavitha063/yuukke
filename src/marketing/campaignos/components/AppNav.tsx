export function AppNav({
  current,
  onNavigate,
}: {
  current: 'home' | 'dashboard' | 'calendar';
  onNavigate: (page: 'home' | 'dashboard' | 'calendar') => void;
}) {
  const links = [
    { label: 'Home', key: 'home' as const },
    { label: 'Overview', key: 'dashboard' as const },
    { label: 'Calendar', key: 'calendar' as const },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <button onClick={() => onNavigate('home')} className="text-sm font-semibold tracking-tight">
          CampaignOS
        </button>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => onNavigate(link.key)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                current === link.key
                  ? 'bg-[var(--surface-raised)] text-[var(--foreground)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
