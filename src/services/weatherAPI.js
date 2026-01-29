
// Open-Meteo does not require an API key for non-commercial use.
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

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

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
function getConditionFromWMOCode(code) {
    if (code <= 1) return 'Sun';
    if (code <= 3) return 'Cloudy';
    if (code <= 48) return 'Cloudy'; // Fog etc
    if (code <= 67) return 'Rain';   // Drizzle, Rain
    if (code <= 77) return 'Rain';   // Snow (treated as precip/rain for basic icon logic)
    if (code <= 82) return 'Rain';   // Showers
    if (code <= 86) return 'Rain';   // Snow showers
    return 'Rain';                   // Thunderstorm etc
}

export async function getWeatherForecast(location = 'Palakkad,IN') {
    try {
        // 1. Geocode the location
        // Handle "City,Country" format by taking just the city part for search reliability
        const cityName = location.split(',')[0].trim();

        const geoResponse = await fetch(`${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);

        if (!geoResponse.ok) throw new Error('Geocoding fetch failed');
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.warn(`Location ${location} not found, using mock data`);
            return MOCK_WEATHER;
        }

        const { latitude, longitude } = geoData.results[0];

        // 2. Fetch Weather Data
        // Request parameters:
        // current: temp, humidity, weathercode, windspeed
        // daily: weathercode, temp_max, temp_min, precip_prob_max
        const weatherResponse = await fetch(
            `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
        );

        if (!weatherResponse.ok) throw new Error('Weather fetch failed');
        const data = await weatherResponse.json();

        // 3. Transform Data
        const current = {
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            condition: getConditionFromWMOCode(data.current.weather_code),
            windSpeed: data.current.wind_speed_10m,
            rainfall: 0 // Current rainfall not directly in basic params, can rely on cond/prob
        };

        const forecast = data.daily.time.map((date, index) => ({
            date: date,
            maxTemp: Math.round(data.daily.temperature_2m_max[index]),
            minTemp: Math.round(data.daily.temperature_2m_min[index]),
            rainProbability: data.daily.precipitation_probability_max[index] || 0,
            condition: getConditionFromWMOCode(data.daily.weather_code[index])
        }));

        return { current, forecast };

    } catch (error) {
        console.error("Error fetching weather:", error);
        return MOCK_WEATHER;
    }
}
