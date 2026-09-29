import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { TopBanner } from './components/TopBanner.js';
import { Header } from './components/Header.js';
import { HeroBanner } from './components/HeroBanner.js';
import { EcosystemMarquee } from './components/EcosystemMarquee.js';
import { AgentEconomyFlywheel } from './components/AgentEconomyFlywheel.js';
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
import { AccountModal } from './components/AccountModal.js';
import { ShogunState, UserSubAccount } from './types/index.js';
import { initialShogunState } from './data/initialState.js';
import { clientLiveMarket, LiveMacroIndicators } from './services/liveMarket.js';

const DEFAULT_SUB_ACCOUNTS: UserSubAccount[] = [
  {
    id: 'acc_tokyo_hq',
    name: 'Tokyo HQ',
    emailOrWallet: '0x71C8...82F9',
    avatarColor: 'purple',
    startingBalanceUsd: 15000,
    preferredCommander: 'The Ronin (浪人)',
    createdAt: new Date().toISOString(),
    isCurrent: true
  },
  {
    id: 'acc_ronin_scout',
    name: 'Ronin Alpha Desk',
    emailOrWallet: 'alpha.desk@ryoshogun.dao',
    avatarColor: 'emerald',
    startingBalanceUsd: 50000,
    preferredCommander: 'The Ronin (浪人)',
    createdAt: new Date().toISOString(),
    isCurrent: false
  },
  {
    id: 'acc_daimyo_safe',
    name: 'Daimyo Vault',
    emailOrWallet: '0x32A1...941B',
    avatarColor: 'cyan',
    startingBalanceUsd: 100000,
    preferredCommander: 'The Daimyo (大名)',
    createdAt: new Date().toISOString(),
    isCurrent: false
  }
];

export const App: React.FC = () => {
  const [state, setState] = useState<ShogunState | null>(initialShogunState);
  const [macro, setMacro] = useState<LiveMacroIndicators | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingTrade, setIsClosingTrade] = useState(false);

  // Sub-accounts state
  const [accounts, setAccounts] = useState<UserSubAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ryo_shogun_sub_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved sub accounts:', e);
    }
    return DEFAULT_SUB_ACCOUNTS;
  });

  const [activeAccountId, setActiveAccountId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem('ryo_shogun_active_account_id');
      if (savedId) return savedId;
    } catch (e) {}
    return 'acc_tokyo_hq';
  });

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Sync accounts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ryo_shogun_sub_accounts', JSON.stringify(accounts));
    } catch (e) {}
  }, [accounts]);

  useEffect(() => {
    try {
      localStorage.setItem('ryo_shogun_active_account_id', activeAccountId);
    } catch (e) {}
  }, [activeAccountId]);

  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0] || DEFAULT_SUB_ACCOUNTS[0];

  const handleSelectAccount = (acc: UserSubAccount) => {
    setActiveAccountId(acc.id);
    setAccounts((prev) =>
      prev.map((a) => ({
        ...a,
        isCurrent: a.id === acc.id
      }))
    );
  };

  const handleCreateAccount = (newAcc: Omit<UserSubAccount, 'id' | 'createdAt' | 'isCurrent'>) => {
    const created: UserSubAccount = {
      ...newAcc,
      id: `acc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      isCurrent: true
    };
    setAccounts((prev) => [
      created,
      ...prev.map((a) => ({ ...a, isCurrent: false }))
    ]);
    setActiveAccountId(created.id);
  };

  const handleDeleteAccount = (id: string) => {
    if (accounts.length <= 1) return;
    setAccounts((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (activeAccountId === id && filtered.length > 0) {
        setActiveAccountId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Active view states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [circuitTripped, setCircuitTripped] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState('INJUSDT');

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
      console.warn('Backend /api/state unavailable, using verified local oracle:', (err as Error).message);
    }
  };

  const fetchMacro = async () => {
    try {
      const data = await clientLiveMarket.getMacroIndicators();
      setMacro(data);
    } catch (err) {
      console.warn('Failed to fetch macro indicators:', err);
    }
  };

  useEffect(() => {
    fetchState();
    fetchMacro();
    const interval = setInterval(() => {
      fetchState();
      fetchMacro();
    }, 15000);
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-900">
      {/* 1. Olas Electric Lime Top Announcement Strip */}
      <TopBanner onOpenConnect={() => setIsAccountModalOpen(true)} />

      {/* 2. Olas Sticky White Navbar */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        circuitTripped={circuitTripped}
        onOpenMcpConfig={() => setIsMcpModalOpen(true)}
        onOpenSystemStatus={() => setIsStatusModalOpen(true)}
        accounts={accounts}
        activeAccount={activeAccount}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        onSelectAccount={handleSelectAccount}
        onConveneCouncil={() => handleConvene()}
        isConvening={isLoading}
      />

      <main className="flex-1 w-full flex flex-col">
        {/* 3. Olas Hero Section ("Co-own AI Alpha") + Floating Model Card */}
        <HeroBanner
          state={state}
          onConveneCouncil={() => handleConvene()}
          isLoading={isLoading}
        />

        {/* 4. Ecosystem & Live Oracles Infinite Marquee */}
        <EcosystemMarquee />

        {/* 5. Autonomous Agent Economy Flywheel & 4 Factual Live Telemetry Cards */}
        <AgentEconomyFlywheel
          state={state}
          macro={macro}
          onOpenAudit={() => handleTabChange('audit')}
        />

        {/* 6. Dashboard Body Container */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 sm:gap-12">
          {/* Executive Metrics Overview Cards */}
          <MetricsOverview
            state={state}
            onReviewApprovals={() => setIsThesisModalOpen(true)}
          />

          {/* Live Market Intelligence & Catalyst Shock Injector */}
          <MarketIntelligence
            selectedSymbol={activeSymbol}
            onSelectToken={handleSelectToken}
            onInjectCatalyst={handleInjectCatalyst}
            isLoading={isLoading}
          />

          {/* Deep Candlestick Chart & Specialist Agentic Analyst */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Candlestick & Order Levels Canvas (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
              <TokenChart
                edict={state?.edict || null}
                activeSymbol={activeSymbol}
                onOpenPlaybook={() => setIsThesisModalOpen(true)}
              />
            </div>

            {/* Specialist Analyst Panel (4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <AgenticAnalyst state={state} />
            </div>
          </div>

          {/* 30-Second Morning Edict Command Center */}
          <div id="safety-section">
            <MorningEdict
              edict={state?.edict || null}
              onOpenThesisModal={() => setIsThesisModalOpen(true)}
            />
          </div>

          {/* Handover Ceremony (The Council of Three Samurai) */}
          <div id="debate-section">
            <HandoverCeremony edict={state?.edict || null} />
          </div>

          {/* Dual Column: Debate Chamber & Dojo Treasury */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="audit-section">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <CouncilChamber
                opinions={state?.opinions || []}
                edict={state?.edict || null}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <ActiveTrades
                portfolio={state?.portfolio || null}
                onCloseTrade={handleCloseTrade}
                isClosing={isClosingTrade}
              />
            </div>
          </div>

          {/* Kaizen Forensic Ledger */}
          <div id="kaizen-section">
            <KaizenLedger postMortems={state?.postMortems || []} />
          </div>

          {/* Institutional Protocol Guarantees */}
          <FeatureHighlights />
        </div>
      </main>

      {/* 7. Olas-Style Clean Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 px-4 sm:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-extrabold text-slate-900">RYO Shogun (将軍)</span>
            <span className="text-slate-300">•</span>
            <span>Olas Agent Economy Architecture</span>
            <span className="text-slate-300">•</span>
            <span className="text-purple-700 font-bold">100% Factual Live Feeds</span>
          </div>

          <a
            href="https://github.com/Frankydice/ryo-shogun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 transition shadow-sm font-semibold"
          >
            <Github size={15} />
            <span>Frankydice/ryo-shogun</span>
            <ExternalLink size={12} className="text-slate-400" />
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

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        accounts={accounts}
        activeAccount={activeAccount}
        onSelectAccount={handleSelectAccount}
        onCreateAccount={handleCreateAccount}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};

export default App;
