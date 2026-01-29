import React from 'react';

const Dashboard = () => {
    const weatherForecast = [
        { day: 'MON', icon: 'cloud', temp: '28°' },
        { day: 'TUE', icon: 'cloud', temp: '29°' },
        { day: 'WED', icon: 'sunny', temp: '32°' },
        { day: 'THU', icon: 'sunny', temp: '33°' },
        { day: 'FRI', icon: 'water_drop', temp: '27°' },
        { day: 'SAT', icon: 'rainy', temp: '26°' },
        { day: 'SUN', icon: 'cloud', temp: '30°' },
    ];

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
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Farmer Dashboard</h2>
                    <p className="text-slate-500 flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Kochi, Kerala | <span className="font-medium text-slate-700 dark:text-slate-300">June 2024 (Monsoon Season)</span>
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Refresh Data
                </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Weather Widget (Span 8) */}
                <div className="col-span-12 lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Weather Forecast</h3>
                            <p className="text-sm text-slate-500">7-Day outlook for Kochi agricultural zone</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-3xl font-black text-primary leading-none">32°C</p>
                                <p className="text-sm font-medium text-slate-500">Partly Cloudy</p>
                            </div>
                            <span className="material-symbols-outlined text-5xl text-yellow-500">wb_sunny</span>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="mb-8">
                        <div className="h-24 w-full">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 100">
                                <path d="M0 60 Q 50 20 100 40 T 200 60 T 300 30 T 400 70 T 500 40 T 600 20 T 700 50 T 800 30" fill="none" stroke="#16a249" strokeLinecap="round" strokeWidth="3"></path>
                                <defs>
                                    <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#16a249', stopOpacity: 1 }}></stop>
                                        <stop offset="100%" style={{ stopColor: '#16a249', stopOpacity: 0 }}></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0 60 Q 50 20 100 40 T 200 60 T 300 30 T 400 70 T 500 40 T 600 20 T 700 50 T 800 30 V 100 H 0 Z" fill="url(#grad)" opacity="0.1"></path>
                            </svg>
                        </div>
                        <div className="flex justify-between px-2">
                            {weatherForecast.map((day, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-xs font-bold text-slate-400">{day.day}</p>
                                    <span className={`material-symbols-outlined my-1 ${day.icon === 'sunny' ? 'text-yellow-500' : day.icon === 'rainy' ? 'text-sky-500' : 'text-sky-400'}`}>{day.icon}</span>
                                    <p className="text-sm font-bold">{day.temp}</p>
                                </div>
                            ))}
                        </div>
                    </div>
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
                            className={`bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border-y border-r border-slate-200 dark:border-zinc-800 ${alert.type === 'red' ? 'border-l-4 border-l-red-500' :
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
                <div className="col-span-12 md:col-span-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Local Market Prices</h3>
                        <button className="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {marketPrices.map((item, idx) => (
                            <div key={item.id} className={`flex items-center justify-between py-2 ${idx < marketPrices.length - 1 ? 'border-b border-slate-100 dark:border-zinc-800' : ''}`}>
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
                <div className="col-span-12 md:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
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
                    <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800">
                        {/* Calendar Header */}
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="bg-slate-50 dark:bg-zinc-900 py-2 text-center text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                        ))}
                        {/* Calendar Days */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(day => (
                            <div
                                key={day}
                                className={`bg-white dark:bg-zinc-900 h-24 p-2 relative ${day === 8 ? 'ring-2 ring-primary ring-inset z-10' : ''}`}
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
