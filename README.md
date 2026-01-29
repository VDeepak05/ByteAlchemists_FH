# 🌾 KrishiSahaya - AI-Powered Agricultural Assistant

> *Empowering Kerala Farmers with Smart Agriculture Technology*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Overview

**KrishiSahaya** (Sanskrit: कृषि सहाय - "Agriculture Helper") is a comprehensive web application designed to assist farmers in Kerala with data-driven agricultural decisions. Built for the hackathon, it combines modern web technologies with AI/ML to provide real-time crop recommendations, disease diagnosis, market prices, and government scheme information.

### 🎯 Key Features

#### 1. 🤖 AI Advisor (Primary Feature)
- **Image-Based Disease Detection** 
  - Upload crop photos for instant AI-powered disease identification
  - Uses Hugging Face's pre-trained plant disease detection model
  - Detects 38+ plant diseases with 70-95% accuracy
  - Returns confidence scores and treatment recommendations
  
- **Symptom-Based Diagnosis**
  - Manual symptom selection for areas with poor connectivity
  - Rule-based scoring algorithm
  - 12 common Kerala crop diseases covered
  - Environmental factor matching (season, weather)

- **Treatment Recommendations**
  - Organic treatment options
  - Chemical pesticide recommendations
  - Prevention strategies
  - Disease-resistant crop variety suggestions

#### 2. 🌱 Crop Recommendation System
- Personalized crop suggestions based on:
  - Season (Kharif/Rabi/Summer)
  - Budget constraints
  - Water availability
  - Farming goals (Income/Sustainability/Export)
- Kerala-specific crop database (30+ crops)
- Profitability scoring algorithm

#### 3. 💰 Market Price Tracking
- Real-time agricultural commodity prices
- Kerala market integration
- Price trend visualization
- Commodity search and filtering

#### 4. 🏛️ Government Schemes Dashboard
- Centralized access to agricultural schemes
- Subsidy information
- Eligibility criteria
- Application links

#### 5. 📊 Analytics Dashboard
- Farm performance metrics
- Crop yield tracking
- Revenue analysis
- Visual charts and graphs

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 7.3.1** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.1.1** - Client-side routing
- **Lucide React 0.468.0** - Icon library
- **Recharts 2.15.0** - Charting library

### Backend & Services
- **Firebase Authentication** - User management
- **Hugging Face Inference API** - AI-powered disease detection
- **OpenWeather API** - Weather data for crop recommendations

### AI/ML Models
- **MobileNetV2** - Fine-tuned on PlantVillage dataset (linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification)
- **Rule-Based Engine** - Custom scoring algorithms for symptoms and crops

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- OpenWeather API key (optional)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/VDeepak05/ByteAlchemists_FH.git
cd ByteAlchemists_FH
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# OpenWeather API (Optional)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

5. **Build for production**
```bash
npm run build
```

## 🎨 Project Structure

```
ByteAlchemists_FH/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── advisor/        # AI Advisor components
│   │   │   ├── DiseasePrediction.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   └── CropRecommendationTab.jsx
│   │   ├── dashboard/      # Dashboard widgets
│   │   ├── layout/         # Layout components (Sidebar, Header)
│   │   └── common/         # Shared components
│   │
│   ├── context/            # React Context (Auth, Theme)
│   │   └── AuthContext.jsx
│   │
│   ├── data/               # Static data files
│   │   ├── crops.json      # Crop database (30+ crops)
│   │   └── diseases.json   # Disease database (12 diseases)
│   │
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── AIAdvisor.jsx
│   │   ├── MarketPrices.jsx
│   │   ├── GovSchemes.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/           # API and business logic
│   │   ├── cropEngine.js   # Crop recommendation logic
│   │   ├── diseaseEngine.js # Disease prediction logic
│   │   └── imageAPI.js     # Hugging Face API integration
│   │
│   ├── utils/              # Utility functions
│   │   ├── scoreCalculator.js        # Crop scoring
│   │   └── diseaseScoreCalculator.js # Disease scoring
│   │
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
│
├── public/                 # Static assets
├── .env                    # Environment variables (not committed)
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Vite Proxy (for Development)

The app uses Vite's proxy to bypass CORS restrictions when calling the Hugging Face API:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api/huggingface': {
        target: 'https://api-inference.huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/huggingface/, '')
      }
    }
  }
})
```

### Tailwind Dark Mode

Dark mode is configured in `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  // ...
}
```

## 🧪 Testing the Image Upload Feature

### Using Sample Images

1. Navigate to "AI Advisor" → "Disease Diagnosis"
2. Ensure "Image Upload" mode is selected (default)
3. Upload a plant disease image:
   - **Drag & drop** an image
   - Or **click** to browse
4. Click "Analyze with AI"
5. Wait 2-5 seconds for results (first request may take 20 seconds as model loads)

### Sample Image Sources

- **Google Images**: Search "rice blast disease", "tomato late blight"
- **PlantVillage Dataset**: https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset
- **Your own photos**: Take clear photos of affected crop leaves

### Expected Results

- Disease name (e.g., "Late Blight")
- Affected crop (e.g., "Tomato")
- Confidence score (60-95%)
- Treatment recommendations
- Resistant crop varieties

## 📱 Usage Guide

### For Farmers

1. **Getting Started**
   - Register with email/password
   - Complete profile setup
   - Navigate using the sidebar

2. **Diagnosing Diseases**
   - Go to "AI Advisor" → "Disease Diagnosis"
   - **Option 1**: Upload a photo of the affected plant
   - **Option 2**: Select symptoms manually
   - View treatment recommendations

3. **Finding the Right Crop**
   - Go to "AI Advisor" → "Crop Recommendation"
   - Enter your season, budget, water availability, and goals
   - Get top 3 crop suggestions with profitability scores

4. **Checking Market Prices**
   - Navigate to "Market Prices"
   - Search for your commodity
   - View current rates

5. **Exploring Government Schemes**
   - Go to "Government Schemes"
   - Filter by category
   - Check eligibility and apply

### For Developers

1. **Adding New Diseases**
   - Edit `src/data/diseases.json`
   - Follow the existing schema:
   ```json
   {
     "id": 13,
     "name": "Your Disease",
     "affectedCrops": ["Crop Name"],
     "severity": "High/Medium/Low",
     "symptoms": ["symptom1", "symptom2"],
     "treatments": {
       "organic": ["treatment1"],
       "chemical": ["treatment2"],
       "prevention": ["prevention1"]
     },
     "resistantVarieties": ["Variety1", "Variety2"]
   }
   ```

2. **Adding New Crops**
   - Edit `src/data/crops.json`
   - Include all required fields (name, season, budget, water, etc.)

3. **Customizing the Scoring Algorithm**
   - Modify `src/utils/scoreCalculator.js` for crops
   - Modify `src/utils/diseaseScoreCalculator.js` for diseases

## 🌐 API Integration

### Hugging Face Inference API

**Endpoint**: `/api/huggingface/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`

**Method**: POST

**Body**: Raw image file (JPEG/PNG/WebP)

**Response**:
```json
[
  {
    "label": "Tomato___Late_blight",
    "score": 0.95
  }
]
```

**Rate Limit**: ~30 requests/minute (free tier)

### Firebase Authentication

Used for user registration and login. Configure in `.env` file.

### OpenWeather API (Optional)

For enhanced weather-based crop recommendations. Add API key to `.env`.

## 🎯 Hackathon Highlights

### Innovation
- **AI-powered disease detection** from images (no expensive hardware needed)
- **Dual-mode diagnosis** (image + symptom-based) for reliability
- **Kerala-specific** crop and disease databases

### Impact
- Helps farmers make **data-driven decisions**
- **Reduces crop loss** through early disease detection
- **Increases profitability** with smart crop recommendations
- **Democratizes agricultural knowledge**

### Technical Excellence
- **Modern React architecture** with hooks and context
- **Responsive design** (mobile-first approach)
- **Dark mode support** for better UX
- **API integration** (Hugging Face, Firebase)
- **Performance optimized** with Vite

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Failed to analyze image" error

**Solutions**:
1. Check internet connection
2. Wait 20 seconds (model loading) and retry
3. Ensure image is JPEG/PNG format and <10MB
4. Restart dev server: `Ctrl+C` → `npm run dev`

**Issue**: CORS errors in console

**Solution**: Make sure Vite dev server is running (proxy handles CORS)

**Issue**: Firebase auth not working

**Solution**: Verify `.env` file has correct Firebase credentials

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team ByteAlchemists

- **Deepak V** - [@VDeepak05](https://github.com/VDeepak05)
- [Add team members]

## 🙏 Acknowledgments

- **Hugging Face** for free AI model hosting
- **PlantVillage Dataset** for disease image training data
- **Kerala Agricultural Department** for crop and market data
- **Firebase** for authentication services

## 📞 Contact

For questions or support:
- GitHub Issues: [Create an issue](https://github.com/VDeepak05/ByteAlchemists_FH/issues)
- Email: [Add email]

---

<div align="center">

**Built with ❤️ for Kerala Farmers**

Made for Hackathon 2026 🚀

</div>
