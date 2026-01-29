import cropsData from '../data/crops.json';
import { calculateScore } from '../utils/scoreCalculator';

export function getRecommendations(userInput, weatherData) {
    // 1. Calculate scores for all crops
    const scoredCrops = cropsData.map(crop => {
        const score = calculateScore(crop, userInput, weatherData);
        return { ...crop, score };
    });

    // 2. Sort by score descending
    scoredCrops.sort((a, b) => b.score - a.score);

    // 3. Return top 3
    return scoredCrops.slice(0, 3);
}

export function getAllCrops() {
    return cropsData;
}
