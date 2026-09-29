import React, { useState } from 'react';
import { X, User, Plus, Wallet, Trash2 } from 'lucide-react';
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
  const [color, setColor] = useState<UserSubAccount['avatarColor']>('purple');

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
    onCreateAccount({
      name: `${activeAccount.name} (Web3 Linked)`,
      emailOrWallet: mockAddr,
      avatarColor: 'purple',
      startingBalanceUsd: activeAccount.startingBalanceUsd,
      preferredCommander: activeAccount.preferredCommander
    });
    setActiveTab('switch');
  };

  const colorStyles: Record<UserSubAccount['avatarColor'], { bg: string; border: string; text: string }> = {
    purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700' },
    gold: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700' },
    cyan: { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-700' },
    crimson: { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-700' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                Sub-Account Center · 口座管理
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Create, switch profiles, or connect Web3 identity
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'switch' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profiles ({accounts.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'create' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Create New
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'wallet' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Web3 Wallet
          </button>
        </div>

        {/* TAB 1: SWITCH ACCOUNTS */}
        {activeTab === 'switch' && (
          <div className="flex flex-col gap-3">
            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              {accounts.map((acc) => {
                const isSelected = acc.id === activeAccount.id;
                const cStyle = colorStyles[acc.avatarColor] || colorStyles.purple;

                return (
                  <div
                    key={acc.id}
                    onClick={() => onSelectAccount(acc)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200/80 hover:border-purple-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${cStyle.bg} ${cStyle.border} ${cStyle.text}`}>
                        {acc.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-slate-900">{acc.name}</span>
                          {isSelected && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {acc.emailOrWallet || 'No address linked'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs text-slate-700">
                        ${acc.startingBalanceUsd?.toLocaleString() || '15,000'}
                      </span>
                      {onDeleteAccount && accounts.length > 1 && !isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteAccount(acc.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete account"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('create')}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 hover:border-purple-300 text-xs font-mono font-bold text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add Another Sub-Account</span>
            </button>
          </div>
        )}

        {/* TAB 2: CREATE NEW ACCOUNT */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase mb-1">
                Account Name / Workspace
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DeFi Perps Desk, Alpha Fund"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase mb-1">
                Linked Email or EVM Wallet Address
              </label>
              <input
                type="text"
                value={emailOrWallet}
                onChange={(e) => setEmailOrWallet(e.target.value)}
                placeholder="0x... or user@domain.eth (optional)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase mb-1">
                  Starting Balance
                </label>
                <input
                  type="number"
                  value={startingBalance}
                  onChange={(e) => setStartingBalance(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase mb-1">
                  Preferred Commander
                </label>
                <select
                  value={commander}
                  onChange={(e) => setCommander(e.target.value as CommanderRole)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-purple-600 focus:bg-white transition"
                >
                  <option value="The Ronin (浪人)">The Ronin (Breakout)</option>
                  <option value="The Shinobi (忍)">The Shinobi (Accumulation)</option>
                  <option value="The Daimyo (大名)">The Daimyo (Guardian)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-600 uppercase mb-1">
                Avatar Theme
              </label>
              <div className="flex gap-2">
                {(['purple', 'emerald', 'cyan', 'gold', 'crimson'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-lg border-2 transition ${
                      color === c ? 'border-purple-600 ring-2 ring-purple-200 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    } ${
                      c === 'purple' ? 'bg-purple-600' : c === 'emerald' ? 'bg-emerald-600' : c === 'cyan' ? 'bg-cyan-600' : c === 'gold' ? 'bg-amber-500' : 'bg-rose-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('switch')}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold text-xs shadow-sm transition"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: WEB3 WALLET CONNECT */}
        {activeTab === 'wallet' && (
          <div className="flex flex-col gap-4 text-center py-2">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-sm">
              <Wallet size={28} />
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900">
                Connect EVM Wallet
              </h4>
              <p className="text-xs text-slate-500 font-mono mt-1 max-w-xs mx-auto">
                Sign in with MetaMask, Rabby, or WalletConnect on Ethereum & Robinhood Chain.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleSimulateWalletConnect}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
              >
                <Wallet size={16} />
                <span>Connect MetaMask / Rabby</span>
              </button>
              <button
                onClick={() => setActiveTab('switch')}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-mono transition"
              >
                Back to Profiles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
