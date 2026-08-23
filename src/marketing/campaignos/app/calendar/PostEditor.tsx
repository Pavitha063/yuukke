'use client';

import { useEffect, useState } from 'react';
import { Badge, Button, Input, Spinner, Textarea } from '../../components/ui';
import { PLATFORM_LABELS, type CalendarPost } from '../../lib/types';

function toLocalInput(iso: string): string {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function PostEditor({
  post,
  onClose,
  onSaved,
  onDeleted,
}: {
  post: CalendarPost;
  onClose: () => void;
  onSaved: (post: CalendarPost) => void;
  onDeleted: (id: string) => void;
}) {
  const [caption, setCaption] = useState(post.caption ?? '');
  const [hashtags, setHashtags] = useState((post.hashtags ?? []).join(', '));
  const [scheduledAt, setScheduledAt] = useState(toLocalInput(post.scheduled_date));
  const [mediaUrl, setMediaUrl] = useState(post.media_url);
  const [busy, setBusy] = useState<'save' | 'image' | 'schedule' | 'delete' | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isLocked = post.status === 'posted' || post.status === 'scheduled';

  async function save() {
    setBusy('save');
    const updated: CalendarPost = {
      ...post,
      caption,
      hashtags: hashtags
        .split(',')
        .map((tag) => tag.trim().replace(/^#/, ''))
        .filter(Boolean),
      scheduled_date: new Date(scheduledAt).toISOString(),
      edited_by_user: true,
    };
    await new Promise((resolve) => setTimeout(resolve, 250));
    onSaved(updated);
    setBusy(null);
  }

  async function regenerateImage() {
    setBusy('image');
    await new Promise((resolve) => setTimeout(resolve, 350));
    const generated = post.media_url ||
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=60';
    setMediaUrl(generated);
    onSaved({ ...post, media_url: generated });
    setBusy(null);
  }

  async function schedule() {
    setBusy('schedule');
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSaved({ ...post, status: 'scheduled' });
    setBusy(null);
    onClose();
  }

  async function remove() {
    setBusy('delete');
    await new Promise((resolve) => setTimeout(resolve, 200));
    setBusy(null);
    onDeleted(post.id);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Edit post"
        className="animate-fade-up w-full max-w-2xl rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        <header className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3.5">
          <Badge tone="brand">{PLATFORM_LABELS[post.platform]}</Badge>
          {post.is_festival_post && post.festival_name && (
            <Badge tone="festival">🪔 {post.festival_name}</Badge>
          )}
          <Badge tone={post.status === 'posted' ? 'success' : 'neutral'}>{post.status}</Badge>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ✕
          </button>
        </header>

        <div className="grid gap-5 p-5 sm:grid-cols-[200px_1fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-raised)]">
              {mediaUrl ? (
                <img src={mediaUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-3 text-center text-xs text-[var(--muted)]">
                  No visual generated
                </div>
              )}
              {busy === 'image' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <Spinner />
                </div>
              )}
            </div>

            <Button
              variant="secondary"
              className="mt-2 w-full text-xs"
              onClick={() => void regenerateImage()}
              disabled={busy !== null || !post.image_prompt}
            >
              Regenerate image
            </Button>

            {post.image_prompt && (
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">
                {post.image_prompt}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="caption"
                className="mb-1.5 block text-xs font-medium text-[var(--muted)]"
              >
                Caption
              </label>
              <Textarea
                id="caption"
                rows={7}
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                disabled={isLocked}
              />
            </div>

            <div>
              <label
                htmlFor="hashtags"
                className="mb-1.5 block text-xs font-medium text-[var(--muted)]"
              >
                Hashtags <span className="font-normal">(comma separated)</span>
              </label>
              <Input
                id="hashtags"
                value={hashtags}
                onChange={(event) => setHashtags(event.target.value)}
                disabled={isLocked}
              />
            </div>

            <div>
              <label
                htmlFor="scheduled"
                className="mb-1.5 block text-xs font-medium text-[var(--muted)]"
              >
                Scheduled for
              </label>
              <Input
                id="scheduled"
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                disabled={isLocked}
              />
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] px-5 py-3.5">
          <Button variant="danger" onClick={() => void remove()} disabled={busy !== null}>
            Delete
          </Button>
          <div className="ml-auto flex gap-2">
            <Button
              variant="secondary"
              onClick={() => void save()}
              disabled={busy !== null || isLocked}
            >
              {busy === 'save' && <Spinner />}
              Save changes
            </Button>
            <Button onClick={() => void schedule()} disabled={busy !== null || isLocked}>
              {busy === 'schedule' && <Spinner />}
              {isLocked ? 'Already scheduled' : 'Approve & schedule'}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
