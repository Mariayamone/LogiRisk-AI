import { GoogleGenAI, Type } from "@google/genai";
import { RouteData, AnalysisResult } from "../types";

// Helper to sanitize JSON string if Markdown code blocks are present
const cleanJsonString = (str: string): string => {
  return str.replace(/```json\n?|\n?```/g, "").trim();
};

export const analyzeRouteRisk = async (routeData: RouteData): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are the intelligence engine of a Smart Route & Risk Prediction Platform.
    Your goal is to analyze logistics routes, predict risks, and offer actionable advice.
    
    You must adapt your language complexity based on the User Role:
    - Importer/Exporter: Simple, clear, business-focused.
    - Logistics Manager: Technical, detailed, scenario-based.
    
    Assess risks based on:
    - Port congestion
    - Weather/Seasonality
    - Customs/Regulatory issues
    - Geopolitics
    - Cost volatility
    
    Provide a realistic, data-informed simulation.
  `;

  const prompt = `
    Analyze the following shipping route:
    - Origin: ${routeData.originCountry} (${routeData.originPort})
    - Destination: ${routeData.destCountry} (${routeData.destPort})
    - Mode: ${routeData.transportMode}
    - Cargo: ${routeData.cargoType}
    - Date: ${routeData.shipmentDate}
    - User Role: ${routeData.userRole}
    
    Provide the output in strict JSON format matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.INTEGER, description: "Risk score from 1 to 10" },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            riskFactors: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3-5 key risk factors"
            },
            delayProbability: { type: Type.INTEGER, description: "Probability percentage 0-100" },
            riskTrend: { type: Type.STRING, enum: ["Increasing", "Stable", "Decreasing"] },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  costImpact: { type: Type.STRING, description: "e.g. '+15%' or 'Lower'" },
                  timeImpact: { type: Type.STRING, description: "e.g. '+2 days' or 'Faster'" },
                  riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                  description: { type: Type.STRING }
                }
              },
              description: "3 alternative routes or strategies"
            },
            recommendedOption: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            },
            actionableInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 specific actions the user should take"
            },
            plainLanguageExplanation: { type: Type.STRING, description: "Role-adapted explanation" },
            executiveSummary: { type: Type.STRING, description: "Brief high-level summary" }
          },
          required: [
            "riskScore", "riskLevel", "riskFactors", "delayProbability", 
            "riskTrend", "alternatives", "recommendedOption", 
            "actionableInsights", "plainLanguageExplanation", "executiveSummary"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(cleanJsonString(text)) as AnalysisResult;
    return parsed;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze route. Please try again.");
  }
};