import React, { useState } from 'react';
import { Sprout, DollarSign, Droplets, Target, AlertTriangle } from 'lucide-react';
import { getRecommendations } from '../services/cropEngine';
import { getWeatherForecast } from '../services/weatherAPI';

const CropRecommendation = () => {
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);

    const [formData, setFormData] = useState({
        season: 'Kharif',
        budget: 50000,
        waterAvailability: 'Moderate',
        goal: 'Maximum Profit',
        farmSize: 1, // Default from profile usually
        soilType: 'Red Soil' // Default from profile usually
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API/Processing delay
        try {
            // Fetch weather context (mock or real)
            const weather = await getWeatherForecast(); // Assume this returns object with totalRainfall30Days or we calculate it
            // For now, let's inject a dummy rainfall metric if not present, based on forecast
            const weatherContext = {
                totalRainfall30Days: weather.current?.rainfall ? weather.current.rainfall * 30 * 8 : 300 // rough estimate
            };

            const results = getRecommendations(formData, weatherContext);
            setRecommendations(results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900">Crop Recommendation Engine</h1>
                <p className="text-neutral-600">Get AI-powered suggestions based on your soil, climate, and budget.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-neutral-200 h-fit">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <Target className="mr-2 h-5 w-5 text-primary" />
                        Input Parameters
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Season</label>
                            <select name="season" value={formData.season} onChange={handleChange} className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2 border">
                                <option value="Kharif">Kharif (June-Oct)</option>
                                <option value="Rabi">Rabi (Nov-March)</option>
                                <option value="Summer">Summer (April-May)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Budget (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-neutral-500">₹</span>
                                <input
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    min="5000"
                                    max="1000000"
                                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2 pl-8 border"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Water Availability</label>
                            <select name="waterAvailability" value={formData.waterAvailability} onChange={handleChange} className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2 border">
                                <option value="Abundant">Abundant</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Limited">Limited</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Primary Goal</label>
                            <select name="goal" value={formData.goal} onChange={handleChange} className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2 border">
                                <option value="Maximum Profit">Maximum Profit</option>
                                <option value="Low Risk">Low Risk</option>
                                <option value="Quick Harvest">Quick Harvest</option>
                                <option value="Subsistence">Subsistence</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                            >
                                {loading ? 'Analyzing...' : 'Get Recommendations'}
                            </button>
                        </div>

                        <div className="text-xs text-neutral-500 mt-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                            <p><strong>Note:</strong> Auto-filled from profile:</p>
                            <ul className="list-disc list-inside mt-1">
                                <li>Soil: {formData.soilType}</li>
                                <li>Farm Size: {formData.farmSize} acres</li>
                            </ul>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2">
                    {!recommendations ? (
                        <div className="h-full flex flex-col items-center justify-center text-neutral-400 min-h-[400px] bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                            <Sprout className="h-16 w-16 mb-4 opacity-20" />
                            <p>Enter details and click "Get Recommendations" to see results</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-neutral-900">Top Recommended Crops</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {recommendations.map((crop) => (
                                    <CropCard key={crop.id} crop={crop} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CropCard = ({ crop }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        if (score >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'text-green-600';
            case 'Medium': return 'text-yellow-600';
            case 'High': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const profit = (crop.expected_yield_kg * crop.market_price_per_kg) - crop.investment_per_acre;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow flex flex-col">
            <div className="h-40 w-full overflow-hidden relative">
                <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border ${getScoreColor(crop.score)}`}>
                    {Math.round(crop.score)}% Match
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-neutral-900">{crop.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded bg-neutral-100 font-medium ${getRiskColor(crop.climate_sensitivity)}`}>
                        {crop.climate_sensitivity} Risk
                    </span>
                </div>

                <div className="space-y-2 text-sm text-neutral-600 flex-1">
                    <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{crop.duration_days} days</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Investment:</span>
                        <span className="font-medium">₹{crop.investment_per_acre.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Est. Profit:</span>
                        <span className="font-medium text-green-600">₹{profit.toLocaleString()}</span>
                    </div>
                </div>

                <button className="mt-4 w-full py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CropRecommendation;
