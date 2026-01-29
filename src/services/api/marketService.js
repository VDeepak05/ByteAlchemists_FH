// Market Prices Data (will be replaced with Firebase/API later)
import marketData from '../../data/marketPrices.json';

/**
 * Market Service for agricultural price data
 */
class MarketService {
    /**
     * Get all market prices
     * @returns {Promise<Array>} Market prices
     */
    async getMarketPrices() {
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            return marketData;
        } catch (error) {
            console.error('Error fetching market prices:', error);
            throw error;
        }
    }

    /**
     * Get prices by category
     * @param {string} category - Crop category
     * @returns {Promise<Array>} Filtered prices
     */
    async getPricesByCategory(category) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            if (category === 'all') {
                return marketData;
            }
            return marketData.filter((item) => item.category === category);
        } catch (error) {
            console.error('Error filtering market prices:', error);
            throw error;
        }
    }

    /**
     * Search crops by name
     * @param {string} query - Search query
     * @returns {Promise<Array>} Search results
     */
    async searchCrops(query) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const lowerQuery = query.toLowerCase();
            return marketData.filter((item) =>
                item.crop.toLowerCase().includes(lowerQuery)
            );
        } catch (error) {
            console.error('Error searching crops:', error);
            throw error;
        }
    }

    /**
     * Get market sentiment
     * @returns {Promise<Object>} Sentiment data
     */
    async getMarketSentiment() {
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));

            // Calculate sentiment based on price changes
            const bullish = marketData.filter((item) => item.change > 0).length;
            const bearish = marketData.filter((item) => item.change < 0).length;
            const neutral = marketData.filter((item) => item.change === 0).length;

            return {
                bullish,
                bearish,
                neutral,
                totalCrops: marketData.length,
            };
        } catch (error) {
            console.error('Error fetching market sentiment:', error);
            throw error;
        }
    }

    /**
     * Sort prices
     * @param {Array} data - Market data
     * @param {string} sortBy - Sort field (crop, price, change)
     * @param {string} order - Sort order (asc, desc)
     * @returns {Array} Sorted data
     */
    sortPrices(data, sortBy, order = 'asc') {
        const sorted = [...data].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }
}

export default new MarketService();
