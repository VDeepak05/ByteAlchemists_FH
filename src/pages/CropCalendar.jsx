import React, { useState } from 'react';

const CropCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedSeason, setSelectedSeason] = useState('all');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const seasons = [
        { id: 'all', name: 'All Seasons', color: 'bg-slate-500' },
        { id: 'kharif', name: 'Kharif (Monsoon)', color: 'bg-blue-500' },
        { id: 'rabi', name: 'Rabi (Winter)', color: 'bg-green-500' },
        { id: 'zaid', name: 'Zaid (Summer)', color: 'bg-orange-500' }
    ];

    // Mock crop activities data
    const cropActivities = [
        {
            id: 1,
            month: 5, // June
            season: 'kharif',
            crop: 'Rice',
            activity: 'Sowing',
            icon: 'agriculture',
            description: 'Best time for rice sowing. Ensure adequate water availability.',
            duration: '15-20 days',
            priority: 'high'
        },
        {
            id: 2,
            month: 5,
            season: 'kharif',
            crop: 'Rice',
            activity: 'Field Preparation',
            icon: 'landscape',
            description: 'Prepare paddy fields with proper ploughing and leveling.',
            duration: '7-10 days',
            priority: 'high'
        },
        {
            id: 3,
            month: 6,
            season: 'kharif',
            crop: 'Rice',
            activity: 'Transplanting',
            icon: 'eco',
            description: 'Transplant rice seedlings to main field.',
            duration: '20-30 days after sowing',
            priority: 'high'
        },
        {
            id: 4,
            month: 7,
            season: 'kharif',
            crop: 'Rice',
            activity: 'Fertilizer Application',
            icon: 'science',
            description: 'Apply first dose of fertilizer for better growth.',
            duration: '30-35 days after transplanting',
            priority: 'medium'
        },
        {
            id: 5,
            month: 9,
            season: 'kharif',
            crop: 'Rice',
            activity: 'Harvesting',
            icon: 'shopping_basket',
            description: 'Harvest rice when grains are golden yellow.',
            duration: '120-140 days after sowing',
            priority: 'high'
        },
        {
            id: 6,
            month: 10,
            season: 'rabi',
            crop: 'Wheat',
            activity: 'Sowing',
            icon: 'agriculture',
            description: 'Optimal time for wheat sowing in Kerala.',
            duration: '15-20 days',
            priority: 'high'
        },
        {
            id: 7,
            month: 2,
            season: 'rabi',
            crop: 'Wheat',
            activity: 'Harvesting',
            icon: 'shopping_basket',
            description: 'Harvest wheat when moisture is around 20-25%.',
            duration: '120-150 days after sowing',
            priority: 'high'
        },
        {
            id: 8,
            month: 3,
            season: 'zaid',
            crop: 'Vegetables',
            activity: 'Planting',
            icon: 'eco',
            description: 'Plant summer vegetables like cucumber, bitter gourd.',
            duration: '10-15 days',
            priority: 'medium'
        },
        {
            id: 9,
            month: 4,
            season: 'zaid',
            crop: 'Vegetables',
            activity: 'Irrigation',
            icon: 'water_drop',
            description: 'Regular irrigation needed during summer.',
            duration: 'Daily',
            priority: 'high'
        }
    ];

    const filteredActivities = cropActivities.filter(activity => {
        const monthMatch = activity.month === selectedMonth;
        const seasonMatch = selectedSeason === 'all' || activity.season === selectedSeason;
        return monthMatch && seasonMatch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
            case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
            case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
            default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary">Crop Calendar</h1>
                    <p className="text-sm text-gray-500 dark:text-text-dark-secondary mt-1">
                        Plan your farming activities month by month
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                {/* Month Selector */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Month
                    </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Season Filter */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filter by Season
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {seasons.map(season => (
                            <button
                                key={season.id}
                                onClick={() => setSelectedSeason(season.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedSeason === season.id
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-surface-dark-elevated text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                {season.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activities Grid */}
            {filteredActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActivities.map(activity => (
                        <div
                            key={activity.id}
                            className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            {activity.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-text-dark-primary">
                                            {activity.crop}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-text-dark-secondary">
                                            {activity.activity}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase border ${getPriorityColor(activity.priority)}`}>
                                    {activity.priority}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-4">
                                {activity.description}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-gray-500 dark:text-text-dark-secondary">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span>{activity.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 dark:text-text-dark-secondary">
                                    <span className="material-symbols-outlined text-sm">wb_sunny</span>
                                    <span className="capitalize">{activity.season}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">
                        event_busy
                    </span>
                    <p className="text-gray-500 dark:text-text-dark-secondary">
                        No activities scheduled for {months[selectedMonth]} in this season.
                    </p>
                </div>
            )}

            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <div className="flex gap-3">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                        info
                    </span>
                    <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Kerala Farming Seasons
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Kharif (June-October):</strong> Monsoon crops like rice, maize, cotton<br />
                            <strong>Rabi (November-March):</strong> Winter crops like wheat, mustard, barley<br />
                            <strong>Zaid (March-June):</strong> Summer crops like vegetables, watermelon
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropCalendar;
