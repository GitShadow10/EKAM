import React, { useState } from 'react';
import { CLUSTERS_DATA } from '../data/mockData';
import { NavigationPath, ClusterCandidate } from '../types';

interface DashboardViewProps {
  onNavigate: (path: NavigationPath) => void;
  onSelectCluster: (cluster: ClusterCandidate) => void;
  selectedCpse: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectCluster,
  selectedCpse,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'high-arbitrage' | 'valves' | 'piping'>('all');

  const filteredClusters = CLUSTERS_DATA.filter((c) => {
    if (activeTab === 'high-arbitrage') return c.costVariancePercent > 30;
    if (activeTab === 'valves') return c.category.toLowerCase().includes('valve');
    if (activeTab === 'piping') return c.category.toLowerCase().includes('tubular');
    return true;
  });

  const cpseProgressData = [
    { name: 'GAIL (India)', pct: 88, records: '142,000 / 161,000', ratio: '3.8:1', status: 'Ahead of Target' },
    { name: 'ONGC Ltd.', pct: 82, records: '380,400 / 464,000', ratio: '3.6:1', status: 'On Track' },
    { name: 'IOCL', pct: 78, records: '410,200 / 525,000', ratio: '3.4:1', status: 'On Track' },
    { name: 'NTPC Ltd.', pct: 71, records: '185,000 / 260,000', ratio: '2.9:1', status: 'On Track' },
    { name: 'BHEL', pct: 65, records: '198,000 / 305,000', ratio: '3.1:1', status: 'Needs Acceleration' },
    { name: 'SAIL', pct: 58, records: '105,290 / 181,000', ratio: '2.8:1', status: 'Stage-1 Ingestion' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#dce9ff] bg-[#ffffff] p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              <span className="material-symbols-outlined text-[14px] text-[#002653]">verified</span>
              DPE Directive 2024-C3
            </span>
            <span className="text-xs text-[#747780]">Updated 12 mins ago</span>
          </div>
          <h1 className="text-2xl font-bold text-[#002653] mt-1.5 tracking-tight">
            National Material Master Standardization Dashboard
          </h1>
          <p className="text-xs text-[#43474f] max-w-3xl mt-0.5">
            Inter-CPSE Harmonization & Deduplication Command Center • Harmonizing SAP, Oracle, and
            legacy ERP item catalogs under the Common National Material Code (CNMC).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-1.5 rounded-lg border border-[#c4c6d0] bg-white px-3 py-2 text-xs font-semibold text-[#002653] hover:bg-[#f8f9ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            Export DPE Dossier
          </button>
          <button
            onClick={() => onNavigate('upload')}
            className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">cloud_upload</span>
            New ERP Batch Ingestion
          </button>
        </div>
      </div>

      {/* 4 Sovereign KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* KPI 1 */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Ingested ERP Records</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eff4ff] text-[#002653]">
              <span className="material-symbols-outlined text-[18px]">database</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#002653]">1,420,890</span>
            <span className="text-[11px] font-semibold text-[#006a61] flex items-center">
              <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
              +12.4%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#747780] border-t border-[#eff4ff] pt-2">
            <span>Across 8 Maharatna CPSEs</span>
            <span className="font-semibold text-[#002653]">82.4% Verified</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Unique CNMC Codes Created</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e5eeff] text-[#006a61]">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#002653]">412,650</span>
            <span className="rounded bg-[#86f2e4]/30 px-1.5 py-0.5 text-[10px] font-bold text-[#006f66]">
              3.44:1 Deduplication
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#747780] border-t border-[#eff4ff] pt-2">
            <span>Redundancy Retired</span>
            <span className="font-semibold text-[#006a61]">1.008M Skus Saved</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Projected Arbitrage Savings</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ffddb8]/50 text-[#e89500]">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#002653]">₹ 1,248.60 Cr</span>
            <span className="text-[11px] font-semibold text-[#006a61] flex items-center">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              +31.4%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#747780] border-t border-[#eff4ff] pt-2">
            <span>Joint Tender Arbitrage</span>
            <span className="font-semibold text-[#002653]">FY 2024-25</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Sentinel AI Confidence</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d7e3ff] text-[#002653]">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#002653]">94.2%</span>
            <span className="text-[11px] font-medium text-[#747780]">Avg Match Confidence</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#747780] border-t border-[#eff4ff] pt-2">
            <span>Actionable Queue</span>
            <span className="font-bold text-[#ba1a1a]">14 Clusters Pending</span>
          </div>
        </div>
      </div>

      {/* Middle Section: CPSE Progress & Cumulative Savings Curve */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: CPSE Harmonization Progress (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#002653]">
                  CPSE Ingestion & Harmonization Progress
                </h3>
                <p className="text-[11px] text-[#747780]">
                  Target compliance as mandated by Department of Public Enterprises
                </p>
              </div>
              <button
                onClick={() => onNavigate('bridge-map')}
                className="text-xs font-semibold text-[#006a61] hover:underline flex items-center gap-1"
              >
                <span>View Full Bridge Map</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {cpseProgressData.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#002653]">{item.name}</span>
                      <span className="text-[10px] text-[#747780]">({item.records})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#43474f]">Ratio {item.ratio}</span>
                      <span className="font-bold text-[#002653]">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#eff4ff] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.pct >= 80
                          ? 'bg-[#006a61]'
                          : item.pct >= 70
                          ? 'bg-[#1a3c6e]'
                          : 'bg-[#ffb95f]'
                      }`}
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between text-[11px] text-[#747780]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#006a61]"></span>
              Target threshold for Joint GeM Tender aggregation is 70% harmonization.
            </span>
            <span className="font-semibold text-[#002653]">National Avg: 73.6%</span>
          </div>
        </div>

        {/* Right: Cumulative Projected Savings Chart (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#002653]">
                  National Procurement Savings Trajectory
                </h3>
                <p className="text-[11px] text-[#747780]">
                  Consolidated scale economics through standardized CNMC codes
                </p>
              </div>
              <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[10px] font-bold text-[#001b3f]">
                FY 24-25
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative mt-2 h-44 w-full">
              <svg viewBox="0 0 360 160" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="savingsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86f2e4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#86f2e4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="30" x2="360" y2="30" stroke="#eff4ff" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="360" y2="70" stroke="#eff4ff" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="360" y2="110" stroke="#eff4ff" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="360" y2="150" stroke="#dce9ff" />

                {/* Target Dashed Line */}
                <path
                  d="M 10 140 L 90 115 L 170 90 L 250 65 L 340 45"
                  fill="none"
                  stroke="#abc7ff"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Actual Realized Fill & Curve */}
                <path
                  d="M 10 145 L 70 135 L 140 110 L 210 75 L 280 48 L 340 25 L 340 150 L 10 150 Z"
                  fill="url(#savingsGrad)"
                />
                <path
                  d="M 10 145 L 70 135 L 140 110 L 210 75 L 280 48 L 340 25"
                  fill="none"
                  stroke="#006a61"
                  strokeWidth="3"
                />

                {/* Markers */}
                <circle cx="210" cy="75" r="4" fill="#006a61" />
                <circle cx="280" cy="48" r="4" fill="#006a61" />
                <circle cx="340" cy="25" r="5" fill="#002653" stroke="#86f2e4" strokeWidth="2" />
              </svg>

              {/* Float badge */}
              <div className="absolute right-4 top-2 rounded-lg bg-[#002653] p-2 text-white shadow-md text-[11px]">
                <div className="font-bold text-[#86f2e4]">₹1,248.60 Cr</div>
                <div className="text-[9px] text-[#abc7ff]">Current Run-rate</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mt-3 pt-3 border-t border-[#eff4ff]">
              <div className="rounded bg-[#f8f9ff] p-2">
                <span className="block text-[10px] text-[#747780]">Direct Arbitrage</span>
                <span className="text-xs font-bold text-[#002653]">₹ 782 Cr</span>
              </div>
              <div className="rounded bg-[#f8f9ff] p-2">
                <span className="block text-[10px] text-[#747780]">Inventory Pooling</span>
                <span className="text-xs font-bold text-[#002653]">₹ 314 Cr</span>
              </div>
              <div className="rounded bg-[#f8f9ff] p-2">
                <span className="block text-[10px] text-[#747780]">Vendor Admin</span>
                <span className="text-xs font-bold text-[#002653]">₹ 152 Cr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: AI High-Impact Match Clusters Detected */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#002653]">
                Recent High-Impact AI Match Clusters Detected
              </h3>
              <span className="rounded-full bg-[#ffdad6] px-2 py-0.5 text-[10px] font-bold text-[#93000a]">
                14 Pending Harmonization
              </span>
            </div>
            <p className="text-xs text-[#747780]">
              Identified by Sentinel ML using semantic embeddings and deterministic metallurgical specs
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] p-1">
            {(['all', 'high-arbitrage', 'valves', 'piping'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-[#002653] font-bold shadow-xs'
                    : 'text-[#43474f] hover:text-[#002653]'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Clusters Table */}
        <div className="overflow-x-auto rounded-lg border border-[#dce9ff]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              <tr>
                <th className="px-3.5 py-2.5">Cluster ID & Code</th>
                <th className="px-3.5 py-2.5">Synthesized Standard Material Description</th>
                <th className="px-3.5 py-2.5">Source CPSEs</th>
                <th className="px-3.5 py-2.5 text-center">AI Match</th>
                <th className="px-3.5 py-2.5 text-right">Price Variance</th>
                <th className="px-3.5 py-2.5 text-right">Est. Savings</th>
                <th className="px-3.5 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {filteredClusters.map((cluster) => (
                <tr key={cluster.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <span className="font-bold text-[#002653]">{cluster.id}</span>
                    <span className="block font-mono text-[10px] text-[#747780]">
                      {cluster.cnmcCode}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 max-w-sm">
                    <p className="font-semibold text-[#002653] line-clamp-1">{cluster.title}</p>
                    <p className="text-[11px] text-[#747780] font-mono line-clamp-1">
                      {cluster.synthesizedDescription}
                    </p>
                  </td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {cluster.sourceCpseList.map((src, i) => (
                        <span
                          key={i}
                          className="rounded border border-[#abc7ff] bg-[#d7e3ff]/40 px-1.5 py-0.5 text-[10px] font-semibold text-[#001b3f]"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-0.5 rounded px-2 py-0.5 text-[11px] font-bold ${
                        cluster.matchScore >= 95
                          ? 'bg-[#86f2e4]/40 text-[#006f66]'
                          : cluster.matchScore >= 85
                          ? 'bg-[#eff4ff] text-[#002653]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {cluster.matchScore}%
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-right whitespace-nowrap">
                    <span className="font-bold text-[#ba1a1a]">+{cluster.costVariancePercent}%</span>
                  </td>
                  <td className="px-3.5 py-3 text-right whitespace-nowrap">
                    <span className="font-bold text-[#006a61]">{cluster.estimatedArbitrageAnnual}</span>
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        onSelectCluster(cluster);
                        onNavigate('review');
                      }}
                      className="inline-flex items-center gap-1 rounded bg-[#002653] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#1a3c6e] transition-colors"
                    >
                      <span>Review</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
