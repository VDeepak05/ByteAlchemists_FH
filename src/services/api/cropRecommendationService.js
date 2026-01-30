import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
}

/**
 * AI-Powered Crop Recommendation Service using Secure Backend Proxy
 */
class CropRecommendationService {
    /**
     * Get crop recommendations based on user input using Secure Backend Proxy
     */
    async getRecommendations(input) {
        try {
            console.log("🚀 Sending request to Secure Backend...");
            const response = await fetch('http://localhost:3001/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server Error: ${response.status}`);
            }

            const aiResponse = await response.json();

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
                inputSummary: input,
                aiGenerated: true
            };

        } catch (error) {
            console.error("Backend Recommendation Error (Switching to Fallback):", error);
            // Fallback to local rule-based system if server is down or key is invalid
            return this.getFallbackRecommendations(input);
        }
    }

    /**
     * Fallback recommendations when AI is unavailable
     */
    /**
     * Fallback recommendations when AI is unavailable
     * Returns different crops based on Season and Budget to simulate intelligence
     */
    getFallbackRecommendations(input) {
        const { season, budget } = input;

        // Define pools of crops for different scenarios
        const fallbacks = {
            kharif: [
                {
                    name: "Rice (Paddy)",
                    confidence: 95,
                    investment: "₹35,000 - 45,000/acre",
                    profitMargin: "+30%",
                    growthCycle: "110-140 days",
                    marketDemand: "High",
                    reasons: ["Primary staple crop of Kerala", "Perfect for monsoon season", "High government procurement support"],
                    isBest: true
                },
                {
                    name: "Ginger",
                    confidence: 88,
                    investment: "₹80,000 - 1,00,000/acre",
                    profitMargin: "+45%",
                    growthCycle: "8-9 months",
                    marketDemand: "High",
                    reasons: ["High value cash crop", "Excellent suitability for rainfed areas", "Strong export potential"]
                },
                {
                    name: "Turmeric",
                    confidence: 85,
                    investment: "₹60,000 - 75,000/acre",
                    profitMargin: "+40%",
                    growthCycle: "8-9 months",
                    marketDemand: "High",
                    reasons: ["Growing demand for Curcumin", "Low pest incidence", "Good intercrop option"]
                }
            ],
            rabi: [
                {
                    name: "Vegetables (Cool Season)",
                    confidence: 90,
                    investment: "₹40,000 - 50,000/acre",
                    profitMargin: "+35%",
                    growthCycle: "3-4 months",
                    marketDemand: "High",
                    reasons: ["Includes Cabbage, Cauliflower, Carrot", "High local market demand", "Short duration cash flow"],
                    isBest: true
                },
                {
                    name: "Sweet Potato",
                    confidence: 85,
                    investment: "₹20,000 - 25,000/acre",
                    profitMargin: "+25%",
                    growthCycle: "3-4 months",
                    marketDemand: "Moderate",
                    reasons: ["Low input cost", "Drought tolerant", "Food security crop"]
                },
                {
                    name: "Pulses (Cowpea)",
                    confidence: 82,
                    investment: "₹15,000 - 20,000/acre",
                    profitMargin: "+20%",
                    growthCycle: "70-90 days",
                    marketDemand: "Steady",
                    reasons: ["Improves soil nitrogen", "Short duration", "Low water requirement"]
                }
            ],
            summer: [
                {
                    name: "Vegetables (Summer)",
                    confidence: 92,
                    investment: "₹30,000 - 45,000/acre",
                    profitMargin: "+40%",
                    growthCycle: "3-4 months",
                    marketDemand: "Very High",
                    reasons: ["Cucumber, Pumpkin, Gourds", "Peak prices in summer", "Fast growth cycle"],
                    isBest: true
                },
                {
                    name: "Tapioca (Cassava)",
                    confidence: 88,
                    investment: "₹15,000 - 25,000/acre",
                    profitMargin: "+25%",
                    growthCycle: "10-12 months",
                    marketDemand: "Moderate",
                    reasons: ["Drought tolerant champion", "Low maintenance", "Food security crop"]
                },
                {
                    name: "Banana",
                    confidence: 85,
                    investment: "₹85,000/acre",
                    profitMargin: "+35%",
                    growthCycle: "10-12 months",
                    marketDemand: "High",
                    reasons: ["Year-round demand", "High biomass production", "Good intercrop for coconut"]
                }
            ]
        };

        // Select based on season, default to kharif if unmatched
        let selectedCrops = fallbacks[season] || fallbacks.kharif;

        // Simple budget adjustment (just filter or reorder in a real app, here we just swap if low budget)
        if (budget === '< 50000' || budget === 'low') {
            // Move lower cost crops to top if possible, or filtered logic
            // For now, simple return of season-based
        }

        return {
            recommendations: selectedCrops,
            region: "Kerala (Zone-Specific)",
            tips: season === 'summer'
                ? ["Ensure irrigation facilities are ready", "Mulch soil to conserve moisture"]
                : ["Ensure proper drainage", "Monitor for fungal diseases"],
            inputSummary: input,
            aiGenerated: false
        };
    }
}

export default new CropRecommendationService();
