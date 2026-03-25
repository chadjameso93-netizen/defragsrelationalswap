"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  MessageSquareText,
  Send,
  Share2,
  Sparkles,
  TriangleAlert,
  Waves,
} from "lucide-react";

type InsightCard = {
  title: string;
  body: string;
};

type SimulationStep = {
  label: string;
  text: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Tell me what happened. I’ll help you understand the pressure, the pattern, and what to do next.",
  },
  {
    id: "m2",
    role: "user",
    content:
      "I sent a direct message after a tense call, and now they’ve gone quiet. I’m not sure if I pushed too hard or if they’re avoiding the issue.",
  },
];

const starterInsights: InsightCard[] = [
  {
    title: "What happened",
    body:
      "This looks less like rejection and more like overload. The silence may be a pause under pressure, not a final answer.",
  },
  {
    title: "What changed",
    body:
      "The interaction moved faster than the other person could process. Slowing down now prevents the moment from turning into a story.",
  },
  {
    title: "Next move",
    body:
      "Acknowledge the tension first. Then make the next step small, specific, and easy to respond to.",
  },
];

const starterSimulation: SimulationStep[] = [
  {
    label: "Next move",
    text: "I know that last message may have landed with more pressure than I meant. No need to respond quickly.",
  },
  {
    label: "Alternative",
    text: "I want to slow this down. If you’re open, we can come back to it when there’s more room.",
  },
];

export default function DefragAISurface(): React.JSX.Element {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [draft, setDraft] = useState("");

  const pressureLevel = useMemo(() => "High", []);
  const timingWindow = useMemo(() => "Slow down", []);
  const nextMove = useMemo(() => "Acknowledge first", []);

  function sendMessage(): void {
    const value = draft.trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        role: "user",
        content: value,
      },
    ]);
    setDraft("");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-50">
      <AmbientBackground />

      <div className="relative mx-auto flex min-h-screen max-[1600px] flex-col px-4 py-4 md:px-6 md:py-6">
        <header className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                DEFRAG
              </div>
              <h1 className="text-sm font-medium text-neutral-100 md:text-base">
                Console
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 transition hover:bg-white/10">
              Share
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 transition hover:bg-white/10">
              Invite
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          <aside className="hidden xl:block">
            <FieldRail
              pressureLevel={pressureLevel}
              timingWindow={timingWindow}
              nextMove={nextMove}
            />
          </aside>

          <main className="min-h-0">
            <div className="grid h-full min-h-[78vh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl">
              <ConversationHeader />
              <ConversationBody messages={messages} />
              <Composer
                draft={draft}
                setDraft={setDraft}
                sendMessage={sendMessage}
              />
            </div>
          </main>

          <aside className="min-h-0">
            <RightRail insights={starterInsights} simulation={starterSimulation} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function AmbientBackground(): React.JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-[-12%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-[-15%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]" />
    </div>
  );
}

function FieldRail(props: {
  pressureLevel: string;
  timingWindow: string;
  nextMove: string;
}): React.JSX.Element {
  const { pressureLevel, timingWindow, nextMove } = props;

  return (
    <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
      <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
        <Waves className="h-4 w-4" />
        Session Status
      </div>

      <div className="space-y-4">
        <MetricBlock label="Pressure" value={pressureLevel} />
        <MetricBlock label="Timing" value={timingWindow} />
        <MetricBlock label="Next move" value={nextMove} />
      </div>

      <div className="mt-8">
        <div className="mb-3 text-xs uppercase tracking-[0.18em] text-neutral-500">
          Activity
        </div>
        <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
          <div className="absolute left-[18%] top-[18%] h-24 w-24 rounded-full border border-cyan-400/20 bg-cyan-400/10 blur-[1px]" />
          <div className="absolute right-[16%] top-[26%] h-20 w-20 rounded-full border border-violet-400/20 bg-violet-400/10 blur-[1px]" />
          <div className="absolute bottom-[20%] left-[36%] h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[1px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <path
              d="M24 28 C 40 35, 52 48, 64 54"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.6"
              fill="none"
            />
            <path
              d="M64 54 C 72 58, 78 62, 82 36"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.6"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MetricBlock(props: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <div className="mb-2 text-xs uppercase tracking-[0.14em] text-neutral-500">
        {props.label}
      </div>
      <div className="text-lg font-medium text-neutral-100">{props.value}</div>
    </div>
  );
}

function ConversationHeader(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-6">
      <div>
        <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          Conversation
        </div>
        <div className="text-sm text-neutral-200 md:text-base">
          Understand what happened before it repeats.
        </div>
      </div>

      <div className="hidden items-center gap-3 text-xs text-neutral-400 md:flex">
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          Timing
        </span>
        <span className="inline-flex items-center gap-1">
          <TriangleAlert className="h-3.5 w-3.5" />
          Pressure
        </span>
      </div>
    </div>
  );
}

function ConversationBody(props: {
  messages: Message[];
}): React.JSX.Element {
  return (
    <div className="min-h-0 overflow-y-auto px-4 py-5 md:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {props.messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "assistant"
                ? "max-w-[85%] rounded-[24px] rounded-tl-md border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-xl"
                : "ml-auto max-w-[80%] rounded-[24px] rounded-tr-md border border-cyan-400/20 bg-cyan-400/10 px-4 py-4"
            }
          >
            <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              {message.role === "assistant" ? "DEFRAG" : "You"}
            </div>
            <div className="text-sm leading-7 text-neutral-100 md:text-[15px]">
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Composer(props: {
  draft: string;
  setDraft: (value: string) => void;
  sendMessage: () => void;
}): React.JSX.Element {
  return (
    <div className="border-t border-white/10 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-[24px] border border-white/10 bg-black/20 p-3">
        <div className="flex-1">
          <label
            htmlFor="defrag-input"
            className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-neutral-500"
          >
            Start with a message
          </label>
          <textarea
            id="defrag-input"
            value={props.draft}
            onChange={(e) => props.setDraft(e.target.value)}
            placeholder="Paste a conversation, message, or tense moment."
            className="min-h-[84px] w-full resize-none border-0 bg-transparent text-sm leading-6 text-neutral-100 outline-none placeholder:text-neutral-500"
          />
        </div>

        <button
          type="button"
          onClick={props.sendMessage}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:bg-white/15"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function RightRail(props: {
  insights: InsightCard[];
  simulation: SimulationStep[];
}): React.JSX.Element {
  return (
    <div className="grid h-full min-h-[78vh] grid-rows-[auto_auto_1fr] gap-4">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
          <Sparkles className="h-4 w-4" />
          Insight
        </div>

        <div className="space-y-4">
          {props.insights.map((item) => (
            <div key={item.title} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
              <div className="mb-2 text-sm font-medium text-neutral-100">
                {item.title}
              </div>
              <div className="text-sm leading-7 text-neutral-300">
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
          <MessageSquareText className="h-4 w-4" />
          Next move
        </div>

        <div className="space-y-4">
          {props.simulation.map((step, index) => (
            <div key={step.label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
                {String(index + 1).padStart(2, "0")} — {step.label}
              </div>
              <div className="text-sm leading-7 text-neutral-200">
                {step.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="mb-4 text-xs uppercase tracking-[0.18em] text-neutral-400">
          Actions
        </div>

        <div className="flex flex-col gap-3">
          <ActionButton icon={<Share2 className="h-4 w-4" />} label="Share summary" />
          <ActionButton icon={<ArrowUpRight className="h-4 w-4" />} label="Invite someone" />
        </div>
      </div>
    </div>
  );
}

function ActionButton(props: {
  icon: React.ReactNode;
  label: string;
}): React.JSX.Element {
  return (
    <button className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-100 transition hover:bg-black/30">
      <span className="inline-flex items-center gap-2">
        {props.icon}
        {props.label}
      </span>
      <ArrowUpRight className="h-4 w-4 text-neutral-500" />
    </button>
  );
}
