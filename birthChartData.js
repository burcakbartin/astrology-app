const planetaryData = {
  sun: {
    name: "Sun",
    symbol: "☉",
    archetype: "The Self",
    represents: "Core identity, ego, vitality, life purpose",
    influence: "Your essential nature and how you express your true self to the world",
    keywords: ["identity", "ego", "vitality", "purpose", "self-expression"],
    element: "Fire",
    mythology: "Apollo, the radiant god of light, music, and prophecy, represents the conscious self and life force"
  },

  moon: {
    name: "Moon",
    symbol: "☽",
    archetype: "The Mother",
    represents: "Emotions, intuition, subconscious, nurturing",
    influence: "Your emotional nature, instinctive reactions, and inner needs",
    keywords: ["emotions", "intuition", "subconscious", "nurturing", "habits"],
    element: "Water",
    mythology: "Diana/Artemis, the lunar goddess of intuition and emotional depths, governs your inner world"
  },

  mercury: {
    name: "Mercury",
    symbol: "☿",
    archetype: "The Messenger",
    represents: "Communication, intellect, learning, adaptability",
    influence: "How you think, communicate, process information, and learn",
    keywords: ["communication", "intellect", "learning", "curiosity", "adaptability"],
    element: "Air",
    mythology: "Hermes, the swift messenger god, governs all forms of communication and mental processes"
  },

  venus: {
    name: "Venus",
    symbol: "♀",
    archetype: "The Lover",
    represents: "Love, beauty, values, relationships, pleasure",
    influence: "What you find beautiful, how you love, and what you value most",
    keywords: ["love", "beauty", "relationships", "values", "harmony"],
    element: "Earth/Air",
    mythology: "Aphrodite, goddess of love and beauty, shapes your approach to relationships and aesthetics"
  },

  mars: {
    name: "Mars",
    symbol: "♂",
    archetype: "The Warrior",
    represents: "Action, desire, passion, courage, anger",
    influence: "How you take action, express anger, and pursue your desires",
    keywords: ["action", "passion", "courage", "desire", "energy"],
    element: "Fire",
    mythology: "Ares, the god of war, drives your passion, ambition, and how you fight for what you want"
  },

  jupiter: {
    name: "Jupiter",
    symbol: "♃",
    archetype: "The Teacher",
    represents: "Expansion, wisdom, luck, philosophy, growth",
    influence: "Where you find meaning, grow, and experience good fortune",
    keywords: ["expansion", "wisdom", "luck", "philosophy", "growth"],
    element: "Fire",
    mythology: "Zeus, king of gods, brings expansion, wisdom, and opportunities for growth"
  },

  saturn: {
    name: "Saturn",
    symbol: "♄",
    archetype: "The Teacher of Hard Lessons",
    represents: "Structure, discipline, limitations, responsibility, karma",
    influence: "Your challenges, life lessons, and areas requiring discipline",
    keywords: ["discipline", "structure", "responsibility", "limitations", "karma"],
    element: "Earth",
    mythology: "Kronos, the stern father of time, teaches through challenges and builds character"
  },

  uranus: {
    name: "Uranus",
    symbol: "♅",
    archetype: "The Rebel",
    represents: "Innovation, rebellion, freedom, sudden change, genius",
    influence: "Where you break free from convention and express your uniqueness",
    keywords: ["innovation", "rebellion", "freedom", "sudden change", "genius"],
    element: "Air",
    mythology: "The primordial sky god brings sudden insights and revolutionary changes"
  },

  neptune: {
    name: "Neptune",
    symbol: "♆",
    archetype: "The Mystic",
    represents: "Spirituality, dreams, illusion, compassion, transcendence",
    influence: "Your spiritual nature, dreams, and connection to the divine",
    keywords: ["spirituality", "dreams", "illusion", "compassion", "transcendence"],
    element: "Water",
    mythology: "Poseidon, god of the seas, governs the depths of consciousness and spiritual realms"
  },

  pluto: {
    name: "Pluto",
    symbol: "♇",
    archetype: "The Transformer",
    represents: "Transformation, power, death/rebirth, deep psychology",
    influence: "Where you experience profound transformation and regeneration",
    keywords: ["transformation", "power", "regeneration", "psychology", "rebirth"],
    element: "Water",
    mythology: "Hades, lord of the underworld, governs death, rebirth, and profound transformation"
  },

  ascendant: {
    name: "Ascendant (Rising Sign)",
    symbol: "AC",
    archetype: "The Mask",
    represents: "First impressions, appearance, personality mask, life approach",
    influence: "How others see you and how you approach new situations",
    keywords: ["first impressions", "appearance", "approach", "mask", "persona"],
    element: "Variable",
    mythology: "The dawn horizon where your soul chose to enter this lifetime, shaping your outer persona"
  },

  midheaven: {
    name: "Midheaven (MC)",
    symbol: "MC",
    archetype: "The Calling",
    represents: "Career, reputation, life goals, public image, legacy",
    influence: "Your life direction, career path, and how you want to be remembered",
    keywords: ["career", "reputation", "goals", "public image", "legacy"],
    element: "Variable",
    mythology: "The highest point in the sky at birth, representing your aspirations and public destiny"
  },

  lilith: {
    name: "Black Moon Lilith",
    symbol: "⚸",
    archetype: "The Dark Feminine",
    represents: "Hidden desires, taboos, feminine power, sexuality, rebellion",
    influence: "Your shadow self, repressed desires, and untamed feminine energy",
    keywords: ["shadow", "sexuality", "rebellion", "taboos", "feminine power"],
    element: "Dark",
    mythology: "The first woman who refused to submit, representing untamed feminine power and hidden desires"
  },

  northnode: {
    name: "North Node",
    symbol: "☊",
    archetype: "The Soul's Purpose",
    represents: "Life purpose, karmic lessons, soul growth, destiny",
    influence: "The qualities you're meant to develop in this lifetime",
    keywords: ["purpose", "destiny", "growth", "karma", "evolution"],
    element: "Spirit",
    mythology: "The dragon's head pointing toward your soul's evolutionary direction"
  },

  southnode: {
    name: "South Node",
    symbol: "☋",
    archetype: "The Past Life",
    represents: "Past life talents, karmic patterns, comfort zone",
    influence: "What you brought from past lives and need to balance",
    keywords: ["past life", "talents", "patterns", "comfort zone", "karma"],
    element: "Spirit",
    mythology: "The dragon's tail representing past life gifts and patterns to transcend"
  }
};

// Simplified planetary position calculation (for demo purposes)
// In production, you'd use a proper ephemeris library like swiss-ephemeris
const calculatePlanetaryPositions = (birthDate, birthTime = "12:00", birthLocation = "Unknown") => {
  const date = new Date(birthDate + "T" + birthTime);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);

  // Simple approximation - in reality, this would use complex astronomical calculations
  const approximatePositions = {
    sun: getSunSign(date),
    moon: getApproximateSign((dayOfYear * 13 + 45) % 360), // Moon moves ~13 degrees per day
    mercury: getApproximateSign((dayOfYear * 1.5 + sunDegree(date) + Math.random() * 60 - 30) % 360),
    venus: getApproximateSign((dayOfYear * 1.2 + sunDegree(date) + Math.random() * 90 - 45) % 360),
    mars: getApproximateSign((dayOfYear * 0.5 + sunDegree(date) + Math.random() * 120 - 60) % 360),
    jupiter: getApproximateSign((dayOfYear * 0.1 + Math.random() * 360) % 360),
    saturn: getApproximateSign((dayOfYear * 0.03 + Math.random() * 360) % 360),
    uranus: getApproximateSign((dayOfYear * 0.01 + Math.random() * 360) % 360),
    neptune: getApproximateSign((dayOfYear * 0.006 + Math.random() * 360) % 360),
    pluto: getApproximateSign((dayOfYear * 0.004 + Math.random() * 360) % 360),
    ascendant: getApproximateSign((Math.random() * 360) % 360), // Highly dependent on birth time/location
    midheaven: getApproximateSign((Math.random() * 360) % 360),
    lilith: getApproximateSign((dayOfYear * 0.11 + Math.random() * 360) % 360),
    northnode: getApproximateSign((Math.random() * 360) % 360),
    southnode: getApproximateSign((Math.random() * 360 + 180) % 360) // Opposite North Node
  };

  return approximatePositions;
};

function getSunSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'virgo';
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'libra';
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'scorpio';
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'sagittarius';
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'capricorn';
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'pisces';

  return 'aries'; // fallback
}

function sunDegree(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // Approximate sun degree (simplified)
  return ((month - 1) * 30 + day) % 360;
}

function getApproximateSign(degree) {
  const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
                'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  const signIndex = Math.floor(degree / 30) % 12;
  return signs[signIndex];
}

// Birth chart interpretations combining multiple placements
const generateBirthChartInterpretation = (chart, zodiacData) => {
  const sunSign = zodiacData[chart.sun];
  const moonSign = zodiacData[chart.moon];
  const risingSign = zodiacData[chart.ascendant];

  return {
    corePersonality: `Your Sun in ${sunSign.name} reveals ${sunSign.personality.traits}`,
    emotionalNature: `Your Moon in ${moonSign.name} shows that emotionally, you ${moonSign.love.approach.toLowerCase()}`,
    outwardPersona: `Your ${risingSign.name} Rising means others first see you as ${risingSign.personality.strengths[0].toLowerCase()} and ${risingSign.personality.strengths[1].toLowerCase()}`,

    majorThemes: [
      `${sunSign.element} Sun drives your core energy`,
      `${moonSign.element} Moon shapes your emotional responses`,
      `Your ${sunSign.mythical.archetype} nature seeks ${sunSign.spirituality.lifeLesson.toLowerCase()}`
    ],

    lifeChallenge: `The interplay between your ${sunSign.name} Sun and ${moonSign.name} Moon creates a unique tension between ${sunSign.personality.strengths[0].toLowerCase()} action and ${moonSign.personality.strengths[0].toLowerCase()} emotional needs.`,

    soulPurpose: `With this planetary combination, your soul's journey involves integrating the ${sunSign.mythical.archetype.toLowerCase()} energy of ${sunSign.name} with the ${moonSign.mythical.archetype.toLowerCase()} wisdom of ${moonSign.name}.`
  };
};

module.exports = {
  planetaryData,
  calculatePlanetaryPositions,
  generateBirthChartInterpretation
};