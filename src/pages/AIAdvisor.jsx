import React, { useState } from 'react';
import DiseasePrediction from '../components/advisor/DiseasePrediction';
import CropRecommendationTab from '../components/advisor/CropRecommendationTab';

const AIAdvisor = () => {
    const [activeTab, setActiveTab] = useState('disease'); // disease is primary tab

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight">AI Advisor</h1>
                <p className="text-[#50956a] text-sm font-normal">
                    Get expert recommendations for crop management and disease control
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-[#1a2e21] rounded-xl shadow-sm border border-primary/10 p-2 flex gap-2">
                <button
                    onClick={() => setActiveTab('disease')}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'disease'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
                        }`}
                >
                    <span className="material-symbols-outlined">medical_services</span>
                    <span>Disease Diagnosis</span>
                </button>
                <button
                    onClick={() => setActiveTab('crop')}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'crop'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
                        }`}
                >
                    <span className="material-symbols-outlined">eco</span>
                    <span>Crop Recommendation</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'disease' ? <DiseasePrediction /> : <CropRecommendationTab />}
            </div>
        </div>
    );
};

export default AIAdvisor;
