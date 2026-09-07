import React from 'react';
import { NavigationPath } from '../types';

interface SidebarProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  pendingReviewsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  pendingReviewsCount,
}) => {
  const navItems: {
    id: NavigationPath;
    label: string;
    icon: string;
    badge?: string | number;
    sublabel?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'National Overview',
      icon: 'dashboard',
      sublabel: 'Standardization metrics',
    },
    {
      id: 'upload',
      label: 'Batch Ingestion',
      icon: 'cloud_upload',
      sublabel: 'ERP feeds & AI pipeline',
    },
    {
      id: 'review',
      label: 'Sentinel AI Queue',
      icon: 'model_training',
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined,
      sublabel: 'Candidate clusters',
    },
    {
      id: 'bridge-map',
      label: 'Cross-Ref Bridge Map',
      icon: 'alt_route',
      sublabel: 'Legacy to CNMC lookup',
    },
    {
      id: 'material-detail',
      label: 'Material Passport',
      icon: 'inventory_2',
      sublabel: 'CNMC-4014-9921-008',
    },
    {
      id: 'reports',
      label: 'Harmonization Analytics',
      icon: 'query_stats',
      sublabel: 'CPSE savings & tenders',
    },
    {
      id: 'settings',
      label: 'Taxonomy & Audit',
      icon: 'settings_suggest',
      sublabel: 'CVC rules & ML engine',
    },
  ];

  return (
    <aside className="w-[260px] shrink-0 border-r border-[#dce9ff] bg-[#ffffff] flex flex-col justify-between p-3.5 h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto">
      <div>
        <div className="mb-3 px-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
            Platform Modules
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-all ${
                  isActive
                    ? 'bg-[#002653] text-white shadow-sm font-semibold'
                    : 'text-[#43474f] hover:bg-[#eff4ff] hover:text-[#002653]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[18px] shrink-0 transition-colors ${
                      isActive ? 'text-[#86f2e4]' : 'text-[#747780] group-hover:text-[#002653]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div className="truncate">
                    <div className="leading-tight">{item.label}</div>
                    {item.sublabel && (
                      <div
                        className={`text-[10px] font-normal truncate ${
                          isActive ? 'text-[#abc7ff]' : 'text-[#747780]'
                        }`}
                      >
                        {item.sublabel}
                      </div>
                    )}
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#ba1a1a] text-white'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="mt-4 pt-3 border-t border-[#dce9ff] space-y-2.5">
        <div className="rounded-lg border border-[#dce9ff] bg-[#f8f9ff] p-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#002653]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#006a61]"></span>
              GovLedger Mainnet
            </span>
            <span className="text-[9px] font-mono bg-[#eff4ff] px-1 py-0.5 rounded text-[#002653]">
              v2.4-IND
            </span>
          </div>
          <div className="mt-1.5 text-[10px] text-[#43474f] space-y-0.5">
            <p className="truncate">
              Node: <span className="font-mono text-[#002653]">NIC-DL-PRM-01</span>
            </p>
            <p className="truncate">
              CVC Audit Stamp: <span className="font-mono text-[#006a61]">VERIFIED</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#747780] px-1">
          <span>DPE Portal v2.4</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#006a61]">verified_user</span>
            Govt. of India
          </span>
        </div>
      </div>
    </aside>
  );
};
