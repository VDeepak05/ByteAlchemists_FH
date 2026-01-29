import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Weather Service for OpenWeatherMap API integration
 */
class WeatherService {
    /**
     * Get current weather for a location
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeather(lat, lon) {
        try {
            const response = await axios.get(`${WEATHER_API_URL}/weather`, {
                params: {
                    lat,
                    lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric', // Celsius
                },
            });

            return this.formatCurrentWeather(response.data);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    }

    /**
     * Search for locations by name
     * @param {string} query - City name query
     * @returns {Promise<Array>} List of matching locations
     */
    async searchLocations(query) {
        if (!query || query.length < 3) return [];

        try {
            // Using OSM Nominatim for better coverage (villages, towns) without API key
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5,
                    countrycodes: 'in'
                }
            });

            // Transform OSM format to our app format
            return response.data.map(item => ({
                name: item.name || item.display_name.split(',')[0],
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon),
                state: item.address.state || item.address.district || '',
                country: item.address.country || 'India',
                displayName: item.display_name
            }));
        } catch (error) {
            console.error('Error searching locations:', error);
            return [];
        }
    }

    /**
     * Get weather forecast for next 5 days
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<Array>} Forecast data
     */
    async getWeatherForecast(lat, lon) {
        try {
            const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
                params: {
                    lat,
                    lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric',
                    cnt: 40, // 5 days, 8 forecasts per day
                },
            });

            return this.formatForecast(response.data);
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            throw error;
        }
    }

    /**
     * Format current weather response
     */
    formatCurrentWeather(data) {
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            condition: data.weather[0].main.toLowerCase(),
            location: data.name,
            uvi: data.uvi || 0,
            precipitation: data.rain?.['1h'] || 0,
        };
    }

    /**
     * Format forecast data to daily forecasts
     */
    formatForecast(data) {
        const dailyData = {};

        data.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateKey = date.toISOString().split('T')[0];

            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    day,
                    date: dateKey,
                    temp: item.main.temp,
                    tempMin: item.main.temp_min,
                    tempMax: item.main.temp_max,
                    condition: item.weather[0].main.toLowerCase(),
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    precipitation: item.pop * 100, // Probability of precipitation
                };
            } else {
                // Update min/max temps
                dailyData[dateKey].tempMin = Math.min(dailyData[dateKey].tempMin, item.main.temp_min);
                dailyData[dateKey].tempMax = Math.max(dailyData[dateKey].tempMax, item.main.temp_max);
            }
        });

        return Object.values(dailyData).slice(0, 5).map((day) => ({
            ...day,
            temp: Math.round(day.temp),
            tempMin: Math.round(day.tempMin),
            tempMax: Math.round(day.tempMax),
        }));
    }
}

export default new WeatherService();
