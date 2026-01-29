// Crop Recommendation Rules
import cropRules from '../../data/cropRules.json';

/**
 * Crop Recommendation Service - Rule-based AI engine
 */
class CropRecommendationService {
    /**
     * Get crop recommendations based on user input
     * @param {Object} input - User input parameters
     * @returns {Promise<Object>} Recommendations
     */
    async getRecommendations(input) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate AI processing

            const { season, budget, water, goal, soilType, landSize } = input;

            // Filter crops by season
            let suitableCrops = cropRules.filter((crop) =>
                crop.seasons.includes(season.toLowerCase())
            );

            // Filter by water availability
            suitableCrops = suitableCrops.filter((crop) => {
                if (water === 'high') return true;
                if (water === 'moderate') return crop.waterRequirement !== 'high';
                if (water === 'low') return crop.waterRequirement === 'low';
                return true;
            });

            // Filter by budget
            suitableCrops = suitableCrops.filter((crop) => {
                const budgetLevel = this.getBudgetLevel(budget);
                if (budgetLevel === 'high') return true;
                if (budgetLevel === 'moderate') return crop.investment !== 'high';
                if (budgetLevel === 'low') return crop.investment === 'low';
                return true;
            });

            // Score crops based on goal
            suitableCrops = suitableCrops.map((crop) => {
                let score = 60; // Base score

                // Goal-based scoring
                if (goal === 'profit' && crop.profitability === 'high') score += 20;
                if (goal === 'yield' && crop.yieldPotential === 'high') score += 20;
                if (goal === 'sustainability' && crop.sustainability === 'high') score += 20;

                // Kerala suitability bonus
                if (crop.keralaSuitability === 'high') score += 15;

                // Market demand bonus
                if (crop.marketDemand === 'high') score += 10;

                // Soil type match
                if (soilType && crop.suitableSoils.includes(soilType.toLowerCase())) {
                    score += 10;
                }

                return {
                    ...crop,
                    confidence: Math.min(95, score),
                };
            });

            // Sort by confidence and take top 3
            const topRecommendations = suitableCrops
                .sort((a, b) => b.confidence - a.confidence)
                .slice(0, 3);

            return {
                recommendations: topRecommendations.map((crop) => ({
                    name: crop.name,
                    confidence: crop.confidence,
                    expectedYield: crop.expectedYield,
                    investment: crop.investmentRange,
                    marketDemand: crop.marketDemand,
                    profitability: crop.profitability,
                    reasons: this.generateReasons(crop, input),
                    tips: crop.tips || [],
                })),
                inputSummary: {
                    season,
                    budget,
                    water,
                    goal,
                },
            };
        } catch (error) {
            console.error('Error generating recommendations:', error);
            throw error;
        }
    }

    /**
     * Get budget level from budget string
     */
    getBudgetLevel(budget) {
        if (budget.includes('50')) return 'high';
        if (budget.includes('20')) return 'moderate';
        return 'low';
    }

    /**
     * Generate explanation reasons for recommendation
     */
    generateReasons(crop, input) {
        const reasons = [];

        if (crop.keralaSuitability === 'high') {
            reasons.push('Highly suitable for Kerala\'s climate');
        }

        if (crop.seasons.includes(input.season.toLowerCase())) {
            reasons.push(`Perfect for ${input.season} season`);
        }

        if (input.goal === 'profit' && crop.profitability === 'high') {
            reasons.push('High profitability potential');
        }

        if (input.goal === 'yield' && crop.yieldPotential === 'high') {
            reasons.push('Excellent yield potential');
        }

        if (crop.marketDemand === 'high') {
            reasons.push('Strong market demand');
        }

        if (crop.waterRequirement === input.water) {
            reasons.push('Matches your water availability');
        }

        return reasons.slice(0, 3);
    }
}

export default new CropRecommendationService();
