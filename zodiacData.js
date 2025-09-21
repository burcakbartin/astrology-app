const zodiacSigns = {
  aries: {
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    quality: "Cardinal",
    ruler: "Mars",
    dates: "March 21 - April 19",
    mysticalPhrase: "The Ram charges forth with cosmic fire in their soul",

    personality: {
      strengths: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic", "Honest", "Passionate"],
      weaknesses: ["Impatient", "Moody", "Short-tempered", "Impulsive", "Aggressive"],
      traits: "Born leaders with an unstoppable drive, Aries souls blaze trails where others fear to tread. Their warrior spirit burns bright with the first fire of creation."
    },

    love: {
      style: "Passionate and intense",
      compatibility: {
        high: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
        medium: ["Aries", "Libra"],
        low: ["Cancer", "Capricorn"]
      },
      approach: "Aries loves with the intensity of a thousand suns, pursuing their heart's desire with unwavering determination.",
      needsInRelationship: ["Independence", "Adventure", "Excitement", "Honesty"]
    },

    friendship: {
      style: "Energetic and loyal adventure companion",
      compatibility: {
        high: ["Leo", "Sagittarius", "Aquarius", "Gemini"],
        medium: ["Aries", "Libra", "Scorpio"],
        low: ["Cancer", "Virgo", "Capricorn"]
      },
      qualities: ["Loyal defender", "Adventure initiator", "Motivational support", "Honest advisor"],
      approach: "Aries friends are the ones who will charge into battle for you, always ready for the next adventure and fiercely protective of their inner circle.",
      needsInFriendship: ["Loyalty", "Shared adventures", "Mutual respect", "Direct communication"]
    },

    career: {
      naturalTalents: ["Leadership", "Entrepreneurship", "Sports", "Military", "Emergency services"],
      workStyle: "Pioneer and innovator who thrives on challenges",
      motivation: "Competition and achievement",
      idealEnvironment: "Fast-paced, competitive, leadership roles"
    },

    health: {
      vulnerabilities: ["Head", "Eyes", "Stress-related issues"],
      strengths: ["High energy", "Quick recovery", "Physical stamina"],
      advice: "Channel your fiery energy through regular exercise and avoid burnout"
    },

    spirituality: {
      path: "The warrior's journey of self-discovery",
      gifts: ["Courage to face challenges", "Ability to inspire others", "Pioneer spirit"],
      lifeLesson: "Learning patience and considering others' perspectives"
    },

    mythical: {
      archetype: "The Warrior",
      totemAnimal: "Ram",
      crystals: ["Diamond", "Ruby", "Bloodstone", "Red Jasper"],
      colors: ["Red", "Orange", "Bright Yellow"],
      mythology: "Blessed by Mars, the ancient god of war, Aries carries the sacred flame of initiation"
    }
  },

  taurus: {
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    quality: "Fixed",
    ruler: "Venus",
    dates: "April 20 - May 20",
    mysticalPhrase: "The Bull grounds cosmic beauty into earthly form",

    personality: {
      strengths: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable"],
      weaknesses: ["Stubborn", "Possessive", "Uncompromising", "Materialistic"],
      traits: "Guardians of earthly pleasures and beauty, Taurus souls build lasting foundations with the steady strength of ancient mountains."
    },

    love: {
      style: "Loyal and sensual",
      compatibility: {
        high: ["Virgo", "Capricorn", "Cancer", "Pisces"],
        medium: ["Taurus", "Scorpio"],
        low: ["Leo", "Aquarius"]
      },
      approach: "Taurus loves with deep devotion, creating sanctuaries of comfort and sensual pleasure for their beloved.",
      needsInRelationship: ["Security", "Loyalty", "Physical affection", "Stability"]
    },

    friendship: {
      style: "Reliable and nurturing companion",
      compatibility: {
        high: ["Virgo", "Capricorn", "Cancer", "Pisces"],
        medium: ["Taurus", "Scorpio", "Leo"],
        low: ["Aquarius", "Gemini", "Sagittarius"]
      },
      qualities: ["Steadfast loyalty", "Practical support", "Generous host", "Patient listener"],
      approach: "Taurus friends are the rock you can always lean on, offering practical help and creating cozy spaces where friendships can flourish over good food and comfort.",
      needsInFriendship: ["Consistency", "Mutual respect", "Quality time", "Trust"]
    },

    career: {
      naturalTalents: ["Finance", "Arts", "Cooking", "Agriculture", "Real Estate"],
      workStyle: "Methodical and thorough, values security",
      motivation: "Financial stability and tangible results",
      idealEnvironment: "Stable, comfortable, with clear procedures"
    },

    health: {
      vulnerabilities: ["Neck", "Throat", "Weight gain", "Circulation"],
      strengths: ["Strong constitution", "Good endurance", "Natural healing"],
      advice: "Maintain regular routines and enjoy nature's healing energies"
    },

    spirituality: {
      path: "The path of earthly wisdom and sensual awakening",
      gifts: ["Connection to nature", "Appreciation of beauty", "Grounding energy"],
      lifeLesson: "Learning flexibility and embracing change"
    },

    mythical: {
      archetype: "The Builder",
      totemAnimal: "Bull",
      crystals: ["Emerald", "Rose Quartz", "Green Aventurine", "Malachite"],
      colors: ["Green", "Pink", "Earth tones"],
      mythology: "Blessed by Venus, Taurus channels divine beauty into material form, sacred keeper of Earth's treasures"
    }
  },

  gemini: {
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    quality: "Mutable",
    ruler: "Mercury",
    dates: "May 21 - June 20",
    mysticalPhrase: "The Twins dance between worlds, weaving cosmic knowledge",

    personality: {
      strengths: ["Adaptable", "Curious", "Affectionate", "Kind", "Intelligent", "Witty"],
      weaknesses: ["Nervous", "Inconsistent", "Indecisive", "Superficial"],
      traits: "Cosmic messengers bridging realms of thought, Gemini souls sparkle with quicksilver intelligence and infinite curiosity."
    },

    love: {
      style: "Intellectual and playful",
      compatibility: {
        high: ["Libra", "Aquarius", "Aries", "Leo"],
        medium: ["Gemini", "Sagittarius"],
        low: ["Virgo", "Pisces"]
      },
      approach: "Gemini loves through words and ideas, creating magical connections through communication and shared adventures.",
      needsInRelationship: ["Mental stimulation", "Variety", "Freedom", "Communication"]
    },

    friendship: {
      style: "Witty and versatile social butterfly",
      compatibility: {
        high: ["Libra", "Aquarius", "Aries", "Leo"],
        medium: ["Gemini", "Sagittarius", "Virgo"],
        low: ["Scorpio", "Cancer", "Capricorn"]
      },
      qualities: ["Great conversationalist", "Fun activity planner", "Adaptable companion", "Information sharer"],
      approach: "Gemini friends bring sparkle and variety to your life, always ready with interesting stories, new ideas, and social connections.",
      needsInFriendship: ["Mental stimulation", "Variety in activities", "Open communication", "Social freedom"]
    },

    career: {
      naturalTalents: ["Writing", "Teaching", "Sales", "Media", "Technology"],
      workStyle: "Versatile multitasker who needs variety",
      motivation: "Learning and intellectual challenges",
      idealEnvironment: "Dynamic, social, intellectually stimulating"
    },

    health: {
      vulnerabilities: ["Lungs", "Arms", "Hands", "Nervous system"],
      strengths: ["Mental agility", "Quick adaptation", "Youthful energy"],
      advice: "Practice breathing exercises and limit overstimulation"
    },

    spirituality: {
      path: "The messenger's journey of connecting souls through truth",
      gifts: ["Communication abilities", "Adaptability", "Learning capacity"],
      lifeLesson: "Finding depth and focus amidst endless possibilities"
    },

    mythical: {
      archetype: "The Messenger",
      totemAnimal: "Butterfly",
      crystals: ["Citrine", "Clear Quartz", "Agate", "Tiger's Eye"],
      colors: ["Yellow", "Light Blue", "Silver"],
      mythology: "Touched by Mercury's divine speed, Gemini carries messages between the mortal and divine realms"
    }
  },

  cancer: {
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    quality: "Cardinal",
    ruler: "Moon",
    dates: "June 21 - July 22",
    mysticalPhrase: "The Crab holds the moon's secrets in their protective shell",

    personality: {
      strengths: ["Tenacious", "Highly imaginative", "Loyal", "Emotional", "Sympathetic", "Persuasive"],
      weaknesses: ["Moody", "Pessimistic", "Suspicious", "Manipulative", "Insecure"],
      traits: "Lunar guardians of emotion and memory, Cancer souls navigate life's tides with intuitive wisdom and protective love."
    },

    love: {
      style: "Nurturing and emotionally deep",
      compatibility: {
        high: ["Scorpio", "Pisces", "Taurus", "Virgo"],
        medium: ["Cancer", "Capricorn"],
        low: ["Aries", "Libra"]
      },
      approach: "Cancer loves with the depth of ocean tides, creating safe harbors where hearts can truly be vulnerable.",
      needsInRelationship: ["Emotional security", "Family connection", "Nurturing", "Trust"]
    },

    friendship: {
      style: "Caring and intuitive emotional supporter",
      compatibility: {
        high: ["Scorpio", "Pisces", "Taurus", "Virgo"],
        medium: ["Cancer", "Capricorn", "Leo"],
        low: ["Aries", "Libra", "Sagittarius"]
      },
      qualities: ["Emotional support", "Protective instinct", "Thoughtful gestures", "Memory keeper"],
      approach: "Cancer friends are the ones who remember your birthday, bring soup when you're sick, and create a warm, welcoming home for gatherings.",
      needsInFriendship: ["Emotional connection", "Loyalty", "Understanding", "Family-like bonds"]
    },

    career: {
      naturalTalents: ["Healthcare", "Hospitality", "Real Estate", "Psychology", "Education"],
      workStyle: "Intuitive and caring, values security",
      motivation: "Helping others and creating security",
      idealEnvironment: "Supportive, family-like, emotionally fulfilling"
    },

    health: {
      vulnerabilities: ["Stomach", "Digestive system", "Breasts", "Emotional eating"],
      strengths: ["Strong intuition about health", "Natural healing abilities"],
      advice: "Honor your emotional needs and create peaceful environments"
    },

    spirituality: {
      path: "The nurturer's journey of emotional healing and protection",
      gifts: ["Intuitive abilities", "Emotional healing", "Protective instincts"],
      lifeLesson: "Learning to release the past while honoring its lessons"
    },

    mythical: {
      archetype: "The Nurturer",
      totemAnimal: "Crab",
      crystals: ["Moonstone", "Pearl", "Selenite", "Labradorite"],
      colors: ["Silver", "White", "Sea Blue"],
      mythology: "Blessed by the Moon's eternal cycles, Cancer holds the ancient wisdom of tides and maternal protection"
    }
  },

  leo: {
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    quality: "Fixed",
    ruler: "Sun",
    dates: "July 23 - August 22",
    mysticalPhrase: "The Lion radiates the Sun's golden majesty across all realms",

    personality: {
      strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous"],
      weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Lazy", "Inflexible"],
      traits: "Solar royalty blessed with creative fire, Leo souls illuminate the world with generous hearts and magnetic presence."
    },

    love: {
      style: "Dramatic and generous",
      compatibility: {
        high: ["Aries", "Sagittarius", "Gemini", "Libra"],
        medium: ["Leo", "Aquarius"],
        low: ["Taurus", "Scorpio"]
      },
      approach: "Leo loves with royal grandeur, showering their beloved with attention, gifts, and theatrical displays of affection.",
      needsInRelationship: ["Admiration", "Loyalty", "Romance", "Fun"]
    },

    friendship: {
      style: "Generous and entertaining leader",
      compatibility: {
        high: ["Aries", "Sagittarius", "Gemini", "Libra"],
        medium: ["Leo", "Aquarius", "Cancer"],
        low: ["Taurus", "Scorpio", "Virgo"]
      },
      qualities: ["Natural entertainer", "Generous gift-giver", "Loyal supporter", "Confidence booster"],
      approach: "Leo friends light up any room and make you feel like the most important person in the world, always ready to celebrate your successes.",
      needsInFriendship: ["Appreciation", "Loyalty", "Fun activities", "Mutual admiration"]
    },

    career: {
      naturalTalents: ["Entertainment", "Leadership", "Arts", "Public speaking", "Fashion"],
      workStyle: "Creative leader who needs recognition",
      motivation: "Recognition and creative expression",
      idealEnvironment: "Center stage, creative, leadership opportunities"
    },

    health: {
      vulnerabilities: ["Heart", "Back", "Spine", "Blood pressure"],
      strengths: ["Vitality", "Natural magnetism", "Recovery power"],
      advice: "Maintain heart health and balance work with play"
    },

    spirituality: {
      path: "The sovereign's journey of creative self-expression",
      gifts: ["Leadership abilities", "Creative inspiration", "Generous spirit"],
      lifeLesson: "Learning humility while maintaining confidence"
    },

    mythical: {
      archetype: "The Sovereign",
      totemAnimal: "Lion",
      crystals: ["Sunstone", "Citrine", "Pyrite", "Golden Topaz"],
      colors: ["Gold", "Orange", "Bright Yellow"],
      mythology: "Crowned by the Sun itself, Leo carries the divine right to rule through love and creative expression"
    }
  },

  virgo: {
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    quality: "Mutable",
    ruler: "Mercury",
    dates: "August 23 - September 22",
    mysticalPhrase: "The Virgin perfects the sacred through devoted service",

    personality: {
      strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Reliable"],
      weaknesses: ["Shyness", "Worry", "Overly critical", "All work and no play"],
      traits: "Sacred perfectionist and healer, Virgo souls serve the divine through meticulous care and pure-hearted devotion."
    },

    love: {
      style: "Devoted and practical",
      compatibility: {
        high: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
        medium: ["Virgo", "Pisces"],
        low: ["Gemini", "Sagittarius"]
      },
      approach: "Virgo loves through acts of service, creating perfect moments and tending to their beloved's every need.",
      needsInRelationship: ["Loyalty", "Appreciation", "Intellectual connection", "Stability"]
    },

    friendship: {
      style: "Helpful and detail-oriented supporter",
      compatibility: {
        high: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
        medium: ["Virgo", "Pisces", "Gemini"],
        low: ["Aries", "Sagittarius", "Leo"]
      },
      qualities: ["Reliable helper", "Practical advisor", "Thoughtful planner", "Honest critic"],
      approach: "Virgo friends are the ones who help you organize your life, remember important details, and offer practical solutions to any problem.",
      needsInFriendship: ["Mutual helpfulness", "Intellectual conversation", "Reliability", "Appreciation for efforts"]
    },

    career: {
      naturalTalents: ["Healthcare", "Analysis", "Research", "Organization", "Quality control"],
      workStyle: "Detail-oriented perfectionist",
      motivation: "Being useful and making improvements",
      idealEnvironment: "Organized, quiet, meaningful work"
    },

    health: {
      vulnerabilities: ["Digestive system", "Intestines", "Nervous tension"],
      strengths: ["Health consciousness", "Attention to body signals"],
      advice: "Practice stress management and maintain healthy routines"
    },

    spirituality: {
      path: "The healer's journey of service and purification",
      gifts: ["Healing abilities", "Attention to detail", "Service orientation"],
      lifeLesson: "Learning self-acceptance and embracing imperfection"
    },

    mythical: {
      archetype: "The Healer",
      totemAnimal: "Dove",
      crystals: ["Sapphire", "Moss Agate", "Peridot", "Amazonite"],
      colors: ["Navy Blue", "Brown", "Green"],
      mythology: "Blessed by Mercury's wisdom and Earth's healing power, Virgo serves as a bridge between perfection and compassion"
    }
  },

  libra: {
    name: "Libra",
    symbol: "♎",
    element: "Air",
    quality: "Cardinal",
    ruler: "Venus",
    dates: "September 23 - October 22",
    mysticalPhrase: "The Scales weigh truth and beauty in cosmic harmony",

    personality: {
      strengths: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
      weaknesses: ["Indecisive", "Avoids confrontations", "Self-pity", "Carries grudges"],
      traits: "Divine diplomats seeking cosmic balance, Libra souls harmonize opposing forces with grace and aesthetic wisdom."
    },

    love: {
      style: "Romantic and harmonious",
      compatibility: {
        high: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
        medium: ["Libra", "Aries"],
        low: ["Cancer", "Capricorn"]
      },
      approach: "Libra loves with artistic beauty, creating relationships that are partnerships of equals in perfect harmony.",
      needsInRelationship: ["Balance", "Beauty", "Harmony", "Partnership"]
    },

    friendship: {
      style: "Diplomatic and socially graceful",
      compatibility: {
        high: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
        medium: ["Libra", "Aries", "Taurus"],
        low: ["Cancer", "Capricorn", "Scorpio"]
      },
      qualities: ["Peacemaker", "Social connector", "Aesthetic appreciator", "Fair mediator"],
      approach: "Libra friends bring beauty and balance to your social circle, always seeking harmony and introducing you to cultural experiences.",
      needsInFriendship: ["Harmony", "Shared aesthetic interests", "Social activities", "Balanced give-and-take"]
    },

    career: {
      naturalTalents: ["Law", "Diplomacy", "Arts", "Fashion", "Counseling"],
      workStyle: "Collaborative peacemaker",
      motivation: "Justice and aesthetic beauty",
      idealEnvironment: "Beautiful, harmonious, team-oriented"
    },

    health: {
      vulnerabilities: ["Kidneys", "Lower back", "Skin", "Blood sugar"],
      strengths: ["Natural balance", "Aesthetic sense of wellness"],
      advice: "Maintain work-life balance and surround yourself with beauty"
    },

    spirituality: {
      path: "The diplomat's journey of bringing cosmic justice to Earth",
      gifts: ["Mediation abilities", "Aesthetic sense", "Social harmony"],
      lifeLesson: "Learning to make decisions and stand for personal truth"
    },

    mythical: {
      archetype: "The Diplomat",
      totemAnimal: "Swan",
      crystals: ["Opal", "Rose Quartz", "Lapis Lazuli", "Jade"],
      colors: ["Pink", "Blue", "Pastel colors"],
      mythology: "Chosen by Venus to balance beauty and justice, Libra holds the sacred scales that weigh the hearts of mortals"
    }
  },

  scorpio: {
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    quality: "Fixed",
    ruler: "Pluto",
    dates: "October 23 - November 21",
    mysticalPhrase: "The Scorpion guards the mysteries of death and rebirth",

    personality: {
      strengths: ["Resourceful", "Brave", "Passionate", "Stubborn", "True friend"],
      weaknesses: ["Distrusting", "Jealous", "Secretive", "Violent"],
      traits: "Mystical phoenix of transformation, Scorpio souls dive into life's deepest mysteries with fearless intensity and regenerative power."
    },

    love: {
      style: "Intense and transformative",
      compatibility: {
        high: ["Cancer", "Pisces", "Virgo", "Capricorn"],
        medium: ["Scorpio", "Taurus"],
        low: ["Leo", "Aquarius"]
      },
      approach: "Scorpio loves with soul-deep intensity, seeking complete union and spiritual transformation through passion.",
      needsInRelationship: ["Trust", "Intensity", "Loyalty", "Emotional depth"]
    },

    friendship: {
      style: "Loyal and intensely devoted",
      compatibility: {
        high: ["Cancer", "Pisces", "Virgo", "Capricorn"],
        medium: ["Scorpio", "Taurus", "Aries"],
        low: ["Leo", "Aquarius", "Gemini"]
      },
      qualities: ["Fierce loyalty", "Deep understanding", "Secret keeper", "Protective ally"],
      approach: "Scorpio friends form soul-deep bonds and will defend you to the death, offering transformative insights and unwavering support through life's darkest moments.",
      needsInFriendship: ["Deep trust", "Emotional authenticity", "Loyalty", "Meaningful connection"]
    },

    career: {
      naturalTalents: ["Psychology", "Investigation", "Surgery", "Research", "Occult"],
      workStyle: "Intense researcher who uncovers hidden truths",
      motivation: "Power and transformation",
      idealEnvironment: "Private, investigative, transformative work"
    },

    health: {
      vulnerabilities: ["Reproductive system", "Bladder", "Emotional intensity"],
      strengths: ["Regenerative abilities", "Strong constitution", "Healing power"],
      advice: "Channel intensity productively and practice emotional release"
    },

    spirituality: {
      path: "The mystic's journey through death and rebirth",
      gifts: ["Psychic abilities", "Transformation power", "Depth perception"],
      lifeLesson: "Learning forgiveness and releasing control"
    },

    mythical: {
      archetype: "The Mystic",
      totemAnimal: "Scorpion/Phoenix/Eagle",
      crystals: ["Obsidian", "Garnet", "Hematite", "Black Tourmaline"],
      colors: ["Deep Red", "Black", "Burgundy"],
      mythology: "Empowered by Pluto's underworld wisdom, Scorpio guards the sacred mysteries of life, death, and resurrection"
    }
  },

  sagittarius: {
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    quality: "Mutable",
    ruler: "Jupiter",
    dates: "November 22 - December 21",
    mysticalPhrase: "The Archer aims divine truth across infinite horizons",

    personality: {
      strengths: ["Generous", "Idealistic", "Great sense of humor", "Philosophical"],
      weaknesses: ["Promises more than can deliver", "Very impatient", "Will say anything"],
      traits: "Cosmic wanderer and truth-seeker, Sagittarius souls journey across physical and philosophical realms with optimistic wisdom."
    },

    love: {
      style: "Adventurous and philosophical",
      compatibility: {
        high: ["Aries", "Leo", "Libra", "Aquarius"],
        medium: ["Sagittarius", "Gemini"],
        low: ["Virgo", "Pisces"]
      },
      approach: "Sagittarius loves with boundless enthusiasm, sharing grand adventures and philosophical quests for meaning.",
      needsInRelationship: ["Freedom", "Adventure", "Intellectual growth", "Optimism"]
    },

    friendship: {
      style: "Adventurous and inspiring guide",
      compatibility: {
        high: ["Aries", "Leo", "Libra", "Aquarius"],
        medium: ["Sagittarius", "Gemini", "Scorpio"],
        low: ["Virgo", "Pisces", "Cancer"]
      },
      qualities: ["Adventure planner", "Philosophical guide", "Optimistic motivator", "Cultural explorer"],
      approach: "Sagittarius friends expand your horizons with travel plans, philosophical discussions, and an infectious enthusiasm for life's possibilities.",
      needsInFriendship: ["Freedom to explore", "Intellectual stimulation", "Adventure sharing", "Optimistic outlook"]
    },

    career: {
      naturalTalents: ["Teaching", "Travel", "Publishing", "Philosophy", "Sports"],
      workStyle: "Freedom-loving explorer",
      motivation: "Knowledge and exploration",
      idealEnvironment: "International, educational, unrestricted"
    },

    health: {
      vulnerabilities: ["Hips", "Thighs", "Liver", "Accidents from haste"],
      strengths: ["Natural optimism", "Active lifestyle", "Quick recovery"],
      advice: "Stay active but avoid overindulgence and reckless behavior"
    },

    spirituality: {
      path: "The philosopher's quest for ultimate truth",
      gifts: ["Wisdom seeking", "Teaching ability", "Spiritual optimism"],
      lifeLesson: "Learning patience and attention to detail"
    },

    mythical: {
      archetype: "The Philosopher",
      totemAnimal: "Centaur/Horse",
      crystals: ["Turquoise", "Sodalite", "Amethyst", "Topaz"],
      colors: ["Purple", "Blue", "Turquoise"],
      mythology: "Blessed by Jupiter's expansive wisdom, Sagittarius carries the divine arrow that pierces illusion to reach truth"
    }
  },

  capricorn: {
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    quality: "Cardinal",
    ruler: "Saturn",
    dates: "December 22 - January 19",
    mysticalPhrase: "The Goat climbs the mountain of cosmic achievement",

    personality: {
      strengths: ["Responsible", "Disciplined", "Self-control", "Good managers"],
      weaknesses: ["Know-it-all", "Unforgiving", "Condescending", "Expecting the worst"],
      traits: "Sacred architect of ambition, Capricorn souls build lasting legacies through disciplined mastery and patient wisdom."
    },

    love: {
      style: "Traditional and committed",
      compatibility: {
        high: ["Taurus", "Virgo", "Scorpio", "Pisces"],
        medium: ["Capricorn", "Cancer"],
        low: ["Aries", "Libra"]
      },
      approach: "Capricorn loves with steadfast commitment, building relationships that stand the test of time through loyalty and dedication.",
      needsInRelationship: ["Respect", "Tradition", "Ambition", "Security"]
    },

    friendship: {
      style: "Dependable and goal-oriented mentor",
      compatibility: {
        high: ["Taurus", "Virgo", "Scorpio", "Pisces"],
        medium: ["Capricorn", "Cancer", "Aquarius"],
        low: ["Aries", "Libra", "Gemini"]
      },
      qualities: ["Reliable advisor", "Long-term planner", "Success supporter", "Wise counselor"],
      approach: "Capricorn friends are the ones who help you build your empire, offering practical wisdom and unwavering support for your long-term goals.",
      needsInFriendship: ["Mutual respect", "Shared goals", "Reliability", "Long-term commitment"]
    },

    career: {
      naturalTalents: ["Management", "Government", "Finance", "Real Estate", "Engineering"],
      workStyle: "Ambitious achiever with long-term vision",
      motivation: "Status and achievement",
      idealEnvironment: "Structured, hierarchical, goal-oriented"
    },

    health: {
      vulnerabilities: ["Bones", "Joints", "Knees", "Skin", "Depression"],
      strengths: ["Endurance", "Discipline", "Longevity"],
      advice: "Balance work with relaxation and maintain bone health"
    },

    spirituality: {
      path: "The master's journey of earned wisdom and responsibility",
      gifts: ["Leadership wisdom", "Discipline", "Long-term vision"],
      lifeLesson: "Learning compassion and emotional expression"
    },

    mythical: {
      archetype: "The Master",
      totemAnimal: "Mountain Goat",
      crystals: ["Garnet", "Black Onyx", "Fluorite", "Hematite"],
      colors: ["Brown", "Black", "Dark Green"],
      mythology: "Disciplined by Saturn's ancient wisdom, Capricorn holds the keys to earthly mastery and spiritual authority"
    }
  },

  aquarius: {
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    quality: "Fixed",
    ruler: "Uranus",
    dates: "January 20 - February 18",
    mysticalPhrase: "The Water Bearer pours forth the nectar of innovation",

    personality: {
      strengths: ["Progressive", "Original", "Independent", "Humanitarian"],
      weaknesses: ["Runs from emotional expression", "Temperamental", "Uncompromising", "Aloof"],
      traits: "Cosmic revolutionary and visionary, Aquarius souls channel future wisdom to liberate humanity from outdated paradigms."
    },

    love: {
      style: "Unconventional and friendship-based",
      compatibility: {
        high: ["Gemini", "Libra", "Aries", "Sagittarius"],
        medium: ["Aquarius", "Leo"],
        low: ["Taurus", "Scorpio"]
      },
      approach: "Aquarius loves through friendship and shared ideals, creating bonds based on intellectual connection and mutual freedom.",
      needsInRelationship: ["Friendship", "Independence", "Intellectual stimulation", "Shared ideals"]
    },

    friendship: {
      style: "Innovative and humanitarian ally",
      compatibility: {
        high: ["Gemini", "Libra", "Aries", "Sagittarius"],
        medium: ["Aquarius", "Leo", "Capricorn"],
        low: ["Taurus", "Scorpio", "Cancer"]
      },
      qualities: ["Progressive thinker", "Group organizer", "Innovation catalyst", "Humanitarian advocate"],
      approach: "Aquarius friends bring you into their network of fascinating people and causes, always ready to brainstorm solutions to make the world better.",
      needsInFriendship: ["Intellectual freedom", "Shared humanitarian values", "Group activities", "Mutual independence"]
    },

    career: {
      naturalTalents: ["Technology", "Science", "Humanitarian work", "Innovation", "Astrology"],
      workStyle: "Independent innovator",
      motivation: "Making the world better",
      idealEnvironment: "Progressive, team-oriented, socially conscious"
    },

    health: {
      vulnerabilities: ["Ankles", "Calves", "Circulation", "Nervous system"],
      strengths: ["Mental vitality", "Innovative healing approaches"],
      advice: "Maintain circulation and balance innovation with rest"
    },

    spirituality: {
      path: "The humanitarian's mission to elevate consciousness",
      gifts: ["Intuitive knowledge", "Revolutionary spirit", "Group consciousness"],
      lifeLesson: "Learning emotional connection while maintaining independence"
    },

    mythical: {
      archetype: "The Visionary",
      totemAnimal: "Eagle",
      crystals: ["Amethyst", "Aquamarine", "Fluorite", "Labradorite"],
      colors: ["Electric Blue", "Silver", "Violet"],
      mythology: "Awakened by Uranus's electric lightning, Aquarius carries the divine water of consciousness to awaken humanity"
    }
  },

  pisces: {
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    quality: "Mutable",
    ruler: "Neptune",
    dates: "February 19 - March 20",
    mysticalPhrase: "The Fish swim in the cosmic ocean of universal love",

    personality: {
      strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise", "Musical"],
      weaknesses: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality", "Victim mentality"],
      traits: "Divine empaths and dreamers, Pisces souls navigate the cosmic ocean with boundless compassion and mystical intuition."
    },

    love: {
      style: "Romantic and intuitive",
      compatibility: {
        high: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
        medium: ["Pisces", "Virgo"],
        low: ["Gemini", "Sagittarius"]
      },
      approach: "Pisces loves with oceanic depth, dissolving boundaries between souls in waves of compassion and spiritual unity.",
      needsInRelationship: ["Emotional connection", "Understanding", "Romance", "Spiritual bond"]
    },

    friendship: {
      style: "Compassionate and intuitive empath",
      compatibility: {
        high: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
        medium: ["Pisces", "Virgo", "Leo"],
        low: ["Gemini", "Sagittarius", "Aries"]
      },
      qualities: ["Empathetic listener", "Creative inspiration", "Spiritual guide", "Unconditional support"],
      approach: "Pisces friends offer a sanctuary of understanding and creativity, always ready to listen without judgment and offer healing through their compassionate presence.",
      needsInFriendship: ["Emotional safety", "Creative expression", "Spiritual connection", "Gentle understanding"]
    },

    career: {
      naturalTalents: ["Arts", "Healing", "Music", "Psychology", "Spirituality"],
      workStyle: "Intuitive creator who serves others",
      motivation: "Helping others and creative expression",
      idealEnvironment: "Creative, healing, spiritually fulfilling"
    },

    health: {
      vulnerabilities: ["Feet", "Immune system", "Addiction tendencies", "Emotional sensitivity"],
      strengths: ["Intuitive healing", "Spiritual wellness", "Empathic abilities"],
      advice: "Protect your energy and practice grounding techniques"
    },

    spirituality: {
      path: "The mystic's journey of universal love and surrender",
      gifts: ["Psychic abilities", "Healing touch", "Universal compassion"],
      lifeLesson: "Learning boundaries while maintaining compassion"
    },

    mythical: {
      archetype: "The Mystic",
      totemAnimal: "Fish/Dolphin",
      crystals: ["Aquamarine", "Moonstone", "Amethyst", "Fluorite"],
      colors: ["Sea Green", "Lavender", "Silver"],
      mythology: "Blessed by Neptune's oceanic mysteries, Pisces holds the key to divine compassion and spiritual transcendence"
    }
  }
};

module.exports = zodiacSigns;