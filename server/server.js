const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

// Load env vars from root directory (parent of server/)
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gemini
const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("⚠️  WARNING: VITE_GEMINI_API_KEY is missing in .env file!");
} else {
    console.log(`✅ API Key loaded successfully (Length: ${API_KEY.length}, Starts with: ${API_KEY.substring(0, 4)}...)`);
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-flash-latest" }) : null;

// Helper for Vision
function fileToGenerativePart(base64Data, mimeType) {
    return {
        inlineData: {
            data: base64Data,
            mimeType
        },
    };
}

// Crop Recommendation Endpoint
app.post('/api/recommendations', async (req, res) => {
    try {
        if (!model) {
            return res.status(503).json({ error: "AI Service Unavailable (Missing Key)" });
        }

        const { season, budget, water, goal } = req.body;
        console.log(`🌱 Generating recommendations for: ${season}, ${budget}, ${water}`);

        const prompt = `You are an expert agricultural advisor for farmers in Kerala, India.

Based on the following farmer profile, recommend the TOP 3 BEST CROPS to grow.

**IMPORTANT:** You must ONLY recommend crops from this approved list:
Rice (Paddy), Coconut, Black Pepper, Turmeric, Tapioca (Cassava), Bitter Gourd, Snake Gourd, Ash Gourd, Pumpkin, Chilli, Amaranthus, Nutmeg, Arecanut, Vanilla, Cocoa, Mango, Jackfruit

**Farmer's Profile:**
- Season: ${season}
- Budget: ${budget}
- Water Availability: ${water}
- Primary Goal: ${goal}

**Requirements:**
1. Focus on crops suitable for Kerala's climate and soil.
2. Consider local market demand.
3. Return ONLY a valid JSON object in this format:
{
    "recommendations": [
        {
            "name": "Exact Name from Approved List",
            "confidence": 92,
            "investment": "₹XX,000 - ₹XX,000/acre",
            "profitMargin": "+XX%",
            "growthCycle": "X-X months",
            "marketDemand": "High/Medium/Low",
            "reasons": ["Reason 1", "Reason 2"]
        }
    ],
    "region": "Recommended Kerala region",
    "tips": ["Tip 1", "Tip 2"]
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Clean JSON
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiResponse = JSON.parse(cleanText);

        res.json(aiResponse);

    } catch (error) {
        console.error("❌ Recommendation Error:", error);
        res.status(500).json({ error: "Failed to generate recommendations", details: error.message });
    }
});

// Chat Advisor Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        if (!model) {
            return res.status(503).json({ error: "AI Service Unavailable (Missing Key)" });
        }

        const { message, context } = req.body;
        console.log(`💬 Processing chat message: ${message.substring(0, 50)}...`);

        // Simple chat prompt setup
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are an expert agricultural advisor for Kerala farmers. Keep answers concise, helpful, and localized." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Namaskaram! I am ready to help you with expert farming advice for Kerala." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("❌ Chat Error:", error);
        if (error.cause) console.error("Caused by:", error.cause);
        res.status(500).json({ error: "Failed to process chat", details: error.message });
    }
});

// Image Analysis Endpoint
app.post('/api/analyze-image', async (req, res) => {
    try {
        if (!model) {
            return res.status(503).json({ error: "AI Service Unavailable (Missing Key)" });
        }

        const { image, mimeType } = req.body;

        const prompt = `
        Act as an expert Plant Pathologist. Analyze this image of a crop.
        1. Identify the crop.
        2. Identify any visible disease, pest, or deficiency. If none, state "Healthy".
        3. Provide a brief treatment or recommendation suitable for Kerala context.
        
        Return ONLY a valid JSON object in this format (no markdown):
        {
            "disease": "Disease Name or Healthy",
            "confidence": 0.95,
            "treatment": "Brief treatment advice..."
        }`;

        const imagePart = fileToGenerativePart(image, mimeType);
        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();

        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiResponse = JSON.parse(cleanText);

        res.json(aiResponse);

    } catch (error) {
        console.error("❌ Vision Error:", error);
        res.status(500).json({ error: "Failed to analyze image", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Secure Backend Server running on http://localhost:${port}`);
    console.log(`📂 Serving API Key from .env (Security: Server-Side Only)`);
});
