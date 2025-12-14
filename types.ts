export enum UserRole {
  IMPORTER_EXPORTER = "Importer/Exporter",
  LOGISTICS_MANAGER = "Logistics Manager",
}

export enum TransportMode {
  SEA = "Sea Freight",
  AIR = "Air Freight",
  LAND = "Land/Rail",
}

export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface RouteData {
  originCountry: string;
  originPort: string;
  destCountry: string;
  destPort: string;
  transportMode: TransportMode;
  cargoType: string;
  shipmentDate: string;
  userRole: UserRole;
}

export interface AlternativeRoute {
  name: string;
  costImpact: string;
  timeImpact: string;
  riskLevel: RiskLevel;
  description: string;
}

export interface AnalysisResult {
  riskScore: number; // 1-10
  riskLevel: RiskLevel;
  riskFactors: string[];
  delayProbability: number; // 0-100
  riskTrend: "Increasing" | "Stable" | "Decreasing";
  alternatives: AlternativeRoute[];
  recommendedOption: {
    name: string;
    reason: string;
  };
  actionableInsights: string[];
  plainLanguageExplanation: string;
  executiveSummary: string;
}

export interface FormState {
  data: RouteData;
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
}