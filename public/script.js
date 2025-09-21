// Frontend JavaScript for the astrology app
// This handles user interactions and API communication

// Global functions for navigation
function showComparison() {
    hideAllSections();
    document.getElementById('comparison-section').classList.remove('hidden');
    document.getElementById('comparison-section').classList.add('active');
    updateActiveNav('⚖️ Sign Comparison');
}

function showElements() {
    hideAllSections();
    document.getElementById('elements-section').classList.remove('hidden');
    document.getElementById('elements-section').classList.add('active');
    updateActiveNav('🔥 Elements');
}

function showHoroscope() {
    hideAllSections();
    document.getElementById('horoscope-section').classList.remove('hidden');
    document.getElementById('horoscope-section').classList.add('active');
    updateActiveNav('🌟 Daily Horoscope');
}

function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
}

function updateActiveNav(activeText) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.trim() === activeText) {
            link.classList.add('active');
        }
    });
}

// Wait for the DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to important DOM elements
    const form = document.getElementById('horoscope-form');
    const zodiacSelect = document.getElementById('zodiac-select');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const horoscopeResult = document.getElementById('horoscope-result');
    const submitButton = document.getElementById('get-horoscope-btn');

    // Zodiac sign data with symbols and date ranges
    const zodiacData = {
        aries: { symbol: '♈', dates: 'Mar 21 - Apr 19', name: 'Aries' },
        taurus: { symbol: '♉', dates: 'Apr 20 - May 20', name: 'Taurus' },
        gemini: { symbol: '♊', dates: 'May 21 - Jun 20', name: 'Gemini' },
        cancer: { symbol: '♋', dates: 'Jun 21 - Jul 22', name: 'Cancer' },
        leo: { symbol: '♌', dates: 'Jul 23 - Aug 22', name: 'Leo' },
        virgo: { symbol: '♍', dates: 'Aug 23 - Sep 22', name: 'Virgo' },
        libra: { symbol: '♎', dates: 'Sep 23 - Oct 22', name: 'Libra' },
        scorpio: { symbol: '♏', dates: 'Oct 23 - Nov 21', name: 'Scorpio' },
        sagittarius: { symbol: '♐', dates: 'Nov 22 - Dec 21', name: 'Sagittarius' },
        capricorn: { symbol: '♑', dates: 'Dec 22 - Jan 19', name: 'Capricorn' },
        aquarius: { symbol: '♒', dates: 'Jan 20 - Feb 18', name: 'Aquarius' },
        pisces: { symbol: '♓', dates: 'Feb 19 - Mar 20', name: 'Pisces' }
    };

    // Function to show loading spinner
    function showLoading() {
        loading.classList.remove('hidden');
        hideError();
        hideResult();
        submitButton.disabled = true;
        submitButton.textContent = 'Getting Horoscope...';
    }

    // Function to hide loading spinner
    function hideLoading() {
        loading.classList.add('hidden');
        submitButton.disabled = false;
        submitButton.textContent = 'Get My Horoscope ✨';
    }

    // Function to show error message
    function showError(message = 'Something went wrong. Please try again!') {
        hideLoading();
        hideResult();
        errorMessage.querySelector('p').textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Function to hide error message
    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Function to show horoscope result
    function showResult(data) {
        hideLoading();
        hideError();
        
        const zodiac = zodiacData[data.sign];
        
        // Create the HTML for the horoscope result
        horoscopeResult.innerHTML = `
            <h2>${zodiac.symbol} ${zodiac.name}</h2>
            <div class="date">Today's Horoscope - ${data.date}</div>
            <div class="description">${data.horoscope}</div>
            
            <div class="horoscope-details">
                <div class="detail-item">
                    <div class="label">Mood</div>
                    <div class="value">${data.mood || 'Not available'}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Lucky Color</div>
                    <div class="value">${data.color || 'Not available'}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Lucky Number</div>
                    <div class="value">${data.luckyNumber || 'Not available'}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Lucky Time</div>
                    <div class="value">${data.luckyTime || 'Not available'}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Compatible With</div>
                    <div class="value">${data.compatibility || 'Not available'}</div>
                </div>
            </div>
        `;
        
        horoscopeResult.classList.remove('hidden');
        
        // Smooth scroll to the result
        horoscopeResult.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Function to hide result
    function hideResult() {
        horoscopeResult.classList.add('hidden');
    }

    // Function to fetch horoscope from our backend API
    async function fetchHoroscope(zodiacSign) {
        try {
            // Make API request to our Express server
            const response = await fetch(`/api/horoscope/${zodiacSign}`);
            
            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the JSON response
            const data = await response.json();
            
            // Check if the API returned success
            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Failed to get horoscope');
            }
            
        } catch (error) {
            console.error('Error fetching horoscope:', error);
            throw error;
        }
    }

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Get the selected zodiac sign
        const selectedSign = zodiacSelect.value;
        
        // Validate that a sign was selected
        if (!selectedSign) {
            showError('Please select your zodiac sign first!');
            return;
        }
        
        // Show loading and fetch horoscope
        showLoading();
        
        try {
            // Fetch horoscope data from our API
            const horoscopeData = await fetchHoroscope(selectedSign);
            
            // Display the result
            showResult(horoscopeData);
            
        } catch (error) {
            // Show error message if something goes wrong
            showError(`Failed to get your horoscope: ${error.message}`);
        }
    });

    // Optional: Add some interactivity to the select dropdown
    zodiacSelect.addEventListener('change', function() {
        // Clear previous results when user changes selection
        hideResult();
        hideError();
        
        // You could add animation or other effects here
        if (this.value) {
            const zodiac = zodiacData[this.value];
            console.log(`Selected: ${zodiac.symbol} ${zodiac.name} (${zodiac.dates})`);
        }
    });

    // Optional: Add keyboard shortcut (Enter key) for form submission
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && zodiacSelect.value && !submitButton.disabled) {
            form.dispatchEvent(new Event('submit'));
        }
    });

    console.log('🌟 Astrology app loaded successfully!');
});

// ✨ MYSTICAL COMPARISON FUNCTIONS ✨

async function compareSignsAction() {
    const sign1 = document.getElementById('sign1-select').value;
    const sign2 = document.getElementById('sign2-select').value;

    if (!sign1 || !sign2) {
        alert('Please select both zodiac signs to compare!');
        return;
    }

    if (sign1 === sign2) {
        alert('Please select two different zodiac signs!');
        return;
    }

    try {
        const response = await fetch(`/api/zodiac/compare/${sign1}/${sign2}`);
        const data = await response.json();

        if (data.success) {
            displayComparison(data.comparison);
        } else {
            alert('Failed to compare signs: ' + data.error);
        }
    } catch (error) {
        console.error('Error comparing signs:', error);
        alert('Error comparing signs. Please try again.');
    }
}

function displayComparison(comparison) {
    const resultDiv = document.getElementById('comparison-result');
    const sign1Key = Object.keys(comparison.signs)[0];
    const sign2Key = Object.keys(comparison.signs)[1];
    const sign1Data = comparison.signs[sign1Key];
    const sign2Data = comparison.signs[sign2Key];

    resultDiv.innerHTML = `
        <div class="comparison-container">
            <div class="compatibility-score">
                <h3>🌟 Compatibility Score: ${comparison.compatibility.overall}%</h3>
                <div class="compatibility-bar">
                    <div class="compatibility-fill" style="width: ${comparison.compatibility.overall}%"></div>
                </div>
                <p class="compatibility-rating">${comparison.compatibility.rating}</p>
            </div>

            <div class="signs-comparison">
                <div class="sign-card">
                    <h3>${sign1Data.symbol} ${sign1Data.name}</h3>
                    <div class="mystical-phrase">"${sign1Data.mysticalPhrase}"</div>
                    <div class="sign-details">
                        <p><strong>Element:</strong> ${sign1Data.element}</p>
                        <p><strong>Quality:</strong> ${sign1Data.quality}</p>
                        <p><strong>Ruler:</strong> ${sign1Data.ruler}</p>
                        <p><strong>Archetype:</strong> ${sign1Data.mythical.archetype}</p>
                    </div>

                    <div class="personality-traits">
                        <h4>✨ Strengths</h4>
                        <p>${sign1Data.personality.strengths.slice(0, 3).join(', ')}</p>

                        <h4>💝 Love Style</h4>
                        <p>${sign1Data.love.style}</p>

                        <h4>👫 Friendship Style</h4>
                        <p>${sign1Data.friendship.style}</p>

                        <h4>🏆 Career Focus</h4>
                        <p>${sign1Data.career.workStyle}</p>
                    </div>
                </div>

                <div class="vs-divider">
                    <div class="vs-circle">VS</div>
                </div>

                <div class="sign-card">
                    <h3>${sign2Data.symbol} ${sign2Data.name}</h3>
                    <div class="mystical-phrase">"${sign2Data.mysticalPhrase}"</div>
                    <div class="sign-details">
                        <p><strong>Element:</strong> ${sign2Data.element}</p>
                        <p><strong>Quality:</strong> ${sign2Data.quality}</p>
                        <p><strong>Ruler:</strong> ${sign2Data.ruler}</p>
                        <p><strong>Archetype:</strong> ${sign2Data.mythical.archetype}</p>
                    </div>

                    <div class="personality-traits">
                        <h4>✨ Strengths</h4>
                        <p>${sign2Data.personality.strengths.slice(0, 3).join(', ')}</p>

                        <h4>💝 Love Style</h4>
                        <p>${sign2Data.love.style}</p>

                        <h4>👫 Friendship Style</h4>
                        <p>${sign2Data.friendship.style}</p>

                        <h4>🏆 Career Focus</h4>
                        <p>${sign2Data.career.workStyle}</p>
                    </div>
                </div>
            </div>

            <div class="analysis-sections">
                <div class="analysis-card">
                    <h4>🔥 Elemental Harmony</h4>
                    <p><strong>${sign1Data.element}</strong> meets <strong>${sign2Data.element}</strong></p>
                    <p>${comparison.elementInteraction.harmony}</p>
                </div>

                <div class="analysis-card">
                    <h4>💕 Love Compatibility</h4>
                    <p class="compatibility-level ${comparison.loveCompatibility.romantic}">
                        ${comparison.loveCompatibility.romantic.toUpperCase()}
                    </p>
                    <p>${comparison.loveCompatibility.advice}</p>
                </div>

                <div class="analysis-card">
                    <h4>👫 Friendship Compatibility</h4>
                    <p class="compatibility-level ${comparison.friendshipCompatibility.level}">
                        ${comparison.friendshipCompatibility.level.toUpperCase()}
                    </p>
                    <p>${comparison.friendshipCompatibility.advice}</p>
                </div>

                <div class="analysis-card">
                    <h4>🤝 Career Synergy</h4>
                    <p><strong>${sign1Data.name}:</strong> ${sign1Data.career.workStyle}</p>
                    <p><strong>${sign2Data.name}:</strong> ${sign2Data.career.workStyle}</p>
                </div>
            </div>
        </div>
    `;

    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

async function showElementSigns(element) {
    try {
        const response = await fetch(`/api/zodiac/element/${element}`);
        const data = await response.json();

        if (data.success) {
            displayElementDetails(element, data);
        } else {
            alert('Failed to load element details: ' + data.error);
        }
    } catch (error) {
        console.error('Error loading element details:', error);
        alert('Error loading element details. Please try again.');
    }
}

function displayElementDetails(element, data) {
    const detailsDiv = document.getElementById('element-details');

    const elementEmojis = {
        fire: '🔥',
        earth: '🌍',
        air: '💨',
        water: '💧'
    };

    detailsDiv.innerHTML = `
        <div class="element-detail-container">
            <div class="element-header">
                <h3>${elementEmojis[element]} ${element.charAt(0).toUpperCase() + element.slice(1)} Element</h3>
                <p class="element-description">${data.description}</p>
            </div>

            <div class="element-signs-grid">
                ${data.signs.map(sign => `
                    <div class="element-sign-card" onclick="showSignDetails('${sign.name.toLowerCase()}')">
                        <div class="sign-symbol">${sign.symbol}</div>
                        <h4>${sign.name}</h4>
                        <p class="sign-dates">${sign.dates}</p>
                        <p class="mystical-phrase">"${sign.mysticalPhrase}"</p>
                        <div class="sign-archetype">${sign.mythical.archetype}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    detailsDiv.classList.remove('hidden');
    detailsDiv.scrollIntoView({ behavior: 'smooth' });
}

async function showSignDetails(signName) {
    try {
        const response = await fetch(`/api/zodiac/${signName}`);
        const data = await response.json();

        if (data.success) {
            displaySignModal(data.sign);
        } else {
            alert('Failed to load sign details: ' + data.error);
        }
    } catch (error) {
        console.error('Error loading sign details:', error);
        alert('Error loading sign details. Please try again.');
    }
}

function displaySignModal(sign) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.onclick = () => modal.remove();

    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h2>${sign.symbol} ${sign.name}</h2>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>

            <div class="modal-body">
                <div class="mystical-phrase">"${sign.mysticalPhrase}"</div>

                <div class="sign-info-grid">
                    <div class="info-section">
                        <h4>🌟 Basic Info</h4>
                        <p><strong>Element:</strong> ${sign.element}</p>
                        <p><strong>Quality:</strong> ${sign.quality}</p>
                        <p><strong>Ruler:</strong> ${sign.ruler}</p>
                        <p><strong>Dates:</strong> ${sign.dates}</p>
                    </div>

                    <div class="info-section">
                        <h4>✨ Personality</h4>
                        <p><strong>Strengths:</strong> ${sign.personality.strengths.join(', ')}</p>
                        <p>${sign.personality.traits}</p>
                    </div>

                    <div class="info-section">
                        <h4>💕 Love & Relationships</h4>
                        <p><strong>Style:</strong> ${sign.love.style}</p>
                        <p>${sign.love.approach}</p>
                        <p><strong>Needs:</strong> ${sign.love.needsInRelationship.join(', ')}</p>
                    </div>

                    <div class="info-section">
                        <h4>👫 Friendship & Social Life</h4>
                        <p><strong>Style:</strong> ${sign.friendship.style}</p>
                        <p>${sign.friendship.approach}</p>
                        <p><strong>Qualities:</strong> ${sign.friendship.qualities.join(', ')}</p>
                        <p><strong>Needs:</strong> ${sign.friendship.needsInFriendship.join(', ')}</p>
                    </div>

                    <div class="info-section">
                        <h4>🏆 Career & Work</h4>
                        <p><strong>Work Style:</strong> ${sign.career.workStyle}</p>
                        <p><strong>Talents:</strong> ${sign.career.naturalTalents.join(', ')}</p>
                    </div>

                    <div class="info-section">
                        <h4>🔮 Mystical Aspects</h4>
                        <p><strong>Archetype:</strong> ${sign.mythical.archetype}</p>
                        <p><strong>Totem:</strong> ${sign.mythical.totemAnimal}</p>
                        <p><strong>Crystals:</strong> ${sign.mythical.crystals.join(', ')}</p>
                        <p><strong>Colors:</strong> ${sign.mythical.colors.join(', ')}</p>
                    </div>

                    <div class="info-section">
                        <h4>🙏 Spiritual Path</h4>
                        <p>${sign.spirituality.path}</p>
                        <p><strong>Life Lesson:</strong> ${sign.spirituality.lifeLesson}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}