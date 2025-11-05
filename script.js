let currentTheme = 'classic';
let currentBackground = 'purple';
let isFlipped = false;

function changeTheme(theme) {
    currentTheme = theme;
    
    // Update active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-${theme}`).classList.add('active');
    
    // Update card faces
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    
    // Remove all theme classes
    cardFront.className = cardFront.className.replace(/theme-\w+/g, '');
    cardBack.className = cardBack.className.replace(/theme-\w+/g, '');
    
    // Add new theme
    cardFront.classList.add(`theme-${theme}`);
    cardBack.classList.add(`theme-${theme}`);
    
    // Close dropdown after selection
    document.getElementById('themeDropdown').classList.remove('show');
}

function changeBackground(background) {
    currentBackground = background;
    
    // Update active background button
    document.querySelectorAll('.bg-option').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.bg-${background}`).classList.add('active');
    
    // Update body background
    const backgrounds = {
        purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        ocean: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
        sunset: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        forest: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
        galaxy: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    };
    
    document.body.style.background = backgrounds[background];
    
    // Close dropdown after selection
    document.getElementById('themeDropdown').classList.remove('show');
}

function flipCard() {
    const card = document.getElementById('teacherCard');
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        card.classList.add('flipped');
        createConfetti();
    } else {
        card.classList.remove('flipped');
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

function toggleCustomize() {
    const dropdown = document.getElementById('themeDropdown');
    dropdown.classList.toggle('show');
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDisplay = document.getElementById('photoDisplay');
            photoDisplay.innerHTML = `<img src="${e.target.result}" alt="Teacher Photo" class="photo-preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function openMemories() {
    document.getElementById('memoriesModal').classList.add('show');
}

function closeMemories() {
    document.getElementById('memoriesModal').classList.remove('show');
}

function viewFullPhoto(element) {
    // Create full-size view for placeholder photos
    const fullView = document.createElement('div');
    fullView.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 3000; display: flex;
        align-items: center; justify-content: center; cursor: pointer;
        flex-direction: column;
    `;
    
    const fullContent = document.createElement('div');
    fullContent.style.cssText = `
        background: ${element.style.background || getComputedStyle(element).background};
        border-radius: 20px; padding: 60px; text-align: center;
        max-width: 80%; max-height: 80%;
    `;
    fullContent.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">${element.textContent.split(' ')[0]}</div>
        <h3 style="font-size: 2rem; color: ${getComputedStyle(element).color}; margin: 0;">
            ${element.textContent}
        </h3>
        <p style="margin-top: 20px; opacity: 0.8; font-size: 1.2rem;">
            Click anywhere to close
        </p>
    `;
    
    fullView.appendChild(fullContent);
    fullView.onclick = () => fullView.remove();
    document.body.appendChild(fullView);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('themeDropdown');
        const customizeBtn = event.target.closest('.customize-dropdown');
        
        if (!customizeBtn && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });

    // Close memories modal when clicking outside
    document.getElementById('memoriesModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeMemories();
        }
    });

    // Add interactive sparkle effects on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.98) {
            createSparkle(e.clientX, e.clientY);
        }
    });
});