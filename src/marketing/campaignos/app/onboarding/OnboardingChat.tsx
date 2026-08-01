'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Input, Spinner } from '../../components/ui';
import type { ChatMessage } from '../../lib/types';

const OPENING: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm going to set up your entire marketing presence — brand kit, website, and a content calendar that posts itself.\n\nFirst up: what's your business called, and what do you do?",
};

const QUESTIONS = [
  'Who is your ideal customer?',
  'What products or services are your top priorities this month?',
  'What tone should your brand voice use?',
  'Which platforms matter most right now?',
  'Which languages should your content use?',
  'Any upcoming offer or festival push we should include?',
];

export function OnboardingChat({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([OPENING]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [handingOff, setHandingOff] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    if (!thinking && !handingOff) inputRef.current?.focus();
  }, [thinking, handingOff]);

  async function send() {
    const text = draft.trim();
    if (!text || thinking) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setDraft('');
    setThinking(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const assistantCount = next.filter((m) => m.role === 'assistant').length;
    if (assistantCount >= 7) {
      setMessages([
        ...next,
        { role: 'assistant', content: 'Perfect. Handing this off to generation now…' },
      ]);
      setThinking(false);
      setHandingOff(true);
      setTimeout(onComplete, 900);
      return;
    }

    setMessages([
      ...next,
      { role: 'assistant', content: QUESTIONS[Math.min(assistantCount - 1, QUESTIONS.length - 1)] },
    ]);
    setThinking(false);
  }

  const questionCount = messages.filter((m) => m.role === 'assistant').length;

  return (
    <div className="mx-auto flex h-[calc(100vh-11rem)] w-full max-w-2xl flex-col px-6">
      <header className="flex items-center justify-between py-5">
        <div>
          <h1 className="text-sm font-semibold">Business discovery</h1>
          <p className="text-xs text-[var(--muted)]">
            {handingOff ? 'All set' : `Question ${Math.min(questionCount, 7)} of about 7`}
          </p>
        </div>
        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className={`h-1 w-6 rounded-full transition-colors ${
                i < questionCount ? 'bg-[var(--brand)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pb-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`animate-fade-up flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-[var(--brand)] text-white'
                  : 'border border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">
              <Spinner />
              Thinking
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border)] py-4">
        {handingOff ? (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-[var(--muted)]">
            <Spinner />
            Starting your agents…
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
              placeholder="Type your answer…"
              disabled={thinking}
            />
            <Button onClick={() => void send()} disabled={thinking || !draft.trim()}>
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
