import React, { useState } from 'react';
import { EKAM_LOGO_URL, USER_AVATAR_URL } from '../data/mockData';
import { CPSEEntity, NavigationPath } from '../types';

interface HeaderProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  selectedCpse: string;
  onSelectCpse: (cpse: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  selectedCpse,
  onSelectCpse,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCpseDropdown, setShowCpseDropdown] = useState(false);

  const cpseOptions = [
    'All CPSEs (Consolidated)',
    'ONGC',
    'IOCL',
    'GAIL',
    'BHEL',
    'NTPC',
    'SAIL',
    'HPCL',
    'BPCL',
  ];

  return (
    <header className="sticky top-0 z-40 flex h-[56px] w-full items-center justify-between border-b border-[#dce9ff] bg-[#ffffff] px-4 shadow-[0_1px_3px_rgba(0,38,83,0.06)]">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
        >
          <img
            src={EKAM_LOGO_URL}
            alt="EKAM Emblem"
            className="h-9 w-9 rounded-md object-contain border border-[#dce9ff] bg-[#eff4ff] p-0.5"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold tracking-tight text-[#002653]">
                EKAM
              </span>
              <span className="rounded bg-[#d7e3ff] px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider text-[#001b3f]">
                National Portal
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#43474f] leading-none">
              Unified Material Master Platform (DPE • GeM)
            </span>
          </div>
        </button>

        <div className="hidden h-6 w-px bg-[#dce9ff] md:block mx-1"></div>

        {/* CPSE Selector */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setShowCpseDropdown(!showCpseDropdown)}
            className="flex items-center gap-1.5 rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-2.5 py-1 text-xs font-semibold text-[#002653] hover:bg-[#eff4ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">
              corporate_fare
            </span>
            <span>{selectedCpse}</span>
            <span className="material-symbols-outlined text-[14px] text-[#747780]">
              expand_more
            </span>
          </button>

          {showCpseDropdown && (
            <div className="absolute left-0 top-full mt-1.5 w-56 rounded-lg border border-[#c4c6d0] bg-white p-1.5 shadow-lg z-50">
              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#747780]">
                Select CPSE Scope
              </div>
              {cpseOptions.map((cpse) => (
                <button
                  key={cpse}
                  onClick={() => {
                    onSelectCpse(cpse);
                    setShowCpseDropdown(false);
                  }}
                  className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-xs text-left font-medium transition-colors ${
                    selectedCpse === cpse
                      ? 'bg-[#eff4ff] text-[#002653] font-semibold'
                      : 'text-[#43474f] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span>{cpse}</span>
                  {selectedCpse === cpse && (
                    <span className="material-symbols-outlined text-[14px] text-[#002653]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Universal Search */}
      <div className="relative hidden md:flex items-center max-w-md w-full mx-4">
        <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#747780]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search CNMC code, legacy SKU, plant item, or description..."
          className="w-full rounded-full border border-[#c4c6d0] bg-[#f8f9ff] py-1.5 pl-9 pr-14 text-xs text-[#0b1c30] placeholder-[#747780] focus:border-[#002653] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#002653]"
        />
        <span className="absolute right-3 rounded border border-[#c4c6d0] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#747780]">
          ⌘K
        </span>
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-2.5">
        {/* GovLedger Sync Pill */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-[#86f2e4] bg-[#e5eeff] px-2.5 py-1 text-[11px] font-semibold text-[#006f66]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#006a61] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#006a61]"></span>
          </span>
          <span>GovLedger #449,102 Live</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#43474f] hover:bg-[#f8f9ff] transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-[9px] font-bold text-white">
              14
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-1.5 w-80 rounded-xl border border-[#c4c6d0] bg-white p-3 shadow-xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
                <span className="text-xs font-bold text-[#002653]">Notifications & Alerts</span>
                <span className="rounded bg-[#eff4ff] px-1.5 py-0.5 text-[10px] font-semibold text-[#002653]">
                  14 Pending Reviews
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('review');
                  }}
                  className="cursor-pointer rounded-lg p-2 bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                >
                  <p className="text-xs font-semibold text-[#002653]">
                    High-Arbitrage Cluster #CL-8421
                  </p>
                  <p className="text-[11px] text-[#43474f] mt-0.5">
                    SS316 Dual Plate Check Valve ready for dual authorization (₹3.82 Cr savings).
                  </p>
                  <span className="text-[10px] text-[#747780] mt-1 block">12 mins ago</span>
                </div>
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('upload');
                  }}
                  className="cursor-pointer rounded-lg p-2 hover:bg-[#f8f9ff] transition-colors"
                >
                  <p className="text-xs font-semibold text-[#006a61]">
                    ONGC Hazira Q3 Pipeline Ingestion Complete
                  </p>
                  <p className="text-[11px] text-[#43474f] mt-0.5">
                    1,240 items parsed with 99.8% schema validation rate.
                  </p>
                  <span className="text-[10px] text-[#747780] mt-1 block">1 hr ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 border-l border-[#dce9ff] pl-2.5">
          <img
            src={USER_AVATAR_URL}
            alt="Shri P. N. Verma"
            className="h-8 w-8 rounded-full border border-[#abc7ff] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight text-[#002653]">
              Shri P. N. Verma
            </span>
            <span className="text-[10px] font-medium text-[#747780] leading-none">
              Joint Dir, DHI / GeM Cell
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
