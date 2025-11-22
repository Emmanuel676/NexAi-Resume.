import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (
  resumeBase64: string,
  mimeType: string,
  jobDescription: string
): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    You are an expert ATS (Applicant Tracking System) and technical recruiter.
    Analyze the provided resume against the following Job Description.
    
    Job Description:
    ${jobDescription || "General tech industry role"}

    Return a JSON object containing:
    - matchScore (0-100 integer)
    - atsScore (0-100 integer based on formatting and keyword density)
    - summary (Short professional summary of the candidate)
    - skillsFound (List of technical and soft skills found in resume)
    - missingSkills (List of skills required by JD but missing in resume)
    - strengths (List of strong points)
    - weaknesses (List of gaps or weak points)
    - keywords (Top keywords detected)
    - jobTitleDetected (The likely job title of the candidate)

    Strictly adhere to the JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: resumeBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: { type: Type.INTEGER },
            atsScore: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            skillsFound: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            jobTitleDetected: { type: Type.STRING }
          },
          required: ["matchScore", "atsScore", "summary", "skillsFound", "missingSkills", "strengths", "weaknesses"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Return a mock fallback if API fails for demo stability, usually re-throw
    throw error;
  }
};

export const rewriteSection = async (
  originalText: string,
  instruction: string
): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    Rewrite the following resume section to be more professional, impactful, and ATS-friendly.
    Use action verbs and quantify results where possible.
    
    Instruction: ${instruction}
    
    Original Text:
    "${originalText}"
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
  });

  return response.text || "Could not generate rewrite.";
};