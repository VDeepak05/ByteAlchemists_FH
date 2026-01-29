import diseasesData from '../data/diseases.json';
import cropsData from '../data/crops.json';
import { calculateDiseaseScore } from '../utils/diseaseScoreCalculator';

/**
 * Get disease predictions based on user inputs
 * @param {Object} userInput - { crop, symptoms[], season, weather }
 * @returns {Array} - Top 3 diseases with scores and resistant varieties
 */
export function getDiseaseEstimations(userInput) {
    // Calculate scores for all diseases
    const scoredDiseases = diseasesData.map(disease => {
        const score = calculateDiseaseScore(disease, userInput);
        return { ...disease, confidenceScore: score };
    });

    // Sort by confidence score descending
    scoredDiseases.sort((a, b) => b.confidenceScore - a.confidenceScore);

    // Return top 3 with enriched data
    return scoredDiseases
        .slice(0, 3)
        .filter(disease => disease.confidenceScore > 0) // Only return diseases with some match
        .map(disease => ({
            ...disease,
            // Get crop details for resistant varieties
            resistantCropDetails: getResistantCropDetails(disease.resistantVarieties, disease.affectedCrops[0])
        }));
}

/**
 * Get resistant crop variety recommendations
 * @param {Array} varietyNames - Array of variety names
 * @param {String} baseCrop - Base crop name
 * @returns {Array} - Array of crop recommendations
 */
function getResistantCropDetails(varietyNames, baseCrop) {
    if (!varietyNames || varietyNames.length === 0) return [];

    // For now, create recommendations based on variety names
    // In future, this could link to actual crop database entries
    return varietyNames.slice(0, 3).map((variety, index) => ({
        name: variety,
        baseCrop: baseCrop,
        description: `Disease-resistant ${baseCrop.toLowerCase()} variety`,
        score: 90 - (index * 5), // Decreasing scores
        benefit: "Enhanced disease resistance"
    }));
}

/**
 * Get all diseases for a specific crop
 * @param {String} cropName - Name of the crop
 * @returns {Array} - Diseases affecting this crop
 */
export function getDiseasesByCrop(cropName) {
    return diseasesData.filter(disease =>
        disease.affectedCrops.includes(cropName) ||
        disease.affectedCrops.includes("Vegetables (Mixed)")
    );
}

/**
 * Get disease by ID
 * @param {Number} diseaseId - Disease ID
 * @returns {Object} - Disease object
 */
export function getDiseaseById(diseaseId) {
    return diseasesData.find(disease => disease.id === diseaseId);
}

/**
 * Get all available crops from the crops database
 * @returns {Array} - Array of crop names
 */
export function getAvailableCrops() {
    return cropsData.map(crop => crop.name);
}
