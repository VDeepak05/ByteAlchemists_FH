/**
 * Mock Disease Detection API for Demo/Hackathon
 * Simulates AI predictions when Hugging Face API is unavailable
 * Uses image analysis heuristics for realistic demo experience
 */

import diseasesData from '../data/diseases.json';

/**
 * Simulate AI disease detection from image
 * Uses image filename and size as heuristics for demo
 */
export async function mockPredictDisease(imageFile) {
    // Simulate API delay (1-2 seconds for realism)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const fileName = imageFile.name.toLowerCase();

    // Try to detect disease from filename (for demo with named images)
    const detectedDiseases = detectFromFilename(fileName);

    if (detectedDiseases.length > 0) {
        return detectedDiseases;
    }

    // Random selection for demo (if filename doesn't match)
    return getRandomDiseases();
}

/**
 * Detect disease from image filename (useful for demo)
 */
function detectFromFilename(fileName) {
    const predictions = [];

    // Rice diseases
    if (fileName.includes('rice') || fileName.includes('paddy')) {
        if (fileName.includes('blast')) {
            predictions.push(createPrediction('Rice', 'Blast', 92));
        } else {
            predictions.push(createPrediction('Rice', 'Blast', 85));
            predictions.push(createPrediction('Rice', 'Bacterial Leaf Blight', 72));
        }
    }

    // Coconut diseases
    else if (fileName.includes('coconut')) {
        if (fileName.includes('wilt') || fileName.includes('root')) {
            predictions.push(createPrediction('Coconut', 'Root Wilt', 88));
        } else if (fileName.includes('bud') || fileName.includes('rot')) {
            predictions.push(createPrediction('Coconut', 'Bud Rot', 90));
        } else {
            predictions.push(createPrediction('Coconut', 'Root Wilt', 82));
        }
    }

    // Banana diseases
    else if (fileName.includes('banana')) {
        if (fileName.includes('wilt') || fileName.includes('panama')) {
            predictions.push(createPrediction('Banana', 'Panama Wilt', 87));
        } else if (fileName.includes('sigatoka') || fileName.includes('spot')) {
            predictions.push(createPrediction('Banana', 'Sigatoka Leaf Spot', 91));
        } else {
            predictions.push(createPrediction('Banana', 'Sigatoka Leaf Spot', 84));
        }
    }

    // Tomato diseases (from PlantVillage dataset naming)
    else if (fileName.includes('tomato')) {
        if (fileName.includes('late') || fileName.includes('blight')) {
            predictions.push(createPrediction('Tomato', 'Late Blight', 94));
        } else if (fileName.includes('early')) {
            predictions.push(createPrediction('Tomato', 'Early Blight', 89));
        } else if (fileName.includes('leaf') && fileName.includes('mold')) {
            predictions.push(createPrediction('Tomato', 'Leaf Mold', 86));
        } else {
            predictions.push(createPrediction('Tomato', 'Late Blight', 81));
        }
    }

    // Pepper diseases
    else if (fileName.includes('pepper') || fileName.includes('bell')) {
        predictions.push(createPrediction('Pepper', 'Quick Wilt', 79));
    }

    // Generic leaf spot/disease images
    else if (fileName.includes('leaf') || fileName.includes('spot') || fileName.includes('disease')) {
        // Pick a random disease
        return getRandomDiseases(1);
    }

    return predictions;
}

/**
 * Create prediction object in API format
 */
function createPrediction(crop, disease, confidence) {
    return {
        crop: crop,
        disease: disease,
        fullLabel: `${crop}___${disease.replace(/ /g, '_')}`,
        confidence: confidence,
        isHealthy: false
    };
}

/**
 * Get random diseases for generic images
 */
function getRandomDiseases(count = 3) {
    const shuffled = [...diseasesData].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count).map((disease, idx) => {
        const crop = disease.affectedCrops[0];
        // Higher confidence for first result, decreasing for others
        const baseConfidence = 85 - (idx * 15);
        const randomVariation = Math.floor(Math.random() * 10) - 5;
        const confidence = Math.max(60, Math.min(95, baseConfidence + randomVariation));

        return {
            crop: crop,
            disease: disease.name,
            fullLabel: `${crop}___${disease.name.replace(/ /g, '_')}`,
            confidence: confidence,
            isHealthy: false
        };
    });
}

/**
 * Simulate specific disease for demo purposes
 */
export function mockSpecificDisease(diseaseId) {
    const disease = diseasesData.find(d => d.id === diseaseId);
    if (!disease) return [];

    const crop = disease.affectedCrops[0];
    return [{
        crop: crop,
        disease: disease.name,
        fullLabel: `${crop}___${disease.name.replace(/ /g, '_')}`,
        confidence: 92,
        isHealthy: false
    }];
}

/**
 * Get demo-friendly disease list for UI
 */
export function getDemoDiseaseSuggestions() {
    return [
        { id: 1, name: 'Rice Blast', filename: 'rice_blast.jpg' },
        { id: 2, name: 'Coconut Root Wilt', filename: 'coconut_wilt.jpg' },
        { id: 3, name: 'Banana Panama Wilt', filename: 'banana_panama.jpg' },
        { id: 4, name: 'Tomato Late Blight', filename: 'tomato_blight.jpg' },
        { id: 7, name: 'Pepper Quick Wilt', filename: 'pepper_wilt.jpg' }
    ];
}
