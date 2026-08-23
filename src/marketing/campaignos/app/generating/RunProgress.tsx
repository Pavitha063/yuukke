'use client';

import { useEffect, useState } from 'react';
import { Button, Spinner } from '../../components/ui';
import type { GenerationRun, RunStep } from '../../lib/types';

function StepIcon({ status }: { status: RunStep['status'] }) {
  if (status === 'complete') return <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">✓</span>;
  if (status === 'running') return <span className="animate-pulse-ring flex size-5 items-center justify-center rounded-full bg-[var(--brand)]/25 text-indigo-300"><Spinner className="size-3" /></span>;
  if (status === 'failed') return <span className="flex size-5 items-center justify-center rounded-full bg-red-500/20 text-red-300">✕</span>;
  if (status === 'skipped') return <span className="flex size-5 items-center justify-center rounded-full bg-white/5 text-[var(--muted)]">—</span>;
  return <span className="size-5 rounded-full border border-[var(--border)]" />;
}

const ORDER = ['discovery', 'brand', 'website', 'strategy', 'calendar', 'festival'];

export function RunProgress({
  initialRun,
  onComplete,
}: {
  initialRun: GenerationRun;
  onComplete: () => void;
}) {
  const [run, setRun] = useState<GenerationRun>(initialRun);

  useEffect(() => {
    const timers: number[] = [];
    ORDER.forEach((key, idx) => {
      timers.push(
        window.setTimeout(() => {
          setRun((current) => {
            const nextSteps = current.steps.map((s) => {
              if (s.key === key) return { ...s, status: 'running' as const };
              return s;
            });
            return { ...current, steps: nextSteps, status: 'running' };
          });
        }, 700 + idx * 500),
      );
      timers.push(
        window.setTimeout(() => {
          setRun((current) => {
            const nextSteps = current.steps.map((s) => {
              if (s.key === key) return { ...s, status: 'complete' as const };
              return s;
            });
            const done = nextSteps.every((s) => s.status === 'complete');
            return { ...current, steps: nextSteps, status: done ? 'complete' : 'running' };
          });
        }, 1000 + idx * 500),
      );
    });

    timers.push(window.setTimeout(onComplete, 4400));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onComplete]);

  const steps = run.steps;
  const done = steps.filter((s) => s.status === 'complete' || s.status === 'skipped').length;
  const progress = steps.length > 0 ? Math.round((done / steps.length) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">
        {run.status === 'complete' ? 'Everything is ready' : 'Building your marketing stack'}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {run.status === 'complete'
          ? 'Taking you to your dashboard…'
          : 'Six agents are running. This usually takes two to three minutes.'}
      </p>

      <div className="mt-6 h-1 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-[var(--brand)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="mt-8 space-y-1">
        {steps.map((step) => (
          <li
            key={step.key}
            className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
              step.status === 'running' ? 'bg-[var(--surface)]' : ''
            }`}
          >
            <div className="mt-0.5">
              <StepIcon status={step.status} />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm ${
                  step.status === 'pending' ? 'text-[var(--muted)]' : 'text-[var(--foreground)]'
                }`}
              >
                {step.label}
              </p>
              {step.detail && (
                <p className="mt-0.5 truncate text-xs text-[var(--muted)]">{step.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {(run.status === 'complete' || run.status === 'failed') && (
        <div className="mt-8">
          <Button onClick={onComplete}>Go to dashboard</Button>
        </div>
      )}
    </div>
  );
}
