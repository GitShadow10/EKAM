export type NavigationPath =
  | 'dashboard'
  | 'upload'
  | 'review'
  | 'bridge-map'
  | 'material-detail'
  | 'reports'
  | 'settings';

export type CPSEEntity =
  | 'ONGC'
  | 'IOCL'
  | 'GAIL'
  | 'BHEL'
  | 'NTPC'
  | 'SAIL'
  | 'HPCL'
  | 'BPCL';

export interface ClusterCandidate {
  id: string;
  cnmcCode: string;
  title: string;
  hsn: string;
  category: string;
  standardUom: string;
  sourceCpseList: string[];
  matchScore: number;
  costVariancePercent: number;
  estimatedArbitrageAnnual: string;
  status: 'active-review' | 'audit-flagged' | 'harmonized';
  synthesizedDescription: string;
  unspsc: string;
  sources: {
    cpse: string;
    plant: string;
    materialId: string;
    rawDescription: string;
    unit: string;
    lastPoPrice: string;
    currentStock: string;
    isLowest?: boolean;
  }[];
  attributes: {
    name: string;
    value: string;
    matchType: 'exact' | 'partial' | 'divergent';
    matchPercent: number;
  }[];
  reasoning: string;
}

export interface BridgeMappingRecord {
  id: string;
  legacyCode: string;
  cpse: string;
  plant: string;
  rawDescription: string;
  mappedCnmcCode: string;
  standardizedDescription: string;
  uom: string;
  approvalDate: string;
  approvedBy: string;
  approverRole: string;
  mergedRecordsCount: number;
  status: 'LIVE' | 'PROVISIONAL' | 'DEPRECATED';
  classGroup: string;
  matchScore: number;
}

export interface JointTender {
  id: string;
  code: string;
  title: string;
  status: 'Live on GeM' | 'Technical Evaluation' | 'Finalized';
  participatingCpses: string[];
  consolidatedValue: string;
  savingsInsight: string;
}
