// Page navigation and interactions
let currentPage = 1;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website initialized');
    createFloatingHearts();
    setupAllButtons();
});

// Function to go to a specific page
function goToPage(pageNumber) {
    console.log(`Going from page ${currentPage} to page ${pageNumber}`);
    
    // Hide current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page
    setTimeout(() => {
        const newPageElement = document.getElementById(`page${pageNumber}`);
        if (newPageElement) {
            newPageElement.classList.add('active');
            currentPage = pageNumber;
            console.log(`Now on page ${currentPage}`);
        }
    }, 300);
    
    // Add some celebration effect for transitions
    createTemporaryHearts();
}

// Setup all buttons with clear separation
function setupAllButtons() {
    // Setup YES buttons - all work the same way
    const yesButtons = document.querySelectorAll('.yes-btn');
    yesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Yes button clicked');
            goToFinalPage();
        });
    });
    
    // Setup REGULAR NO buttons (pages 1, 2, 3) - these should be clickable
    const regularNoButtons = document.querySelectorAll('#page1 .no-btn, #page2 .no-btn, #page3 .no-btn');
    console.log(`Found ${regularNoButtons.length} regular no buttons`);
    
    regularNoButtons.forEach((button, index) => {
        console.log(`Setting up regular no button ${index + 1} on page ${button.closest('.page').id}`);
        
        // Remove any existing event listeners by cloning the button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add click event
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Regular No button clicked on ${this.closest('.page').id}`);
            
            const nextPage = this.getAttribute('data-next-page');
            if (nextPage) {
                console.log(`Moving to page ${nextPage}`);
                goToPage(parseInt(nextPage));
            }
        });
        
        // Ensure these buttons are always normal
        newButton.style.position = 'static';
        newButton.style.pointerEvents = 'auto';
    });
    
    // Setup MOVING NO button (page 4 only) - this should move around
    const movingButton = document.getElementById('movingNoBtn');
    if (movingButton) {
        console.log('Setting up moving button on page 4');
        
        movingButton.addEventListener('mouseenter', function() {
            console.log('Moving button hovered');
            moveButton(this);
        });
        
        movingButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Moving button clicked');
            moveButton(this);
            
            this.textContent = 'Nahi! 😤';
            setTimeout(() => {
                this.textContent = 'No';
            }, 1000);
        });
        
        movingButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveButton(this);
        });
    }
}

// Function to go to final page
function goToFinalPage() {
    console.log(`Going from page ${currentPage} to final page`);
    
    // Hide current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show final page with celebration
    setTimeout(() => {
        const finalPageElement = document.getElementById('finalPage');
        if (finalPageElement) {
            finalPageElement.classList.add('active');
            currentPage = 'final';
            
            // Trigger celebration
            celebrateSuccess();
        }
    }, 300);
}

// Setup Yes buttons
function setupYesButtons() {
    const yesButtons = document.querySelectorAll('.yes-btn');
    
    yesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Yes button clicked');
            goToFinalPage();
        });
    });
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['💖', '💕', '❤️', '💗', '💝', '💘', '💙', '💜'];
    
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
    const heartEmojis = ['💔', '😢', '😭', '💸'];
    
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

// Setup the moving no button for page 4 ONLY
function setupMovingNoButton() {
    const movingBtn = document.getElementById('movingNoBtn');
    
    if (movingBtn) {
        // Only apply moving behavior to the specific button on page 4
        movingBtn.addEventListener('mouseenter', function() {
            // Double check this is the moving button
            if (this.id === 'movingNoBtn') {
                moveButton(this);
            }
        });
        
        movingBtn.addEventListener('click', function(e) {
            // Double check this is the moving button
            if (this.id === 'movingNoBtn') {
                e.preventDefault();
                moveButton(this);
                
                // Show a cute message
                this.textContent = 'Nahi! 😤';
                setTimeout(() => {
                    this.textContent = 'No';
                }, 1000);
            }
        });
        
        // Also trigger on touch devices
        movingBtn.addEventListener('touchstart', function(e) {
            // Double check this is the moving button
            if (this.id === 'movingNoBtn') {
                e.preventDefault();
                moveButton(this);
            }
        });
    }
}

// Setup regular no buttons for pages 1-3 ONLY
function setupRegularNoButtons() {
    // Add event listeners to all regular no buttons (exclude the moving one)
    const regularNoButtons = document.querySelectorAll('.no-btn:not(#movingNoBtn)');
    
    console.log(`Found ${regularNoButtons.length} regular no buttons`);
    
    regularNoButtons.forEach((button, index) => {
        console.log(`Setting up regular no button ${index + 1}`);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Regular No button clicked');
            
            // Get the next page from the data attribute
            const nextPage = this.getAttribute('data-next-page');
            if (nextPage) {
                console.log(`Moving to page ${nextPage}`);
                goToPage(parseInt(nextPage));
            }
        });
        
        // Make sure these buttons are always clickable
        button.style.pointerEvents = 'auto';
        button.style.position = 'static';
    });
}

// Move the no button to a random position (ONLY for page 4 moving button)
function moveButton(button) {
    // Safety check: only move the specific moving button
    if (button.id !== 'movingNoBtn') {
        console.log('Not moving button, ignoring move request');
        return;
    }
    
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

// Celebration when user finally says yes
function celebrateSuccess() {
    // Create lots of celebration hearts
    const heartsContainer = document.querySelector('.hearts-container');
    const celebrationEmojis = ['💖', '💕', '❤️', '💗', '💝', '💘', '🎉', '✨', '🌟', '💫'];
    
    // Burst of celebration hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 50);
    }
    
    // Change background temporarily
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #f093fb 25%, #f5576c 50%, #4facfe 75%, #00f2fe 100%)';
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
    }, 3000);
    
    // Play success sound (if browser supports it)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+H7tWAaBjiS0fPMeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7tWAaBjiS0fPOeSsFJXfH8N+QQAoUXrTp66hVFApFn+H7t');
        audio.play().catch(() => {
            // Ignore audio errors
        });
    } catch (e) {
        // Ignore audio errors
    }
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
