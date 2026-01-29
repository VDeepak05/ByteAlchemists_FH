import React, { useState } from 'react';
import { getRecommendations } from '../../services/cropEngine';

const CropRecommendationTab = () => {
    const [formData, setFormData] = useState({
        season: 'kharif',
        budget: 'mid',
        water: 'rainfed',
        goal: 'profit'
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const results = await getRecommendations(formData);
            setRecommendations(results.slice(0, 3));
        } catch (error) {
            console.error('Error getting recommendations:', error);
        }
        setLoading(false);
    };

    // Default recommendations to show
    const defaultCrops = [
        {
            name: 'Nendran Banana',
            variety: 'Plantain Variety',
            score: 92,
            investment: '₹85,000 / ac',
            profit: '+45%',
            cycle: '10-12 Months',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHlWGJ2HbBL1J7r0kO_DJg7CT6ks4ydDC790W36jQXL72iqTC_xA1XCp5_Ee7IQOKmwjFBMfX08M5V8BT7AzRVbegtp2m8Iw2yjeHhK2xA6QHwB8DElKuVm31zNACziqHSgCHrLagK_imODbt_bwlQ_87Cxq9MfMng-P86ecoKU0duRmpJAh2W_RxfFW6h6L_Fjz1ISS_WK8zGXsxA5blfOtoD5DZ42E0Y4nYe5remRWqw7i5VK6qDEOh3WzkP4mC6uGwVpvYE5rI',
            best: true
        },
        {
            name: 'Turmeric',
            variety: 'Alleppey Supreme',
            score: 84,
            investment: '₹60,000 / ac',
            profit: '+38%',
            cycle: '8-9 Months',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9MZs9EfY7R_vp_rbMRoB8VASJDbn_-_C05P6QLAo5rohsnnbva60n_VSLHTqyyL9zkPt2fVsCbnpOhJOIQUjkp-9PSw1fLVPLyG-yo2PWEn0QfDs4QwcMNhYZAM_2DBhERZ-tq-10p_SUUAGKMV434VPEwhcupkVLwSZsKdSAU0BChcNuAgyQ6ahrTUn7nNObaRZcheYYRqZgzXxwsA0T0VXBLhyZpyJfegMzShTwD1yCWZI5luw8foIXncyRMsD8aSypbTcu5l4',
            best: false
        },
        {
            name: 'Ginger',
            variety: 'Wayanad Variety',
            score: 72,
            investment: '₹1,10,000 / ac',
            profit: '+28%',
            cycle: '8-10 Months',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzA8Ut7CwVnZm8vY9e1dCJExMMxIT6Vutnh7TWTXnjhwsbdp00EOwbqgUa-fEWfUTvTncxVHWbE3kTyucuAeq_T8awgdo5NthVTMPSR7eQiCM5SKQyVNgD0jryFRRyV3kiakZAnDdFSljTSxM2Dl4bOUV2ykrPMyk8X04X8XLE_BmH6GdzInzscxh_tq9BUMlG3iT762R9vytxuW7UevFrTKsyRRR-EoCOHasX_KaiIviBUcsEQlr3z8fyVE8YPOask1HnlE9Bm24',
            best: false
        }
    ];

    const displayCrops = recommendations.length > 0 ? recommendations : defaultCrops;

    const ProgressCircle = ({ score }) => {
        const circumference = 2 * Math.PI * 20;
        const offset = circumference - (score / 100) * circumference;
        return (
            <div className="relative flex items-center justify-center">
                <svg className="w-12 h-12">
                    <circle className="text-gray-200 dark:text-white/10" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4" />
                    <circle
                        className={`${score >= 80 ? 'text-primary' : 'text-amber-500'}`}
                        cx="24" cy="24" fill="transparent" r="20"
                        stroke="currentColor"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        strokeWidth="4"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                </svg>
                <span className={`absolute text-[10px] font-black ${score >= 80 ? 'text-primary' : 'text-amber-500'}`}>{score}%</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-6">
            {/* Left Panel: Form Section */}
            <aside className="w-full lg:w-1/3 flex flex-col gap-6">
                {/* Form Card */}
                <div className="bg-white dark:bg-[#1a2e21] rounded-xl p-6 shadow-sm border border-primary/10">
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Advisor Panel</h2>
                        <p className="text-xs text-[#50956a]">Define your land parameters</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 dark:text-white text-sm font-semibold">Select Season</label>
                            <select
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            >
                                <option value="kharif">Monsoon (Kharif)</option>
                                <option value="rabi">Winter (Rabi)</option>
                                <option value="summer">Summer (Zaid)</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 dark:text-white text-sm font-semibold">Budget Range (per acre)</label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            >
                                <option value="low">Low (&lt; ₹50k)</option>
                                <option value="mid">Medium (₹50k - ₹1.5L)</option>
                                <option value="high">High (&gt; ₹1.5L)</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 dark:text-white text-sm font-semibold">Water Availability</label>
                            <select
                                name="water"
                                value={formData.water}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            >
                                <option value="rainfed">Rain-fed</option>
                                <option value="irrigated">Canal/Well Irrigated</option>
                                <option value="low">Scarce / Drought-prone</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 dark:text-white text-sm font-semibold">Primary Goal</label>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            >
                                <option value="profit">Maximum Profit Margin</option>
                                <option value="risk">Low Risk / Resilience</option>
                                <option value="export">Export Potential</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all mt-4 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">auto_awesome</span>
                            {loading ? 'Generating...' : 'Generate Recommendations'}
                        </button>
                    </form>
                </div>

                {/* Secondary Nav Items */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">analytics</span>
                        <p className="text-sm font-bold">Current Recommendation</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-[#50956a] hover:bg-white dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <span className="material-symbols-outlined">bookmark</span>
                        <p className="text-sm font-medium">Saved Results</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-[#50956a] hover:bg-white dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <span className="material-symbols-outlined">history</span>
                        <p className="text-sm font-medium">Historical Trends</p>
                    </div>
                </div>
            </aside>

            {/* Right Panel: Results Section */}
            <section className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top 3 Recommended Crops</h3>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded font-bold">
                            <span className="material-symbols-outlined text-sm">location_on</span> Wayanad, Kerala
                        </span>
                        <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold">
                            <span className="material-symbols-outlined text-sm">wb_sunny</span> High Humidity
                        </span>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {displayCrops.map((crop, idx) => (
                        <div
                            key={idx}
                            className={`bg-white dark:bg-[#1a2e21] rounded-xl overflow-hidden flex flex-col ${crop.best ? 'border-2 border-primary shadow-lg' : 'border border-primary/10 shadow-sm'
                                }`}
                        >
                            <div className="relative h-40 w-full overflow-hidden">
                                {crop.best && (
                                    <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">Best Match</div>
                                )}
                                <img className="w-full h-full object-cover" alt={crop.name} src={crop.image} />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white">{crop.name}</h4>
                                        <p className="text-xs text-[#50956a]">{crop.variety}</p>
                                    </div>
                                    <ProgressCircle score={crop.score} />
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#50956a]">Investment</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{crop.investment}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#50956a]">Profit Margin</span>
                                        <span className={`font-bold ${crop.score >= 80 ? 'text-primary' : 'text-amber-600'}`}>{crop.profit}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#50956a]">Growth Cycle</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{crop.cycle}</span>
                                    </div>
                                </div>
                                <button className="mt-auto w-full py-2 bg-primary/10 text-primary font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">
                                    View Full Guide
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-4 p-4 rounded-lg bg-background-light dark:bg-white/5 border border-primary/5">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="text-xs text-[#50956a] leading-relaxed">
                            Recommendations are generated using historical rainfall data (2010-2023), current soil pH levels for the Malabar region, and market price volatility indices. Financial estimates are approximate and based on local cooperative rates.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CropRecommendationTab;
