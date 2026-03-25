"use client";

import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { ArrowRight, MessageSquare, Zap, Shield, PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow=""
      title=""
      description=""
      hideHero={true}
    >
      <div className="flex flex-col items-center pt-8 md:pt-16 pb-24 px-4 sm:px-6">
        
        {/* 1. Product output (Center Stage) */}
        <div className="w-full max-w-5xl mb-20 premium-fade-up" data-delay="1">
          <div className="rounded-[28px] border border-white/10 bg-neutral-900/50 p-1 md:p-2 backdrop-blur-2xl shadow-[0_32px_128px_-32px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-bottom border-white/5">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
               </div>
               <div className="text-[10px] tracking-[0.24em] uppercase text-white/30 font-medium">Session Analysis #0421</div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 p-6">
              {/* Left Column: Input Simulation */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] tracking-widest uppercase text-white/40 mb-3 font-semibold">Incoming Message</div>
                  <p className="text-white/80 leading-relaxed text-sm">
                    "I don't think you're listening. Every time I bring this up, you just pivot back to what you want to talk about. It feels like my perspective doesn't actually matter."
                  </p>
                </div>

                <div className="space-y-[1px] rounded-2xl overflow-hidden border border-white/5">
                   <div className="bg-white/[0.04] p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[10px] tracking-widest uppercase text-cyan-400 font-bold">Suggested Response</span>
                      </div>
                      <p className="text-white text-base font-medium">
                        "I can see why it feels like I'm pivoting. I want to slow down and make sure I'm actually hearing you before I say anything else."
                      </p>
                      <div className="mt-4 flex gap-2">
                         <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400">Lowers Pressure</span>
                         <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60">Acknowledge</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Insight Simulation */}
              <div className="space-y-4">
                 <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 h-full">
                    <div className="text-[10px] tracking-widest uppercase text-white/40 mb-4 font-semibold">What's going on</div>
                    <div className="space-y-4">
                       <div className="flex gap-3">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                          <div>
                             <div className="text-sm font-medium text-white/90">High Pressure</div>
                             <p className="text-xs text-white/50 leading-relaxed mt-1">Their message indicates a loss of agency and felt invisibility.</p>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                          <div>
                             <div className="text-sm font-medium text-white/90">Repair window</div>
                             <p className="text-xs text-white/50 leading-relaxed mt-1">Slowing down now prevents the escalation from turning into a story.</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="text-[10px] tracking-widest uppercase text-white/30 mb-3 font-semibold">What to do</div>
                        <div className="text-xs text-white/70 leading-relaxed">
                           Don't defend your intent. Validate their perception of the pivot. 
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Headline */}
        <div className="text-center max-w-4xl mb-12 premium-fade-up" data-delay="0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[0.9] text-white">
            Understand what’s happening in a conversation.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Paste what was said. DEFRAG shows you what's actually going on, where the pressure is, and what to do next.
          </p>

          {/* 3. CTA */}
          <div className="flex flex-wrap justify-center gap-5">
            <Link 
              href="/login" 
              className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
            >
              Try it
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#example" 
              className="flex items-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-medium text-lg transition-all hover:bg-white/10"
            >
              <PlayCircle className="w-5 h-5" />
              See example
            </Link>
          </div>
        </div>

        {/* 4. Supporting copy (Minimal) */}
        <div className="mt-32 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 premium-fade-up" data-delay="2">
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-2">
                 <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Immediate Clarity</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Understand the mismatch between what was said and what was heard, instantly.
              </p>
           </div>
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-2">
                 <Shield className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Lower Pressure</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Identify tension points before they escalate into long-term conflict.
              </p>
           </div>
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
                 <MessageSquare className="w-6 h-6 text-white/50" />
              </div>
              <h3 className="text-lg font-medium text-white">What To Say</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Get specific language suggestions that preserve the relationship and move forward.
              </p>
           </div>
        </div>

      </div>

      <style jsx>{`
        .premium-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .premium-fade-up[data-delay="1"] { animation-delay: 0.1s; }
        .premium-fade-up[data-delay="2"] { animation-delay: 0.2s; }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AppShell>
  );
}
