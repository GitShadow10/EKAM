import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [minConfidence, setMinConfidence] = useState(85);
  const [autoApproveCutoff, setAutoApproveCutoff] = useState(98);
  const [dualAuthEnabled, setDualAuthEnabled] = useState(true);
  const [ledgerInterval, setLedgerInterval] = useState('10 minutes');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              System Governance
            </span>
            <span className="text-xs text-[#006a61] font-semibold">● CVC Compliance Certified</span>
          </div>
          <h1 className="text-2xl font-bold text-[#002653] mt-1.5 tracking-tight">
            Taxonomy & CVC Audit Compliance Configuration
          </h1>
          <p className="text-xs text-[#43474f] max-w-2xl mt-0.5">
            Manage Sentinel ML clustering weights, GovLedger blockchain anchoring parameters, and
            inter-CPSE data connectors.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">save</span>
          <span>Save Policy Configuration</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="rounded-xl border border-[#86f2e4] bg-[#eff4ff] p-3 text-xs text-[#006f66] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#006a61]">check_circle</span>
          <span>
            Configuration updated and cryptographically anchored to GovLedger Block #449,104.
          </span>
        </div>
      )}

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Card 1: Sentinel ML Thresholds */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#006a61]">
              tune
            </span>
            Sentinel ML Engine Matching Parameters
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-[#002653]">
                <span>Minimum Candidate Cluster Cutoff</span>
                <span className="font-mono text-[#006a61]">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full mt-1 accent-[#002653]"
              />
              <p className="text-[11px] text-[#747780] mt-0.5">
                Clusters scoring below this threshold are flagged for manual review rather than proposed as CNMC.
              </p>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#002653]">
                <span>Automated Parity Suggestion Threshold</span>
                <span className="font-mono text-[#006a61]">{autoApproveCutoff}%</span>
              </div>
              <input
                type="range"
                min="90"
                max="100"
                value={autoApproveCutoff}
                onChange={(e) => setAutoApproveCutoff(Number(e.target.value))}
                className="w-full mt-1 accent-[#002653]"
              />
              <p className="text-[11px] text-[#747780] mt-0.5">
                Exact metallurgical and dimensional matches scoring ≥ {autoApproveCutoff}% trigger expedited routing.
              </p>
            </div>

            <div className="pt-2 border-t border-[#eff4ff] space-y-2">
              <span className="font-semibold text-[#002653] block">Algorithm Weights:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded bg-[#f8f9ff] p-2 border border-[#dce9ff]">
                  <span className="text-[#747780] block">Deterministic AST:</span>
                  <strong className="text-[#002653]">40% Weight</strong>
                </div>
                <div className="rounded bg-[#f8f9ff] p-2 border border-[#dce9ff]">
                  <span className="text-[#747780] block">Semantic Embeddings:</span>
                  <strong className="text-[#002653]">60% Weight</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: CVC & Sovereign Audit Rules */}
        <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#006a61]">
              gavel
            </span>
            CVC & CAG Sovereign Audit Compliance
          </h2>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff] border border-[#dce9ff]">
              <div>
                <span className="font-bold text-[#002653]">Dual Level-2 Authorization Gate</span>
                <p className="text-[11px] text-[#43474f]">
                  Requires digital signature by designated Joint Director before publishing to GeM.
                </p>
              </div>
              <input
                type="checkbox"
                checked={dualAuthEnabled}
                onChange={(e) => setDualAuthEnabled(e.target.checked)}
                className="h-4 w-4 accent-[#002653] rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#002653] mb-1">
                GovLedger Blockchain Anchoring Interval
              </label>
              <select
                value={ledgerInterval}
                onChange={(e) => setLedgerInterval(e.target.value)}
                className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-2.5 py-1.5 text-xs text-[#0b1c30]"
              >
                <option>Real-Time (Immediate Block Minting)</option>
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>Hourly Batch Anchoring</option>
              </select>
            </div>

            <div className="rounded-lg bg-[#eff4ff] p-3 text-[11px] text-[#002653] space-y-1">
              <div className="font-bold">Active Crypto Vault Credentials:</div>
              <div>NIC Root CA: <strong>GOVT-OF-INDIA-NIC-SUB-CA-2024</strong></div>
              <div>Digest Algorithm: <strong>FIPS PUB 180-4 SHA-256</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* CPSE ERP Connectors */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#006a61]">
            hub
          </span>
          CPSE Integration Connectors & Sync Status
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 text-xs">
          <div className="rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-3">
            <div className="flex justify-between font-bold text-[#002653]">
              <span>SAP S/4HANA Gateway</span>
              <span className="text-[#006a61]">Active</span>
            </div>
            <p className="text-[11px] text-[#747780] mt-1">RFC JCo Protocol 3.1</p>
            <div className="text-[10px] text-[#006a61] mt-2">Synced 18 Nov 2024</div>
          </div>

          <div className="rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-3">
            <div className="flex justify-between font-bold text-[#002653]">
              <span>Oracle EBS Adapter</span>
              <span className="text-[#006a61]">Active</span>
            </div>
            <p className="text-[11px] text-[#747780] mt-1">Inv Master REST API</p>
            <div className="text-[10px] text-[#006a61] mt-2">Synced 18 Nov 2024</div>
          </div>

          <div className="rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-3">
            <div className="flex justify-between font-bold text-[#002653]">
              <span>GeM Catalog Bridge</span>
              <span className="text-[#006a61]">Active</span>
            </div>
            <p className="text-[11px] text-[#747780] mt-1">GeM API v4.0 JSON</p>
            <div className="text-[10px] text-[#006a61] mt-2">Live Webhooks</div>
          </div>

          <div className="rounded-lg border border-[#dce9ff] bg-[#f8f9ff] p-3">
            <div className="flex justify-between font-bold text-[#002653]">
              <span>NIC GovLedger Node</span>
              <span className="text-[#006a61]">Connected</span>
            </div>
            <p className="text-[11px] text-[#747780] mt-1">Node #DL-PRM-01</p>
            <div className="text-[10px] text-[#006a61] mt-2">Latency: 12ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};
