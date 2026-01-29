const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const MOCK_WEATHER = {
    current: {
        temp: 28,
        humidity: 75,
        condition: "Partly Cloudy",
        windSpeed: 12,
        rainfall: 0
    },
    forecast: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        maxTemp: 32 - Math.random() * 5,
        minTemp: 24 + Math.random() * 2,
        rainProbability: Math.random() * 100,
        condition: Math.random() > 0.5 ? 'Rain' : 'Cloudy'
    }))
};

export async function getWeatherForecast(location = 'Palakkad,IN') {
    if (!API_KEY) {
        console.warn("No API Key found, using mock data");
        return MOCK_WEATHER;
    }

    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Weather fetch failed');

        const data = await response.json();

        // Process API data to match our component needs
        // OpenWeather 5-day/3-hour forecast needs aggregation
        // For MVP/Demo, using mock is safer if API key is missing, 
        // but here implies we try real then fallback.
        // Simplifying for now to just return mock if complex parsing is needed,
        // but let's do a basic parse if successful.

        const current = {
            temp: Math.round(data.list[0].main.temp),
            humidity: data.list[0].main.humidity,
            condition: data.list[0].weather[0].main,
            windSpeed: data.list[0].wind.speed,
            rainfall: data.list[0].rain ? data.list[0].rain['3h'] : 0
        };

        // Simple daily aggregation (taking noon values ~ index 4, 12, 20...)
        const forecast = [];
        for (let i = 0; i < data.list.length; i += 8) {
            const day = data.list[i];
            forecast.push({
                date: day.dt_txt.split(' ')[0],
                maxTemp: Math.round(day.main.temp_max),
                minTemp: Math.round(day.main.temp_min),
                rainProbability: day.pop * 100,
                condition: day.weather[0].main
            });
        }

        return { current, forecast };

    } catch (error) {
        console.error("Error fetching weather:", error);
        return MOCK_WEATHER;
    }
}
