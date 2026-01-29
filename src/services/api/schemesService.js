// Government Schemes Data
import schemesData from '../../data/schemes.json';

/**
 * Schemes Service for government agricultural schemes
 */
class SchemesService {
    /**
     * Get all schemes
     * @returns {Promise<Array>} All schemes
     */
    async getAllSchemes() {
        try {
            await new Promise((resolve) => setTimeout(resolve, 400));
            return schemesData;
        } catch (error) {
            console.error('Error fetching schemes:', error);
            throw error;
        }
    }

    /**
     * Get schemes by category
     * @param {string} category - Scheme category
     * @returns {Promise<Array>} Filtered schemes
     */
    async getSchemesByCategory(category) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            if (category === 'all') {
                return schemesData;
            }
            return schemesData.filter((scheme) => scheme.category === category);
        } catch (error) {
            console.error('Error filtering schemes:', error);
            throw error;
        }
    }

    /**
     * Search schemes
     * @param {string} query - Search query
     * @returns {Promise<Array>} Search results
     */
    async searchSchemes(query) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const lowerQuery = query.toLowerCase();

            return schemesData.filter((scheme) => {
                return (
                    scheme.title.toLowerCase().includes(lowerQuery) ||
                    scheme.description.toLowerCase().includes(lowerQuery) ||
                    scheme.category.toLowerCase().includes(lowerQuery)
                );
            });
        } catch (error) {
            console.error('Error searching schemes:', error);
            throw error;
        }
    }

    /**
     * Get scheme by ID
     * @param {string} id - Scheme ID
     * @returns {Promise<Object>} Scheme details
     */
    async getSchemeById(id) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 200));
            const scheme = schemesData.find((s) => s.id === id);
            if (!scheme) {
                throw new Error('Scheme not found');
            }
            return scheme;
        } catch (error) {
            console.error('Error fetching scheme details:', error);
            throw error;
        }
    }

    /**
     * Filter schemes by eligibility
     * @param {Object} userProfile - User farm profile
     * @returns {Promise<Array>} Eligible schemes
     */
    async getEligibleSchemes(userProfile) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 400));

            // Simple eligibility matching based on land size
            return schemesData.filter((scheme) => {
                if (!scheme.eligibility || scheme.eligibility.length === 0) {
                    return true;
                }

                // Check if user matches any eligibility criteria
                const landSize = userProfile.landSize || 0;

                if (landSize < 2 && scheme.eligibility.includes('Small farmers')) {
                    return true;
                }
                if (landSize >= 2 && landSize < 5 && scheme.eligibility.includes('Marginal farmers')) {
                    return true;
                }
                if (scheme.eligibility.includes('All farmers')) {
                    return true;
                }

                return false;
            });
        } catch (error) {
            console.error('Error filtering eligible schemes:', error);
            throw error;
        }
    }
}

export default new SchemesService();
