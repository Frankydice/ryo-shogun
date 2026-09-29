import React, { useState } from 'react';
import { X, User, Plus, Check, ShieldCheck, Wallet, ArrowRight, Trash2 } from 'lucide-react';
import { UserSubAccount, CommanderRole } from '../types/index.js';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: UserSubAccount[];
  activeAccount: UserSubAccount;
  onSelectAccount: (account: UserSubAccount) => void;
  onCreateAccount: (newAcc: Omit<UserSubAccount, 'id' | 'createdAt' | 'isCurrent'>) => void;
  onDeleteAccount?: (id: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  accounts,
  activeAccount,
  onSelectAccount,
  onCreateAccount,
  onDeleteAccount
}) => {
  const [activeTab, setActiveTab] = useState<'switch' | 'create' | 'wallet'>('switch');

  // New account form state
  const [name, setName] = useState('');
  const [emailOrWallet, setEmailOrWallet] = useState('');
  const [startingBalance, setStartingBalance] = useState<number>(25000);
  const [commander, setCommander] = useState<CommanderRole>('The Ronin (浪人)');
  const [color, setColor] = useState<UserSubAccount['avatarColor']>('emerald');

  // Wallet simulation
  const [walletConnected, setWalletConnected] = useState(Boolean(activeAccount.emailOrWallet?.startsWith('0x')));

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateAccount({
      name: name.trim(),
      emailOrWallet: emailOrWallet.trim() || `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      avatarColor: color,
      startingBalanceUsd: startingBalance,
      preferredCommander: commander
    });

    setName('');
    setEmailOrWallet('');
    setActiveTab('switch');
  };

  const handleSimulateWalletConnect = () => {
    const mockAddr = `0x71C8${Math.random().toString(16).slice(2, 6)}...82F9`;
    setWalletConnected(true);
    onCreateAccount({
      name: `${activeAccount.name} (Web3 Linked)`,
      emailOrWallet: mockAddr,
      avatarColor: 'cyan',
      startingBalanceUsd: activeAccount.startingBalanceUsd,
      preferredCommander: activeAccount.preferredCommander
    });
    setActiveTab('switch');
  };

  const colorStyles: Record<UserSubAccount['avatarColor'], { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-shogun-accent' },
    gold: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-shogun-gold' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' },
    crimson: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-shogun-crimson' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0a110d]/95 p-4 sm:p-6 shadow-2xl flex flex-col gap-4 sm:gap-5 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 rounded-xl bg-shogun-accent/15 text-shogun-accent border border-shogun-accent/30 shrink-0">
              <User size={16} />
            </span>
            <div>
              <span className="font-mono font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider block">
                Sub-Account Center · 口座管理
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-shogun-muted">
                Create, switch profiles, or connect Web3 identity
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-shogun-muted hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/[0.08] p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs transition-all ${
              activeTab === 'switch'
                ? 'bg-shogun-accent/15 text-shogun-accent font-bold border border-shogun-accent/40 shadow-[0_0_8px_rgba(110,232,154,0.2)]'
                : 'text-shogun-muted hover:text-white'
            }`}
          >
            Switch ({accounts.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs transition-all ${
              activeTab === 'create'
                ? 'bg-shogun-accent/15 text-shogun-accent font-bold border border-shogun-accent/40 shadow-[0_0_8px_rgba(110,232,154,0.2)]'
                : 'text-shogun-muted hover:text-white'
            }`}
          >
            + Create
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs transition-all ${
              activeTab === 'wallet'
                ? 'bg-shogun-accent/15 text-shogun-accent font-bold border border-shogun-accent/40 shadow-[0_0_8px_rgba(110,232,154,0.2)]'
                : 'text-shogun-muted hover:text-white'
            }`}
          >
            Web3 Wallet
          </button>
        </div>

        {/* Tab Content 1: Switch Account */}
        {activeTab === 'switch' && (
          <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto pr-1">
            {accounts.map((acc) => {
              const isSelected = acc.id === activeAccount.id;
              const style = colorStyles[acc.avatarColor] || colorStyles.emerald;

              return (
                <div
                  key={acc.id}
                  className={`glass-card rounded-2xl p-3.5 flex items-center justify-between transition-all duration-200 border ${
                    isSelected
                      ? 'border-shogun-accent/60 bg-shogun-accent/10 shadow-[0_0_15px_rgba(110,232,154,0.15)]'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold font-mono text-sm ${style.bg} ${style.border} ${style.text}`}
                    >
                      {acc.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-white">
                          {acc.name}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-shogun-accent/50 text-shogun-accent bg-shogun-accent/20 font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] font-mono text-shogun-muted flex items-center gap-2 mt-0.5">
                        <span className="text-white/80">${acc.startingBalanceUsd.toLocaleString()} AUM</span>
                        <span>•</span>
                        <span className="truncate max-w-[140px]">{acc.emailOrWallet}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!isSelected ? (
                      <button
                        onClick={() => onSelectAccount(acc)}
                        className="px-3 py-1.5 rounded-lg border border-shogun-accent/40 bg-shogun-accent/10 hover:bg-shogun-accent/20 text-shogun-accent font-mono text-xs font-bold transition"
                      >
                        Switch
                      </button>
                    ) : (
                      <span className="p-1 rounded-full bg-shogun-accent/20 text-shogun-accent">
                        <Check size={14} />
                      </span>
                    )}

                    {accounts.length > 1 && acc.id !== 'acc_tokyo_hq' && onDeleteAccount && (
                      <button
                        onClick={() => onDeleteAccount(acc.id)}
                        className="p-1.5 text-shogun-muted hover:text-shogun-crimson transition rounded-lg hover:bg-white/5"
                        title="Delete sub-account"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setActiveTab('create')}
              className="mt-1 w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-shogun-accent text-shogun-muted hover:text-white font-mono text-xs transition flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              <span>Create Another Sub-Account</span>
            </button>
          </div>
        )}

        {/* Tab Content 2: Create Sub-Account */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3 font-mono text-xs">
            <div>
              <label className="text-white block mb-1">Sub-Account Name / Desk Alias:</label>
              <input
                type="text"
                required
                placeholder="e.g. Franky Prime, Ronin Hunter, Alpha Vault"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 text-white placeholder:text-shogun-muted focus:border-shogun-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="text-white block mb-1">Wallet Address or Email (Optional):</label>
              <input
                type="text"
                placeholder="0x... or trader@domain.com"
                value={emailOrWallet}
                onChange={(e) => setEmailOrWallet(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 text-white placeholder:text-shogun-muted focus:border-shogun-accent focus:outline-none"
              />
            </div>

            {/* Starting Treasury */}
            <div>
              <label className="text-white block mb-1">Starting Paper Treasury Allocation:</label>
              <div className="grid grid-cols-4 gap-2">
                {[10000, 25000, 50000, 100000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setStartingBalance(amt)}
                    className={`py-1.5 rounded-lg border text-xs transition ${
                      startingBalance === amt
                        ? 'border-shogun-accent bg-shogun-accent/20 text-shogun-accent font-bold'
                        : 'border-white/10 bg-black/40 text-shogun-muted hover:text-white'
                    }`}
                  >
                    ${amt / 1000}k
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Commander */}
            <div>
              <label className="text-white block mb-1">Default Samurai Commander:</label>
              <select
                value={commander}
                onChange={(e) => setCommander(e.target.value as CommanderRole)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 text-white focus:border-shogun-accent focus:outline-none"
              >
                <option value="The Ronin (浪人)">The Ronin (浪人) — Momentum Scout</option>
                <option value="The Shinobi (忍)">The Shinobi (忍) — Stealth Accumulator</option>
                <option value="The Daimyo (大名)">The Daimyo (大名) — Conservative Veto Guard</option>
              </select>
            </div>

            {/* Avatar Color */}
            <div>
              <label className="text-white block mb-1">Avatar Accent Color:</label>
              <div className="flex items-center gap-2">
                {(['emerald', 'gold', 'purple', 'cyan', 'crimson'] as const).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-xl border flex items-center justify-center transition ${
                      colorStyles[c].bg
                    } ${colorStyles[c].border} ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
                  >
                    {color === c && <Check size={12} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-bold transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(110,232,154,0.25)]"
            >
              <span>Create Account & Sign In</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* Tab Content 3: Web3 Wallet */}
        {activeTab === 'wallet' && (
          <div className="flex flex-col gap-4 font-mono text-xs">
            <div className="glass-card rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-shogun-muted uppercase text-[10px]">Web3 Connection</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                    walletConnected
                      ? 'border-shogun-accent/40 bg-shogun-accent/15 text-shogun-accent'
                      : 'border-white/10 bg-white/5 text-shogun-muted'
                  }`}
                >
                  {walletConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                  <Wallet size={18} />
                </div>
                <div>
                  <span className="text-white font-bold block">
                    {walletConnected ? activeAccount.emailOrWallet : 'No Wallet Connected'}
                  </span>
                  <span className="text-[10px] text-shogun-muted block">
                    {walletConnected ? 'Network: Base Mainnet / EVM' : 'Connect via MetaMask, Coinbase, or Rainbow'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateWalletConnect}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:opacity-95 text-black font-bold transition flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(6,182,212,0.25)]"
            >
              <Wallet size={15} />
              <span>{walletConnected ? 'Regenerate EVM Keypair' : '1-Click Connect Web3 Wallet'}</span>
            </button>

            <div className="text-[10px] text-shogun-muted flex items-center gap-1.5 p-2 bg-black/40 rounded-xl border border-white/5">
              <ShieldCheck size={13} className="text-shogun-accent shrink-0" />
              <span>Non-custodial session key. Zero private keys exposed. Guaranteed by Daimyo protocol veto.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
