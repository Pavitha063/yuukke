import type { ComponentProps, ReactNode } from 'react';

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

const BUTTON_VARIANTS = {
  primary:
    'bg-[var(--brand)] text-white hover:brightness-110 disabled:hover:brightness-100',
  secondary:
    'bg-[var(--surface-raised)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--muted)]',
  ghost: 'text-[var(--muted)] hover:text-[var(--foreground)]',
  danger: 'bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20',
} as const;

export function Button({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: keyof typeof BUTTON_VARIANTS }) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium',
        'transition-all disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]',
        BUTTON_VARIANTS[variant],
        className,
      )}
    />
  );
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5',
        className,
      )}
    />
  );
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'festival';
  className?: string;
}) {
  const tones = {
    neutral: 'bg-white/5 text-[var(--muted)] border-white/10',
    brand: 'bg-[var(--brand)]/15 text-indigo-300 border-[var(--brand)]/30',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-300 border-red-500/30',
    festival: 'bg-orange-500/20 text-orange-200 border-orange-400/40',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-tight',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2',
        'text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]',
        'focus:border-[var(--brand)] focus:outline-none',
        className,
      )}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2',
        'text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]',
        'focus:border-[var(--brand)] focus:outline-none resize-y',
        className,
      )}
    />
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
