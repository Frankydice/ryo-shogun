import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { MorningEdict } from './components/MorningEdict.js';
import { HandoverCeremony } from './components/HandoverCeremony.js';
import { CouncilChamber } from './components/CouncilChamber.js';
import { ActiveTrades } from './components/ActiveTrades.js';
import { KaizenLedger } from './components/KaizenLedger.js';
import { ThesisCardModal } from './components/ThesisCardModal.js';
import { McpConfigModal } from './components/McpConfigModal.js';
import { ManualScanModal } from './components/ManualScanModal.js';
import { ShogunState } from './types/index.js';

export const App: React.FC = () => {
  const [state, setState] = useState<ShogunState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingTrade, setIsClosingTrade] = useState(false);

  // Modals
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        setState(data);
      }
    } catch (err) {
      console.error('Failed to fetch state:', err);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleConvene = async (symbol?: string) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/council/convene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (err) {
      console.error('Failed to convene council:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTrade = async (tradeId: string) => {
    try {
      setIsClosingTrade(true);
      const res = await fetch('/api/trades/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradeId })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (err) {
      console.error('Failed to close trade:', err);
    } finally {
      setIsClosingTrade(false);
    }
  };

  const handleSaveMcpKey = async (apiKey: string) => {
    try {
      const res = await fetch('/api/mcp/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (err) {
      console.error('Failed to configure MCP key:', err);
    }
  };

  return (
    <div className="min-h-screen bg-shogun-bg text-shogun-ink flex flex-col font-display">
      <Header
        state={state}
        onRefresh={() => handleConvene()}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 flex flex-col gap-6">
        {/* Section 1: The 30-Second Morning Edict (Track 2 Headline) */}
        <MorningEdict
          edict={state?.edict || null}
          onOpenThesisModal={() => setIsThesisModalOpen(true)}
        />

        {/* Section 2: Handover Ceremony (The Three Samurai Archetypes) */}
        <HandoverCeremony edict={state?.edict || null} />

        {/* Section 3: Dual Column - The Debate Chamber & Active Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Debate Chamber (Track 1 Reasoning Trail) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CouncilChamber
              opinions={state?.opinions || []}
              edict={state?.edict || null}
            />

            {/* Kaizen Forensic Ledger */}
            <KaizenLedger postMortems={state?.postMortems || []} />
          </div>

          {/* Right Column: Dojo Treasury & Paper Ledger */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ActiveTrades
              portfolio={state?.portfolio || null}
              onCloseTrade={handleCloseTrade}
              isClosing={isClosingTrade}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-shogun-border bg-shogun-surface/60 py-4 px-6 text-center text-xs font-mono text-shogun-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>RYO Shogun (将軍) · Built for RYO-CHAN Hackathon 2026</span>
          <span className="text-shogun-accent">Grand Prize Target: Tokyo HQ</span>
        </div>
      </footer>

      {/* Modals */}
      <ThesisCardModal
        isOpen={isThesisModalOpen}
        onClose={() => setIsThesisModalOpen(false)}
        edict={state?.edict || null}
      />

      <McpConfigModal
        isOpen={isMcpModalOpen}
        onClose={() => setIsMcpModalOpen(false)}
        currentKey={Boolean(state?.mcpStatus?.hasKey)}
        onSaveKey={handleSaveMcpKey}
      />

      <ManualScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onConvene={handleConvene}
        isLoading={isLoading}
      />
    </div>
  );
};
export default App;
