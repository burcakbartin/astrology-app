// Tarot Fortune Teller JavaScript
// Handles user interactions for tarot card readings

document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to important DOM elements
    const readingSelection = document.getElementById('reading-selection');
    const cardDrawing = document.getElementById('card-drawing');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const readingResults = document.getElementById('reading-results');
    const newReading = document.getElementById('new-reading');
    
    const selectReadingBtns = document.querySelectorAll('.select-reading-btn');
    const drawCardsBtn = document.getElementById('draw-cards-btn');
    const newReadingBtn = document.getElementById('new-reading-btn');
    const deckCard = document.getElementById('deck-card');
    
    let selectedReadingType = null;

    // Gandalf dialogue for different stages
    const gandalfDialogue = {
        initial: "Focus your mind, young seeker. The cards shall reveal what must be known...",
        single: "One card holds great wisdom. Choose wisely, for it shall guide your path...",
        three: "Three cards await - Past, Present, and Future intertwined. Prepare yourself...",
        drawing: "The ancient magic stirs... The cards are choosing you as much as you choose them...",
        reading: "Behold! The wisdom of the cards unfolds before us. Listen well to their counsel...",
        complete: "The reading is complete. May this wisdom light your way, young traveler..."
    };

    // Function to update Gandalf's dialogue
    function updateGandalfDialogue(stage) {
        const dialogue = document.querySelector('#gandalf-dialogue .dialogue-bubble p');
        if (dialogue && gandalfDialogue[stage]) {
            dialogue.style.opacity = '0';
            setTimeout(() => {
                dialogue.textContent = `"${gandalfDialogue[stage]}"`;
                dialogue.style.opacity = '1';
            }, 300);
        }
    }

    // Utility functions for showing/hiding sections
    function showSection(element) {
        console.log('Showing section:', element);
        if (element) {
            element.classList.remove('hidden');
            element.style.display = 'block';
        }
    }
    
    function hideSection(element) {
        console.log('Hiding section:', element);
        if (element) {
            element.classList.add('hidden');
        }
    }
    
    function hideAllSections() {
        hideSection(readingSelection);
        hideSection(cardDrawing);
        hideSection(loading);
        hideSection(errorMessage);
        hideSection(readingResults);
        hideSection(newReading);
    }
    
    function showError(message = 'Something mystical went wrong. Please try again!') {
        hideAllSections();
        errorMessage.querySelector('p').textContent = message;
        showSection(errorMessage);
        
        // Auto-hide error and return to selection after 3 seconds
        setTimeout(() => {
            hideSection(errorMessage);
            showSection(readingSelection);
        }, 3000);
    }
    
    // Handle reading type selection
    selectReadingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedReadingType = this.getAttribute('data-type');
            console.log(`Selected reading type: ${selectedReadingType}`);
            
            // Update the card drawing UI based on selected type
            const cardDrawingH2 = cardDrawing.querySelector('h2');
            const cardDrawingP = cardDrawing.querySelector('p');
            
            if (selectedReadingType === 'single') {
                cardDrawingH2.textContent = 'Focus on Your Question';
                cardDrawingP.textContent = 'Clear your mind and think about what guidance you seek. One card will reveal the answer...';
                updateGandalfDialogue('single');
            } else {
                cardDrawingH2.textContent = 'Connect with Your Past, Present, and Future';
                cardDrawingP.textContent = 'Take a deep breath and open your mind to the flow of time. Three cards will illuminate your path...';
                updateGandalfDialogue('three');
            }
            
            // Show card drawing section
            hideAllSections();
            showSection(cardDrawing);
        });
    });
    
    // Handle card deck click (same as draw button)
    deckCard.addEventListener('click', function() {
        drawCards();
    });
    
    // Handle draw cards button
    drawCardsBtn.addEventListener('click', function() {
        drawCards();
    });
    
    // Handle new reading button
    newReadingBtn.addEventListener('click', function() {
        selectedReadingType = null;
        hideAllSections();
        showSection(readingSelection);
        updateGandalfDialogue('complete');
        
        // Return to initial dialogue after a moment
        setTimeout(() => {
            updateGandalfDialogue('initial');
        }, 2000);
    });
    
    // Main function to draw cards and get reading
    async function drawCards() {
        if (!selectedReadingType) {
            showError('Please select a reading type first!');
            return;
        }
        
        // Update Gandalf dialogue for drawing phase
        updateGandalfDialogue('drawing');
        
        // Show loading after a brief pause
        setTimeout(async () => {
            hideAllSections();
            showSection(loading);
            
            try {
                console.log('Fetching tarot reading for type:', selectedReadingType);
                
                // Fetch tarot reading from our API
                const response = await fetch(`/api/tarot/reading?type=${selectedReadingType}`);
                
                console.log('API Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('API Response data:', data);
                
                if (data.success) {
                    // Display the reading results
                    displayReading(data.reading);
                } else {
                    throw new Error(data.error || 'Failed to get reading');
                }
                
            } catch (error) {
                console.error('Error fetching tarot reading:', error);
                showError(`The cards couldn't be read: ${error.message}`);
            }
        }, 1000);
    }
    
    // Function to display the reading results
    function displayReading(reading) {
        console.log('Displaying reading:', reading);
        
        // Create the reading results HTML
        const readingHTML = createReadingHTML(reading);
        console.log('Created HTML:', readingHTML);
        
        // Update the results container
        readingResults.innerHTML = readingHTML;
        console.log('Updated readingResults innerHTML');
        
        // Show results and new reading button
        hideAllSections();
        console.log('All sections hidden');
        
        showSection(readingResults);
        console.log('Reading results section shown');
        
        showSection(newReading);
        console.log('New reading section shown');
        
        // Update Gandalf's final dialogue
        setTimeout(() => {
            updateGandalfDialogue('reading');
        }, 500);
        
        // Add animation to cards
        setTimeout(() => {
            const cards = document.querySelectorAll('.tarot-card');
            console.log('Found tarot cards for animation:', cards.length);
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });
        }, 100);
    }
    
    // Function to create the HTML for reading results
    function createReadingHTML(reading) {
        const isThreeCard = reading.type === 'three-card';
        const containerClass = isThreeCard ? 'three-cards' : 'single-card';
        
        let html = `
            <div class="reading-header">
                <h2>Your ${reading.spread} Reading</h2>
                <div class="reading-type">${reading.type === 'single-card' ? 'Single Card Reading' : 'Three Card Spread'}</div>
                <div class="reading-interpretation">
                    ${reading.interpretation}
                </div>
            </div>
            
            <div class="cards-container ${containerClass}">
        `;
        
        // Add each card
        reading.cards.forEach(card => {
            const isReversed = card.reversed;
            const meaning = isReversed ? card.reversed_meaning : card.meaning;
            const positionLabel = getPositionLabel(card.position);
            
            html += `
                <div class="tarot-card">
                    <div class="card-position">${positionLabel}</div>
                    <div class="card-name">${card.name}</div>
                    ${isReversed ? '<div class="card-reversed">🔄 Reversed</div>' : ''}
                    <div class="card-meaning">${meaning}</div>
                    <div class="card-element">${card.suit} • ${card.element}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        return html;
    }
    
    // Function to get readable position labels
    function getPositionLabel(position) {
        const labels = {
            'past': '🕰️ Past Influences',
            'present': '⭐ Present Moment', 
            'future': '🔮 Future Potential'
        };
        return labels[position] || '✨ Guidance';
    }
    
    // Add some mystical atmosphere with subtle animations
    function addMysticalEffects() {
        // Add floating animation to card deck
        const deck = document.getElementById('deck-card');
        if (deck) {
            setInterval(() => {
                deck.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
            }, 16);
        }
    }
    
    // Initialize mystical effects
    addMysticalEffects();
    
    // Log that the tarot system is loaded
    console.log('🔮 Tarot fortune teller loaded successfully!');
    console.log('Available reading types: single, three');
});