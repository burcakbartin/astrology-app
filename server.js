// Main server file for our astrology app
// This sets up an Express server that serves our frontend and handles API requests

const express = require('express');
const axios = require('axios'); // For making HTTP requests to external APIs
const cors = require('cors'); // Allows cross-origin requests
const path = require('path');

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files from 'public' directory

// All zodiac signs that the Aztro API supports
const ZODIAC_SIGNS = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

// Route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the tarot page
app.get('/tarot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tarot.html'));
});

// Backup horoscope data (in case API is down)
const BACKUP_HOROSCOPES = {
    aries: {
        description: "Today brings exciting new opportunities your way. Your natural leadership qualities will shine as you take charge of a challenging situation. Trust your instincts and don't be afraid to take calculated risks.",
        mood: "Energetic",
        color: "Red",
        lucky_number: "7",
        lucky_time: "2pm to 3pm",
        compatibility: "Leo"
    },
    taurus: {
        description: "Focus on practical matters today. Your steady approach will help you make significant progress on long-term goals. A financial opportunity may present itself - consider it carefully.",
        mood: "Stable",
        color: "Green",
        lucky_number: "4",
        lucky_time: "6pm to 7pm",
        compatibility: "Virgo"
    },
    gemini: {
        description: "Communication is key today. Expect interesting conversations that could lead to new connections. Your curiosity will be rewarded with valuable insights.",
        mood: "Curious",
        color: "Yellow",
        lucky_number: "3",
        lucky_time: "10am to 11am",
        compatibility: "Aquarius"
    },
    cancer: {
        description: "Your intuitive nature serves you well today. Home and family matters take priority. Trust your emotional intelligence when making important decisions.",
        mood: "Nurturing",
        color: "Silver",
        lucky_number: "2",
        lucky_time: "8pm to 9pm",
        compatibility: "Scorpio"
    },
    leo: {
        description: "Step into the spotlight today! Your creativity and confidence will attract positive attention. It's a great day for presentations or sharing your ideas.",
        mood: "Confident",
        color: "Gold",
        lucky_number: "1",
        lucky_time: "12pm to 1pm",
        compatibility: "Sagittarius"
    },
    virgo: {
        description: "Attention to detail pays off today. Your analytical skills help you solve a complex problem. Organization and planning will lead to success.",
        mood: "Focused",
        color: "Navy Blue",
        lucky_number: "6",
        lucky_time: "9am to 10am",
        compatibility: "Capricorn"
    },
    libra: {
        description: "Balance and harmony are important today. You may need to mediate between conflicting parties. Your diplomatic skills will be highly valued.",
        mood: "Harmonious",
        color: "Pink",
        lucky_number: "9",
        lucky_time: "4pm to 5pm",
        compatibility: "Gemini"
    },
    scorpio: {
        description: "Deep insights come to you today. Trust your intuition about people and situations. A mystery or hidden truth may be revealed.",
        mood: "Intense",
        color: "Deep Purple",
        lucky_number: "8",
        lucky_time: "11pm to 12am",
        compatibility: "Pisces"
    },
    sagittarius: {
        description: "Adventure calls to you today! Your optimistic outlook inspires others. Consider planning a journey or learning something new.",
        mood: "Adventurous",
        color: "Orange",
        lucky_number: "9",
        lucky_time: "3pm to 4pm",
        compatibility: "Aries"
    },
    capricorn: {
        description: "Your hard work is about to pay off. Stay focused on your long-term goals. A mentor or authority figure may offer valuable advice.",
        mood: "Determined",
        color: "Brown",
        lucky_number: "10",
        lucky_time: "7am to 8am",
        compatibility: "Taurus"
    },
    aquarius: {
        description: "Innovation and originality are your strengths today. Think outside the box and don't be afraid to challenge conventional wisdom.",
        mood: "Innovative",
        color: "Electric Blue",
        lucky_number: "11",
        lucky_time: "1pm to 2pm",
        compatibility: "Libra"
    },
    pisces: {
        description: "Your compassionate nature draws people to you today. Creative projects flow easily. Pay attention to your dreams - they may contain important messages.",
        mood: "Dreamy",
        color: "Sea Green",
        lucky_number: "12",
        lucky_time: "5pm to 6pm",
        compatibility: "Cancer"
    }
};

// Tarot cards database with meanings for fortune telling
const TAROT_CARDS = [
    {
        id: 1,
        name: "The Fool",
        meaning: "New beginnings, spontaneity, innocence. A fresh start awaits you. Trust your instincts and take a leap of faith.",
        reversed_meaning: "Recklessness, taken advantage of, inconsideration. Be cautious of impulsive decisions.",
        suit: "Major Arcana",
        element: "Air"
    },
    {
        id: 2,
        name: "The Magician",
        meaning: "Manifestation, resourcefulness, power. You have the tools to achieve your goals. Focus your energy and make it happen.",
        reversed_meaning: "Manipulation, poor planning, latent talents. Your potential is blocked by self-doubt.",
        suit: "Major Arcana",
        element: "Air"
    },
    {
        id: 3,
        name: "The High Priestess",
        meaning: "Intuition, sacred knowledge, divine feminine. Trust your inner wisdom. Secrets may be revealed.",
        reversed_meaning: "Secrets, disconnected from intuition, withdrawal. You're ignoring your inner voice.",
        suit: "Major Arcana",
        element: "Water"
    },
    {
        id: 4,
        name: "The Emperor",
        meaning: "Authority, establishment, structure. Take control of your situation. Leadership is required.",
        reversed_meaning: "Domination, excessive control, rigidity. Beware of being too controlling.",
        suit: "Major Arcana",
        element: "Fire"
    },
    {
        id: 5,
        name: "The Hierophant",
        meaning: "Spiritual wisdom, conformity, tradition. Seek guidance from a mentor or spiritual teacher.",
        reversed_meaning: "Personal beliefs, freedom, challenging the status quo. Break free from limiting traditions.",
        suit: "Major Arcana",
        element: "Earth"
    },
    {
        id: 6,
        name: "The Lovers",
        meaning: "Love, harmony, relationships. Important relationship decisions await. Follow your heart.",
        reversed_meaning: "Self-love, disharmony, imbalance. Relationship struggles or self-worth issues.",
        suit: "Major Arcana",
        element: "Air"
    },
    {
        id: 7,
        name: "The Chariot",
        meaning: "Control, willpower, victory. Success through determination. You're in the driver's seat.",
        reversed_meaning: "Lack of control, lack of direction, aggression. You're struggling to maintain direction.",
        suit: "Major Arcana",
        element: "Water"
    },
    {
        id: 8,
        name: "Justice",
        meaning: "Justice, fairness, truth. Balance will be restored. Legal matters may be resolved favorably.",
        reversed_meaning: "Unfairness, lack of accountability, dishonesty. Justice delayed or denied.",
        suit: "Major Arcana",
        element: "Air"
    },
    {
        id: 9,
        name: "The Hermit",
        meaning: "Soul searching, introspection, inner guidance. Time for self-reflection and seeking wisdom within.",
        reversed_meaning: "Isolation, loneliness, withdrawal. You're avoiding necessary inner work.",
        suit: "Major Arcana",
        element: "Earth"
    },
    {
        id: 10,
        name: "Wheel of Fortune",
        meaning: "Good luck, karma, life cycles. A turn of fortune is coming. Embrace change.",
        reversed_meaning: "Bad luck, lack of control, clinging to control. Resist fighting inevitable changes.",
        suit: "Major Arcana",
        element: "Fire"
    },
    {
        id: 11,
        name: "Strength",
        meaning: "Strength, courage, patience. You have the inner strength to overcome challenges. Stay gentle but firm.",
        reversed_meaning: "Self-doubt, lack of confidence, raw emotion. Work on building your inner confidence.",
        suit: "Major Arcana",
        element: "Fire"
    },
    {
        id: 12,
        name: "The Hanged Man",
        meaning: "Suspension, restriction, letting go. Sometimes you must wait and surrender control. New perspective needed.",
        reversed_meaning: "Delays, resistance, stalling. You're fighting against necessary changes.",
        suit: "Major Arcana",
        element: "Water"
    }
];

// API route to get horoscope for a specific zodiac sign
// Example: GET /api/horoscope/aries
app.get('/api/horoscope/:sign', async (req, res) => {
    try {
        const { sign } = req.params; // Extract zodiac sign from URL parameter
        
        // Validate that the provided sign is valid
        if (!ZODIAC_SIGNS.includes(sign.toLowerCase())) {
            return res.status(400).json({ 
                error: 'Invalid zodiac sign',
                validSigns: ZODIAC_SIGNS 
            });
        }

        let horoscopeData = null;

        // First, try to get data from Aztro API
        try {
            console.log(`Attempting to fetch horoscope for ${sign} from Aztro API...`);
            
            // Create URL-encoded form data
            const formData = new URLSearchParams();
            formData.append('sign', sign.toLowerCase());
            formData.append('day', 'today');

            const response = await axios.post('https://aztro.sameerkumar.website/', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 5000 // 5 second timeout
            });

            horoscopeData = response.data;
            console.log('Successfully fetched from Aztro API');

        } catch (apiError) {
            console.log('Aztro API failed:', apiError.message);
            console.log('Using backup horoscope data...');
            
            // Use backup data if API fails
            const backupData = BACKUP_HOROSCOPES[sign.toLowerCase()];
            horoscopeData = {
                current_date: new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                description: backupData.description,
                mood: backupData.mood,
                color: backupData.color,
                lucky_number: backupData.lucky_number,
                lucky_time: backupData.lucky_time,
                compatibility: backupData.compatibility
            };
        }

        // Send formatted response back to frontend
        res.json({
            success: true,
            sign: sign.toLowerCase(),
            date: horoscopeData.current_date,
            horoscope: horoscopeData.description,
            mood: horoscopeData.mood,
            color: horoscopeData.color,
            luckyNumber: horoscopeData.lucky_number,
            luckyTime: horoscopeData.lucky_time,
            compatibility: horoscopeData.compatibility
        });

    } catch (error) {
        console.error('Error in horoscope route:', error.message);
        
        // Send error response to frontend
        res.status(500).json({
            success: false,
            error: 'Failed to fetch horoscope data',
            message: error.message
        });
    }
});

// Route to get list of all available zodiac signs
app.get('/api/signs', (req, res) => {
    res.json({
        success: true,
        signs: ZODIAC_SIGNS
    });
});

// API route for tarot card readings
// GET /api/tarot/reading?type=single (single card) or type=three (three card spread)
app.get('/api/tarot/reading', (req, res) => {
    try {
        const { type = 'single' } = req.query;
        
        // Function to get random card(s)
        function getRandomCards(count) {
            const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(card => ({
                ...card,
                reversed: Math.random() < 0.3, // 30% chance of reversed card
                position: null
            }));
        }
        
        let reading = {};
        
        if (type === 'three') {
            // Three card spread (Past, Present, Future)
            const cards = getRandomCards(3);
            cards[0].position = 'past';
            cards[1].position = 'present';  
            cards[2].position = 'future';
            
            reading = {
                type: 'three-card',
                spread: 'Past, Present, Future',
                cards: cards,
                interpretation: "This three-card spread reveals the influences from your past, your current situation, and what the future may hold. Consider how these energies connect and flow together in your life's journey."
            };
        } else {
            // Single card reading
            const card = getRandomCards(1)[0];
            card.position = 'present';
            
            reading = {
                type: 'single-card',
                spread: 'Daily Guidance',
                cards: [card],
                interpretation: "This single card offers guidance for your current situation. Meditate on its message and see how it applies to your life today."
            };
        }
        
        res.json({
            success: true,
            reading: reading,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error generating tarot reading:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate tarot reading',
            message: error.message
        });
    }
});

// Route to get all tarot cards information
app.get('/api/tarot/cards', (req, res) => {
    res.json({
        success: true,
        cards: TAROT_CARDS,
        total: TAROT_CARDS.length
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌟 Astrology app server running on http://localhost:${PORT}`);
    console.log(`📖 Available zodiac signs: ${ZODIAC_SIGNS.join(', ')}`);
});