import React, { useState } from 'react';

const CropCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedSeason, setSelectedSeason] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [viewMySchedule, setViewMySchedule] = useState(false);
    const [mySchedule, setMySchedule] = useState(() => {
        const saved = localStorage.getItem('mySchedule');
        return saved ? JSON.parse(saved) : [];
    });

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

    const cropTypes = [
        { id: 'all', name: 'All Crops' },
        { id: 'cereal', name: 'Cereals' },
        { id: 'vegetable', name: 'Vegetables' },
        { id: 'spice', name: 'Spices' },
        { id: 'plantation', name: 'Plantation' }
    ];

    // Mock crop activities data
    const cropActivities = [
        {
            id: 1,
            month: 5, // June
            season: 'kharif',
            crop: 'Rice',
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'cereal',
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
            type: 'vegetable',
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
            type: 'vegetable',
            activity: 'Irrigation',
            icon: 'water_drop',
            description: 'Regular irrigation needed during summer.',
            duration: 'Daily',
            priority: 'high'
        },
        {
            id: 10,
            month: 5,
            season: 'kharif',
            crop: 'Black Pepper',
            type: 'spice',
            activity: 'Propping',
            icon: 'park',
            description: 'Provide support to pepper vines before monsoon intensifies.',
            duration: 'Before June',
            priority: 'medium'
        },
        {
            id: 11,
            month: 0, // Jan
            season: 'rabi',
            crop: 'Coconut',
            type: 'plantation',
            activity: 'Irrigation',
            icon: 'water_drop',
            description: 'Start irrigation for coconut palms during dry season.',
            duration: 'Jan-May',
            priority: 'high'
        }
    ];

    const filteredActivities = cropActivities.filter(activity => {
        if (viewMySchedule) {
            return mySchedule.includes(activity.id);
        }
        const monthMatch = activity.month === selectedMonth;
        const seasonMatch = selectedSeason === 'all' || activity.season === selectedSeason;
        const typeMatch = selectedType === 'all' || activity.type === selectedType;
        return monthMatch && seasonMatch && typeMatch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-700 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
            case 'medium': return 'text-orange-700 bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
            case 'low': return 'text-green-700 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
            default: return 'text-gray-700 bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800';
        }
    };

    const handleAddToSchedule = (activityId) => {
        if (mySchedule.includes(activityId)) {
            alert("Already in your schedule!");
            return;
        }
        const newSchedule = [...mySchedule, activityId];
        setMySchedule(newSchedule);
        localStorage.setItem('mySchedule', JSON.stringify(newSchedule));
        alert("Activity added to your personal schedule!");
    };

    const handleRemoveFromSchedule = (activityId) => {
        const newSchedule = mySchedule.filter(id => id !== activityId);
        setMySchedule(newSchedule);
        localStorage.setItem('mySchedule', JSON.stringify(newSchedule));
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Crop Calendar</h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Plan your farming activities month by month with expert-curated schedules.
                    </p>
                </div>
                <button
                    onClick={() => setViewMySchedule(!viewMySchedule)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${viewMySchedule
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700'
                        }`}
                >
                    <span className="material-symbols-outlined">
                        {viewMySchedule ? 'calendar_month' : 'fact_check'}
                    </span>
                    {viewMySchedule ? 'View Full Calendar' : 'My Schedule'}
                </button>
            </div>

            {/* Filters Container - Hide when viewing My Schedule */}
            {!viewMySchedule && (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Month Selector */}
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Select Month
                            </label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-lg px-4 py-3 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Season Filter */}
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Season
                            </label>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {seasons.map(season => (
                                    <button
                                        key={season.id}
                                        onClick={() => setSelectedSeason(season.id)}
                                        className={`px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedSeason === season.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-700'
                                            }`}
                                    >
                                        {season.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Crop Type Filter */}
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Crop Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-zinc-800 border-none rounded-lg px-4 py-3 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
                            >
                                {cropTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Activities Grid */}
            {filteredActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActivities.map(activity => (
                        <div
                            key={activity.id}
                            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-primary text-3xl">
                                            {activity.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                                            {activity.crop}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                            {activity.activity}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPriorityColor(activity.priority)}`}>
                                    {activity.priority}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {activity.description}
                            </p>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {activity.duration}
                                </div>
                                {viewMySchedule ? (
                                    <button
                                        onClick={() => handleRemoveFromSchedule(activity.id)}
                                        className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-bold text-sm transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                        Remove
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAddToSchedule(activity.id)}
                                        className={`flex items-center gap-1.5 font-bold text-sm transition-colors ${mySchedule.includes(activity.id)
                                            ? 'text-green-600 cursor-default'
                                            : 'text-primary hover:text-primary-dark'
                                            }`}
                                        disabled={mySchedule.includes(activity.id)}
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {mySchedule.includes(activity.id) ? 'check_circle' : 'add_circle'}
                                        </span>
                                        {mySchedule.includes(activity.id) ? 'Added' : 'Add to Schedule'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 p-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-slate-400">event_busy</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Activities Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        There are no scheduled activities for {months[selectedMonth]} matching your current filters. Try changing the season or crop type.
                    </p>
                </div>
            )}

            {/* Info Banner */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-1">school</span>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                        Did you know?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Kerala's unique agro-climatic conditions allow for specific cropping patterns. The <strong>Virippu</strong> season starts with the pre-monsoon showers in April-May, while <strong>Mundakan</strong> relies on the Northeast monsoon.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CropCalendar;
