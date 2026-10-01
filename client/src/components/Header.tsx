import React, { useState, useEffect } from 'react';
import { Shield, Radio, Settings2, User, ChevronDown, Check, Menu, X } from 'lucide-react';
import { UserSubAccount } from '../types/index.js';

interface HeaderProps {
  onOpenMcpConfig: () => void;
  onOpenSystemStatus: () => void;
  circuitTripped: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  // Sub-accounts
  accounts: UserSubAccount[];
  activeAccount: UserSubAccount;
  onOpenAccountModal: () => void;
  onSelectAccount: (acc: UserSubAccount) => void;
  onConveneCouncil?: () => void;
  isConvening?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMcpConfig,
  onOpenSystemStatus,
  circuitTripped,
  activeTab = 'dashboard',
  onTabChange,
  accounts,
  activeAccount,
  onOpenAccountModal,
  onSelectAccount,
  onConveneCouncil,
  isConvening = false
}) => {
  const [currentTimeJST, setCurrentTimeJST] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jstString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTimeJST(`${jstString} JST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'debate', label: 'Agent Debate' },
    { id: 'safety', label: 'Safety Harness' },
    { id: 'backtest', label: 'Backtest & OOS' },
    { id: 'audit', label: 'Audit Logs' }
  ];

  const handleNavClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
              {/* Obsidian Black Samurai Seal */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black border border-zinc-800 shadow-sm flex items-center justify-center font-bold text-white font-jp text-lg sm:text-xl transition-transform hover:scale-105">
                将
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl font-display">
                    RYO SHOGUN
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-900 font-bold border border-zinc-300">
                    v2.1
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Tokyo HQ</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-700 font-semibold">{currentTimeJST}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs (Mature Monochrome) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Sub-Account, Status, and Solid Black CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sub-Account Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-mono font-medium text-slate-700"
              >
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <span className="font-semibold max-w-[80px] sm:max-w-[110px] truncate">
                  {activeAccount.name}
                </span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Switch Account
                  </div>
                  {accounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        onSelectAccount(acc);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-800">{acc.name}</span>
                      </div>
                      {acc.id === activeAccount.id && <Check size={13} className="text-black shrink-0" />}
                    </button>
                  ))}
                  <div className="p-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenAccountModal();
                      }}
                      className="w-full text-center py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors font-mono"
                    >
                      + Manage Accounts
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Circuit Breaker Status Pill */}
            <button
              onClick={onOpenSystemStatus}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-mono text-slate-600 transition-colors"
              title="System Telemetry & Status"
            >
              <Shield size={13} className={circuitTripped ? 'text-red-500' : 'text-emerald-500'} />
              <span className="font-semibold">{circuitTripped ? 'VETO ACTIVE' : 'SHIELDS UP'}</span>
            </button>

            {/* Quick Status / MCP Config */}
            <button
              onClick={onOpenMcpConfig}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-black hover:bg-zinc-100 transition-colors"
              title="MCP Configuration"
            >
              <Settings2 size={16} />
            </button>

            {/* Primary Solid Black CTA */}
            <button
              onClick={onConveneCouncil}
              disabled={isConvening}
              className="bg-black hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-black shadow-sm hover:shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Radio size={14} className={isConvening ? 'animate-spin' : ''} />
              <span className="hidden sm:inline font-mono font-bold">
                {isConvening ? 'Convening...' : 'Convene Council'}
              </span>
              <span className="sm:hidden font-mono font-bold">
                {isConvening ? '...' : 'Convene'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 flex flex-col gap-1">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id ? 'bg-black text-white font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Touch-Friendly Horizontal Tab Strip on Mobile */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
