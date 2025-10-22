## 🎯 Mission

PaisaKamaoo proactively reaches vulnerable Indian internet users through targeted social media advertising, simulating authentic "earn money from home" scam experiences to deliver empathetic, experiential cybersecurity education.

**The Problem:** In just 5 months of 2025, Indians lost ₹7,000+ crore to online scams. Traditional awareness campaigns are passive and ineffective.

**Our Solution:** Active, experiential education that meets users where scammers find them.

---

## 🚀 Setup & Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Analytics Configuration (Optional)
# Replace with your actual Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)
GA_MEASUREMENT_ID=your_google_analytics_measurement_id_here

# Gemini API Key (Required for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Google Analytics Setup

The application supports dynamic Google Analytics configuration:

- **With GA_MEASUREMENT_ID set**: Google Analytics will be loaded and events will be tracked
- **Without GA_MEASUREMENT_ID**: Google Analytics will be disabled, and the app will function normally without tracking

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---
