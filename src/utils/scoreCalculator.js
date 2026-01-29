/**
 * Calculate Suitability Score (0-100) for a crop
 */
export function calculateScore(crop, userInput, weatherData) {
    let score = 50; // Base score

    // Season match (+20)
    if (crop.season.includes(userInput.season) || crop.season.includes("All")) {
        score += 20;
    } else {
        score -= 30;
    }

    // Soil match (+15)
    if (crop.soil.includes(userInput.soilType) || crop.soil.includes("All")) {
        score += 15;
    } else {
        score -= 20;
    }

    // Water availability (+15)
    // Logic: specific matches get max, generic/adaptable gets some points
    if (crop.water === userInput.waterAvailability) {
        score += 15;
    } else if (crop.water === "Moderate") {
        score += 5; // Moderate is flexible
    } else if (userInput.waterAvailability === "Abundant") {
        // If user has abundant water, they can grow moderate/limited crops too usually,
        // but maybe prefer water intensive ones? sticking to PRD logic:
        // PRD says exact match = 15. Moderate crop = 5.
        // We can adapt slightly for logic gaps, but let's stick to PRD.
    }

    // Budget match (+10)
    // PRD: affordability = (Budget * FarmSize) / Investment
    const totalBudget = userInput.budget; // User input budget is likely total or per acre? 
    // PRD says "Budget: Number input (₹5,000 - ₹1,00,000)". Farm Size is in Profile.
    // Let's assume Budget in input is "Available Budget" total.
    // And Investment is "per acre".

    const estimatedCost = crop.investment_per_acre * userInput.farmSize;
    const affordability = totalBudget / estimatedCost;

    if (affordability >= 1) {
        score += 10;
    } else if (affordability >= 0.7) {
        score += 5;
    } else {
        score -= 15;
    }

    // Climate risk adjustment (-20 to 0)
    // Using weather probability or hardcoded for now if weather data missing
    const predictedRainfall = weatherData?.totalRainfall30Days || 200; // Default fallback
    const rainfallDiff = Math.abs(predictedRainfall - crop.rainfall_required_mm);

    if (rainfallDiff < 200) {
        score += 10;
    } else if (rainfallDiff < 500) {
        score += 0;
    } else {
        score -= 20;
    }

    // Goal-based adjustment
    if (userInput.goal === "Maximum Profit") {
        const profit = (crop.expected_yield_kg * crop.market_price_per_kg) - crop.investment_per_acre;
        if (profit > 100000) score += 10;
    } else if (userInput.goal === "Low Risk") {
        if (crop.climate_sensitivity === "Low") score += 15;
    } else if (userInput.goal === "Quick Harvest") {
        if (crop.duration_days < 180) score += 15;
    }

    return Math.max(0, Math.min(100, score)); // Clamp between 0-100
}
