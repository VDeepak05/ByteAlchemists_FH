import React, { useState } from 'react';
import { getDiseaseEstimations, getAvailableCrops } from '../../services/diseaseEngine';
import { predictDiseaseFromImageSimple, mapPredictionsToDatabase } from '../../services/imageAPI';
import diseasesData from '../../data/diseases.json';
import ImageUpload from './ImageUpload';

const DiseasePrediction = () => {
    const [diagnosisMode, setDiagnosisMode] = useState('image'); // 'symptom' or 'image'
    const [formData, setFormData] = useState({
        crop: '',
        symptoms: [],
        season: 'kharif',
        weather: 'humid'
    });
    const [imageFile, setImageFile] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTreatment, setActiveTreatment] = useState({});
    const [error, setError] = useState(null);

    const availableCrops = getAvailableCrops();

    const symptomOptions = [
        { value: 'leaf_spots', label: 'Leaf Spots (Brown/Black/Yellow)', icon: 'eco' },
        { value: 'wilting', label: 'Wilting/Drooping Leaves', icon: 'water_drop' },
        { value: 'discoloration', label: 'Yellowing/Browning', icon: 'palette' },
        { value: 'stunted_growth', label: 'Stunted Growth', icon: 'height' },
        { value: 'root_damage', label: 'Root Damage Signs', icon: 'grass' },
        { value: 'fruit_damage', label: 'Fruit/Flower Damage', icon: 'local_florist' },
        { value: 'rot', label: 'Mold or Fungal Growth', icon: 'bug_report' }
    ];

    const handleCropChange = (e) => {
        setFormData({ ...formData, crop: e.target.value });
    };

    const handleSymptomToggle = (symptom) => {
        const newSymptoms = formData.symptoms.includes(symptom)
            ? formData.symptoms.filter(s => s !== symptom)
            : [...formData.symptoms, symptom];
        setFormData({ ...formData, symptoms: newSymptoms });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.crop || formData.symptoms.length === 0) {
            alert('Please select a crop and at least one symptom');
            return;
        }

        setLoading(true);
        try {
            const results = getDiseaseEstimations(formData);
            setPredictions(results);
            // Initialize active treatment tabs
            const initialTabs = {};
            results.forEach((_, idx) => {
                initialTabs[idx] = 'organic';
            });
            setActiveTreatment(initialTabs);
        } catch (error) {
            console.error('Error predicting diseases:', error);
        }
        setLoading(false);
    };

    const handleImageAnalysis = async () => {
        if (!imageFile) {
            alert('Please upload an image first');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Call Hugging Face API
            const apiPredictions = await predictDiseaseFromImageSimple(imageFile);

            // Map API results to our database
            const enrichedPredictions = mapPredictionsToDatabase(apiPredictions, diseasesData);

            setPredictions(enrichedPredictions);

            // Initialize active treatment tabs
            const initialTabs = {};
            enrichedPredictions.forEach((_, idx) => {
                initialTabs[idx] = 'organic';
            });
            setActiveTreatment(initialTabs);
        } catch (error) {
            console.error('Error analyzing image:', error);
            if (error.message === 'MODEL_LOADING') {
                setError('AI model is loading... Please wait 20 seconds and try again.');
            } else {
                setError('Failed to analyze image. Please check your internet connection and try again.');
            }
        }
        setLoading(false);
    };

    const handleImageSelect = (file) => {
        setImageFile(file);
        setPredictions([]); // Clear previous predictions
        setError(null);
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'High': return 'text-red-600 bg-red-100';
            case 'Medium': return 'text-amber-600 bg-amber-100';
            case 'Low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const ProgressCircle = ({ score }) => {
        const circumference = 2 * Math.PI * 20;
        const offset = circumference - (score / 100) * circumference;
        return (
            <div className="relative flex items-center justify-center">
                <svg className="w-16 h-16">
                    <circle className="text-gray-200 dark:text-white/10" cx="32" cy="32" fill="transparent" r="20" stroke="currentColor" strokeWidth="4" />
                    <circle
                        className={`${score >= 70 ? 'text-red-500' : score >= 40 ? 'text-amber-500' : 'text-green-500'}`}
                        cx="32" cy="32" fill="transparent" r="20"
                        stroke="currentColor"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        strokeWidth="4"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                </svg>
                <span className={`absolute text-sm font-black ${score >= 70 ? 'text-red-500' : score >= 40 ? 'text-amber-500' : 'text-green-500'}`}>{score}%</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-6">
            {/* Left Panel: Input Form */}
            <aside className="w-full lg:w-1/3 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight">Disease Diagnosis</h1>
                    <p className="text-[#50956a] text-sm font-normal">AI-powered crop disease identification and treatment recommendations</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-[#1a2e21] rounded-xl p-6 shadow-sm border border-primary/10">
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Diagnosis Panel</h2>
                        <p className="text-xs text-[#50956a]">
                            {diagnosisMode === 'image' ? 'Upload a crop image for AI analysis' : 'Describe the symptoms you\'re observing'}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-black/20 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setDiagnosisMode('image')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-semibold transition-all ${diagnosisMode === 'image'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                            <span>Image Upload</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setDiagnosisMode('symptom')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-semibold transition-all ${diagnosisMode === 'symptom'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">checklist</span>
                            <span>Symptoms</span>
                        </button>
                    </div>
                    {/* Image Upload Mode */}
                    {diagnosisMode === 'image' && (
                        <div className="space-y-4">
                            <ImageUpload onImageSelect={handleImageSelect} loading={loading} />

                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">error</span>
                                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleImageAnalysis}
                                disabled={!imageFile || loading}
                                className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">psychology</span>
                                {loading ? 'Analyzing Image...' : 'Analyze with AI'}
                            </button>

                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm">info</span>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Upload a clear photo of the affected crop leaves or parts. AI will analyze and identify potential diseases.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Symptom-Based Mode */}
                    {diagnosisMode === 'symptom' && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Crop Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-white text-sm font-semibold">Affected Crop *</label>
                                <select
                                    name="crop"
                                    value={formData.crop}
                                    onChange={handleCropChange}
                                    className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="">-- Select Crop --</option>
                                    {availableCrops.map((crop, idx) => (
                                        <option key={idx} value={crop}>{crop}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Symptoms */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-white text-sm font-semibold">Visible Symptoms *</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {symptomOptions.map((symptom) => (
                                        <label
                                            key={symptom.value}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.symptoms.includes(symptom.value)
                                                ? 'border-primary bg-primary/10'
                                                : 'border-[#d1e6d8] dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/5'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.symptoms.includes(symptom.value)}
                                                onChange={() => handleSymptomToggle(symptom.value)}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="material-symbols-outlined text-[#50956a] text-lg">{symptom.icon}</span>
                                            <span className="text-sm text-slate-900 dark:text-white">{symptom.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Environmental Conditions */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-white text-sm font-semibold">Current Season</label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                >
                                    <option value="kharif">Monsoon (Kharif)</option>
                                    <option value="rabi">Winter (Rabi)</option>
                                    <option value="summer">Summer (Zaid)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-white text-sm font-semibold">Recent Weather</label>
                                <select
                                    name="weather"
                                    value={formData.weather}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-[#d1e6d8] bg-background-light dark:bg-[#112117] dark:border-white/10 p-3 text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                >
                                    <option value="rainy">Rainy</option>
                                    <option value="humid">Humid</option>
                                    <option value="dry">Dry</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all mt-4 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">medical_services</span>
                                {loading ? 'Diagnosing...' : 'Diagnose Disease'}
                            </button>
                        </form>
                    )}
                </div>
            </aside>

            {/* Right Panel: Results */}
            <section className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {predictions.length > 0 ? 'Diagnosis Results' : 'Potential Diseases'}
                    </h3>
                    {predictions.length > 0 && (
                        <span className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-full font-bold">
                            {predictions.length} {predictions.length === 1 ? 'Match' : 'Matches'} Found
                        </span>
                    )}
                </div>

                {/* Results Grid */}
                {predictions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {predictions.map((disease, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-[#1a2e21] rounded-xl overflow-hidden border border-primary/10 shadow-sm"
                            >
                                <div className="p-6">
                                    {/* Disease Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-black text-slate-900 dark:text-white">{disease.name}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getSeverityColor(disease.severity)}`}>
                                                    {disease.severity} Severity
                                                </span>
                                                {disease.source === 'ai_vision' && (
                                                    <span className="text-xs px-2 py-1 rounded-full font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                                        AI Detected
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[#50956a] mb-3">{disease.description}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                <strong>Affects:</strong> {disease.affectedCrops.join(', ')}
                                            </p>
                                        </div>
                                        <ProgressCircle score={disease.confidenceScore} />
                                    </div>

                                    {/* Treatment Tabs */}
                                    <div className="mt-6">
                                        <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 mb-4">
                                            {['organic', 'chemical', 'prevention'].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTreatment({ ...activeTreatment, [idx]: tab })}
                                                    className={`px-4 py-2 text-sm font-semibold capitalize transition-colors ${activeTreatment[idx] === tab
                                                        ? 'text-primary border-b-2 border-primary'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                                                        }`}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            {disease.treatments[activeTreatment[idx] || 'organic'].map((treatment, tIdx) => (
                                                <div key={tIdx} className="flex items-start gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300">{treatment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Resistant Varieties */}
                                    {disease.resistantCropDetails && disease.resistantCropDetails.length > 0 && (
                                        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <h5 className="text-sm font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">eco</span>
                                                Disease-Resistant Varieties
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {disease.resistantCropDetails.map((variety, vIdx) => (
                                                    <span
                                                        key={vIdx}
                                                        className="text-xs bg-white dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full font-semibold border border-green-300 dark:border-green-700"
                                                    >
                                                        {variety.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#1a2e21] rounded-xl p-12 text-center border border-primary/10">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">science</span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Diagnosis Yet</h4>
                        <p className="text-sm text-[#50956a]">
                            {diagnosisMode === 'image'
                                ? 'Upload a crop image to get instant AI-powered disease detection'
                                : 'Select your crop and symptoms to get AI-powered disease predictions'
                            }
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DiseasePrediction;
