// Main server file for our astrology app
// This sets up an Express server that serves our frontend and handles API requests

const express = require('express');
const axios = require('axios'); // For making HTTP requests to external APIs
const cors = require('cors'); // Allows cross-origin requests
const path = require('path');
const zodiacSigns = require('./zodiacData'); // Import our comprehensive zodiac data
const { planetaryData, calculatePlanetaryPositions, generateBirthChartInterpretation } = require('./birthChartData');

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

// Route to serve the birth chart page
app.get('/birth-chart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'birth-chart.html'));
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

// ✨ MYSTICAL ZODIAC ENDPOINTS ✨

// Get detailed information about a specific zodiac sign
app.get('/api/zodiac/:sign', (req, res) => {
    try {
        const { sign } = req.params;
        const signData = zodiacSigns[sign.toLowerCase()];

        if (!signData) {
            return res.status(404).json({
                success: false,
                error: 'Zodiac sign not found',
                availableSigns: Object.keys(zodiacSigns)
            });
        }

        res.json({
            success: true,
            sign: signData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch zodiac information',
            message: error.message
        });
    }
});

// Compare two zodiac signs across different life areas
app.get('/api/zodiac/compare/:sign1/:sign2', (req, res) => {
    try {
        const { sign1, sign2 } = req.params;
        const data1 = zodiacSigns[sign1.toLowerCase()];
        const data2 = zodiacSigns[sign2.toLowerCase()];

        if (!data1 || !data2) {
            return res.status(404).json({
                success: false,
                error: 'One or both zodiac signs not found',
                availableSigns: Object.keys(zodiacSigns)
            });
        }

        // Calculate compatibility scores
        const calculateCompatibility = (sign1Data, sign2Data) => {
            let score = 0;
            let details = {};

            // Element compatibility
            const elementCompatibility = {
                'Fire': ['Fire', 'Air'],
                'Earth': ['Earth', 'Water'],
                'Air': ['Air', 'Fire'],
                'Water': ['Water', 'Earth']
            };

            const elementsMatch = elementCompatibility[sign1Data.element]?.includes(sign2Data.element);
            details.elementCompatibility = elementsMatch;
            if (elementsMatch) score += 25;

            // Quality compatibility
            const qualityCompatibility = {
                'Cardinal': ['Cardinal', 'Mutable'],
                'Fixed': ['Fixed', 'Mutable'],
                'Mutable': ['Cardinal', 'Fixed', 'Mutable']
            };

            const qualitiesMatch = qualityCompatibility[sign1Data.quality]?.includes(sign2Data.quality);
            details.qualityCompatibility = qualitiesMatch;
            if (qualitiesMatch) score += 20;

            // Love compatibility check
            const loveCompatHigh = sign1Data.love.compatibility.high.includes(sign2Data.name);
            const loveCompatMedium = sign1Data.love.compatibility.medium.includes(sign2Data.name);

            if (loveCompatHigh) {
                score += 25;
                details.loveCompatibility = 'high';
            } else if (loveCompatMedium) {
                score += 15;
                details.loveCompatibility = 'medium';
            } else {
                details.loveCompatibility = 'low';
            }

            // Friendship compatibility check
            const friendCompatHigh = sign1Data.friendship.compatibility.high.includes(sign2Data.name);
            const friendCompatMedium = sign1Data.friendship.compatibility.medium.includes(sign2Data.name);

            if (friendCompatHigh) {
                score += 25;
                details.friendshipCompatibility = 'high';
            } else if (friendCompatMedium) {
                score += 15;
                details.friendshipCompatibility = 'medium';
            } else {
                details.friendshipCompatibility = 'low';
            }

            // Spiritual path alignment
            const pathSimilarity = sign1Data.spirituality.path.toLowerCase().includes('mystic') &&
                                 sign2Data.spirituality.path.toLowerCase().includes('mystic');
            if (pathSimilarity) score += 20;

            return { score: Math.min(score, 100), details };
        };

        const compatibility = calculateCompatibility(data1, data2);

        const comparison = {
            signs: {
                [sign1]: data1,
                [sign2]: data2
            },
            compatibility: {
                overall: compatibility.score,
                rating: compatibility.score >= 80 ? 'Excellent' :
                       compatibility.score >= 60 ? 'Good' :
                       compatibility.score >= 40 ? 'Moderate' : 'Challenging',
                details: compatibility.details
            },
            elementInteraction: {
                [sign1]: data1.element,
                [sign2]: data2.element,
                harmony: compatibility.details.elementCompatibility ? 'Harmonious' : 'Contrasting'
            },
            loveCompatibility: {
                romantic: compatibility.details.loveCompatibility,
                advice: compatibility.details.loveCompatibility === 'high' ?
                       'These signs naturally complement each other in love' :
                       compatibility.details.loveCompatibility === 'medium' ?
                       'With understanding, this relationship can flourish' :
                       'This pairing requires patience and compromise'
            },
            friendshipCompatibility: {
                level: compatibility.details.friendshipCompatibility,
                advice: compatibility.details.friendshipCompatibility === 'high' ?
                       'These signs form strong, lasting friendships with natural understanding' :
                       compatibility.details.friendshipCompatibility === 'medium' ?
                       'This friendship thrives with mutual effort and shared interests' :
                       'This friendship requires patience and appreciation of differences'
            },
            careerSynergy: {
                [sign1]: data1.career.workStyle,
                [sign2]: data2.career.workStyle,
                potential: 'Analyze how these work styles could complement or clash'
            }
        };

        res.json({
            success: true,
            comparison
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to compare zodiac signs',
            message: error.message
        });
    }
});

// Get all zodiac signs with basic info for overview
app.get('/api/zodiac/all', (req, res) => {
    try {
        const allSigns = Object.keys(zodiacSigns).map(key => ({
            name: zodiacSigns[key].name,
            symbol: zodiacSigns[key].symbol,
            element: zodiacSigns[key].element,
            quality: zodiacSigns[key].quality,
            ruler: zodiacSigns[key].ruler,
            dates: zodiacSigns[key].dates,
            mysticalPhrase: zodiacSigns[key].mysticalPhrase,
            archetype: zodiacSigns[key].mythical.archetype
        }));

        res.json({
            success: true,
            signs: allSigns,
            total: allSigns.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch zodiac signs',
            message: error.message
        });
    }
});

// Get signs by element for mystical grouping
app.get('/api/zodiac/element/:element', (req, res) => {
    try {
        const { element } = req.params;
        const elementSigns = Object.keys(zodiacSigns)
            .filter(key => zodiacSigns[key].element.toLowerCase() === element.toLowerCase())
            .map(key => zodiacSigns[key]);

        if (elementSigns.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Element not found',
                availableElements: ['Fire', 'Earth', 'Air', 'Water']
            });
        }

        res.json({
            success: true,
            element: element,
            signs: elementSigns,
            description: {
                'fire': 'Signs of passion, energy, and creativity - the spark of life',
                'earth': 'Signs of stability, practicality, and material mastery',
                'air': 'Signs of communication, ideas, and intellectual pursuits',
                'water': 'Signs of emotion, intuition, and spiritual depth'
            }[element.toLowerCase()]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch signs by element',
            message: error.message
        });
    }
});

// ✨ BIRTH CHART ENDPOINTS ✨

// Generate complete birth chart
app.post('/api/birth-chart', (req, res) => {
    try {
        const { birthDate, birthTime = "12:00", birthLocation = "Unknown", birthName = "Seeker" } = req.body;

        if (!birthDate) {
            return res.status(400).json({
                success: false,
                error: 'Birth date is required'
            });
        }

        // Calculate planetary positions
        const planetaryPositions = calculatePlanetaryPositions(birthDate, birthTime, birthLocation);

        // Create complete birth chart data
        const birthChart = {
            personalInfo: {
                name: birthName,
                birthDate,
                birthTime,
                birthLocation
            },

            // Core Trinity
            coreTrinity: {
                sun: {
                    sign: planetaryPositions.sun,
                    data: zodiacSigns[planetaryPositions.sun],
                    planetData: planetaryData.sun
                },
                moon: {
                    sign: planetaryPositions.moon,
                    data: zodiacSigns[planetaryPositions.moon],
                    planetData: planetaryData.moon
                },
                ascendant: {
                    sign: planetaryPositions.ascendant,
                    data: zodiacSigns[planetaryPositions.ascendant],
                    planetData: planetaryData.ascendant
                }
            },

            // All planetary positions
            planets: Object.keys(planetaryData).map(planet => ({
                name: planet,
                sign: planetaryPositions[planet],
                signData: zodiacSigns[planetaryPositions[planet]],
                planetData: planetaryData[planet]
            })).filter(p => p.signData), // Filter out any undefined signs

            // Generated interpretation
            interpretation: generateBirthChartInterpretation(planetaryPositions, zodiacSigns),

            // Elemental balance
            elementalBalance: calculateElementalBalance(planetaryPositions),

            // Modal analysis
            modalAnalysis: calculateModalAnalysis(planetaryPositions),

            timestamp: new Date().toISOString()
        };

        res.json({
            success: true,
            birthChart
        });

    } catch (error) {
        console.error('Error generating birth chart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate birth chart',
            message: error.message
        });
    }
});

// Get planetary data information
app.get('/api/planetary-data', (req, res) => {
    res.json({
        success: true,
        planetaryData
    });
});

// Calculate elemental balance
function calculateElementalBalance(positions) {
    const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    const majorPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];

    majorPlanets.forEach(planet => {
        if (positions[planet] && zodiacSigns[positions[planet]]) {
            elements[zodiacSigns[positions[planet]].element]++;
        }
    });

    const total = majorPlanets.length;
    const percentages = {};
    Object.keys(elements).forEach(element => {
        percentages[element] = Math.round((elements[element] / total) * 100);
    });

    // Determine dominant element
    const dominantElement = Object.keys(elements).reduce((a, b) =>
        elements[a] > elements[b] ? a : b
    );

    return {
        counts: elements,
        percentages,
        dominantElement,
        interpretation: getElementalInterpretation(dominantElement, percentages)
    };
}

// Calculate modal analysis (Cardinal, Fixed, Mutable)
function calculateModalAnalysis(positions) {
    const modes = { Cardinal: 0, Fixed: 0, Mutable: 0 };
    const majorPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];

    majorPlanets.forEach(planet => {
        if (positions[planet] && zodiacSigns[positions[planet]]) {
            modes[zodiacSigns[positions[planet]].quality]++;
        }
    });

    const total = majorPlanets.length;
    const percentages = {};
    Object.keys(modes).forEach(mode => {
        percentages[mode] = Math.round((modes[mode] / total) * 100);
    });

    const dominantMode = Object.keys(modes).reduce((a, b) =>
        modes[a] > modes[b] ? a : b
    );

    return {
        counts: modes,
        percentages,
        dominantMode,
        interpretation: getModalInterpretation(dominantMode, percentages)
    };
}

function getElementalInterpretation(dominantElement, percentages) {
    const interpretations = {
        Fire: "Your fiery nature burns bright with passion, creativity, and leadership. You approach life with enthusiasm and natural confidence.",
        Earth: "Grounded and practical, you build lasting foundations. Your earthy wisdom brings stability and material mastery to all you touch.",
        Air: "Your airy intellect soars through ideas and communication. Mental agility and social connections are your natural gifts.",
        Water: "Deep emotional currents flow through your being. Intuition, empathy, and spiritual sensitivity guide your journey."
    };

    return interpretations[dominantElement] || "Your elemental balance creates a unique blend of cosmic energies.";
}

function getModalInterpretation(dominantMode, percentages) {
    const interpretations = {
        Cardinal: "You are a natural initiator and leader. Your cardinal energy drives you to start new projects and lead others toward fresh beginnings.",
        Fixed: "Steady and determined, your fixed nature brings persistence and stability. Once committed, you see things through to completion.",
        Mutable: "Adaptable and flexible, your mutable energy flows with change. You excel at adjustment and seeing multiple perspectives."
    };

    return interpretations[dominantMode] || "Your modal balance creates a unique approach to life's challenges.";
}

// Start the server
app.listen(PORT, () => {
    console.log(`🌟 Astrology app server running on http://localhost:${PORT}`);
    console.log(`📖 Available zodiac signs: ${ZODIAC_SIGNS.join(', ')}`);
});