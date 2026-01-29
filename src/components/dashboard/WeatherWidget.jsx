import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { getWeatherForecast } from '../../services/weatherAPI';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWeather() {
            const data = await getWeatherForecast();
            setWeather(data);
            setLoading(false);
        }
        loadWeather();
    }, []);

    if (loading) return <div className="animate-pulse h-64 bg-neutral-100 rounded-lg"></div>;
    if (!weather) return <div className="text-danger">Failed to load weather</div>;

    const { current, forecast } = weather;

    const getWeatherIcon = (condition) => {
        if (condition.includes('Rain')) return <CloudRain className="h-8 w-8 text-secondary" />;
        if (condition.includes('Cloud')) return <Cloud className="h-8 w-8 text-neutral-500" />;
        return <Sun className="h-8 w-8 text-warning" />;
    };

    return (
        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-xl p-6 shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-neutral-900">Current Weather in Palakkad</h2>
                    <p className="text-sm text-neutral-500">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {getWeatherIcon(current.condition)}
                    <span className="text-3xl font-bold">{current.temp}°C</span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/60 p-3 rounded-lg flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-secondary" />
                    <div>
                        <p className="text-xs text-neutral-500">Humidity</p>
                        <p className="font-semibold">{current.humidity}%</p>
                    </div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg flex items-center space-x-3">
                    <Wind className="h-5 w-5 text-neutral-500" />
                    <div>
                        <p className="text-xs text-neutral-500">Wind</p>
                        <p className="font-semibold">{current.windSpeed} km/h</p>
                    </div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg flex items-center space-x-3">
                    <CloudRain className="h-5 w-5 text-secondary" />
                    <div>
                        <p className="text-xs text-neutral-500">Rain Prob.</p>
                        <p className="font-semibold">{Math.round(forecast[0]?.rainProbability || 0)}%</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
                <h3 className="text-sm font-medium text-neutral-700 mb-3">7-Day Forecast</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {forecast.map((day, idx) => (
                        <div key={idx} className="flex-shrink-0 text-center p-2 min-w-[80px]">
                            <p className="text-xs text-neutral-500 mb-1">
                                {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                            </p>
                            <div className="my-2 flex justify-center">
                                {getWeatherIcon(day.condition)}
                            </div>
                            <p className="text-sm font-semibold">{Math.round(day.maxTemp)}°</p>
                            <p className="text-xs text-neutral-400">{Math.round(day.minTemp)}°</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
