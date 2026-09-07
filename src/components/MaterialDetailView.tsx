import React, { useState } from 'react';
import { VALVE_BLUEPRINT_URL } from '../data/mockData';
import { NavigationPath } from '../types';

interface MaterialDetailViewProps {
  onNavigate: (path: NavigationPath) => void;
}

export const MaterialDetailView: React.FC<MaterialDetailViewProps> = ({ onNavigate }) => {
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false);
  const [showPassportPrintModal, setShowPassportPrintModal] = useState(false);
  const [gemPushed, setGemPushed] = useState(false);
  const [discrepancyText, setDiscrepancyText] = useState('');

  const handlePushToGem = () => {
    setGemPushed(true);
    setTimeout(() => {
      alert('CNMC-4014-9921-008 successfully pushed to GeM National Procurement Catalog.');
    }, 400);
  };

  return (
    <div className="space-y-5">
      {/* Entity Header */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-bold text-[#002653] bg-[#eff4ff] px-2.5 py-0.5 rounded border border-[#dce9ff]">
                CNMC-4014-9921-008
              </span>
              <span className="rounded-full bg-[#86f2e4]/40 px-2.5 py-0.5 text-xs font-bold text-[#006f66]">
                HARMONIZED & LIVE
              </span>
              <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-semibold text-[#001b3f]">
                HSN 8481.80.30
              </span>
              <span className="rounded bg-[#eff4ff] px-2 py-0.5 text-[11px] font-semibold text-[#002653]">
                UNSPSC 40141611
              </span>
            </div>

            <h1 className="text-xl font-bold text-[#002653] mt-2 tracking-tight">
              SS316 Dual Plate Check Valve 4" 150# Flanged
            </h1>
            <p className="text-xs text-[#43474f] mt-1 font-mono">
              VALVE, CHECK, DUAL PLATE WAFER, 4 INCH NB, ASME B16.5 CLASS 150, BODY ASTM A351 CF8M
              (SS316), DISC SS316, SEAT VITON, API 594
            </p>

            <div className="mt-2.5 flex items-center gap-2 text-xs text-[#747780]">
              <span className="font-semibold text-[#006a61]">3 CPSEs Harmonized:</span>
              <span>ONGC (Mumbai High), IOCL (Mathura Refinery), GAIL (Hazira Complex)</span>
              <span>•</span>
              <span className="font-semibold text-[#002653]">4 Legacy SKUs Retired</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowDiscrepancyModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#c4c6d0] bg-white px-3 py-2 text-xs font-semibold text-[#43474f] hover:bg-[#f8f9ff] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">report_problem</span>
              Report Discrepancy
            </button>
            <button
              onClick={() => setShowPassportPrintModal(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#002653] bg-white px-3 py-2 text-xs font-semibold text-[#002653] hover:bg-[#eff4ff] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print Passport
            </button>
            <button
              onClick={handlePushToGem}
              disabled={gemPushed}
              className="flex items-center gap-1.5 rounded-lg bg-[#006a61] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#005049] shadow-xs transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px] text-[#86f2e4]">
                {gemPushed ? 'done' : 'publish'}
              </span>
              <span>{gemPushed ? 'Live on GeM' : 'Push to GeM Catalog'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Details Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Consolidation Audit Trail & Lineage (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006a61]">
                  lock
                </span>
                Consolidation Audit Trail (GovLedger v2.4)
              </h2>
              <span className="font-mono text-[10px] text-[#006a61] bg-[#eff4ff] px-2 py-0.5 rounded">
                SHA-256 Verified
              </span>
            </div>

            {/* Ledger Block info */}
            <div className="rounded-lg bg-[#f8f9ff] p-3 border border-[#dce9ff] text-xs font-mono space-y-1">
              <div className="text-[11px] text-[#747780]">Ledger Hash:</div>
              <div className="text-[#002653] font-bold break-all">
                0x8F9C2E0B449102A13D4A18E6672BC199042D71
              </div>
              <div className="flex justify-between pt-1 text-[10px] text-[#747780]">
                <span>Block: #449,102</span>
                <span>Anchor Node: NIC New Delhi</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dce9ff]">
              <div className="relative">
                <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#006a61] text-white text-[9px]">
                  ✓
                </span>
                <div className="text-xs font-bold text-[#002653]">
                  Level 2 Sovereign Authorization Signed
                </div>
                <div className="text-[11px] text-[#43474f]">
                  Shri P. N. Verma (Joint Dir, DHI / GeM Cell) • Class-3 DSC
                </div>
                <span className="text-[10px] text-[#747780]">18 Nov 2024, 16:42 IST</span>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#006a61] text-white text-[9px]">
                  ✓
                </span>
                <div className="text-xs font-bold text-[#002653]">
                  3-Way Cross-CPSE Convergence Confirmed
                </div>
                <div className="text-[11px] text-[#43474f]">
                  GAIL Hazira price point ₹14,200 adopted as national benchmark.
                </div>
                <span className="text-[10px] text-[#747780]">12 Nov 2024, 11:20 IST</span>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#006a61] text-white text-[9px]">
                  ✓
                </span>
                <div className="text-xs font-bold text-[#002653]">
                  IOCL Mathura Refinery Catalog Linked
                </div>
                <div className="text-[11px] text-[#43474f]">
                  Auto-mapped from SKU IOCL-MAT-40110293 with 98.4% parity.
                </div>
                <span className="text-[10px] text-[#747780]">02 Nov 2024, 09:15 IST</span>
              </div>

              <div className="relative">
                <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#006a61] text-white text-[9px]">
                  ✓
                </span>
                <div className="text-xs font-bold text-[#002653]">
                  Initial Batch Ingestion (ONGC Mumbai High)
                </div>
                <div className="text-[11px] text-[#43474f]">
                  Ingested from SAP MM dump by ONGC Material Management Team.
                </div>
                <span className="text-[10px] text-[#747780]">24 Oct 2024, 14:02 IST</span>
              </div>
            </div>
          </div>

          {/* Consolidated Legacy Entities Box */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#002653]">
              Merged Legacy CPSE Inventory Entities
            </h2>
            <div className="space-y-2">
              <div className="rounded-lg border border-[#dce9ff] bg-[#f8f9ff] p-2.5 text-xs">
                <div className="flex justify-between font-bold text-[#002653]">
                  <span>ONGC-MH-VLV-99218</span>
                  <span className="text-[#ba1a1a]">₹22,450</span>
                </div>
                <p className="text-[11px] text-[#747780] mt-0.5">
                  ONGC Mumbai High Offshore • Stock: 42 Nos
                </p>
              </div>

              <div className="rounded-lg border border-[#dce9ff] bg-[#f8f9ff] p-2.5 text-xs">
                <div className="flex justify-between font-bold text-[#002653]">
                  <span>IOCL-MAT-40110293</span>
                  <span className="text-[#43474f]">₹16,100</span>
                </div>
                <p className="text-[11px] text-[#747780] mt-0.5">
                  IOCL Mathura Refinery • Stock: 18 Nos
                </p>
              </div>

              <div className="rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-2.5 text-xs">
                <div className="flex justify-between font-bold text-[#002653]">
                  <span>GAIL-HZ-554190 (Benchmark)</span>
                  <span className="text-[#006a61]">₹14,200</span>
                </div>
                <p className="text-[11px] text-[#747780] mt-0.5">
                  GAIL Hazira Compressor Station • Stock: 26 Nos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Specification Matrix, CAD Blueprint & Metallurgy (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 6 Attribute Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Nominal Bore (NB)
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">4" (100 mm)</div>
              <div className="text-[10px] text-[#006a61]">ASME B16.5 Standard</div>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Pressure Rating
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">Class 150#</div>
              <div className="text-[10px] text-[#006a61]">Hydrotest: 29.3 bar</div>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Body Metallurgy
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">ASTM A351 CF8M</div>
              <div className="text-[10px] text-[#006a61]">Cast SS316 Alloy</div>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Trim & Disc
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">SS316 / Viton</div>
              <div className="text-[10px] text-[#006a61]">Zero Leakage Seat</div>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                Face-To-Face
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">API 594 Short</div>
              <div className="text-[10px] text-[#006a61]">Wafer Pattern 73mm</div>
            </div>

            <div className="rounded-xl border border-[#dce9ff] bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747780]">
                National UOM
              </span>
              <div className="text-sm font-bold text-[#002653] mt-0.5">NOS (Numbers)</div>
              <div className="text-[10px] text-[#006a61]">Replaces EA/NUM</div>
            </div>
          </div>

          {/* Technical CAD Blueprint & Metallurgy */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#002653]">
                  Technical CAD Drawing & Approved Metallurgy Profile
                </h3>
                <p className="text-[11px] text-[#747780]">
                  Engineering reference blueprint certified under API 594 / ASME B16.34
                </p>
              </div>
              <span className="rounded bg-[#eff4ff] px-2 py-0.5 text-xs font-mono font-bold text-[#002653]">
                DWG #REV-04
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 items-center">
              {/* Image CAD Blueprint (Hotlinked from HTML) */}
              <div className="sm:col-span-6 rounded-lg border border-[#dce9ff] bg-[#f8f9ff] p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={VALVE_BLUEPRINT_URL}
                  alt="Valve Technical Blueprint CAD"
                  className="max-h-48 object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Metallurgy percentages */}
              <div className="sm:col-span-6 space-y-3">
                <div className="text-xs font-bold text-[#002653]">
                  ASTM A351 CF8M Chemical Composition:
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#43474f]">Chromium (Cr):</span>
                      <span className="font-bold text-[#002653]">18.0 - 21.0% (Actual 19.4%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#eff4ff] mt-1">
                      <div className="h-full rounded-full bg-[#002653]" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#43474f]">Nickel (Ni):</span>
                      <span className="font-bold text-[#002653]">9.0 - 12.0% (Actual 11.2%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#eff4ff] mt-1">
                      <div className="h-full rounded-full bg-[#006a61]" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#43474f]">Molybdenum (Mo):</span>
                      <span className="font-bold text-[#002653]">2.0 - 3.0% (Actual 2.45%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#eff4ff] mt-1">
                      <div className="h-full rounded-full bg-[#1a3c6e]" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#43474f]">Carbon (C Max):</span>
                      <span className="font-bold text-[#002653]">≤ 0.08% (Actual 0.042%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#eff4ff] mt-1">
                      <div className="h-full rounded-full bg-[#86f2e4]" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* National Procurement Cost Rationalization Benchmark */}
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#002653]">
                  National Procurement Cost Rationalization Benchmark
                </h3>
                <p className="text-[11px] text-[#747780]">
                  Arbitrage achieved by aligning future CPSE procurements to the lowest negotiated tender rate
                </p>
              </div>
              <span className="rounded bg-[#86f2e4]/40 px-2 py-0.5 text-xs font-bold text-[#006f66]">
                36.7% Price Optimization
              </span>
            </div>

            {/* Price Delta Bar Graphic */}
            <div className="space-y-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#002653]">ONGC Mumbai High Historical PO</span>
                  <span className="font-bold text-[#ba1a1a]">₹22,450 / EA</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#eff4ff]">
                  <div className="h-full rounded-full bg-[#ba1a1a]" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#002653]">IOCL Mathura Refinery Historical PO</span>
                  <span className="font-bold text-[#43474f]">₹16,100 / NOS</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#eff4ff]">
                  <div className="h-full rounded-full bg-[#1a3c6e]" style={{ width: '71.7%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#002653]">GAIL Hazira Historical Rate (Target)</span>
                  <span className="font-bold text-[#006a61]">₹14,200 / NOS</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#eff4ff]">
                  <div className="h-full rounded-full bg-[#006a61]" style={{ width: '63.2%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-[#eff4ff] p-3 text-xs text-[#002653] flex items-center justify-between">
              <span>
                Unit Savings Arbitrage: <strong>₹8,250 per valve</strong> (36.7% scale discount)
              </span>
              <span className="font-bold text-[#006a61]">Annual Savings: ₹3.82 Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discrepancy Modal */}
      {showDiscrepancyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#dce9ff] bg-white p-5 shadow-2xl space-y-3">
            <h3 className="text-base font-bold text-[#002653]">
              Report Specification Discrepancy
            </h3>
            <p className="text-xs text-[#747780]">
              Submit technical feedback to the National Material Master Stewardship Council.
            </p>
            <textarea
              value={discrepancyText}
              onChange={(e) => setDiscrepancyText(e.target.value)}
              placeholder="Describe metallurgical, dimensional, or procurement variance..."
              rows={4}
              className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] p-2.5 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDiscrepancyModal(false)}
                className="rounded-lg border border-[#c4c6d0] px-3 py-1.5 text-xs font-semibold text-[#43474f]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Discrepancy report filed with ticket #DISC-9902. Assigned to Chief Metallurgist.');
                  setShowDiscrepancyModal(false);
                  setDiscrepancyText('');
                }}
                className="rounded-lg bg-[#002653] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e]"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Passport Preview Modal */}
      {showPassportPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-[#dce9ff] bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006a61]">
                  Official DPE Sovereign Material Passport
                </span>
                <h3 className="text-lg font-bold text-[#002653]">
                  CNMC-4014-9921-008 Material Passport
                </h3>
              </div>
              <button
                onClick={() => setShowPassportPrintModal(false)}
                className="rounded p-1 text-[#747780] hover:bg-[#eff4ff]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="border border-[#c4c6d0] p-4 rounded-lg space-y-3 font-mono text-xs bg-[#f8f9ff]">
              <div className="flex justify-between border-b pb-2">
                <span>GOVERNMENT OF INDIA • EKAM PORTAL</span>
                <span>PASSPORT ID: MP-2024-9921008</span>
              </div>
              <div>
                <strong>CODE:</strong> CNMC-4014-9921-008<br />
                <strong>TITLE:</strong> VALVE, CHECK, DUAL PLATE WAFER, 4 INCH NB, ASME B16.5 CLASS 150<br />
                <strong>METALLURGY:</strong> ASTM A351 CF8M (SS316)<br />
                <strong>HSN:</strong> 8481.80.30 | <strong>UNSPSC:</strong> 40141611<br />
                <strong>NATIONAL TARGET BASE RATE:</strong> ₹14,200 / NOS<br />
                <strong>GOVLEDGER SEAL:</strong> 0x8F9C2E0B449102A13D4A18E6672BC199042D71
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowPassportPrintModal(false)}
                className="rounded-lg border border-[#c4c6d0] px-3 py-1.5 text-xs font-semibold text-[#43474f]"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 rounded-lg bg-[#002653] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e]"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
