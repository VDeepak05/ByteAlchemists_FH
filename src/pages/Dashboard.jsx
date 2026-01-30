import React, { useState, useEffect } from 'react';
import weatherService from '../services/api/weatherService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LocationSearch from '../components/common/LocationSearch';

const Dashboard = () => {
    // Weather state
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherError, setWeatherError] = useState(null);

    // Default coordinates (Thiruvananthapuram)
    const [coords, setCoords] = useState({
        lat: parseFloat(import.meta.env.VITE_DEFAULT_LAT) || 8.5241,
        lon: parseFloat(import.meta.env.VITE_DEFAULT_LON) || 76.9366
    });

    // Fetch weather data
    const fetchWeatherData = async () => {
        setWeatherLoading(true);
        setWeatherError(null);

        try {
            const [current, forecastData] = await Promise.all([
                weatherService.getCurrentWeather(coords.lat, coords.lon),
                weatherService.getWeatherForecast(coords.lat, coords.lon)
            ]);

            setCurrentWeather(current);
            setForecast(forecastData);
        } catch (error) {
            console.error('Failed to fetch weather:', error);
            setWeatherError('Failed to load weather data. Please try again.');
        } finally {
            setWeatherLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [coords]);

    const handleLocationSelect = (location) => {
        setCoords({ lat: location.lat, lon: location.lon });
    };

    // Generate dynamic chart path based on forecast
    const generateChartPaths = () => {
        if (!forecast.length) return { path: '', area: '' };

        const temps = forecast.map(day => day.temp);
        const minTemp = Math.min(...temps) - 2;
        const maxTemp = Math.max(...temps) + 2;
        const tempRange = maxTemp - minTemp || 1;

        const points = forecast.map((day, index) => {
            const x = (index / (forecast.length - 1)) * 800;
            const normalizedTemp = (day.temp - minTemp) / tempRange;
            const y = 80 - (normalizedTemp * 60); // Keep within 20-80 Y range (padding)
            return { x, y };
        });

        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const curr = points[i];
            const next = points[i + 1];
            const cp1x = curr.x + (next.x - curr.x) / 2;
            const cp1y = curr.y;
            const cp2x = curr.x + (next.x - curr.x) / 2;
            const cp2y = next.y;
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
        }

        return {
            path,
            area: `${path} V 100 H 0 Z`
        };
    };

    const { path: chartPath, area: areaPath } = generateChartPaths();

    const alerts = [
        { id: 1, type: 'red', icon: 'warning', title: 'Heavy Rainfall Warning', desc: 'Expected 150mm+ precipitation in next 24h. Secure drainage systems.', label: 'Red Alert' },
        { id: 2, type: 'amber', icon: 'pest_control', title: 'Pest Outbreak Alert', desc: 'Brown Plant Hopper detected in Ernakulam district. Monitor rice paddies.', label: 'Warning' },
        { id: 3, type: 'green', icon: 'info', title: 'Scheme Enrollment', desc: 'New subsidies for drip irrigation systems available till July 15th.', label: 'Update' },
    ];

    const marketPrices = [
        { id: 1, code: 'BP', name: 'Black Pepper', location: 'Waynad Grade-1', price: '₹540/kg', change: '+₹12.50', up: true },
        { id: 2, code: 'RC', name: 'Pokkali Rice', location: 'Kochi Mandi', price: '₹82/kg', change: '-₹2.00', up: false },
        { id: 3, code: 'RB', name: 'Rubber (RSS4)', location: 'Kottayam Market', price: '₹182/kg', change: 'Stable', up: null },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Page Title */}
            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-text-dark-primary tracking-tight">Farmer Dashboard</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <LocationSearch onLocationSelect={handleLocationSelect} />
                        <span className="text-slate-500 text-sm hidden md:inline ml-2">| {currentWeather?.location || 'Kerala'}</span>
                    </div>
                </div>
                <button
                    onClick={fetchWeatherData}
                    disabled={weatherLoading}
                    className="flex items-center gap-2 bg-white dark:bg-surface-dark-elevated border border-slate-200 dark:border-border-dark px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined text-sm">{weatherLoading ? 'hourglass_empty' : 'refresh'}</span>
                    {weatherLoading ? 'Loading...' : 'Refresh Data'}
                </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Weather Widget (Span 8) */}
                <div id="weather" className="col-span-12 lg:col-span-8 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 shadow-sm overflow-hidden">
                    {weatherLoading ? (
                        <LoadingSpinner message="Fetching weather data..." />
                    ) : weatherError ? (
                        <ErrorDisplay message={weatherError} onRetry={fetchWeatherData} />
                    ) : currentWeather && (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold dark:text-text-dark-primary">Weather Forecast</h3>
                                    <p className="text-sm text-slate-500 dark:text-text-dark-secondary">5-Day outlook for {currentWeather.location || 'Kerala'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-primary leading-none">{currentWeather.temperature}°C</p>
                                        <p className="text-sm font-medium text-slate-500 dark:text-text-dark-secondary capitalize">{currentWeather.description}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-yellow-500">
                                        {currentWeather.condition === 'clear' ? 'wb_sunny' :
                                            currentWeather.condition === 'rain' ? 'rainy' :
                                                currentWeather.condition === 'clouds' ? 'cloud' : 'wb_cloudy'}
                                    </span>
                                </div>
                            </div>

                            {/* Chart Placeholder */}
                            <div className="mb-8">
                                <div className="h-24 w-full">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 100">
                                        <defs>
                                            <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#16a249', stopOpacity: 0.2 }}></stop>
                                                <stop offset="100%" style={{ stopColor: '#16a249', stopOpacity: 0 }}></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d={areaPath} fill="url(#grad)"></path>
                                        <path d={chartPath} fill="none" stroke="#16a249" strokeLinecap="round" strokeWidth="3"></path>
                                    </svg>
                                </div>
                                <div className="flex justify-between px-2">
                                    {forecast.map((day, idx) => (
                                        <div key={idx} className="text-center">
                                            <p className="text-xs font-bold text-slate-400 dark:text-text-dark-secondary">{day.day}</p>
                                            <span className={`material-symbols-outlined my-1 ${day.condition === 'clear' ? 'text-yellow-500' :
                                                day.condition === 'rain' ? 'text-sky-500' : 'text-sky-400'
                                                }`}>
                                                {day.condition === 'clear' ? 'wb_sunny' :
                                                    day.condition === 'rain' ? 'rainy' : 'cloud'}
                                            </span>
                                            <p className="text-sm font-bold dark:text-text-dark-primary">{day.temp}°</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Alerts Sidebar (Span 4) */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold">Active Alerts</h3>
                        <span className="bg-red-100 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">3 Critical</span>
                    </div>
                    {alerts.map(alert => (
                        <div
                            key={alert.id}
                            className={`bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border-y border-r border-slate-200 dark:border-border-dark ${alert.type === 'red' ? 'border-l-4 border-l-red-500' :
                                alert.type === 'amber' ? 'border-l-4 border-l-amber-500' :
                                    'border-l-4 border-l-primary'
                                }`}
                        >
                            <div className="flex gap-3">
                                <span className={`material-symbols-outlined ${alert.type === 'red' ? 'text-red-500' :
                                    alert.type === 'amber' ? 'text-amber-500' :
                                        'text-primary'
                                    }`}>{alert.icon}</span>
                                <div>
                                    <h4 className="font-bold text-sm">{alert.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
                                    <p className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${alert.type === 'red' ? 'text-red-600' :
                                        alert.type === 'amber' ? 'text-amber-600' :
                                            'text-primary'
                                        }`}>{alert.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Market Insights (Span 4) */}
                <div className="col-span-12 md:col-span-4 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Local Market Prices</h3>
                        <button className="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {marketPrices.map((item, idx) => (
                            <div key={item.id} className={`flex items-center justify-between py-2 ${idx < marketPrices.length - 1 ? 'border-b border-slate-100 dark:border-border-dark' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`size-8 rounded-lg flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        idx === 1 ? 'bg-primary/10 text-primary' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>{item.code}</div>
                                    <div>
                                        <p className="text-sm font-bold">{item.name}</p>
                                        <p className="text-[10px] text-slate-500">{item.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{item.price}</p>
                                    <p className={`text-[10px] font-bold ${item.up === true ? 'text-green-500' : item.up === false ? 'text-red-500' : 'text-slate-400'}`}>{item.change}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Crop Calendar (Span 8) */}
                <div className="col-span-12 md:col-span-8 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold">Monthly Crop Calendar</h3>
                            <p className="text-sm text-slate-500">Schedule for Kharif Season 2024</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-surface-dark-elevated rounded-lg overflow-hidden border border-slate-200 dark:border-border-dark">
                        {/* Calendar Header */}
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="bg-slate-50 dark:bg-surface-dark py-2 text-center text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                        ))}
                        {/* Calendar Days */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(day => (
                            <div
                                key={day}
                                className={`bg-white dark:bg-surface-dark h-24 p-2 relative ${day === 8 ? 'ring-2 ring-primary ring-inset z-10' : ''}`}
                            >
                                <p className={`text-xs font-bold ${day === 8 ? 'text-primary' : 'text-slate-400'}`}>{day}</p>
                                {day === 2 && (
                                    <div className="absolute inset-x-1 top-6 bg-primary/20 text-primary p-1 rounded text-[10px] font-bold leading-tight border border-primary/30">
                                        Nendran Planting
                                    </div>
                                )}
                                {day === 5 && (
                                    <div className="absolute inset-x-1 top-6 bg-sky-100 text-sky-700 p-1 rounded text-[10px] font-bold leading-tight border border-sky-200">
                                        Irrigation Check
                                    </div>
                                )}
                                {day === 8 && (
                                    <div className="mt-1 bg-red-100 text-red-700 p-1 rounded text-[10px] font-black leading-tight border border-red-200 uppercase">
                                        Rain Alert
                                    </div>
                                )}
                                {day === 11 && (
                                    <div className="absolute inset-x-1 top-6 bg-primary/20 text-primary p-1 rounded text-[10px] font-bold leading-tight border border-primary/30">
                                        Fertilizer (DAP)
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
