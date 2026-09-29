import React, { useState } from 'react';
import { MessageSquareCode, CheckCircle2, AlertOctagon, Clock, Terminal, ChevronDown, ChevronUp, Cpu, ShieldCheck } from 'lucide-react';
import { CouncilMemberOpinion, ShogunEdict } from '../types/index.js';

interface CouncilChamberProps {
  opinions: CouncilMemberOpinion[];
  edict: ShogunEdict | null;
}

export const CouncilChamber: React.FC<CouncilChamberProps> = ({ opinions, edict }) => {
  const [showFullLogs, setShowFullLogs] = useState(false);

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200 shadow-sm flex flex-col gap-5" id="debate-section">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 text-black flex items-center justify-center shrink-0">
            <MessageSquareCode size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight font-display">
              The Debate Chamber · 評定討論
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Verifiable multi-agent cause & effect audit trail
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowFullLogs(!showFullLogs)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-black transition px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 ml-auto sm:ml-0"
        >
          <Terminal size={13} className="text-black" />
          <span>{showFullLogs ? 'Hide Audit Trace' : 'Inspect Raw MCP Trace'}</span>
          {showFullLogs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Individual Council Stance Cards */}
      <div className="grid grid-cols-1 gap-4">
        {opinions.map((op, idx) => {
          const isAccelerate = op.stance === 'ACCELERATE';
          const isVeto = op.stance === 'VETO_HOLD';

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 transition-all ${
                isVeto
                  ? 'border-rose-200 bg-rose-50/50'
                  : isAccelerate
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : 'border-amber-200 bg-amber-50/40'
              }`}
            >
              {/* Member Title & Stance Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-slate-900 text-base font-display">
                    {op.role}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full border ${
                      isAccelerate
                        ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                        : isVeto
                        ? 'border-rose-300 bg-rose-100 text-rose-800'
                        : 'border-amber-300 bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isAccelerate ? <CheckCircle2 size={12} /> : isVeto ? <AlertOctagon size={12} /> : <Clock size={12} />}
                    {op.stance}
                  </span>
                </div>

                {/* Conviction Gauge Bar */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400">Conviction:</span>
                  <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAccelerate ? 'bg-emerald-500' : isVeto ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${op.conviction * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-800">{(op.conviction * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Rationale Quote */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{op.reasoning}"
                </p>
              </div>

              {/* Tools Queried & Provenance */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Cpu size={12} className="text-black" />
                  <span>Queried:</span>
                  <div className="flex flex-wrap gap-1">
                    {op.toolsCalled.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold"
                      >
                        {tool}()
                      </span>
                    ))}
                  </div>
                </div>

                {op.suggestedAction && (
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <span>Target: ${op.suggestedAction.entry}</span>
                    <span className="text-slate-300">•</span>
                    <span>TP: ${op.suggestedAction.tp}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-black font-bold">R:R: {op.suggestedAction.rr}x</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Raw Audit Logs */}
      {showFullLogs && edict && (
        <div className="rounded-2xl p-4 bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-200 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              Immutable Shogun Decision Trail (SHA-256 Provenance)
            </span>
            <span className="text-[10px] text-zinc-500">{edict.timestamp}</span>
          </div>

          <div className="space-y-1.5 overflow-x-auto">
            {edict.full_reasoning_trail.map((line, lIdx) => (
              <div key={lIdx} className="leading-relaxed text-zinc-300">
                <span className="text-zinc-500 mr-2">{'>'}</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
