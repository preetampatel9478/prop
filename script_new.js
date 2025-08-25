// Page navigation and interactions
let currentPage = 1;

// Function to go to a specific page (Instant transition)
function goToPage(pageNumber) {
    console.log(`Going from page ${currentPage} to page ${pageNumber}`);
    
    // Hide current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page INSTANTLY - no delay!
    const newPageElement = document.getElementById(`page${pageNumber}`);
    if (newPageElement) {
        newPageElement.classList.add('active');
        currentPage = pageNumber;
        console.log(`Now on page ${currentPage}`);
        
        // Setup special behaviors for each page
        if (pageNumber === 3) {
            setTimeout(() => setupPage3NoButton(), 100);
        } else if (pageNumber === 4) {
            setTimeout(() => setupMovingButton(), 100);
        }
    }
    
    // Add some celebration effect for transitions
    createTemporaryHearts();
}

// Function to go to final page (Instant transition)
function goToFinalPage() {
    console.log(`Going from page ${currentPage} to final page`);
    
    // Hide current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show final page INSTANTLY - no delay!
    const finalPageElement = document.getElementById('finalPage');
    if (finalPageElement) {
        finalPageElement.classList.add('active');
        currentPage = 'final';
        
        // Trigger celebration
        celebrateSuccess();
    }
}

// Make functions globally available for inline handlers
window.goToPage = goToPage;
window.goToFinalPage = goToFinalPage;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website initialized');
    createFloatingHearts();
    setupAllButtons();
    
    // Test function to make sure buttons are working
    setTimeout(() => {
        const page1NoBtn = document.querySelector('#page1 .no-btn');
        if (page1NoBtn) {
            console.log('Page 1 No button found and should be working');
            console.log('Button styles:', {
                position: page1NoBtn.style.position,
                pointerEvents: page1NoBtn.style.pointerEvents,
                display: getComputedStyle(page1NoBtn).display
            });
        }
    }, 1000);
});

// Setup all buttons with clear separation
function setupAllButtons() {
    console.log('Setting up all buttons...');
    
    // Setup YES buttons - all work the same way
    const yesButtons = document.querySelectorAll('.yes-btn');
    console.log(`Found ${yesButtons.length} yes buttons`);
    
    yesButtons.forEach((button, index) => {
        console.log(`Setting up yes button ${index + 1}`);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Yes button clicked');
            goToFinalPage();
        });
    });
    
    // Setup REGULAR NO buttons individually for pages 1, 2, 3
    setupPage1NoButton();
    setupPage2NoButton();
    setupPage3NoButton();
    setupPage4MovingButton();
}

function setupPage1NoButton() {
    const button = document.querySelector('#page1 .no-btn');
    if (button) {
        console.log('Setting up Page 1 No button');
        
        // Reset button state completely
        button.style.position = 'static';
        button.style.pointerEvents = 'auto';
        button.style.left = 'auto';
        button.style.top = 'auto';
        button.style.transform = 'none';
        
        // Remove any existing event listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add fresh click event
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Page 1 No button clicked - going to page 2');
            goToPage(2);
        });
        
        // Test if button is clickable
        newButton.addEventListener('mouseenter', function() {
            console.log('Page 1 No button hovered - should be clickable');
        });
        
        console.log('Page 1 No button setup complete');
    } else {
        console.error('Page 1 No button not found!');
    }
}

function setupPage2NoButton() {
    const button = document.querySelector('#page2 .no-btn');
    if (button) {
        console.log('Setting up Page 2 No button');
        button.style.position = 'static';
        button.style.pointerEvents = 'auto';
        button.style.left = 'auto';
        button.style.top = 'auto';
        
        // Remove any moving behavior
        button.removeEventListener('mouseenter', moveButton);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Page 2 No button clicked - going to page 3');
            goToPage(3);
        });
        
        // Prevent any hover effects
        button.addEventListener('mouseenter', function(e) {
            console.log('Page 2 No button hovered - should NOT move');
            e.stopPropagation();
        });
    }
}

function setupPage3NoButton() {
    const button = document.getElementById('movingNoBtn3');
    if (button) {
        console.log('Setting up Page 3 Moving button');
        
        button.addEventListener('mouseenter', function(e) {
            console.log('Page 3 Moving button hovered - SHOULD move');
            moveButton(this);
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Page 3 Moving button clicked - SHOULD move');
            moveButton(this);
            
            this.textContent = 'Nahi yaar! 😤';
            setTimeout(() => {
                this.textContent = 'No';
            }, 1000);
        });
        
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveButton(this);
        });
    }
}

function setupPage4MovingButton() {
    const button = document.getElementById('movingNoBtn');
    if (button) {
        console.log('Setting up Page 4 Moving button');
        
        button.addEventListener('mouseenter', function(e) {
            console.log('Page 4 Moving button hovered - SHOULD move');
            moveButton(this);
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Page 4 Moving button clicked - SHOULD move');
            moveButton(this);
            
            this.textContent = 'Nahi! 😤';
            setTimeout(() => {
                this.textContent = 'No';
            }, 1000);
        });
    }
}

// Move the no button to a random position (ONLY for page 4 moving button)
function moveButton(button) {
    // Multiple safety checks: only move the specific moving button on page 4
    if (!button || button.id !== 'movingNoBtn') {
        console.log('Not moving button, ignoring move request');
        return;
    }
    
    // Extra check: make sure we're on page 4
    const page4 = document.getElementById('page4');
    if (!page4 || !page4.classList.contains('active')) {
        console.log('Not on page 4, ignoring move request');
        return;
    }
    
    // Final check: make sure the button is inside page 4
    if (!button.closest('#page4')) {
        console.log('Button not in page 4, ignoring move request');
        return;
    }
    
    console.log('Moving the page 4 button...');
    const container = button.closest('.page');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate safe boundaries
    const maxX = containerRect.width - buttonRect.width - 50;
    const maxY = containerRect.height - buttonRect.height - 50;
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply new position
    button.style.position = 'absolute';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    
    // Add shake animation
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['�', '🩵', '💎', '�', '✨', '🌸', '🦋', '❄️'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random position and animation duration
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 800);
    
    // Create some initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Create temporary hearts for transitions
function createTemporaryHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['💔', '😢', '�', '🌧️'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = '2s';
            heart.style.fontSize = '25px';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// Celebration when user finally says yes
function celebrateSuccess() {
    // Create lots of celebration hearts
    const heartsContainer = document.querySelector('.hearts-container');
    const celebrationEmojis = ['�', '🩵', '💎', '�', '✨', '🌸', '🦋', '❄️', '�', '🌟'];
    
    // Burst of celebration hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`; // Blue color range
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 50);
    }
    
    // Change background temporarily to more vibrant blues
    document.body.style.background = 'linear-gradient(135deg, #74b9ff 0%, #00cec9 25%, #55a3ff 50%, #74b9ff 75%, #a8d8ea 100%)';
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #a8d8ea 0%, #c8e6f5 30%, #d4e6f1 60%, #e8f4fd 100%)';
    }, 3000);
}

// Add shake animation for moving button
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);

// Prevent right-click context menu for fun
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    createTemporaryHearts();
});

// Add some keyboard interactions
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (currentPage === 'final') return;
        
        // Simulate clicking Yes button
        const yesBtn = document.querySelector(`#page${currentPage} .yes-btn`);
        if (yesBtn) {
            yesBtn.click();
        }
    }
    
    if (e.key === 'Escape') {
        // Reset to first page
        goToPage(1);
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';
        
        setTimeout(() => {
            document.body.style.transform = '';
            celebrateSuccess();
        }, 2000);
        
        konamiCode = [];
    }
});
