export interface Diagnosis {
  condition: string;
  confidenceScore: string;
  description: string;
  treatment: string;
  prevention: string;
  sources: string[];
}

export interface HealthRecommendations {
  lifestyle: string[];
  preventiveCare: string[];
  whenToSeeDoctor: string;
}

export interface GeminiResponse {
  disclaimer: string;
  diagnoses: Diagnosis[];
  recommendations: HealthRecommendations;
}

export interface Disease {
  name: string;
  overview: string;
  symptoms: string[];
  treatment: string;
  prevention: string;
}

export interface FileData {
  mimeType: string;
  data: string;
}
