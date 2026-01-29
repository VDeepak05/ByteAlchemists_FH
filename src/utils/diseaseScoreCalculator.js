/**
 * Calculate Disease Match Score (0-100) based on symptoms and conditions
 */
export function calculateDiseaseScore(disease, userInput) {
    let score = 0;

    // Symptom matching - most important factor (+40 points total)
    if (userInput.symptoms && userInput.symptoms.length > 0) {
        const matchedSymptoms = disease.symptoms.filter(symptom => 
            userInput.symptoms.includes(symptom)
        );
        
        const symptomMatchRate = matchedSymptoms.length / disease.symptoms.length;
        score += symptomMatchRate * 40;

        // Bonus for matching multiple symptoms
        if (matchedSymptoms.length >= 2) {
            score += 10;
        }
    }

    // Crop compatibility (+30 points)
    if (userInput.crop && disease.affectedCrops.includes(userInput.crop)) {
        score += 30;
    } else if (userInput.crop && disease.affectedCrops.includes("Vegetables (Mixed)")) {
        // Generic match for any vegetable crop
        score += 15;
    }

    // Environmental factors (+20 points)
    let envScore = 0;

    // Season match
    if (userInput.season && 
        (disease.environmentalFactors.favorableSeasons.includes(userInput.season) ||
         disease.environmentalFactors.favorableSeasons.includes("All"))) {
        envScore += 10;
    }

    // Weather match
    if (userInput.weather && 
        disease.environmentalFactors.weather.includes(userInput.weather)) {
        envScore += 10;
    }

    score += envScore;

    // Severity adjustment - higher severity diseases are more likely to be noticed
    // This gives a slight boost to high severity matches
    if (disease.severity === "High" && score > 40) {
        score += 5;
    }

    // Clamp score between 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
}
