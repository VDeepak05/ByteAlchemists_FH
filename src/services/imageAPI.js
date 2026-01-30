/**
 * Hugging Face Inference API for Plant Disease Detection
 * Model: linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
 * Free tier - no API key required
 * Using Vite proxy to bypass CORS in development
 * Falls back to demo mode if API unavailable (perfect for hackathons!)
 */

import { mockPredictDisease } from './mockDiseaseAPI';

// Toggle between real API and demo mode
const USE_DEMO_MODE = true; // Set to false to try real API

// Use Vite proxy endpoint (configured in vite.config.js)
const HF_API_URL = '/api/huggingface/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification';

/**
 * Predict disease from uploaded image
 * @param {File} imageFile - Image file to analyze
 * @returns {Promise<Array>} - Array of predictions with disease names and confidence scores
 */
export async function predictDiseaseFromImage(imageFile) {
    try {
        // Convert image to blob for API
        const imageBlob = await imageFile.arrayBuffer();

        // Call Hugging Face Inference API
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: Array.from(new Uint8Array(imageBlob))
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const predictions = await response.json();

        // Parse and format predictions
        return parsePredictions(predictions);
    } catch (error) {
        console.error('Error predicting disease from image:', error);
        throw error;
    }
}

/**
 * Alternative method using FormData (simpler)
 * @param {File} imageFile - Image file to analyze
 * @returns {Promise<Array>} - Array of predictions
 */
export async function predictDiseaseFromImageSimple(imageFile) {
    // Use demo mode for reliable hackathon presentation
    if (USE_DEMO_MODE) {
        console.log('🎭 Demo Mode: Using mock predictions for reliable demo');
        return await mockPredictDisease(imageFile);
    }

    // Try real API (may fail due to CORS/auth)
    try {
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            body: imageFile
        });

        if (!response.ok) {
            // Handle model loading (first request may take 20 seconds)
            if (response.status === 503) {
                const error = await response.json();
                if (error.error && error.error.includes('loading')) {
                    throw new Error('MODEL_LOADING');
                }
            }
            throw new Error(`API Error: ${response.status}`);
        }

        const predictions = await response.json();
        return parsePredictions(predictions);
    } catch (error) {
        console.error('Real API failed, falling back to demo mode:', error);
        // Fallback to demo mode if real API fails
        return await mockPredictDisease(imageFile);
    }
}

/**
 * Parse Hugging Face API response
 * Format: [{ label: "Tomato___Late_blight", score: 0.95 }, ...]
 * @param {Array} predictions - Raw API response
 * @returns {Array} - Formatted predictions
 */
function parsePredictions(predictions) {
    if (!Array.isArray(predictions) || predictions.length === 0) {
        return [];
    }

    return predictions
        .slice(0, 3) // Top 3 predictions
        .map(pred => {
            // Parse label: "Tomato___Late_blight" -> { crop: "Tomato", disease: "Late blight" }
            const parts = pred.label.split('___');
            const crop = parts[0] || 'Unknown';
            const disease = parts[1] ? parts[1].replace(/_/g, ' ') : 'Unknown';

            return {
                crop: crop,
                disease: disease,
                fullLabel: pred.label,
                confidence: Math.round(pred.score * 100), // Convert to percentage
                isHealthy: disease.toLowerCase().includes('healthy')
            };
        });
}

/**
 * Map Hugging Face predictions to our disease database
 * @param {Array} apiPredictions - Predictions from HF API
 * @param {Array} localDiseases - Our diseases.json data
 * @returns {Array} - Enriched predictions with treatment info
 */
export function mapPredictionsToDatabase(apiPredictions, localDiseases) {
    return apiPredictions.map(pred => {
        // Try to find matching disease in our database
        const matchedDisease = localDiseases.find(disease => {
            const diseaseName = disease.name.toLowerCase();
            const predDisease = pred.disease.toLowerCase();

            // Fuzzy matching
            return diseaseName.includes(predDisease) ||
                predDisease.includes(diseaseName) ||
                disease.affectedCrops.some(crop =>
                    crop.toLowerCase().includes(pred.crop.toLowerCase())
                );
        });

        if (matchedDisease) {
            // Found in database - enrich with treatment info
            return {
                ...matchedDisease,
                confidenceScore: pred.confidence,
                source: 'ai_vision',
                apiPrediction: pred
            };
        } else {
            // Not in database - return basic info
            return {
                name: pred.disease,
                affectedCrops: [pred.crop],
                severity: pred.confidence > 70 ? 'High' : 'Medium',
                confidenceScore: pred.confidence,
                description: `Detected from image analysis using AI vision`,
                source: 'ai_vision_only',
                apiPrediction: pred,
                treatments: {
                    organic: ['Consult agricultural expert for specific treatment'],
                    chemical: ['Consult agricultural expert for chemical treatment options'],
                    prevention: ['Regular monitoring', 'Proper crop spacing', 'Good drainage']
                },
                resistantVarieties: []
            };
        }
    });
}

/**
 * Validate image file before upload
 * @param {File} file - Image file to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
export function validateImageFile(file) {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Please upload a JPEG, PNG, or WebP image'
        };
    }

    // Check file size (max 10MB for API compatibility)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Image must be smaller than 10MB'
        };
    }

    return { valid: true, error: null };
}
