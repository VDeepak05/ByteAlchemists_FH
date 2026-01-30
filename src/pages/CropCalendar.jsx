import React, { useState, useEffect } from 'react';
import cropCalendarService from '../services/api/cropCalendarService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CropCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedSeason, setSelectedSeason] = useState('all');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const seasons = [
        { id: 'all', name: 'All Seasons', color: 'bg-slate-500' },
        { id: 'virippu', name: 'Virippu (Autumn)', color: 'bg-blue-600' },
        { id: 'mundakan', name: 'Mundakan (Winter)', color: 'bg-green-600' },
        { id: 'puncha', name: 'Puncha (Summer)', color: 'bg-orange-500' },
        { id: 'perennial', name: 'Perennial', color: 'bg-teal-600' }
    ];

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                // Fetch all and filter client-side for complex logic (month/season)
                // or use service methods. Since we filter by BOTH, fetching all is easier
                // then filtering, or we can fetch by month then filter season.
                // Let's fetch all to show complete picture if needed, or stick to month view.

                // Better approach: Get activities for selected month, then filter by season.
                const monthActivities = await cropCalendarService.getActivitiesByMonth(selectedMonth);

                let filtered = monthActivities;
                if (selectedSeason !== 'all') {
                    filtered = filtered.filter(a => a.season === selectedSeason);
                }
                setActivities(filtered);
            } catch (error) {
                console.error("Failed to load calendar data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [selectedMonth, selectedSeason]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
            case 'medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
            case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
            default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
        }
    };

    const getSeasonBadge = (seasonId) => {
        const season = seasons.find(s => s.id === seasonId);
        return season ? (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${season.color} text-white`}>
                {season.name}
            </span>
        ) : null;
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-text-dark-primary tracking-tight">Crop Calendar</h1>
                    <p className="text-lg text-[#50956a] mt-1 font-medium">
                        Guide to Kerala's agricultural seasons: Virippu, Mundakan, and Puncha.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#1a2e22] p-4 rounded-xl shadow-sm border border-[#e8f3ec] dark:border-[#1e3a29] flex flex-wrap gap-6 items-center">
                {/* Month Selector */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold text-slate-700 dark:text-text-dark-secondary mb-2 uppercase tracking-wide">
                        Month
                    </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg border border-[#e8f3ec] dark:border-[#1e3a29] bg-white dark:bg-[#1a2e22] text-slate-900 dark:text-text-dark-primary font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none cursor-pointer"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Season Filter */}
                <div className="flex-[2] min-w-[300px]">
                    <label className="block text-sm font-bold text-slate-700 dark:text-text-dark-secondary mb-2 uppercase tracking-wide">
                        Filter by Season
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {seasons.map(season => (
                            <button
                                key={season.id}
                                onClick={() => setSelectedSeason(season.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedSeason === season.id
                                    ? `${season.color} text-white shadow-lg shadow-primary/20`
                                    : 'bg-[#e8f3ec] dark:bg-[#1e3a29] text-slate-600 dark:text-text-dark-secondary hover:bg-opacity-80'
                                    }`}
                            >
                                {season.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activities Grid */}
            {loading ? (
                <div className="py-12">
                    <LoadingSpinner message="Loading calendar data..." />
                </div>
            ) : activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map(activity => (
                        <div
                            key={activity.id}
                            className="bg-white dark:bg-[#1a2e22] rounded-2xl border border-[#e8f3ec] dark:border-[#1e3a29] p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-primary text-3xl">
                                            {activity.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-text-dark-primary leading-tight">
                                            {activity.crop}
                                        </h3>
                                        <div className="mt-1">
                                            {getSeasonBadge(activity.season)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Title */}
                            <div className="mb-3">
                                <h4 className="text-lg font-bold text-[#50956a] flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">event_note</span>
                                    {activity.activity}
                                </h4>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed min-h-[40px]">
                                {activity.description}
                            </p>

                            {/* Footer Info */}
                            <div className="pt-4 border-t border-[#e8f3ec] dark:border-[#1e3a29] flex items-center justify-between text-xs font-semibold">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-base">timer</span>
                                    <span>{activity.duration}</span>
                                </div>
                                <span className={`px-2 py-1 rounded capitalize ${getPriorityColor(activity.priority)}`}>
                                    {activity.priority} Priority
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1a2e22] rounded-2xl border border-[#e8f3ec] dark:border-[#1e3a29] p-16 text-center">
                    <div className="w-16 h-16 bg-[#e8f3ec] dark:bg-[#1e3a29] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-[#50956a]">
                            event_busy
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-text-dark-primary mb-2">
                        No Activities Found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        No farming activities scheduled for {months[selectedMonth]} in the selected season. Try changing the filter.
                    </p>
                </div>
            )}

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                            tips_and_updates
                        </span>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                            Understanding Kerala's Farming Seasons
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800 dark:text-blue-200">
                            <div>
                                <strong className="block text-blue-700 dark:text-blue-300 mb-1">Virippu (April-Oct)</strong>
                                Autumn crop season, starting with pre-monsoon showers. Main crop: Rice.
                            </div>
                            <div>
                                <strong className="block text-blue-700 dark:text-blue-300 mb-1">Mundakan (Sep-Jan)</strong>
                                Winter crop season. Most significant for paddy cultivation yield.
                            </div>
                            <div>
                                <strong className="block text-blue-700 dark:text-blue-300 mb-1">Puncha (Dec-April)</strong>
                                Summer crop season. Focus on irrigation-dependent crops.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropCalendar;
