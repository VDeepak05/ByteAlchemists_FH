import cropCalendarData from '../../data/cropCalendar.json';

const getCropCalendar = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return cropCalendarData;
};

const getActivitiesByMonth = async (monthIndex) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return cropCalendarData.filter(activity => activity.months.includes(monthIndex));
};

const getActivitiesBySeason = async (seasonId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (seasonId === 'all') return cropCalendarData;
    return cropCalendarData.filter(activity => activity.season === seasonId);
};

export default {
    getCropCalendar,
    getActivitiesByMonth,
    getActivitiesBySeason
};
