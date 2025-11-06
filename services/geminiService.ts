import { GoogleGenAI, Type } from "@google/genai";
import { FileData, GeminiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recommendationsSchema = {
    type: Type.OBJECT,
    description: "A set of general health recommendations based on the analysis. This is not medical advice.",
    properties: {
        lifestyle: {
            type: Type.ARRAY,
            description: "A list of 2-3 actionable lifestyle adjustment suggestions (e.g., 'Stay hydrated by drinking plenty of water', 'Ensure you get adequate rest').",
            items: { type: Type.STRING }
        },
        preventiveCare: {
            type: Type.ARRAY,
            description: "A list of 2-3 general preventive care strategies (e.g., 'Practice good hand hygiene', 'Monitor your symptoms daily').",
            items: { type: Type.STRING }
        },
        whenToSeeDoctor: {
            type: Type.STRING,
            description: "A clear, concise statement on when to seek professional medical help (e.g., 'If your symptoms worsen, you develop a high fever, or have difficulty breathing, consult a healthcare professional immediately.')."
        }
    },
    required: ["lifestyle", "preventiveCare", "whenToSeeDoctor"]
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    disclaimer: {
      type: Type.STRING,
      description: "A mandatory disclaimer stating that the AI is not a medical professional and users should consult a doctor."
    },
    diagnoses: {
      type: Type.ARRAY,
      description: "A list of 3 to 5 potential medical conditions.",
      items: {
        type: Type.OBJECT,
        properties: {
          condition: {
            type: Type.STRING,
            description: "The name of the potential medical condition."
          },
          confidenceScore: {
            type: Type.STRING,
            description: "A percentage string (e.g., '75%') representing the likelihood based on the provided symptoms."
          },
          description: {
            type: Type.STRING,
            description: "A brief overview of the condition."
          },
          treatment: {
            type: Type.STRING,
            description: "Common cures, medications, and treatment methods for the condition."
          },
          prevention: {
            type: Type.STRING,
            description: "Common prevention methods for the condition."
          },
          sources: {
            type: Type.ARRAY,
            description: "An array of at least 3 URLs to credible, verifiable medical sources (e.g., WHO, CDC, Mayo Clinic, WebMD).",
            items: {
              type: Type.STRING
            }
          }
        },
        required: ["condition", "confidenceScore", "description", "treatment", "prevention", "sources"],
      },
    },
    recommendations: recommendationsSchema,
  },
  required: ["disclaimer", "diagnoses", "recommendations"],
};


export const analyzeSymptoms = async (prompt: string, file?: FileData): Promise<GeminiResponse> => {
  const systemInstruction = `You are an advanced AI medical diagnosis and research assistant. Your purpose is to analyze user-provided symptoms and provide potential medical conditions based on trusted medical sources. IMPORTANT: You must always include a disclaimer that you are not a medical professional and the user should consult a doctor. Based on the analysis, you must also provide a set of general, non-prescriptive health recommendations covering lifestyle, preventive care, and clear guidance on when to see a doctor. Your response must be in JSON format matching the provided schema. Do not output markdown.`;
  
  const textPart = {
    text: prompt,
  };

  const parts: ( { text: string } | { inlineData: FileData } )[] = [textPart];

  if (file) {
    const imagePart = {
      inlineData: {
        mimeType: file.mimeType,
        data: file.data,
      },
    };
    parts.unshift(imagePart);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts }],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    const parsedResponse = JSON.parse(responseText);
    
    // Basic validation to ensure the parsed object matches the expected structure.
    if (!parsedResponse.disclaimer || !Array.isArray(parsedResponse.diagnoses) || !parsedResponse.recommendations) {
        throw new Error("Invalid response structure from API.");
    }

    return parsedResponse as GeminiResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check your input and try again.");
  }
};
