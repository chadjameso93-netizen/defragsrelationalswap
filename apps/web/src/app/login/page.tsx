"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const isValidEmail = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail || status === "sending") return;

    setStatus("sending");

    // Replace with your real auth action.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("sent");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-50">
      <LoginBackground />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 md:px-6">
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_520px]">
          <BrandSide />
          <AuthCard
            email={email}
            setEmail={setEmail}
            status={status}
            setStatus={setStatus}
            isValidEmail={isValidEmail}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

function LoginBackground(): React.JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-8%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/12 blur-3xl" />
      <div className="absolute right-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-[-18%] left-[18%] h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />
    </div>
  );
}

function BrandSide(): React.JSX.Element {
  return (
    <section className="hidden lg:block">
      <div className="max-w-xl">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 rounded-full bg-cyan-400" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300">
            DEFRAG
          </span>
        </div>

        <h1 className="max-w-[12ch] text-5xl font-medium tracking-[-0.04em] text-white xl:text-6xl">
          See the pattern. Change what happens next.
        </h1>

        <p className="mt-6 max-w-[34rem] text-base leading-8 text-neutral-300 xl:text-lg">
          DEFRAG helps you understand what happened, notice pressure, and know what to do next.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SignalTile label="Understand" value="What happened" />
          <SignalTile label="Notice" value="What changed" />
          <SignalTile label="Decide" value="The next move" />
        </div>
      </div>
    </section>
  );
}

function SignalTile(props: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl">
      <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
        {props.label}
      </div>
      <div className="text-lg font-medium text-neutral-100">{props.value}</div>
    </div>
  );
}

function AuthCard(props: {
  email: string;
  setEmail: (value: string) => void;
  status: "idle" | "sending" | "sent";
  setStatus: (value: "idle" | "sending" | "sent") => void;
  isValidEmail: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}): React.JSX.Element {
  const { email, setEmail, status, setStatus, isValidEmail, handleSubmit } = props;

  return (
    <section className="mx-auto w-full max-w-[520px]">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
              Sign in
            </div>
            <h2 className="text-2xl font-medium tracking-[-0.03em] text-white">
              Continue to DEFRAG
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <Lock className="h-5 w-5 text-neutral-300" />
          </div>
        </div>

        <p className="mb-6 max-w-[34ch] text-sm leading-7 text-neutral-300">
          Enter your email and we’ll send you a secure sign-in link.
        </p>

        {status === "sent" ? (
          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              Check your inbox
            </div>
            <p className="text-sm leading-7 text-emerald-50/90">
              We sent a sign-in link to{" "}
              <span className="font-medium text-white">{email}</span>.
            </p>

            <button
              type="button"
              onClick={() => { setEmail(""); setStatus("idle"); }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-neutral-500"
              >
                Email
              </label>

              <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 focus-within:border-white/20">
                <Mail className="h-4 w-4 shrink-0 text-neutral-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValidEmail || status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[22px] border border-white/10 bg-white px-4 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Sending link..." : "Continue with email"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs leading-6 text-neutral-500">
              By continuing, you agree to the Terms and acknowledge the Privacy
              Policy.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
