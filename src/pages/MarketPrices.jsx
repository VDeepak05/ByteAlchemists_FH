import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';

const basePrices = {
    "Rice": 30,
    "Coconut": 25,
    "Banana": 15,
    "Rubber": 150,
    "Black Pepper": 500,
    "Turmeric": 80,
    "Ginger": 70,
    "Tapioca": 18,
    "Vegetables": 25,
    "Cardamom": 1500,
    "Arecanut": 300,
    "Pineapple": 20
};

const MarketPrices = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        // Generate mocked price data with randomization
        const newPrices = Object.entries(basePrices).map(([name, base], index) => {
            // Random variation +/- 15%
            const variation = (Math.random() - 0.5) * 0.3;
            const current = Math.round(base * (1 + variation));

            // Trend calculation relative to base
            const change = ((current - base) / base) * 100;

            return {
                id: index,
                name,
                current,
                base,
                change,
                trend: change > 1 ? 'up' : change < -1 ? 'down' : 'stable'
            };
        });

        setPrices(newPrices);
    }, []);

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-green-500" />;
        if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-neutral-400" />;
    };

    const getAdvice = (price) => {
        if (price.current >= price.base * 1.1) return { text: "Sell Now", color: "bg-green-100 text-green-700" };
        if (price.current <= price.base * 0.9) return { text: "Hold", color: "bg-red-100 text-red-700" };
        return { text: "Wait", color: "bg-yellow-100 text-yellow-700" };
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Market Price Tracker</h1>
                    <p className="text-neutral-600">Real-time prices from Palakkad Mandi</p>
                </div>
                <div className="text-xs text-neutral-500 bg-white px-3 py-1 rounded-full border border-neutral-200">
                    Last Updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Crop</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Current Price (₹/kg)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Trend (7d)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                            {prices.map((price) => {
                                const advice = getAdvice(price);
                                return (
                                    <tr key={price.id} className="hover:bg-neutral-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{price.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">₹{price.current}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                {getTrendIcon(price.trend)}
                                                <span className={`ml-1 font-medium ${price.trend === 'up' ? 'text-green-600' : price.trend === 'down' ? 'text-red-600' : 'text-neutral-500'}`}>
                                                    {Math.abs(price.change).toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${advice.color}`}>
                                                {advice.text}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            Market tip: Black Pepper prices effectively spiked by 12% across Kerala due to supply shortages.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPrices;
