import React from 'react';
import { JOINT_TENDERS_DATA } from '../data/mockData';
import { NavigationPath } from '../types';

interface ReportsViewProps {
  onNavigate: (path: NavigationPath) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onNavigate }) => {
  const categorySavings = [
    { name: 'Pipes & Tubular Goods (ASTM A106/API 5L)', savings: '₹ 412.4 Cr', items: '14,200', pct: 33.2, ratio: '3.6:1' },
    { name: 'Fluid Power Valves & Actuators (API 594/600)', savings: '₹ 328.6 Cr', items: '9,840', pct: 28.6, ratio: '3.8:1' },
    { name: 'Pumps, Turbomachinery & Mechanical Seals', savings: '₹ 214.2 Cr', items: '4,120', pct: 24.1, ratio: '2.9:1' },
    { name: 'Flanges & High-Pressure Fittings (B16.5)', savings: '₹ 164.8 Cr', items: '18,400', pct: 19.8, ratio: '3.9:1' },
    { name: 'Electrical Switchgear & Heavy Cables', savings: '₹ 128.6 Cr', items: '6,210', pct: 22.4, ratio: '2.5:1' },
  ];

  const cpseSavings = [
    { name: 'ONGC Ltd.', realized: '₹ 384.2 Cr', harmonizedRate: 82, skusRetired: '380,400', status: 'Exceeded' },
    { name: 'IOCL', realized: '₹ 342.1 Cr', harmonizedRate: 78, skusRetired: '410,200', status: 'On Track' },
    { name: 'BHEL', realized: '₹ 189.5 Cr', harmonizedRate: 65, skusRetired: '198,000', status: 'On Track' },
    { name: 'GAIL (India)', realized: '₹ 156.4 Cr', harmonizedRate: 88, skusRetired: '142,000', status: 'Benchmark' },
    { name: 'NTPC Ltd.', realized: '₹ 112.8 Cr', harmonizedRate: 71, skusRetired: '185,000', status: 'On Track' },
    { name: 'SAIL', realized: '₹ 63.6 Cr', harmonizedRate: 58, skusRetired: '105,290', status: 'Accelerating' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              DPE Sovereign Analytics
            </span>
            <span className="text-xs text-[#006a61] font-semibold">● FY 2024-25 Q3 Report</span>
          </div>
          <h1 className="text-2xl font-bold text-[#002653] mt-1.5 tracking-tight">
            National Material Harmonization & Savings Analytics
          </h1>
          <p className="text-xs text-[#43474f] max-w-2xl mt-0.5">
            Aggregated scale efficiencies, inventory rationalization, and joint procurement pipelines
            governed under the Common National Material Code (CNMC).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Scheduled automated weekly digest to CPSE procurement directors.')}
            className="flex items-center gap-1.5 rounded-lg border border-[#c4c6d0] bg-white px-3 py-2 text-xs font-semibold text-[#002653] hover:bg-[#f8f9ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">schedule_send</span>
            Schedule Digest
          </button>
          <button
            onClick={() => alert('Generating official CVC & DPE compliance PDF dossier...')}
            className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">
              picture_as_pdf
            </span>
            Generate Official Dossier
          </button>
        </div>
      </div>

      {/* Hero Summary Banner */}
      <div className="rounded-xl border border-[#86f2e4] bg-gradient-to-r from-[#eff4ff] via-white to-[#eff4ff] p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
              Consolidated Net Scale Savings Realized
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold tracking-tight text-[#002653]">
                ₹ 1,248.60 Cr
              </span>
              <span className="rounded bg-[#86f2e4]/50 px-2 py-0.5 text-xs font-bold text-[#006f66]">
                +31.4% vs FY23
              </span>
            </div>
            <p className="text-xs text-[#43474f] max-w-lg leading-relaxed">
              Achieved across 26 CPSEs by eliminating brand lock-ins, standardizing metallurgy, and
              leveraging combined procurement purchasing power on the GeM portal.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#002653]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#002653]"></span>
                62.6% Direct Scale Discounts (₹782 Cr)
              </span>
              <span className="flex items-center gap-1.5 text-[#006a61]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#006a61]"></span>
                37.4% Inventory Rationalization (₹466.6 Cr)
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-[#dce9ff] bg-white p-3.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-[#747780] block">
                Avg. Price Spread Arbitrage
              </span>
              <span className="text-xl font-bold text-[#ba1a1a] mt-1 block">28.4%</span>
              <span className="text-[10px] text-[#747780]">Prior to standardization</span>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-[#747780] block">
                Retired Redundant SKUs
              </span>
              <span className="text-xl font-bold text-[#002653] mt-1 block">1,008,240</span>
              <span className="text-[10px] text-[#006a61]">Catalog deduplication</span>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-[#747780] block">
                Joint GeM Tenders
              </span>
              <span className="text-xl font-bold text-[#006a61] mt-1 block">42 Active</span>
              <span className="text-[10px] text-[#747780]">Consolidated bidding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Breakdown Tables: By Category & By CPSE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Category Table (6 cols) */}
        <div className="lg:col-span-6 rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#002653]">
              Savings Breakdown by Material Category
            </h3>
            <span className="text-[11px] text-[#747780]">Class 40 & 43 Leading</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#dce9ff]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
                <tr>
                  <th className="px-3 py-2.5">Category Group</th>
                  <th className="px-3 py-2.5 text-right">Items</th>
                  <th className="px-3 py-2.5 text-right">Arbitrage Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {categorySavings.map((cat, i) => (
                  <tr key={i} className="hover:bg-[#f8f9ff]">
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-[#002653]">{cat.name}</div>
                      <div className="text-[10px] text-[#747780]">Dedup Ratio: {cat.ratio}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-[#43474f]">
                      {cat.items}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="font-bold text-[#006a61]">{cat.savings}</div>
                      <div className="text-[10px] text-[#747780]">+{cat.pct}% margin</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CPSE Realization Table (6 cols) */}
        <div className="lg:col-span-6 rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#002653]">
              Savings Realized by CPSE Entity
            </h3>
            <span className="text-[11px] text-[#747780]">Ranked by Value</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#dce9ff]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
                <tr>
                  <th className="px-3 py-2.5">CPSE Entity</th>
                  <th className="px-3 py-2.5 text-center">Harmonization</th>
                  <th className="px-3 py-2.5 text-right">Realized Savings</th>
                  <th className="px-3 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {cpseSavings.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f8f9ff]">
                    <td className="px-3 py-2.5 font-bold text-[#002653]">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-[#747780] font-normal">
                        {item.skusRetired} skus
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="font-bold text-[#002653]">{item.harmonizedRate}%</div>
                      <div className="h-1.5 w-16 mx-auto rounded-full bg-[#eff4ff] mt-0.5">
                        <div
                          className="h-full rounded-full bg-[#006a61]"
                          style={{ width: `${item.harmonizedRate}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-bold text-[#006a61]">
                      {item.realized}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="rounded bg-[#eff4ff] px-1.5 py-0.5 text-[10px] font-semibold text-[#002653]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Joint Procurement Tenders Initiated via CNMC */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#002653]">
              Active Inter-CPSE Joint Tenders Initiated via CNMC
            </h3>
            <p className="text-xs text-[#747780]">
              Aggregated procurement bids published on GeM utilizing standardized national specifications
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[#006a61] hover:underline"
          >
            View All 42 Tenders →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {JOINT_TENDERS_DATA.map((tender) => (
            <div
              key={tender.id}
              className="rounded-xl border border-[#dce9ff] bg-[#f8f9ff] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#002653]">{tender.code}</span>
                  <span className="rounded bg-[#86f2e4]/40 px-2 py-0.5 text-[10px] font-bold text-[#006f66]">
                    {tender.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#002653]">{tender.title}</h4>

                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] text-[#747780]">CPSE Consortium:</span>
                  {tender.participatingCpses.map((cpse, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white border border-[#dce9ff] px-1.5 py-0.2 text-[10px] font-semibold text-[#002653]"
                    >
                      {cpse}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-[#dce9ff]">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-[#747780]">Tender Value:</span>
                  <span className="text-sm font-bold text-[#002653]">{tender.consolidatedValue}</span>
                </div>
                <p className="text-[10px] text-[#006a61] font-medium mt-0.5">
                  {tender.savingsInsight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
