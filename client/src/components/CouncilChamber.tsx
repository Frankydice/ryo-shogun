import React, { useState } from 'react';
import { MessageSquareCode, CheckCircle2, AlertOctagon, Clock, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { CouncilMemberOpinion, ShogunEdict } from '../types/index.js';

interface CouncilChamberProps {
  opinions: CouncilMemberOpinion[];
  edict: ShogunEdict | null;
}

export const CouncilChamber: React.FC<CouncilChamberProps> = ({ opinions, edict }) => {
  const [showFullLogs, setShowFullLogs] = useState(false);

  return (
    <section className="rounded-2xl border border-shogun-border bg-shogun-surface/80 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-shogun-accent/10 text-shogun-accent border border-shogun-accent/30">
            <MessageSquareCode size={16} />
          </span>
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              The Debate Chamber · 評定討論
            </h2>
            <p className="text-xs text-shogun-muted">Verifiable cause-and-effect reasoning trail</p>
          </div>
        </div>

        <button
          onClick={() => setShowFullLogs(!showFullLogs)}
          className="flex items-center gap-1 text-xs font-mono text-shogun-muted hover:text-white transition px-2 py-1 rounded bg-white/5 border border-white/10"
        >
          <Terminal size={12} />
          <span>{showFullLogs ? 'Hide Raw Trail' : 'Inspect Reasoning Trail'}</span>
          {showFullLogs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Individual Council Stances */}
      <div className="grid grid-cols-1 gap-3">
        {opinions.map((op, idx) => {
          const isAccelerate = op.stance === 'ACCELERATE';
          const isVeto = op.stance === 'VETO_HOLD';

          return (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-shogun-card/60 p-4 flex flex-col gap-2.5 transition hover:border-white/15"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-sm text-white">{op.role}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      isAccelerate
                        ? 'border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent'
                        : isVeto
                        ? 'border-shogun-crimson/40 bg-shogun-crimson/10 text-shogun-crimson'
                        : 'border-shogun-gold/40 bg-shogun-gold/10 text-shogun-gold'
                    }`}
                  >
                    {isAccelerate ? <CheckCircle2 size={10} /> : isVeto ? <AlertOctagon size={10} /> : <Clock size={10} />}
                    {op.stance}
                  </span>
                </div>

                {/* Conviction Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-shogun-muted">Conviction:</span>
                  <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isAccelerate ? 'bg-shogun-accent' : isVeto ? 'bg-shogun-crimson' : 'bg-shogun-gold'
                      }`}
                      style={{ width: `${op.conviction * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white">
                    {(op.conviction * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Rationale Quote */}
              <p className="text-xs text-shogun-ink/90 leading-relaxed font-sans italic bg-black/20 p-2.5 rounded-lg border-l-2 border-white/20">
                "{op.reasoning}"
              </p>

              {/* Tool provenance tags */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-shogun-muted">
                <span>Tools queried:</span>
                {op.toolsCalled.map((tool) => (
                  <span key={tool} className="text-shogun-accent/80 font-mono">
                    mcp::{tool}()
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Full Reasoning Trail */}
      {showFullLogs && edict?.full_reasoning_trail && (
        <div className="mt-2 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-shogun-muted flex flex-col gap-1.5 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between text-shogun-accent font-bold pb-1 border-b border-white/10">
            <span>[AUDIT_LOG] EXECUTION TRACE STREAM</span>
            <span>{edict.timestamp}</span>
          </div>
          {edict.full_reasoning_trail.map((line, i) => (
            <p key={i} className="text-white/80 leading-relaxed font-mono whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};
