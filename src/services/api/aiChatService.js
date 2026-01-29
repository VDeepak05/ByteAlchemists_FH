import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini (only if key exists)
let genAI = null;
let textModel = null;
let visionModel = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    // Use gemini-flash-latest which was confirmed to work
    textModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    visionModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
}

const SYSTEM_INSTRUCTION = `You are KrishiSahaya's AI Agriculture Advisor, helping farmers in Kerala, India. 
Provide practical, localized advice for crops like Coconut, Rubber, Paddy, Spices, etc.
Keep responses helpful, encouraging, and concise.`;

/**
 * Helper to convert File to GoogleGenerativeAI Part
 */
const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const aiChatService = {
    /**
     * Send text message to Gemini
     */
    sendMessage: async (message) => {
        if (!textModel) {
            console.warn("Gemini API Key missing");
            return "Please add your VITE_GEMINI_API_KEY to the .env file to activate the AI Advisor.";
        }

        try {
            // gemini-pro works best with prompt concatenation for system instructions
            const prompt = `${SYSTEM_INSTRUCTION}\n\nFarmer's Question: ${message}`;
            const result = await textModel.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Sorry, I couldn't process your request. Please try again later.";
        }
    },

    /**
     * Analyze crop image with Gemini Vision
     */
    analyzeImage: async (imageFile) => {
        if (!visionModel) {
            return {
                disease: "API Key Missing",
                confidence: 0,
                treatment: "Please configure VITE_GEMINI_API_KEY in .env"
            };
        }

        try {
            const imagePart = await fileToGenerativePart(imageFile);

            const prompt = `
            Act as an expert Plant Pathologist. Analyze this image of a crop.
            1. Identify the crop.
            2. Identify any visible disease, pest, or deficiency. If none, state "Healthy".
            3. Provide a brief treatment or recommendation suitable for Kerala context.
            
            Return ONLY a valid JSON object in this format (no markdown):
            {
                "disease": "Disease Name or Healthy",
                "confidence": 0.95,
                "treatment": "Brief treatment advice..."
            }
            `;

            const result = await visionModel.generateContent([prompt, imagePart]);
            const text = result.response.text();

            // Clean markdown code blocks if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(cleanText);

        } catch (error) {
            console.error("Gemini Vision Error:", error);
            // Fallback object to prevent UI crash
            return {
                disease: "Analysis Failed",
                confidence: 0.0,
                treatment: "Could not create a diagnosis. Please identify the crop and describe the symptoms in text."
            };
        }
    }
};

export default aiChatService;
