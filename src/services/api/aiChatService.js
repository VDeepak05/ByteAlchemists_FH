const API_URL = 'http://localhost:3001/api';

/**
 * Helper to convert File to Base64
 */
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Remove "data:image/jpeg;base64," prefix
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const aiChatService = {
    /**
     * Send text message to Secure Backend
     */
    sendMessage: async (message) => {
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) throw new Error("Backend Chat Error");
            const data = await response.json();
            return data.reply;

        } catch (error) {
            console.error("Chat Error:", error);
            return "Unable to connect to AI Advisor. Please ensure the backend server is running.";
        }
    },

    /**
     * Analyze crop image using Secure Backend
     */
    analyzeImage: async (imageFile) => {
        try {
            const base64Image = await fileToBase64(imageFile);

            const response = await fetch(`${API_URL}/analyze-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64Image,
                    mimeType: imageFile.type
                })
            });

            if (!response.ok) throw new Error("Vision Analysis Error");
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Vision Error:", error);
            return {
                disease: "Connection Failed",
                confidence: 0,
                treatment: "Please check if the local backend server is running."
            };
        }
    }
};

export default aiChatService;
