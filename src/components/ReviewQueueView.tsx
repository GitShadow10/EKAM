import React, { useState } from 'react';
import { CLUSTERS_DATA } from '../data/mockData';
import { ClusterCandidate, NavigationPath } from '../types';

interface ReviewQueueViewProps {
  selectedCluster: ClusterCandidate;
  onSelectCluster: (cluster: ClusterCandidate) => void;
  onNavigate: (path: NavigationPath) => void;
}

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  selectedCluster,
  onSelectCluster,
  onNavigate,
}) => {
  const [clusters, setClusters] = useState<ClusterCandidate[]>(CLUSTERS_DATA);
  const [currentCluster, setCurrentCluster] = useState<ClusterCandidate>(selectedCluster);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showEditSpecModal, setShowEditSpecModal] = useState(false);
  const [editedSpec, setEditedSpec] = useState(currentCluster.synthesizedDescription);
  const [approvalSuccess, setApprovalSuccess] = useState(false);

  const handleSelect = (c: ClusterCandidate) => {
    setCurrentCluster(c);
    onSelectCluster(c);
    setEditedSpec(c.synthesizedDescription);
    setApprovalSuccess(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCluster.cnmcCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApprove = () => {
    setClusters((prev) =>
      prev.map((c) =>
        c.id === currentCluster.id ? { ...c, status: 'harmonized' } : c
      )
    );
    setCurrentCluster((prev) => ({ ...prev, status: 'harmonized' }));
    setShowApproveModal(false);
    setApprovalSuccess(true);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#dce9ff] bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              Sentinel ML Core v2
            </span>
            <span className="text-xs text-[#006a61] font-semibold">● Dual Authorization Mode</span>
          </div>
          <h1 className="text-xl font-bold text-[#002653] mt-1 tracking-tight">
            Sentinel AI Review Queue — Inter-CPSE Harmonization
          </h1>
          <p className="text-xs text-[#43474f]">
            Review, validate, and authorize machine-synthesized National Material Master codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('bridge-map')}
            className="flex items-center gap-1 rounded-lg border border-[#c4c6d0] bg-white px-3 py-1.5 text-xs font-semibold text-[#002653] hover:bg-[#f8f9ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            View Master Bridge Map
          </button>
          <button
            onClick={() => onNavigate('material-detail')}
            className="flex items-center gap-1 rounded-lg bg-[#002653] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">badge</span>
            Open Material Passport
          </button>
        </div>
      </div>

      {/* Approval Success Alert */}
      {approvalSuccess && (
        <div className="rounded-xl border border-[#86f2e4] bg-[#eff4ff] p-4 text-[#006f66] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px] text-[#006a61]">verified</span>
            <div>
              <div className="text-xs font-bold text-[#002653]">
                CNMC Code {currentCluster.cnmcCode} Successfully Minted & Harmonized!
              </div>
              <div className="text-[11px] text-[#43474f]">
                Committed to GovLedger Block #449,103. Mapped across ONGC, IOCL, and GAIL ERP catalogues.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('material-detail')}
            className="rounded bg-[#006a61] px-3 py-1 text-xs font-semibold text-white hover:bg-[#005049]"
          >
            View Passport
          </button>
        </div>
      )}

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Cluster Candidates List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#747780]">
                Candidate Clusters ({clusters.length})
              </span>
              <span className="rounded bg-[#eff4ff] px-1.5 py-0.5 text-[10px] font-bold text-[#002653]">
                Sorted by Arbitrage
              </span>
            </div>

            <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
              {clusters.map((cluster) => {
                const isSelected = cluster.id === currentCluster.id;
                return (
                  <div
                    key={cluster.id}
                    onClick={() => handleSelect(cluster)}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      isSelected
                        ? 'border-[#002653] bg-[#eff4ff] shadow-xs'
                        : 'border-[#dce9ff] bg-white hover:border-[#abc7ff] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#002653]">{cluster.id}</span>
                        <span className="font-mono text-[10px] text-[#747780]">
                          {cluster.cnmcCode}
                        </span>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                          cluster.status === 'harmonized'
                            ? 'bg-[#86f2e4]/40 text-[#006f66]'
                            : cluster.matchScore >= 90
                            ? 'bg-[#86f2e4]/30 text-[#006f66]'
                            : 'bg-[#ffdad6] text-[#93000a]'
                        }`}
                      >
                        {cluster.status === 'harmonized'
                          ? 'Harmonized'
                          : `${cluster.matchScore}% Match`}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-semibold text-[#002653] line-clamp-1">
                      {cluster.title}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-[#eff4ff]">
                      <div className="flex items-center gap-1">
                        {cluster.sourceCpseList.map((src, i) => (
                          <span
                            key={i}
                            className="rounded bg-white px-1 py-0.2 text-[9px] font-semibold text-[#002653] border border-[#dce9ff]"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                      <span className="font-bold text-[#006a61]">
                        {cluster.estimatedArbitrageAnnual}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Cluster Comparison & Attribute Matrix (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Card */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#002653] px-2 py-0.5 text-xs font-bold text-white">
                  {currentCluster.id}
                </span>
                <span className="rounded bg-[#86f2e4]/40 px-2 py-0.5 text-xs font-bold text-[#006f66]">
                  {currentCluster.matchScore}% Confidence
                </span>
                <span className="rounded bg-[#ffdad6] px-2 py-0.5 text-xs font-bold text-[#ba1a1a]">
                  +{currentCluster.costVariancePercent}% Arbitrage Variance
                </span>
                <span className="rounded bg-[#eff4ff] px-2 py-0.5 text-xs font-bold text-[#002653]">
                  HSN: {currentCluster.hsn}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEditSpecModal(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#002653] hover:underline"
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Edit Specification
                </button>
              </div>
            </div>

            {/* Proposed CNMC Code Box */}
            <div className="rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                  Proposed Common National Material Code (CNMC)
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-base font-bold text-[#002653]">
                    {currentCluster.cnmcCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-[#002653] border border-[#dce9ff] hover:bg-[#f8f9ff]"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {copiedCode ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                  Projected Annual National Arbitrage
                </span>
                <div className="text-base font-bold text-[#006a61]">
                  {currentCluster.estimatedArbitrageAnnual}
                </div>
              </div>
            </div>

            {/* Synthesized Standard Description Banner */}
            <div>
              <span className="text-xs font-bold text-[#002653]">
                Synthesized National Material Description (ASME/API Standards Compliant)
              </span>
              <div className="mt-1 rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] p-2.5 font-mono text-xs text-[#0b1c30] leading-relaxed">
                {currentCluster.synthesizedDescription}
              </div>
            </div>
          </div>

          {/* Original CPSE Sources Compared Side-by-Side */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#002653] flex items-center justify-between">
              <span>Original CPSE Legacy Inventory Items ({currentCluster.sources.length})</span>
              <span className="text-[11px] font-normal text-[#747780]">
                Price delta benchmarked to lowest compliant tender
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {currentCluster.sources.map((src, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-3 flex flex-col justify-between ${
                    src.isLowest
                      ? 'border-[#86f2e4] bg-[#eff4ff]'
                      : 'border-[#dce9ff] bg-[#f8f9ff]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="rounded bg-[#002653] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {src.cpse}
                      </span>
                      {src.isLowest && (
                        <span className="rounded bg-[#86f2e4] px-1.5 py-0.5 text-[9px] font-bold text-[#005049]">
                          ★ Lowest PO Rate
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-[#747780]">{src.plant}</p>
                    <p className="mt-1 font-mono text-[10px] font-bold text-[#002653]">
                      {src.materialId}
                    </p>
                    <p className="mt-1.5 text-xs font-mono text-[#0b1c30] bg-white p-1.5 rounded border border-[#dce9ff] line-clamp-3">
                      {src.rawDescription}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#dce9ff] space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#747780] text-[11px]">Last PO Rate:</span>
                      <span className={`font-bold ${src.isLowest ? 'text-[#006a61]' : 'text-[#ba1a1a]'}`}>
                        {src.lastPoPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#747780] text-[11px]">Active Stock:</span>
                      <span className="font-semibold text-[#002653]">{src.currentStock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explainability Attribute Matrix */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#002653] flex items-center justify-between">
              <span>Sentinel AI Deterministic & Semantic Attribute Match Matrix</span>
              <span className="text-[11px] text-[#006a61] font-semibold">
                Vector Similarity: {currentCluster.matchScore}%
              </span>
            </h3>

            <div className="overflow-x-auto rounded-lg border border-[#dce9ff]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
                  <tr>
                    <th className="px-3 py-2">Engineering Parameter</th>
                    <th className="px-3 py-2">Synthesized Parameter Value</th>
                    <th className="px-3 py-2 text-center">Parity Status</th>
                    <th className="px-3 py-2 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  {currentCluster.attributes.map((attr, i) => (
                    <tr key={i} className="hover:bg-[#f8f9ff]">
                      <td className="px-3 py-2 font-semibold text-[#002653]">{attr.name}</td>
                      <td className="px-3 py-2 font-mono text-xs text-[#0b1c30]">{attr.value}</td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                            attr.matchType === 'exact'
                              ? 'bg-[#86f2e4]/40 text-[#006f66]'
                              : attr.matchType === 'partial'
                              ? 'bg-[#ffddb8] text-[#653e00]'
                              : 'bg-[#ffdad6] text-[#93000a]'
                          }`}
                        >
                          {attr.matchType}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-[#002653]">
                        {attr.matchPercent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg bg-[#eff4ff] p-3 text-xs text-[#002653]">
              <span className="font-bold block mb-1">AI Recommendation & Audit Rationale:</span>
              <p className="text-[11px] text-[#43474f] leading-relaxed">
                {currentCluster.reasoning}
              </p>
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="sticky bottom-4 z-30 rounded-xl border border-[#dce9ff] bg-white p-4 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#006a61]">
                security
              </span>
              <div className="text-xs">
                <span className="font-bold text-[#002653]">Dual Authorization Gate:</span>{' '}
                <span className="text-[#43474f]">Level 1 Verified • Pending Final Approval</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Cluster split into separate specification subsets.')}
                className="rounded-lg border border-[#c4c6d0] bg-white px-3 py-1.5 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
              >
                Split Cluster
              </button>
              <button
                onClick={() => alert('Match rejected. Notified CPSE catalog stewards.')}
                className="rounded-lg border border-[#c4c6d0] bg-white px-3 py-1.5 text-xs font-semibold text-[#43474f] hover:bg-[#f8f9ff] transition-colors"
              >
                Reject Match
              </button>
              <button
                onClick={() => setShowApproveModal(true)}
                disabled={currentCluster.status === 'harmonized'}
                className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">
                  check_circle
                </span>
                <span>
                  {currentCluster.status === 'harmonized'
                    ? 'Harmonized'
                    : 'Authorize & Harmonize CNMC'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Spec Modal */}
      {showEditSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl border border-[#dce9ff] bg-white p-5 shadow-2xl">
            <h3 className="text-base font-bold text-[#002653]">
              Edit Synthesized Material Specification
            </h3>
            <p className="text-xs text-[#747780] mt-1">
              Adjust the national standard description according to DPE & GeM taxonomy protocols.
            </p>
            <textarea
              value={editedSpec}
              onChange={(e) => setEditedSpec(e.target.value)}
              rows={4}
              className="mt-3 w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] p-3 font-mono text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowEditSpecModal(false)}
                className="rounded-lg border border-[#c4c6d0] px-3 py-1.5 text-xs font-semibold text-[#43474f] hover:bg-[#f8f9ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCurrentCluster((prev) => ({
                    ...prev,
                    synthesizedDescription: editedSpec,
                  }));
                  setShowEditSpecModal(false);
                }}
                className="rounded-lg bg-[#002653] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e]"
              >
                Save Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authorization Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#dce9ff] bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff4ff] text-[#002653]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#002653]">
                  Confirm Dual Authorization Gate
                </h3>
                <p className="text-xs text-[#747780]">CVC Ledger Anchoring v2.4</p>
              </div>
            </div>

            <p className="text-xs text-[#43474f] leading-relaxed">
              You are authorizing Common National Material Code{' '}
              <strong className="font-mono text-[#002653]">{currentCluster.cnmcCode}</strong> for
              immediate publication into the National Harmonized Catalog.
            </p>

            <div className="rounded-lg bg-[#eff4ff] p-3 text-[11px] text-[#002653] space-y-1">
              <div>
                Approver: <strong>Shri P. N. Verma</strong> (Joint Dir, DHI / GeM Cell)
              </div>
              <div>Digital Certificate: <strong>e-Mudhra Class 3 DSC (SHA-256)</strong></div>
              <div>Arbitrage Benefit: <strong className="text-[#006a61]">{currentCluster.estimatedArbitrageAnnual}</strong></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowApproveModal(false)}
                className="rounded-lg border border-[#c4c6d0] px-3 py-1.5 text-xs font-semibold text-[#43474f] hover:bg-[#f8f9ff]"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="rounded-lg bg-[#006a61] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#005049]"
              >
                Sign & Mint on GovLedger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
