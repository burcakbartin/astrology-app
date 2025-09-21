// Birth Chart JavaScript for the astrology app
// Handles birth information form and displays complete natal charts

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('birth-chart-form');
    const loading = document.getElementById('chart-loading');
    const results = document.getElementById('birth-chart-results');
    const formSection = document.getElementById('birth-form-section');

    // Add form submission handler
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        await generateBirthChart();
    });

    async function generateBirthChart() {
        try {
            // Get form data
            const formData = {
                birthDate: document.getElementById('birth-date').value,
                birthTime: document.getElementById('birth-time').value || '12:00',
                birthLocation: document.getElementById('birth-location').value || 'Unknown',
                birthName: document.getElementById('birth-name').value || 'Cosmic Seeker'
            };

            // Validate required fields
            if (!formData.birthDate) {
                showError('Please enter your birth date');
                return;
            }

            // Show loading state
            showLoading();

            // Call birth chart API
            const response = await fetch('/api/birth-chart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate birth chart');
            }

            if (data.success) {
                // Update chart title with name
                document.getElementById('chart-title').textContent =
                    `${formData.birthName}'s Cosmic Soul Map`;

                document.getElementById('chart-subtitle').textContent =
                    `Born on ${new Date(formData.birthDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}`;

                // Display all sections
                displayCoreTrinity(data.birthChart.coreTrinity);
                displayPlanets(data.birthChart.planets);
                displaySoulPoints(data.birthChart.planets);
                displayInterpretations(
                    data.birthChart.interpretation,
                    data.birthChart.elementalBalance,
                    data.birthChart.modalAnalysis
                );

                // Hide loading and show results
                hideLoading();
                showResults();

            } else {
                throw new Error(data.error || 'Unknown error occurred');
            }

        } catch (error) {
            console.error('Error generating birth chart:', error);
            showError(error.message);
        }
    }

    // Helper functions for displaying results
    function displayCoreTrinity(coreTrinity) {
        // Sun Sign
        const sunInfo = document.getElementById('sun-info');
        sunInfo.innerHTML = `
            <div class="sign-name">${coreTrinity.sun.data.symbol} ${coreTrinity.sun.data.name}</div>
            <div class="sign-element">${coreTrinity.sun.data.element}</div>
        `;

        // Moon Sign
        const moonInfo = document.getElementById('moon-info');
        moonInfo.innerHTML = `
            <div class="sign-name">${coreTrinity.moon.data.symbol} ${coreTrinity.moon.data.name}</div>
            <div class="sign-element">${coreTrinity.moon.data.element}</div>
        `;

        // Rising Sign
        const risingInfo = document.getElementById('rising-info');
        risingInfo.innerHTML = `
            <div class="sign-name">${coreTrinity.ascendant.data.symbol} ${coreTrinity.ascendant.data.name}</div>
            <div class="sign-element">${coreTrinity.ascendant.data.element}</div>
        `;
    }

    function displayPlanets(planets) {
        const planetsGrid = document.getElementById('planets-grid');

        // Filter to show main planets (exclude soul points)
        const mainPlanets = planets.filter(p =>
            ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(p.name)
        );

        planetsGrid.innerHTML = mainPlanets.map(planet => `
            <div class="planet-card" onclick="showPlanetDetail('${planet.name}')">
                <div class="planet-header">
                    <div class="planet-symbol">${planet.planetData.symbol}</div>
                    <h4>${planet.planetData.name}</h4>
                </div>
                <div class="planet-position">
                    <span class="sign-symbol">${planet.signData.symbol}</span>
                    <span class="sign-name">${planet.signData.name}</span>
                </div>
                <p class="planet-meaning">${planet.planetData.represents}</p>
                <div class="element-badge ${planet.signData.element.toLowerCase()}">${planet.signData.element}</div>
            </div>
        `).join('');
    }

    function displaySoulPoints(planets) {
        const soulPointsGrid = document.getElementById('soul-points-grid');

        // Filter to show soul points
        const soulPoints = planets.filter(p =>
            ['lilith', 'northnode', 'southnode', 'midheaven'].includes(p.name)
        );

        soulPointsGrid.innerHTML = soulPoints.map(point => `
            <div class="soul-point-card" onclick="showPlanetDetail('${point.name}')">
                <div class="soul-point-header">
                    <div class="soul-symbol">${point.planetData.symbol}</div>
                    <h4>${point.planetData.name}</h4>
                </div>
                <div class="soul-position">
                    <span class="sign-symbol">${point.signData.symbol}</span>
                    <span class="sign-name">${point.signData.name}</span>
                </div>
                <p class="soul-meaning">${point.planetData.represents}</p>
                <div class="archetype-badge">${point.planetData.archetype}</div>
            </div>
        `).join('');
    }

    function displayInterpretations(interpretation, elementalBalance, modalAnalysis) {
        const interpretationSections = document.getElementById('interpretation-sections');

        interpretationSections.innerHTML = `
            <div class="interpretation-card">
                <h4>🌟 Your Core Essence</h4>
                <p>${interpretation.corePersonality}</p>
            </div>

            <div class="interpretation-card">
                <h4>🌙 Your Emotional Nature</h4>
                <p>${interpretation.emotionalNature}</p>
            </div>

            <div class="interpretation-card">
                <h4>🎭 How Others See You</h4>
                <p>${interpretation.outwardPersona}</p>
            </div>

            <div class="interpretation-card">
                <h4>⚡ Your Life Challenge</h4>
                <p>${interpretation.lifeChallenge}</p>
            </div>

            <div class="interpretation-card">
                <h4>🎯 Your Soul Purpose</h4>
                <p>${interpretation.soulPurpose}</p>
            </div>

            <div class="interpretation-card elemental-card">
                <h4>🔥 Elemental Balance</h4>
                <div class="dominant-element">Dominant: ${elementalBalance.dominantElement}</div>
                <div class="element-percentages">
                    ${Object.entries(elementalBalance.percentages).map(([element, percent]) =>
                        `<div class="element-bar">
                            <span>${element}</span>
                            <div class="progress-bar">
                                <div class="progress-fill ${element.toLowerCase()}" style="width: ${percent}%"></div>
                            </div>
                            <span>${percent}%</span>
                        </div>`
                    ).join('')}
                </div>
                <p>${elementalBalance.interpretation}</p>
            </div>

            <div class="interpretation-card modal-card">
                <h4>⚖️ Modal Balance</h4>
                <div class="dominant-mode">Dominant: ${modalAnalysis.dominantMode}</div>
                <div class="mode-percentages">
                    ${Object.entries(modalAnalysis.percentages).map(([mode, percent]) =>
                        `<div class="mode-bar">
                            <span>${mode}</span>
                            <div class="progress-bar">
                                <div class="progress-fill ${mode.toLowerCase()}" style="width: ${percent}%"></div>
                            </div>
                            <span>${percent}%</span>
                        </div>`
                    ).join('')}
                </div>
                <p>${modalAnalysis.interpretation}</p>
            </div>
        `;
    }

    // Global function for showing planet details
    window.showPlanetDetail = function(planetName) {
        // This would open a modal with detailed planet information
        console.log('Show details for:', planetName);
        alert(`Planet detail modal would open here for ${planetName}`);
    };

    // Global function to reset and show form again
    window.resetChart = function() {
        formSection.classList.remove('hidden');
        formSection.classList.add('active');
        results.classList.add('hidden');
        results.classList.remove('active');
        form.reset();
    };

    function showLoading() {
        formSection.classList.add('hidden');
        loading.classList.remove('hidden');
        results.classList.add('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    function showResults() {
        results.classList.remove('hidden');
        results.classList.add('active');
    }

    function showError(message) {
        hideLoading();
        alert(`Error: ${message}`);
        formSection.classList.remove('hidden');
    }

    console.log('🌌 Birth Chart app loaded successfully!');
});