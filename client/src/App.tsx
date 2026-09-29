import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Header } from './components/Header.js';
import { HeroBanner } from './components/HeroBanner.js';
import { MetricsOverview } from './components/MetricsOverview.js';
import { MarketIntelligence } from './components/MarketIntelligence.js';
import { TokenChart } from './components/TokenChart.js';
import { AgenticAnalyst } from './components/AgenticAnalyst.js';
import { MorningEdict } from './components/MorningEdict.js';
import { HandoverCeremony } from './components/HandoverCeremony.js';
import { CouncilChamber } from './components/CouncilChamber.js';
import { ActiveTrades } from './components/ActiveTrades.js';
import { KaizenLedger } from './components/KaizenLedger.js';
import { FeatureHighlights } from './components/FeatureHighlights.js';
import { ThesisCardModal } from './components/ThesisCardModal.js';
import { McpConfigModal } from './components/McpConfigModal.js';
import { ManualScanModal } from './components/ManualScanModal.js';
import { SystemStatusModal } from './components/SystemStatusModal.js';
import { ShogunState } from './types/index.js';

export const App: React.FC = () => {
  const [state, setState] = useState<ShogunState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingTrade, setIsClosingTrade] = useState(false);

  // Active view states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [circuitTripped, setCircuitTripped] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState('NVDAUSDT');

  // Modals
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data: ShogunState = await res.json();
        setState(data);
        if (data.edict?.daimyo_veto_exercised) {
          setCircuitTripped(true);
        }
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'debate') {
      const el = document.getElementById('debate-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'safety') {
      const el = document.getElementById('safety-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'backtest') {
      const el = document.getElementById('kaizen-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'audit') {
      const el = document.getElementById('audit-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConvene = async (symbol?: string) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/council/convene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbol || activeSymbol.replace('USDT', '') })
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

  const handleSelectToken = (symbol: string) => {
    setActiveSymbol(symbol.includes('USDT') ? symbol : `${symbol}USDT`);
    handleConvene(symbol);
  };

  const handleInjectCatalyst = async (_eventTitle: string) => {
    await handleConvene(activeSymbol.replace('USDT', ''));
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
    <div className="min-h-screen bg-shogun-bg text-shogun-ink flex flex-col font-display selection:bg-shogun-accent/30 selection:text-white">
      {/* 1. Cleaner & More Organized Top Navigation and Status Bar */}
      <Header
        state={state}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        circuitTripped={circuitTripped}
        onToggleCircuit={() => setCircuitTripped((prev) => !prev)}
        onRefresh={() => handleConvene()}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-6 sm:px-6 flex flex-col gap-6">
        {/* 2. Spacious & Readable Hero Section with Clear Hierarchy */}
        <HeroBanner
          state={state}
          onOpenStatusModal={() => setIsStatusModalOpen(true)}
        />

        {/* 3. Executive Metrics Grid (6 Cards with Sparklines) */}
        <MetricsOverview
          state={state}
          onReviewApprovals={() => setIsThesisModalOpen(true)}
        />

        {/* 4. Live Market Intelligence & Active Event Catalyst Simulator */}
        <MarketIntelligence
          selectedSymbol={activeSymbol}
          onSelectToken={handleSelectToken}
          onInjectCatalyst={handleInjectCatalyst}
          isLoading={isLoading}
        />

        {/* 5. Deep Candlestick Trading Chart & Agentic Analyst (Dual Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Candlestick & Volume Execution Chart (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <TokenChart
              edict={state?.edict || null}
              activeSymbol={activeSymbol}
              onOpenPlaybook={() => setIsThesisModalOpen(true)}
            />
          </div>

          {/* Right: Agentic Analyst Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <AgenticAnalyst state={state} />
          </div>
        </div>

        {/* 6. The 30-Second Morning Edict (Verdict Command Center) */}
        <div id="safety-section">
          <MorningEdict
            edict={state?.edict || null}
            onOpenThesisModal={() => setIsThesisModalOpen(true)}
          />
        </div>

        {/* 7. Handover Ceremony (The Three Samurai Archetypes) */}
        <div id="debate-section">
          <HandoverCeremony edict={state?.edict || null} />
        </div>

        {/* 8. Dual Column: The Debate Chamber & Active Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="audit-section">
          {/* Left Column: Debate Chamber (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CouncilChamber
              opinions={state?.opinions || []}
              edict={state?.edict || null}
            />
          </div>

          {/* Right Column: Dojo Treasury & Paper Ledger (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ActiveTrades
              portfolio={state?.portfolio || null}
              onCloseTrade={handleCloseTrade}
              isClosing={isClosingTrade}
            />
          </div>
        </div>

        {/* 9. Dedicated Full-Width Kaizen Forensic Ledger */}
        <div id="kaizen-section">
          <KaizenLedger postMortems={state?.postMortems || []} />
        </div>

        {/* 10. Institutional Protocol Guarantees & System Telemetry */}
        <div className="pt-2">
          <FeatureHighlights />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-shogun-border bg-shogun-surface/60 py-5 px-6 text-center text-xs font-mono text-shogun-muted">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>RYO Shogun (将軍) · Built for RYO-CHAN Hackathon 2026</span>
            <span className="text-white/20">•</span>
            <span className="text-shogun-gold font-bold">Track 1 & Track 2</span>
          </div>

          <a
            href="https://github.com/Frankydice/ryo-shogun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-shogun-accent/30 bg-shogun-accent/10 hover:bg-shogun-accent/20 text-shogun-accent transition shadow-[0_0_12px_rgba(110,232,154,0.15)] group"
          >
            <Github size={14} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold">Frankydice/ryo-shogun</span>
            <ExternalLink size={12} className="opacity-80" />
          </a>
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

      <SystemStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        state={state}
        circuitTripped={circuitTripped}
      />
    </div>
  );
};

export default App;
