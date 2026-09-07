import React, { useState } from 'react';
import { NavigationPath, ClusterCandidate } from '../types';

interface UploadViewProps {
  onNavigate: (path: NavigationPath) => void;
  onSelectCluster: (cluster: ClusterCandidate) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onNavigate }) => {
  const [selectedCpse, setSelectedCpse] = useState('ONGC (Oil and Natural Gas Corp)');
  const [taxonomyGroup, setTaxonomyGroup] = useState('Class 40: Industrial Piping, Valves & Fittings');
  const [erpStandard, setErpStandard] = useState('SAP MM S/4HANA (22-Col Schema v2.1)');
  const [fileName, setFileName] = useState('ONGC_Hazira_Plant_Piping_Spares_Q3_2024.xlsx');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(5);

  const handleSimulatePipeline = () => {
    setIsProcessing(true);
    setCurrentStep(1);
    setTimeout(() => setCurrentStep(2), 600);
    setTimeout(() => setCurrentStep(3), 1200);
    setTimeout(() => setCurrentStep(4), 1800);
    setTimeout(() => {
      setCurrentStep(5);
      setIsProcessing(false);
    }, 2400);
  };

  const previewItems = [
    {
      id: 'ONGC-HZ-VLV-99218',
      rawText: 'VALVE CHK DUAL PLT 4" 150# CF8M DISC SS316',
      extractedAttributes: 'Check Valve | 4" NB | Cl 150 | A351 CF8M',
      detectedCluster: '#CL-8421 (SS316 Dual Plate Check Valve)',
      confidence: 96.4,
      uom: 'EA -> NOS',
      status: 'Ready for Review',
    },
    {
      id: 'ONGC-HZ-PIP-00412',
      rawText: 'PIPE CS SEAMLESS ASTM A106 GR B 6 INCH SCH 40',
      extractedAttributes: 'CS Pipe | 6" NB | Sch 40 | A106 Gr B',
      detectedCluster: '#CL-8422 (Seamless Carbon Steel Pipe 6")',
      confidence: 98.1,
      uom: 'MTR',
      status: 'Ready for Review',
    },
    {
      id: 'ONGC-HZ-BLT-7721',
      rawText: 'STUD BOLT B7 3/4X120MM W/2 NUT 2H',
      extractedAttributes: 'Stud Bolt | 3/4" UNC | 120mm | A193 B7',
      detectedCluster: '#CL-8424 (High Tensile Stud Bolt B7)',
      confidence: 91.8,
      uom: 'EA -> NOS',
      status: 'Ready for Review',
    },
    {
      id: 'ONGC-HZ-FLG-1092',
      rawText: 'FLANGE WN 4" 150# RF ASTM A105 SCH 40',
      extractedAttributes: 'Weld Neck Flange | 4" NB | 150# RF | A105',
      detectedCluster: '#CL-8419 (Weld Neck Flange 4" 150#)',
      confidence: 94.7,
      uom: 'NOS',
      status: 'Mapped',
    },
    {
      id: 'ONGC-HZ-GSK-3021',
      rawText: 'GASKET SPWD 4" 150# 316SS FG ASME B16.20',
      extractedAttributes: 'Spiral Wound Gasket | 4" 150# | SS316/Graphite',
      detectedCluster: '#CL-8415 (Spiral Wound Metallic Gasket 4")',
      confidence: 97.2,
      uom: 'NOS',
      status: 'Mapped',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#d7e3ff] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              Pipeline Engine v3.2
            </span>
            <span className="text-xs text-[#006a61] font-semibold">● TensorRT Accelerated</span>
          </div>
          <h1 className="text-2xl font-bold text-[#002653] mt-1.5 tracking-tight">
            CPSE Material Master Batch Ingestion & AI Pipeline
          </h1>
          <p className="text-xs text-[#43474f] max-w-2xl mt-0.5">
            Bulk ingest ERP catalog dumps from SAP S/4HANA, Oracle EBS, and legacy systems for
            NLP tokenization, metallurgical attribute extraction, and cross-CPSE clustering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('review')}
            className="flex items-center gap-1.5 rounded-lg bg-[#002653] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1a3c6e] shadow-sm transition-colors"
          >
            <span>Proceed to Review Queue (14)</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload Config & Validation Results */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Upload Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#006a61]">
                tune
              </span>
              Ingestion Parameters & Scope
            </h2>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#002653] mb-1">
                  Target CPSE Entity
                </label>
                <select
                  value={selectedCpse}
                  onChange={(e) => setSelectedCpse(e.target.value)}
                  className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-2.5 py-1.5 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
                >
                  <option>ONGC (Oil and Natural Gas Corp)</option>
                  <option>IOCL (Indian Oil Corp Ltd)</option>
                  <option>GAIL (India) Ltd</option>
                  <option>BHEL (Bharat Heavy Electricals)</option>
                  <option>NTPC Ltd</option>
                  <option>SAIL (Steel Authority of India)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#002653] mb-1">
                  Target Taxonomy Group
                </label>
                <select
                  value={taxonomyGroup}
                  onChange={(e) => setTaxonomyGroup(e.target.value)}
                  className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-2.5 py-1.5 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
                >
                  <option>Class 40: Industrial Piping, Valves & Fittings</option>
                  <option>Class 43: Rotating Equipment & Turbomachinery</option>
                  <option>Class 31: Fasteners, Hardware & Consumables</option>
                  <option>Class 26: High Voltage Switchgear & Electrical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#002653] mb-1">
                Source ERP Schema Definition
              </label>
              <select
                value={erpStandard}
                onChange={(e) => setErpStandard(e.target.value)}
                className="w-full rounded-lg border border-[#c4c6d0] bg-[#f8f9ff] px-2.5 py-1.5 text-xs text-[#0b1c30] focus:border-[#002653] focus:bg-white focus:outline-none"
              >
                <option>SAP MM S/4HANA (22-Col Schema v2.1)</option>
                <option>Oracle EBS Inventory Master (18-Col Schema)</option>
                <option>GeM Standard Procurement Catalog (XML format)</option>
                <option>Generic Custom Excel/CSV Ingestion Format</option>
              </select>
            </div>

            {/* Drag & Drop Zone */}
            <div className="rounded-xl border-2 border-dashed border-[#abc7ff] bg-[#eff4ff]/50 p-6 text-center hover:bg-[#eff4ff] transition-colors">
              <span className="material-symbols-outlined text-[36px] text-[#002653]">
                upload_file
              </span>
              <p className="mt-2 text-xs font-bold text-[#002653]">
                Drag and drop ERP catalog export file here
              </p>
              <p className="text-[11px] text-[#747780] mt-0.5">
                Supports Excel (.xlsx), CSV, SAP RFC XML or JSON exports up to 250 MB
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                <label className="cursor-pointer rounded-lg bg-[#002653] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e] transition-colors">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
                <span className="text-[11px] text-[#747780]">or drop onto this box</span>
              </div>
            </div>

            {/* Active Ingested File Status Card */}
            <div className="flex items-center justify-between rounded-lg border border-[#86f2e4] bg-[#eff4ff] p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#006a61] text-white">
                  <span className="material-symbols-outlined text-[18px]">table_view</span>
                </span>
                <div>
                  <div className="text-xs font-bold text-[#002653] flex items-center gap-2">
                    <span>{fileName}</span>
                    <span className="rounded bg-[#86f2e4]/40 px-1.5 py-0.2 text-[10px] font-bold text-[#006f66]">
                      Ready
                    </span>
                  </div>
                  <div className="text-[11px] text-[#747780]">
                    14.2 MB • 1,240 Material Master records parsed • 22 columns identified
                  </div>
                </div>
              </div>

              <button
                onClick={handleSimulatePipeline}
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-lg bg-[#006a61] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#005049] transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[14px]">
                      progress_activity
                    </span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    <span>Run Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-Flight Validation Checks (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#002653] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006a61]">
                  fact_check
                </span>
                Pre-Flight Validation Check
              </h2>
              <span className="rounded-full bg-[#86f2e4]/30 px-2.5 py-0.5 text-xs font-bold text-[#006f66]">
                99.8% Passed
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start justify-between rounded-lg border border-[#eff4ff] bg-[#f8f9ff] p-2.5">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006a61] mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#002653]">
                      Schema Integrity & Required Attributes
                    </span>
                    <p className="text-[11px] text-[#43474f]">
                      All 22 SAP standard fields validated including Mat. Description, Plant, and Valuation Class.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#006a61]">100%</span>
              </div>

              <div className="flex items-start justify-between rounded-lg border border-[#eff4ff] bg-[#f8f9ff] p-2.5">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006a61] mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#002653]">
                      Unit of Measure (UOM) Reconciliation
                    </span>
                    <p className="text-[11px] text-[#43474f]">
                      14 non-standard EA / NUM variants converted to National Standard "NOS".
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#006a61]">98.4%</span>
              </div>

              <div className="flex items-start justify-between rounded-lg border border-[#eff4ff] bg-[#f8f9ff] p-2.5">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006a61] mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#002653]">
                      Metallurgical & Geometry Extractor
                    </span>
                    <p className="text-[11px] text-[#43474f]">
                      ASTM/ASME standards parsed correctly (A351 CF8M, A106 Gr B, A193 B7).
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#006a61]">100%</span>
              </div>

              <div className="flex items-start justify-between rounded-lg border border-[#eff4ff] bg-[#f8f9ff] p-2.5">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006a61] mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#002653]">
                      Active Inventory & PO Rate Sanity Check
                    </span>
                    <p className="text-[11px] text-[#43474f]">
                      Verified positive stock balances across 3 onshore and 2 offshore warehouse storage locations.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#006a61]">99.1%</span>
              </div>
            </div>

            <div className="rounded-lg bg-[#eff4ff] p-3 text-[11px] text-[#002653] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006a61]">memory</span>
                Worker Node: <span className="font-mono font-bold">NIC-DELHI-INFER-04</span>
              </span>
              <span className="font-mono text-[10px] text-[#747780]">Latency: 18ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Normalization Pipeline Execution Stepper */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#002653]">
              Real-Time Normalization Pipeline Execution
            </h2>
            <p className="text-[11px] text-[#747780]">
              5-Stage Multi-Modal Semantic Harmonization Process
            </p>
          </div>
          <span className="rounded bg-[#eff4ff] px-2 py-0.5 text-xs font-bold text-[#002653]">
            {currentStep === 5 ? 'Status: 100% Completed' : `Executing Stage ${currentStep} of 5...`}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {[
            {
              step: 1,
              title: 'Raw Extraction',
              desc: 'Schema normalizer',
              icon: 'data_object',
            },
            {
              step: 2,
              title: 'Decomposition',
              desc: 'AST attribute parse',
              icon: 'token',
            },
            {
              step: 3,
              title: 'Vector Embedding',
              desc: '768-dim semantic space',
              icon: 'hub',
            },
            {
              step: 4,
              title: 'Clustering',
              desc: 'Multi-CPSE grouping',
              icon: 'schema',
            },
            {
              step: 5,
              title: 'CNMC Synthesis',
              desc: 'Arbitrage & Review',
              icon: 'verified',
            },
          ].map((s) => {
            const isDone = currentStep >= s.step;
            const isCurrent = currentStep === s.step && isProcessing;
            return (
              <div
                key={s.step}
                className={`rounded-lg border p-3 transition-all ${
                  isDone
                    ? 'border-[#86f2e4] bg-[#eff4ff]'
                    : isCurrent
                    ? 'border-[#002653] bg-white shadow-xs'
                    : 'border-[#eff4ff] bg-[#f8f9ff] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="material-symbols-outlined text-[20px] text-[#002653]">
                    {s.icon}
                  </span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      isDone
                        ? 'bg-[#006a61] text-white'
                        : isCurrent
                        ? 'bg-[#002653] text-white animate-pulse'
                        : 'bg-[#dce9ff] text-[#002653]'
                    }`}
                  >
                    {isDone ? '✓' : s.step}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#002653]">{s.title}</div>
                <div className="text-[10px] text-[#747780]">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Raw Ingested Data Preview Table */}
      <div className="rounded-xl border border-[#dce9ff] bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#002653]">
              Parsed Batch Preview & AI Match Results
            </h2>
            <p className="text-[11px] text-[#747780]">
              Showing parsed records mapped from ONGC Hazira Plant Q3 ingest batch
            </p>
          </div>
          <button
            onClick={() => onNavigate('review')}
            className="flex items-center gap-1 rounded bg-[#002653] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3c6e] transition-colors"
          >
            <span>Open Sentinel AI Queue (14)</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#dce9ff]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-wider text-[#001b3f]">
              <tr>
                <th className="px-3 py-2.5">Legacy SKU Code</th>
                <th className="px-3 py-2.5">Original Raw Description</th>
                <th className="px-3 py-2.5">Extracted Key Attributes</th>
                <th className="px-3 py-2.5">Target Cluster Match</th>
                <th className="px-3 py-2.5 text-center">Confidence</th>
                <th className="px-3 py-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {previewItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="px-3 py-2.5 font-mono text-[11px] font-bold text-[#002653]">
                    {item.id}
                  </td>
                  <td className="px-3 py-2.5 text-[#0b1c30] max-w-xs">{item.rawText}</td>
                  <td className="px-3 py-2.5 text-[#43474f] text-[11px] font-mono">
                    {item.extractedAttributes}
                  </td>
                  <td className="px-3 py-2.5 text-[#002653] font-semibold">
                    {item.detectedCluster}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="rounded bg-[#86f2e4]/30 px-1.5 py-0.5 text-[11px] font-bold text-[#006f66]">
                      {item.confidence}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="rounded bg-[#eff4ff] px-2 py-0.5 text-[10px] font-bold text-[#002653]">
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
  );
};
