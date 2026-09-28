import React, { useState } from 'react';
import { MessageSquareCode, CheckCircle2, AlertOctagon, Clock, Terminal, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { CouncilMemberOpinion, ShogunEdict } from '../types/index.js';

interface CouncilChamberProps {
  opinions: CouncilMemberOpinion[];
  edict: ShogunEdict | null;
}

export const CouncilChamber: React.FC<CouncilChamberProps> = ({ opinions, edict }) => {
  const [showFullLogs, setShowFullLogs] = useState(false);

  return (
    <section className="glass-panel rounded-3xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-shogun-accent/10 border border-shogun-accent/30 text-shogun-accent">
            <MessageSquareCode size={18} />
          </span>
          <div>
            <h2 className="text-base font-display font-bold text-white">
              The Debate Chamber · 評定討論
            </h2>
            <p className="text-xs text-shogun-muted font-mono">Verifiable multi-agent cause & effect audit trail</p>
          </div>
        </div>

        <button
          onClick={() => setShowFullLogs(!showFullLogs)}
          className="flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white transition px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <Terminal size={13} className="text-shogun-accent" />
          <span>{showFullLogs ? 'Hide Audit Trace' : 'Inspect Raw MCP Trail'}</span>
          {showFullLogs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Individual Council Stance Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {opinions.map((op, idx) => {
          const isAccelerate = op.stance === 'ACCELERATE';
          const isVeto = op.stance === 'VETO_HOLD';

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all p-4 sm:p-5 flex flex-col gap-3 ${
                isVeto
                  ? 'border-shogun-crimson/30 bg-[#16080a]/60'
                  : isAccelerate
                  ? 'border-shogun-accent/25 bg-[#08150f]/60'
                  : 'border-shogun-gold/25 bg-[#141208]/60'
              }`}
            >
              {/* Member Title & Stance Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-display font-extrabold text-base text-white">{op.role}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-md border ${
                      isAccelerate
                        ? 'border-shogun-accent/50 bg-shogun-accent/20 text-shogun-accent'
                        : isVeto
                        ? 'border-shogun-crimson/50 bg-shogun-crimson/20 text-shogun-crimson'
                        : 'border-shogun-gold/50 bg-shogun-gold/20 text-shogun-gold'
                    }`}
                  >
                    {isAccelerate ? <CheckCircle2 size={12} /> : isVeto ? <AlertOctagon size={12} /> : <Clock size={12} />}
                    {op.stance}
                  </span>
                </div>

                {/* Conviction Gauge Bar */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-shogun-muted">Conviction:</span>
                  <div className="w-24 h-2 rounded-full bg-black/50 border border-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAccelerate ? 'bg-shogun-accent' : isVeto ? 'bg-shogun-crimson' : 'bg-shogun-gold'
                      }`}
                      style={{ width: `${op.conviction * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-white">{(op.conviction * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Rationale Quote */}
              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 backdrop-blur-sm">
                <p className="text-xs sm:text-sm text-shogun-ink/90 leading-relaxed font-sans italic">
                  "{op.reasoning}"
                </p>
              </div>

              {/* Tools Queried & Provenance */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-shogun-muted">
                <div className="flex items-center gap-1.5">
                  <Cpu size={12} className="text-shogun-accent" />
                  <span>Queried:</span>
                  {op.toolsCalled.map((tool) => (
                    <span key={tool} className="text-shogun-accent bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      mcp::{tool}()
                    </span>
                  ))}
                </div>

                <span className="text-[10px] text-white/40">Verified via RYO JSON-RPC</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw Reasoning Trail Log Terminal */}
      {showFullLogs && edict?.full_reasoning_trail && (
        <div className="rounded-2xl border border-white/10 bg-black/80 p-5 font-mono text-xs text-shogun-muted flex flex-col gap-2 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between text-shogun-accent font-bold pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              <Terminal size={14} />
              <span>[AUDIT_LOG] IMMUTABLE REASONING STREAM</span>
            </span>
            <span className="text-[10px] text-white/50">{edict.timestamp}</span>
          </div>
          {edict.full_reasoning_trail.map((line, i) => (
            <p key={i} className="text-white/80 leading-relaxed whitespace-pre-wrap font-mono">
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};
