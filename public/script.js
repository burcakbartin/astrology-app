// Frontend JavaScript for the astrology app
// This handles user interactions and API communication

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