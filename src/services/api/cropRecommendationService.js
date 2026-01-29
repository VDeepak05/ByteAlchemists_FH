import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
}

const APPROVED_CROPS = [
    "Rice (Paddy)", "Coconut", "Black Pepper",
    "Turmeric", "Tapioca (Cassava)", "Bitter Gourd",
    "Snake Gourd", "Ash Gourd", "Pumpkin", "Chilli", "Amaranthus",
    "Nutmeg", "Arecanut", "Vanilla", "Cocoa", "Mango", "Jackfruit"
];

/**
 * AI-Powered Crop Recommendation Service using Gemini
 */
class CropRecommendationService {
    /**
     * Get crop recommendations based on user input using Gemini AI
     */
    async getRecommendations(input) {
        if (!model) {
            console.warn("Gemini API not available, returning fallback");
            return this.getFallbackRecommendations(input);
        }

        try {
            const { season, budget, water, goal } = input;

            const prompt = `You are an expert agricultural advisor for farmers in Kerala, India.

Based on the following farmer profile, recommend the TOP 3 BEST CROPS to grow.

**IMPORTANT:** You must ONLY recommend crops from this approved list:
${APPROVED_CROPS.join(", ")}

**Farmer's Profile:**
- Season: ${season}
- Budget: ${budget}
- Water Availability: ${water}
- Primary Goal: ${goal === 'profit' ? 'Maximum Profit' : goal === 'yield' ? 'Maximum Yield' : 'Sustainability'}

**Requirements:**
1. Focus on crops suitable for Kerala's climate and soil
2. Consider local market demand
3. Return ONLY a valid JSON object in this format:
{
    "recommendations": [
        {
            "name": "Exact Name from Approved List",
            "confidence": 92,
            "investment": "₹XX,000 - ₹XX,000/hectare",
            "profitMargin": "+XX%",
            "growthCycle": "X-X months",
            "marketDemand": "high/medium/low",
            "reasons": ["Reason 1", "Reason 2"]
        }
    ],
    "region": "Recommended Kerala region",
    "tips": ["Tip 1", "Tip 2"]
}`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();

            // Clean and parse JSON
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const aiResponse = JSON.parse(cleanText);

            return {
                recommendations: aiResponse.recommendations.map((crop, index) => ({
                    name: crop.name,
                    confidence: crop.confidence,
                    investment: crop.investment,
                    profitMargin: crop.profitMargin,
                    growthCycle: crop.growthCycle,
                    marketDemand: crop.marketDemand,
                    reasons: crop.reasons || [],
                    isBest: index === 0
                })),
                region: aiResponse.region,
                tips: aiResponse.tips,
                inputSummary: { season, budget, water, goal },
                aiGenerated: true
            };

        } catch (error) {
            console.error("Gemini recommendation error:", error);
            return this.getFallbackRecommendations(input);
        }
    }

    /**
     * Fallback recommendations when AI is unavailable
     */
    getFallbackRecommendations(input) {
        const fallbackCrops = [
            {
                name: "Black Pepper",
                confidence: 96,
                investment: "₹30,000 - 45,000/hectare",
                profitMargin: "+40%",
                growthCycle: "2-3 years (perennial)",
                marketDemand: "high",
                reasons: ["Kerala's signature spice", "High export demand", "Suitable for all seasons"],
                isBest: true
            },
            {
                name: "Turmeric",
                confidence: 91,
                investment: "₹50,000 - 70,000/hectare",
                profitMargin: "+35%",
                growthCycle: "8-9 months",
                marketDemand: "high",
                reasons: ["Strong domestic market", "Multiple uses (food, medicine)", "Good for monsoon season"]
            },
            {
                name: "Tapioca (Cassava)",
                confidence: 88,
                investment: "₹15,000 - 25,000/hectare",
                profitMargin: "+25%",
                growthCycle: "10-12 months",
                marketDemand: "moderate",
                reasons: ["Low investment crop", "Drought tolerant", "Multiple harvest windows"]
            }
        ];

        return {
            recommendations: fallbackCrops,
            region: "Malabar Region",
            tips: ["Consider intercropping for better returns", "Check local APMC prices before selling"],
            inputSummary: input,
            aiGenerated: false
        };
    }
}

export default new CropRecommendationService();
