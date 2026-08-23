'use client';

import { useState } from 'react';
import { Spinner } from '../../components/ui';

export function LogoPicker({
  options,
  initialSelected,
}: {
  options: string[];
  initialSelected: string | null;
}) {
  const [selected, setSelected] = useState(initialSelected);
  const [saving, setSaving] = useState<string | null>(null);

  async function choose(url: string) {
    if (url === selected) return;
    setSaving(url);
    setSelected(url);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setSaving(null);
  }

  if (options.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        No logo was generated. Either the business already had branding, or image generation was
        unavailable during the run.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((url) => {
        const isSelected = url === selected;
        return (
          <button
            key={url}
            type="button"
            onClick={() => void choose(url)}
            aria-pressed={isSelected}
            className={`group relative aspect-square overflow-hidden rounded-lg border-2 bg-white transition-all ${
              isSelected
                ? 'border-[var(--brand)]'
                : 'border-transparent hover:border-[var(--border)]'
            }`}
          >
            <img src={url} alt="Logo option" className="h-full w-full object-contain p-2" />
            {saving === url && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                <Spinner />
              </span>
            )}
            {isSelected && saving !== url && (
              <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-[var(--brand)] text-white">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2.5 6.5 5 9l4.5-5.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
