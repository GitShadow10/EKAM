import React, { useState } from 'react';
import { BRIDGE_MAP_DATA } from '../data/mockData';
import { BridgeMappingRecord, NavigationPath } from '../types';

interface BridgeMapViewProps {
  onNavigate: (path: NavigationPath) => void;
}

export const BridgeMapView: React.FC<BridgeMapViewProps> = ({ onNavigate }) => {
  const [records, setRecords] = useState<BridgeMappingRecord[]>(BRIDGE_MAP_DATA);
  const [search, setSearch] = useState('');
  const [selectedCpse, setSelectedCpse] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeHeritageRecord, setActiveHeritageRecord] = useState<BridgeMappingRecord | null>(null);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.legacyCode.toLowerCase().includes(search.toLowerCase()) ||
      r.mappedCnmcCode.toLowerCase().includes(search.toLowerCase()) ||
      r.rawDescription.toLowerCase().includes(search.toLowerCase()) ||
      r.standardizedDescription.toLowerCase().includes(search.toLowerCase()) ||
      r.plant.toLowerCase().includes(search.toLowerCase());

    const matchesCpse = selectedCpse === 'ALL' || r.cpse === selectedCpse;
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;

    return matchesSearch && matchesCpse && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              Cross-Reference Core
            </span>
            <span className="text-xs text-[#006a61] font-semibold">● 38,912 Active Links</span>
          </div>
          <h1 className="text-2xl font-bold text-[#002653] mt-1.5 tracking-tight">
            Enterprise Cross-Reference Bridge Map (Legacy to CNMC)
          </h1>
          <p className="text-xs text-[#43474f] max-w-2xl mt-0.5">
            Bi-directional lookup index connecting CPSE-specific ERP material codes with the Common
            National Material Code (CNMC) standard for multi-enterprise procurement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting complete cross-reference catalog as CSV...')}
            className="flex items-center gap-1.5 rounded-lg border border-[#c4c6d0] bg-white px-3 py-2 text-xs font-semibold text-[#002653] hover:bg-[#f8f9ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export CSV
          </button>
          <button
            onClick={() => onNavigate('upload')}
            className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add_link</span>
            Ingest New Mappings
          </button>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Active Cross-References</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eff4ff] text-[#002653]">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold text-[#002653]">38,912</div>
          <div className="mt-1 text-[11px] text-[#747780]">Across 182 industrial plants</div>
        </div>

        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">CPSE Entities Connected</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eff4ff] text-[#006a61]">
              <span className="material-symbols-outlined text-[18px]">apartment</span>
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold text-[#002653]">26 Entities</div>
          <div className="mt-1 text-[11px] text-[#006a61] font-semibold">100% Maharatnas live</div>
        </div>

        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Catalog Deduplication</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#86f2e4]/30 text-[#006f66]">
              <span className="material-symbols-outlined text-[18px]">compress</span>
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold text-[#002653]">3.4 : 1 Ratio</div>
          <div className="mt-1 text-[11px] text-[#747780]">Average redundancy reduction</div>
        </div>

        <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#43474f]">Last Auto-Sync Batch</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eff4ff] text-[#002653]">
              <span className="material-symbols-outlined text-[18px]">sync</span>
            </span>
          </div>
          <div className="mt-2 text-2xl font-bold text-[#002653]">18 Nov 2024</div>
          <div className="mt-1 text-[11px] text-[#747780]">SAP RFC & Oracle connectors active</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#747780]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search legacy code, CNMC, plant, or description..."
              className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] py-2 pl-9 pr-3 text-xs text-[#0b1c30] placeholder-[#747780] focus:border-[#002653] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCpse}
              onChange={(e) => setSelectedCpse(e.target.value)}
              className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-3 py-2 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
            >
              <option value="ALL">All CPSEs</option>
              <option value="ONGC">ONGC</option>
              <option value="IOCL">IOCL</option>
              <option value="GAIL">GAIL</option>
              <option value="BHEL">BHEL</option>
              <option value="NTPC">NTPC</option>
              <option value="SAIL">SAIL</option>
              <option value="HPCL">HPCL</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-3 py-2 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="LIVE">LIVE (Authorized)</option>
              <option value="PROVISIONAL">PROVISIONAL</option>
              <option value="DEPRECATED">DEPRECATED</option>
            </select>
          </div>
        </div>

        {/* Active Constraints */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-[#747780]">Active Filters:</span>
          {selectedCpse !== 'ALL' && (
            <span className="inline-flex items-center gap-1 rounded bg-[#eff4ff] px-2 py-0.5 text-xs text-[#002653] border border-[#dce9ff]">
              <span>CPSE: {selectedCpse}</span>
              <button onClick={() => setSelectedCpse('ALL')} className="hover:text-[#ba1a1a]">
                ×
              </button>
            </span>
          )}
          {selectedStatus !== 'ALL' && (
            <span className="inline-flex items-center gap-1 rounded bg-[#eff4ff] px-2 py-0.5 text-xs text-[#002653] border border-[#dce9ff]">
              <span>Status: {selectedStatus}</span>
              <button onClick={() => setSelectedStatus('ALL')} className="hover:text-[#ba1a1a]">
                ×
              </button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 rounded bg-[#eff4ff] px-2 py-0.5 text-xs text-[#002653] border border-[#dce9ff]">
              <span>Search: "{search}"</span>
              <button onClick={() => setSearch('')} className="hover:text-[#ba1a1a]">
                ×
              </button>
            </span>
          )}
          <span className="text-[11px] text-[#747780] ml-auto">
            Showing {filteredRecords.length} matching mappings
          </span>
        </div>
      </div>

      {/* Main Bridge Map Table */}
      <div className="rounded-xl border border-[#dce9ff] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              <tr>
                <th className="px-3.5 py-3">Legacy SKU Code</th>
                <th className="px-3.5 py-3">CPSE & Plant</th>
                <th className="px-3.5 py-3">Original Raw Description</th>
                <th className="px-3.5 py-3">Harmonized CNMC Code</th>
                <th className="px-3.5 py-3">Standard National Description</th>
                <th className="px-3.5 py-3 text-center">Confidence</th>
                <th className="px-3.5 py-3 text-center">Status</th>
                <th className="px-3.5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="px-3.5 py-3 font-mono font-bold text-[#002653] whitespace-nowrap">
                    {record.legacyCode}
                  </td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <span className="font-bold text-[#002653]">{record.cpse}</span>
                    <span className="block text-[10px] text-[#747780]">{record.plant}</span>
                  </td>
                  <td className="px-3.5 py-3 max-w-xs font-mono text-[11px] text-[#43474f] truncate">
                    {record.rawDescription}
                  </td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <span className="rounded bg-[#eff4ff] px-2 py-0.5 font-mono text-[11px] font-bold text-[#002653] border border-[#dce9ff]">
                      {record.mappedCnmcCode}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 max-w-sm font-semibold text-[#0b1c30] truncate">
                    {record.standardizedDescription}
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <span className="rounded bg-[#86f2e4]/30 px-1.5 py-0.5 text-[11px] font-bold text-[#006f66]">
                      {record.matchScore}%
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <span className="rounded bg-[#86f2e4]/40 px-2 py-0.5 text-[10px] font-bold text-[#006f66]">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => setActiveHeritageRecord(record)}
                      className="inline-flex items-center gap-1 rounded bg-[#002653] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#1a3c6e] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[12px]">history</span>
                      <span>Audit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Modal: Bridge Heritage & Harmonization Audit */}
      {activeHeritageRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 p-0">
          <div className="h-full w-full max-w-lg bg-white p-6 shadow-2xl overflow-y-auto space-y-5 border-l border-[#dce9ff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                  Lineage & GovLedger Audit
                </span>
                <h3 className="text-base font-bold text-[#002653]">
                  Bridge Heritage: {activeHeritageRecord.legacyCode}
                </h3>
              </div>
              <button
                onClick={() => setActiveHeritageRecord(null)}
                className="rounded-lg p-1 text-[#747780] hover:bg-[#eff4ff] hover:text-[#002653]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Target CNMC Box */}
            <div className="rounded-xl border border-[#86f2e4] bg-[#eff4ff] p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Mapped National Code (CNMC)
              </span>
              <div className="font-mono text-base font-bold text-[#002653]">
                {activeHeritageRecord.mappedCnmcCode}
              </div>
              <p className="text-xs font-semibold text-[#002653]">
                {activeHeritageRecord.standardizedDescription}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#747780]">
                <span>Standard UOM: <strong>{activeHeritageRecord.uom}</strong></span>
                <span>•</span>
                <span>Match Score: <strong>{activeHeritageRecord.matchScore}%</strong></span>
              </div>
            </div>

            {/* Source CPSE Details */}
            <div className="rounded-xl border border-[#dce9ff] bg-[#f8f9ff] p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Source ERP Metadata
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#747780] block text-[11px]">CPSE Entity:</span>
                  <strong className="text-[#002653]">{activeHeritageRecord.cpse}</strong>
                </div>
                <div>
                  <span className="text-[#747780] block text-[11px]">Plant / Site:</span>
                  <strong className="text-[#002653]">{activeHeritageRecord.plant}</strong>
                </div>
              </div>
              <div>
                <span className="text-[#747780] block text-[11px]">Raw Description:</span>
                <span className="font-mono text-[11px] text-[#0b1c30] bg-white p-2 rounded border border-[#dce9ff] block mt-0.5">
                  {activeHeritageRecord.rawDescription}
                </span>
              </div>
            </div>

            {/* Audit Trail Stamp */}
            <div className="rounded-xl border border-[#dce9ff] bg-white p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Harmonization Authorization Trail
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#747780]">Approval Timestamp:</span>
                  <span className="font-semibold text-[#002653]">{activeHeritageRecord.approvalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747780]">Authorized Officer:</span>
                  <span className="font-semibold text-[#002653]">{activeHeritageRecord.approvedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747780]">Officer Role:</span>
                  <span className="font-semibold text-[#002653]">{activeHeritageRecord.approverRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747780]">GovLedger Hash:</span>
                  <span className="font-mono text-[10px] text-[#006a61]">0x7F2A...91D8</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveHeritageRecord(null);
                  onNavigate('material-detail');
                }}
                className="w-full rounded-lg bg-[#002653] py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] text-center"
              >
                Open Full Material Passport
              </button>
              <button
                onClick={() => alert('Certificate of Harmonization downloaded.')}
                className="rounded-lg border border-[#c4c6d0] px-3 py-2 text-xs font-semibold text-[#002653] hover:bg-[#f8f9ff]"
              >
                Download Cert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
