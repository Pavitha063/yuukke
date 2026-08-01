'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Spinner, cn } from '../../components/ui';
import {
  LANGUAGES,
  PLATFORM_LABELS,
  type CalendarPost,
  type LanguageCode,
  type Platform,
} from '../../lib/types';
import { PostEditor } from './PostEditor';

const PLATFORM_STYLES: Record<Platform, { bar: string; text: string }> = {
  instagram: { bar: 'bg-pink-500', text: 'text-pink-300' },
  linkedin: { bar: 'bg-sky-500', text: 'text-sky-300' },
  youtube: { bar: 'bg-red-500', text: 'text-red-300' },
};

const STATUS_TONE = {
  draft: 'neutral',
  approved: 'brand',
  scheduled: 'brand',
  posted: 'success',
  failed: 'danger',
} as const;

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const day = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - day);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const DAY_FMT = new Intl.DateTimeFormat('en-IN', { weekday: 'short' });
const TIME_FMT = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' });
const RANGE_FMT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });

export function CalendarBoard({
  initialPosts,
  languages,
}: {
  initialPosts: CalendarPost[];
  languages: LanguageCode[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [language, setLanguage] = useState<LanguageCode>(languages[0] ?? 'en');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<CalendarPost | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOverDay, setDragOverDay] = useState<number | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const visible = useMemo(
    () => posts.filter((post) => post.language === language),
    [posts, language],
  );

  const byDay = useMemo(() => {
    const map = new Map<number, CalendarPost[]>();
    for (const post of visible) {
      const date = new Date(post.scheduled_date);
      const index = days.findIndex((day) => sameDay(day, date));
      if (index === -1) continue;
      const list = map.get(index) ?? [];
      list.push(post);
      map.set(index, list);
    }
    for (const list of map.values()) {
      list.sort(
        (a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime(),
      );
    }
    return map;
  }, [visible, days]);

  const outsideWeek = visible.length - [...byDay.values()].flat().length;

  function toggleSelect(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function upsert(updated: CalendarPost) {
    setPosts((current) => current.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
  }

  async function moveToDay(postId: string, dayIndex: number) {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const original = new Date(post.scheduled_date);
    const target = new Date(days[dayIndex]);
    target.setHours(original.getHours(), original.getMinutes(), 0, 0);
    if (sameDay(original, target)) return;

    upsert({ ...post, scheduled_date: target.toISOString() });
  }

  async function scheduleSelected() {
    if (selected.size === 0) return;
    setBulkBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setPosts((current) =>
      current.map((post) =>
        selected.has(post.id) ? { ...post, status: 'scheduled' } : post,
      ),
    );
    const count = selected.size;
    setSelected(new Set());
    setBulkBusy(false);
    setNotice(`${count} post${count === 1 ? '' : 's'} scheduled (simulation mode)`);
  }

  const weekLabel = `${RANGE_FMT.format(days[0])} – ${RANGE_FMT.format(days[6])}`;
  const today = new Date();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            className="px-2.5"
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            aria-label="Previous week"
          >
            ←
          </Button>
          <Button
            variant="secondary"
            className="px-2.5"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            aria-label="Next week"
          >
            →
          </Button>
          <Button variant="ghost" onClick={() => setWeekStart(startOfWeek(new Date()))}>
            Today
          </Button>
        </div>

        <p className="text-sm font-medium">{weekLabel}</p>

        {languages.length > 1 && (
          <div className="flex rounded-lg border border-[var(--border)] p-0.5">
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs transition-colors',
                  language === code
                    ? 'bg-[var(--surface-raised)] text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]',
                )}
              >
                {LANGUAGES[code]}
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <span className="text-xs text-[var(--muted)]">{selected.size} selected</span>
              <Button variant="ghost" onClick={() => setSelected(new Set())}>
                Clear
              </Button>
            </>
          )}
          <Button onClick={() => void scheduleSelected()} disabled={selected.size === 0 || bulkBusy}>
            {bulkBusy && <Spinner />}
            Approve &amp; schedule{selected.size > 0 ? ` (${selected.size})` : ''}
          </Button>
        </div>
      </div>

      {notice && (
        <p className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
          {notice}
        </p>
      )}

      <p className="mt-3 text-xs text-[var(--muted)]">
        Simulation mode: scheduling updates status without publishing to a live account.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-7">
        {days.map((day, index) => {
          const dayPosts = byDay.get(index) ?? [];
          const isToday = sameDay(day, today);

          return (
            <div
              key={index}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOverDay(index);
              }}
              onDragLeave={() => setDragOverDay((d) => (d === index ? null : d))}
              onDrop={(event) => {
                event.preventDefault();
                setDragOverDay(null);
                if (dragging) void moveToDay(dragging, index);
                setDragging(null);
              }}
              className={cn(
                'min-h-44 rounded-lg border p-2 transition-colors',
                dragOverDay === index
                  ? 'border-[var(--brand)] bg-[var(--brand)]/5'
                  : 'border-[var(--border)] bg-[var(--surface)]/40',
              )}
            >
              <div className="mb-2 flex items-baseline gap-1.5 px-1">
                <span className="text-xs font-medium text-[var(--muted)]">
                  {DAY_FMT.format(day)}
                </span>
                <span
                  className={cn(
                    'text-xs tabular-nums',
                    isToday
                      ? 'flex size-5 items-center justify-center rounded-full bg-[var(--brand)] text-white'
                      : 'text-[var(--muted)]',
                  )}
                >
                  {day.getDate()}
                </span>
              </div>

              <div className="space-y-2">
                {dayPosts.map((post) => {
                  const style = PLATFORM_STYLES[post.platform];
                  const isSelected = selected.has(post.id);
                  const locked = post.status === 'posted' || post.status === 'scheduled';

                  return (
                    <article
                      key={post.id}
                      draggable={!locked}
                      onDragStart={() => setDragging(post.id)}
                      onDragEnd={() => setDragging(null)}
                      onClick={() => setEditing(post)}
                      className={cn(
                        'group relative cursor-pointer overflow-hidden rounded-lg border bg-[var(--surface-raised)] transition-all',
                        isSelected
                          ? 'border-[var(--brand)] ring-1 ring-[var(--brand)]'
                          : 'border-[var(--border)] hover:border-[var(--muted)]',
                        dragging === post.id && 'opacity-40',
                        post.is_festival_post && !isSelected && 'border-orange-400/40',
                      )}
                    >
                      <div className={cn('h-0.5 w-full', style.bar)} />

                      {post.media_url && (
                        <div className="relative h-16 w-full">
                          <img src={post.media_url} alt="" className="h-full w-full object-cover" />
                        </div>
                      )}

                      <div className="space-y-1.5 p-2">
                        <div className="flex items-center gap-1">
                          <span className={cn('text-[10px] font-medium', style.text)}>
                            {PLATFORM_LABELS[post.platform]}
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">
                            {TIME_FMT.format(new Date(post.scheduled_date))}
                          </span>
                          {!locked && (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleSelect(post.id);
                              }}
                              aria-label={isSelected ? 'Deselect post' : 'Select post'}
                              className={cn(
                                'ml-auto size-3.5 shrink-0 rounded border transition-colors',
                                isSelected
                                  ? 'border-[var(--brand)] bg-[var(--brand)]'
                                  : 'border-[var(--border)] opacity-0 group-hover:opacity-100',
                              )}
                            />
                          )}
                        </div>

                        {post.is_festival_post && post.festival_name && (
                          <Badge tone="festival">🪔 {post.festival_name}</Badge>
                        )}

                        <p className="line-clamp-3 text-[11px] leading-snug text-[var(--foreground)]/85">
                          {post.caption}
                        </p>

                        {post.status !== 'draft' && (
                          <Badge tone={STATUS_TONE[post.status]}>{post.status}</Badge>
                        )}
                      </div>
                    </article>
                  );
                })}

                {dayPosts.length === 0 && (
                  <p className="px-1 py-3 text-center text-[11px] text-[var(--muted)]/60">—</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {outsideWeek > 0 && (
        <p className="mt-4 text-xs text-[var(--muted)]">
          {outsideWeek} more {language === 'en' ? '' : `${LANGUAGES[language]} `}post
          {outsideWeek === 1 ? '' : 's'} fall outside this week. Use the arrows to find them.
        </p>
      )}

      {visible.length === 0 && (
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          No posts in {LANGUAGES[language]} yet.
        </p>
      )}

      {editing && (
        <PostEditor
          post={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            upsert(updated);
            setEditing((current) =>
              current && current.id === updated.id ? { ...current, ...updated } : current,
            );
          }}
          onDeleted={(id) => setPosts((current) => current.filter((p) => p.id !== id))}
        />
      )}
    </div>
  );
}
