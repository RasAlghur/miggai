// main.js - MIGGAI website interactive effects
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all effects
    generateStars();
    initFloatingElements();
    initParallaxEffect();
    initGlitchEffect();
    initCyberScanners();
    initScrollAnimations();
    initButtonEffects();
});

// ==========================================
// STARS BACKGROUND EFFECT
// ==========================================
function generateStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 150;

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        // Random size
        const size = Math.random() * 2;

        // Random opacity
        const opacity = Math.random() * 0.8 + 0.2;

        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;

        // Add animation with random delay
        star.style.animation = `pulse 3s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 3}s`;

        starsContainer.appendChild(star);
    }

    // Add occasional shooting stars
    setInterval(createShootingStar, 8000);
}

function createShootingStar() {
    const starsContainer = document.getElementById('stars');
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';

    // Random position (top half of screen)
    const startX = Math.random() * 80;
    const startY = Math.random() * 40;

    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;

    starsContainer.appendChild(shootingStar);

    // Remove after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

// ==========================================
// FLOATING ELEMENTS EFFECT
// ==========================================
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');

    floatingElements.forEach(element => {
        // Add random slight rotation to floating elements
        const randomRotation = (Math.random() - 0.5) * 5; // -2.5 to 2.5 degrees
        element.style.transform = `rotate(${randomRotation}deg)`;

        // Random float animation timing
        const animationDuration = 3 + Math.random() * 2; // 3-5s
        element.style.animation = `float ${animationDuration}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 2}s`;
    });
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
function initParallaxEffect() {
    window.addEventListener('mousemove', function (e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const gridOverlay = document.getElementById('grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }

        // Subtle parallax for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px) rotate(${(Math.random() - 0.5) * 2}deg)`;
        }

        // Move stars slightly for depth
        const stars = document.getElementById('stars');
        if (stars) {
            stars.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
        }
    });
}

// ==========================================
// GLITCH TEXT EFFECT
// ==========================================
function initGlitchEffect() {
    const glitchTexts = document.querySelectorAll('.glitch-text');

    glitchTexts.forEach(text => {
        // Set up occasional glitch
        setInterval(() => {
            triggerGlitch(text);
        }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
    });
}

function triggerGlitch(element) {
    element.classList.add('glitching');

    // Remove class after glitch effect
    setTimeout(() => {
        element.classList.remove('glitching');
    }, 500);
}

// ==========================================
// CYBER SCANNER EFFECT
// ==========================================
function initCyberScanners() {
    const scanners = document.querySelectorAll('.cyber-scanner');

    scanners.forEach(scanner => {
        // Random start delay
        setTimeout(() => {
            scanner.style.animation = 'scanning 3s linear infinite';
        }, Math.random() * 2000);
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    // Create IntersectionObserver to trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // For roadmap items, add sequential delay
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections, cards, and timeline items
    document.querySelectorAll('section, .card, .timeline-item').forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// BUTTON EFFECTS
// ==========================================
function initButtonEffects() {
    // Add hover and click effects to buttons
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        // Create ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add special effect to primary buttons
    document.querySelectorAll('.primary-btn').forEach(button => {
        // Add glow pulse
        setInterval(() => {
            button.classList.add('pulse-glow');
            setTimeout(() => {
                button.classList.remove('pulse-glow');
            }, 700);
        }, 3000);
    });
}

// ==========================================
// MATRIX CODE RAIN EFFECT
// ==========================================
// Add matrix rain effect to the background on special interactions
let matrixActive = false;

// Activate matrix rain on konami code or special button press
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function (e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            toggleMatrixEffect();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function toggleMatrixEffect() {
    if (matrixActive) {
        document.getElementById('matrix-container')?.remove();
        matrixActive = false;
        return;
    }

    // Create matrix container
    const matrixContainer = document.createElement('div');
    matrixContainer.id = 'matrix-container';
    document.body.appendChild(matrixContainer);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrixContainer.appendChild(canvas);

    // Initialize matrix effect
    initMatrixRain(canvas);
    matrixActive = true;

    // Add exit button
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit Matrix';
    exitButton.className = 'matrix-exit';
    exitButton.addEventListener('click', toggleMatrixEffect);
    matrixContainer.appendChild(exitButton);
}

function initMatrixRain(canvas) {
    const ctx = canvas.getContext('2d');
    const characters = 'MIGGAI01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array to track y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // Set semi-transparent black background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f6';
        ctx.font = `${fontSize}px monospace`;

        // Loop through each drop
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = characters.charAt(Math.floor(Math.random() * characters.length));

            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Randomly reset some drops to top
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move drop down
            drops[i]++;
        }
    }

    // Animation loop
    const interval = setInterval(draw, 50);

    // Store interval reference for cleanup
    canvas.dataset.intervalId = interval;
}

// ==========================================
// LOADING EFFECT
// ==========================================
// Simulate loading effect when page loads
function initLoadingEffect() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">INITIALIZING MIGGAI</div>
            <div class="loader-progress">
                <div class="loader-progress-bar"></div>
            </div>
        </div>
    `;

    document.body.appendChild(loader);
    document.body.style.overflow = 'hidden';

    // Simulate loading progress
    const progressBar = loader.querySelector('.loader-progress-bar');
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Remove loader after a short delay
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                    document.body.style.overflow = '';
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}


function initTypingEffect1() {
    const typingLines = [
        '"In code we claw, in memes we trust."'
    ];

    const container = document.createElement("div");
    container.className = "typing-container";
    document.querySelector(".quote").appendChild(container);

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLine = typingLines[lineIndex];
        if (isDeleting) {
            container.textContent = currentLine.substring(0, charIndex--);
        } else {
            container.textContent = currentLine.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentLine.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }

        const delay = isDeleting ? 40 : 70;
        setTimeout(type, delay);
    }

    type();
}

function initTypingEffect2() {
    const typingLines = [
        "This is where memes meet mission. Where AI degens find their home.",
    ];

    const container = document.createElement("p");
    container.className = "typing-container";
    document.querySelector(".prods").appendChild(container);

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLine = typingLines[lineIndex];
        if (isDeleting) {
            container.textContent = currentLine.substring(0, charIndex--);
        } else {
            container.textContent = currentLine.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentLine.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }

        const delay = isDeleting ? 40 : 70;
        setTimeout(type, delay);
    }

    type();
}

function initTypingEffect3() {
    const typingLines = [
        "MIGGAI gives you power, purpose, and purrs.",
    ];

    const container = document.createElement("p");
    container.className = "typing-container";
    document.querySelector(".prods2").appendChild(container);

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLine = typingLines[lineIndex];
        if (isDeleting) {
            container.textContent = currentLine.substring(0, charIndex--);
        } else {
            container.textContent = currentLine.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentLine.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }

        const delay = isDeleting ? 40 : 70;
        setTimeout(type, delay);
    }

    type();
}

function initTypingEffect4() {
    const typingLines = [
        "MIGGAI is more than a meme. It's a force. And you're early.",
    ];

    const container = document.createElement("p");
    container.className = "typing-container";
    document.querySelector(".prods3").appendChild(container);

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLine = typingLines[lineIndex];
        if (isDeleting) {
            container.textContent = currentLine.substring(0, charIndex--);
        } else {
            container.textContent = currentLine.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentLine.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }

        const delay = isDeleting ? 40 : 70;
        setTimeout(type, delay);
    }

    type();
}

function initTypingEffect5() {
    const typingLines = [
        "Every token has purpose. Every claw has precision.",
    ];

    const container = document.createElement("p");
    container.className = "typing-container";
    document.querySelector(".prods4").appendChild(container);

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLine = typingLines[lineIndex];
        if (isDeleting) {
            container.textContent = currentLine.substring(0, charIndex--);
        } else {
            container.textContent = currentLine.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentLine.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
        }

        const delay = isDeleting ? 40 : 70;
        setTimeout(type, delay);
    }

    type();
}

document.addEventListener("DOMContentLoaded", () => {
    initTypingEffect1();
    initTypingEffect2();
    initTypingEffect3();
    initTypingEffect4();
    initTypingEffect5();
});

// Call loading effect immediately on script load
initLoadingEffect();