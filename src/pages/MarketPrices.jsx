import React, { useState, useEffect } from 'react';

const basePrices = {
    "Black Pepper": 640,
    "Cardamom": 1250,
    "Rubber (RSS 4)": 185.5,
    "Coconut (Dry)": 35.2,
    "Tapioca": 28,
};

const marketLocations = {
    "Black Pepper": "Kochi APMC",
    "Cardamom": "Idukki Market",
    "Rubber (RSS 4)": "Kottayam",
    "Coconut (Dry)": "Kozhikode",
    "Tapioca": "Trivandrum APMC"
};

const cropIcons = {
    "Black Pepper": "eco",
    "Cardamom": "grain",
    "Rubber (RSS 4)": "layers",
    "Coconut (Dry)": "circle_notifications",
    "Tapioca": "restaurant"
};

const MarketPrices = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const newPrices = Object.entries(basePrices).map(([name, base], index) => {
            const variation = (Math.random() - 0.5) * 0.1;
            const current = Math.round((base * (1 + variation)) * 100) / 100;
            const change = ((current - base) / base) * 100;

            return {
                id: index,
                name,
                current,
                base,
                change,
                trend: change > 1 ? 'up' : change < -1 ? 'down' : 'stable',
                location: marketLocations[name],
                icon: cropIcons[name]
            };
        });

        setPrices(newPrices);
    }, []);

    const getAdvice = (price) => {
        if (price.trend === 'up' && price.change > 3) return { text: 'Sell Now', primary: true };
        if (price.trend === 'down') return { text: 'Hold', primary: false };
        return { text: 'Wait', primary: false };
    };

    return (
        <div className="flex flex-1 max-w-7xl mx-auto w-full gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
                <div className="bg-white dark:bg-[#1a2e22] rounded-xl p-4 shadow-sm border border-[#e8f3ec] dark:border-[#1e3226]">
                    <div className="mb-4">
                        <h3 className="text-xs font-bold text-[#50956a] uppercase tracking-wider">Market Intel</h3>
                        <p className="text-lg font-bold">Kerala Markets</p>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e8f3ec] dark:hover:bg-[#253d2e] transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[#50956a] group-hover:text-primary">dashboard</span>
                            <span className="text-sm font-medium">Overview</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20" href="#">
                            <span className="material-symbols-outlined">payments</span>
                            <span className="text-sm font-bold">Live Prices</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e8f3ec] dark:hover:bg-[#253d2e] transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[#50956a] group-hover:text-primary">trending_up</span>
                            <span className="text-sm font-medium">Trends</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e8f3ec] dark:hover:bg-[#253d2e] transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[#50956a] group-hover:text-primary">notifications_active</span>
                            <span className="text-sm font-medium">Price Alerts</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e8f3ec] dark:hover:bg-[#253d2e] transition-colors group" href="#">
                            <span className="material-symbols-outlined text-[#50956a] group-hover:text-primary">map</span>
                            <span className="text-sm font-medium">Market Map</span>
                        </a>
                    </nav>
                    <button className="w-full mt-6 bg-primary text-white py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span> Add Watchlist
                    </button>
                </div>

                {/* Coming Soon Alert Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#16a249] to-[#0d6b30] rounded-xl p-6 text-white shadow-lg">
                    <div className="relative z-10">
                        <span className="inline-block px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest mb-3">Coming Soon</span>
                        <h4 className="text-lg font-bold leading-tight mb-2">Automated Price Alerts</h4>
                        <p className="text-xs text-white/80 leading-relaxed mb-4">Get instant WhatsApp notifications when your crops hit your target selling price.</p>
                        <button className="w-full bg-white text-primary py-2 rounded-lg font-bold text-xs hover:bg-gray-100 transition-colors">Notify Me</button>
                    </div>
                    <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/10">notifications</span>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col gap-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm">
                    <a className="text-[#50956a] hover:text-primary" href="#">Home</a>
                    <span className="material-symbols-outlined text-sm text-[#50956a]">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Market Price Intelligence</span>
                </nav>

                {/* Page Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Market Price Intelligence</h1>
                        <p className="text-[#50956a] dark:text-gray-400">Real-time wholesale prices across major Kerala agricultural markets. <span className="text-xs ml-2 italic opacity-75">Last updated: {new Date().toLocaleTimeString()}</span></p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#e8f3ec] dark:bg-[#1a2e22] text-slate-900 dark:text-white rounded-lg font-bold text-sm hover:bg-[#d1e6d8] transition-colors">
                            <span className="material-symbols-outlined text-sm">download</span> Export CSV
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined text-sm">refresh</span> Refresh
                        </button>
                    </div>
                </div>

                {/* Stats/Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-[#1a2e22] p-4 rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-xs text-[#50956a] font-bold uppercase tracking-wider">Top Gainer</p>
                            <p className="text-lg font-bold">Black Pepper</p>
                        </div>
                        <div className="text-primary flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined">trending_up</span> +5.2%
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a2e22] p-4 rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-xs text-[#50956a] font-bold uppercase tracking-wider">Total Crops Tracked</p>
                            <p className="text-lg font-bold">42 Commodities</p>
                        </div>
                        <span className="material-symbols-outlined text-[#50956a]">inventory_2</span>
                    </div>
                    <div className="bg-white dark:bg-[#1a2e22] p-4 rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-xs text-[#50956a] font-bold uppercase tracking-wider">Market Sentiment</p>
                            <p className="text-lg font-bold">Bullish (Strong)</p>
                        </div>
                        <span className="material-symbols-outlined text-primary">auto_graph</span>
                    </div>
                </div>

                {/* Market Data Table */}
                <div className="bg-white dark:bg-[#1a2e22] rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fbf9] dark:bg-[#13251a]">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a]">Crop Name</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a]">Current Price (₹/kg)</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a]">7-Day Trend</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a]">Best Time to Sell</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a]">Market Location</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#50956a] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8f3ec] dark:divide-[#1e3226]">
                                {prices.map((price) => {
                                    const advice = getAdvice(price);
                                    return (
                                        <tr key={price.id} className="hover:bg-[#f8fbf9] dark:hover:bg-[#16291e] transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-lg bg-gray-100 dark:bg-[#253d2e] flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined">{price.icon}</span>
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white">{price.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-lg font-black text-primary">₹{price.current.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`flex items-center gap-1 font-bold px-2 py-1 rounded w-fit ${price.trend === 'up' ? 'text-primary bg-primary/10' :
                                                        price.trend === 'down' ? 'text-red-500 bg-red-50 dark:bg-red-900/20' :
                                                            'text-gray-500 bg-gray-100 dark:bg-gray-800'
                                                    }`}>
                                                    <span className="material-symbols-outlined text-sm">
                                                        {price.trend === 'up' ? 'trending_up' : price.trend === 'down' ? 'trending_down' : 'remove'}
                                                    </span>
                                                    <span className="text-sm">{Math.abs(price.change).toFixed(1)}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${advice.primary ? 'bg-primary text-white' : 'bg-[#e8f3ec] text-slate-900 border border-primary/20'
                                                    }`}>
                                                    <span className={`size-1.5 rounded-full mr-2 ${advice.primary ? 'bg-white' : 'bg-[#50956a]'}`}></span>
                                                    {advice.text}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#50956a]">{price.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-primary text-sm font-bold hover:underline">View History</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-[#f8fbf9] dark:bg-[#13251a] border-t border-[#e8f3ec] dark:border-[#1e3226] flex items-center justify-between">
                        <p className="text-xs text-[#50956a]">Showing 1-5 of 42 crops</p>
                        <div className="flex gap-2">
                            <button className="size-8 rounded border border-[#d1e6d8] dark:border-[#1e3226] flex items-center justify-center text-[#50956a] hover:bg-white dark:hover:bg-[#253d2e]">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="size-8 rounded bg-primary text-white flex items-center justify-center text-xs font-bold">1</button>
                            <button className="size-8 rounded border border-[#d1e6d8] dark:border-[#1e3226] flex items-center justify-center text-[#50956a] hover:bg-white dark:hover:bg-[#253d2e] text-xs font-bold">2</button>
                            <button className="size-8 rounded border border-[#d1e6d8] dark:border-[#1e3226] flex items-center justify-center text-[#50956a] hover:bg-white dark:hover:bg-[#253d2e] text-xs font-bold">3</button>
                            <button className="size-8 rounded border border-[#d1e6d8] dark:border-[#1e3226] flex items-center justify-center text-[#50956a] hover:bg-white dark:hover:bg-[#253d2e]">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Help Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#1a2e22] p-6 rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">lightbulb</span>
                            <h4 className="font-bold">Pro-Tip for Sell Timing</h4>
                        </div>
                        <p className="text-sm text-[#50956a] leading-relaxed">Prices in the <span className="font-bold text-slate-900 dark:text-white">Kochi market</span> typically peak between Tuesday and Thursday. Consider harvesting on weekends for early-week market distribution.</p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2e22] p-6 rounded-xl border border-[#e8f3ec] dark:border-[#1e3226] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary">cloud_sync</span>
                            <h4 className="font-bold">Sync with Weather</h4>
                        </div>
                        <p className="text-sm text-[#50956a] leading-relaxed">Upcoming monsoon in North Kerala may affect spice supply next week. Current trends suggest a <span className="font-bold text-slate-900 dark:text-white">10-15% price spike</span> for Cardamom. Plan accordingly.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketPrices;
