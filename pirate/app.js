// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const treasureBox = document.getElementById('treasure-box');
const treasureChest = document.getElementById('treasure-chest');
const goldenGlow = document.getElementById('golden-glow');
const lightRays = document.getElementById('light-rays');
const sparklesContainer = document.getElementById('sparkles');
const particleBurst = document.getElementById('particle-burst');
const gemsReveal = document.getElementById('gems-reveal');
const registerBtn = document.getElementById('register-btn');
const navbar = document.querySelector('nav');
const treasureHint = document.querySelector('.treasure-hint');

// State Management
let treasureOpened = false;
let isScrolling = false;
let animationInProgress = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupEnhancedTreasureBox();
    setupSmoothScrolling();
    setupScrollEffects();
    setupRegistration();
    setupParticleSystem();
    setupAnimationObserver();
    setupNavbarScroll();
    fixBodyHeight();
}

// Fix body height and scrolling issues
function fixBodyHeight() {
    // Ensure proper document height calculation
    const body = document.body;
    const html = document.documentElement;
    
    // Remove any potential overflow issues
    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';
    
    // Ensure clean page ending at footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.marginBottom = '0';
        footer.style.paddingBottom = '3rem';
    }
}

// Mobile Menu Functionality
function setupMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            mobileMenu.classList.add('hidden');
            // Don't prevent default here, let handleSmoothScroll handle it
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Enhanced Treasure Box Animation System
function setupEnhancedTreasureBox() {
    if (!treasureBox) return;
    
    treasureBox.addEventListener('click', openEnhancedTreasureBox);
    
    // Add hover effects
    treasureBox.addEventListener('mouseenter', () => {
        if (!treasureOpened && !animationInProgress) {
            treasureChest.style.transform = 'scale(1.05) rotateY(5deg)';
            treasureHint.style.textShadow = '0 0 20px rgba(245, 158, 11, 1)';
        }
    });
    
    treasureBox.addEventListener('mouseleave', () => {
        if (!treasureOpened && !animationInProgress) {
            treasureChest.style.transform = 'scale(1) rotateY(0deg)';
            treasureHint.style.textShadow = '0 0 5px rgba(245, 158, 11, 0.5)';
        }
    });
}

function openEnhancedTreasureBox() {
    if (treasureOpened || animationInProgress) return;
    
    animationInProgress = true;
    treasureOpened = true;
    
    // Update hint text
    if (treasureHint) {
        treasureHint.classList.add('clicked');
        treasureHint.textContent = 'Treasure Opening...';
    }
    
    // Step 1: Chest opening animation
    treasureChest.classList.add('opening');
    
    // Step 2: Golden glow effect (starts slightly after chest begins opening)
    setTimeout(() => {
        goldenGlow.classList.add('active');
    }, 300);
    
    // Step 3: Light rays (starts after glow)
    setTimeout(() => {
        lightRays.classList.add('active');
        const rays = lightRays.querySelectorAll('.ray');
        rays.forEach(ray => ray.classList.add('active'));
    }, 600);
    
    // Step 4: Sparkle burst effect
    setTimeout(() => {
        sparklesContainer.classList.add('active');
        const sparkles = sparklesContainer.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.classList.add('burst'));
        
        // Create floating gems effect
        createAdvancedFloatingGems();
    }, 900);
    
    // Step 5: Particle explosion
    setTimeout(() => {
        createParticleExplosion();
    }, 1000);
    
    // Step 6: Show gems reveal and play sound
    setTimeout(() => {
        gemsReveal.style.opacity = '1';
        gemsReveal.style.transform = 'translateY(0) scale(1.1)';
        playEnhancedTreasureSound();
        
        if (treasureHint) {
            treasureHint.textContent = 'Treasure Discovered! Scrolling to adventure...';
        }
    }, 1200);
    
    // Step 7: Auto-scroll to rounds section
    setTimeout(() => {
        scrollToRounds();
    }, 2500);
    
    // Step 8: Reset after animation completes
    setTimeout(() => {
        resetEnhancedTreasureBox();
    }, 8000);
}

function createAdvancedFloatingGems() {
    const gems = ['💎', '✨', '💰', '🏆', '⭐', '🔸', '💍', '👑'];
    const heroSection = document.getElementById('hero');
    
    if (!heroSection) return;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const gem = document.createElement('div');
            gem.innerHTML = gems[Math.floor(Math.random() * gems.length)];
            gem.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 25 + 15}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 40 + 30}%;
                pointer-events: none;
                z-index: 1000;
                animation: advancedFloatingGem ${Math.random() * 4 + 3}s ease-out forwards;
                filter: drop-shadow(0 0 15px currentColor);
            `;
            
            heroSection.appendChild(gem);
            
            setTimeout(() => {
                gem.remove();
            }, 7000);
        }, i * 100);
    }
}

function createParticleExplosion() {
    if (!particleBurst) return;
    
    const particleCount = 20;
    const colors = ['#f59e0b', '#d97706', '#b45309', '#fbbf24'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random direction and distance
        const angle = (360 / particleCount) * i + (Math.random() * 30 - 15);
        const distance = Math.random() * 150 + 100;
        const dx = Math.cos(angle * Math.PI / 180) * distance;
        const dy = Math.sin(angle * Math.PI / 180) * distance;
        
        particle.style.cssText = `
            background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent);
            --particle-dx: ${dx}px;
            --particle-dy: ${dy}px;
        `;
        
        particle.classList.add('explode');
        particleBurst.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function scrollToRounds() {
    const roundsSection = document.getElementById('rounds');
    if (roundsSection && !isScrolling) {
        isScrolling = true;
        
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offsetTop = roundsSection.offsetTop - navbarHeight - 20;
        
        // Smooth scroll with custom easing
        smoothScrollTo(offsetTop, 1500, () => {
            isScrolling = false;
            
            // Add a subtle highlight effect to the rounds section
            roundsSection.style.boxShadow = '0 0 50px rgba(245, 158, 11, 0.3)';
            setTimeout(() => {
                roundsSection.style.boxShadow = '';
            }, 2000);
        });
    }
}

function smoothScrollTo(target, duration, callback) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Custom easing function (ease-out-cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else if (callback) {
            callback();
        }
    }
    
    requestAnimationFrame(animation);
}

function resetEnhancedTreasureBox() {
    treasureOpened = false;
    animationInProgress = false;
    
    // Reset all elements
    treasureChest.classList.remove('opening');
    goldenGlow.classList.remove('active');
    lightRays.classList.remove('active');
    sparklesContainer.classList.remove('active');
    
    const rays = lightRays.querySelectorAll('.ray');
    rays.forEach(ray => ray.classList.remove('active'));
    
    const sparkles = sparklesContainer.querySelectorAll('.sparkle');
    sparkles.forEach(sparkle => sparkle.classList.remove('burst'));
    
    gemsReveal.style.opacity = '0';
    gemsReveal.style.transform = 'translateY(20px) scale(1)';
    
    if (treasureHint) {
        treasureHint.classList.remove('clicked');
        treasureHint.textContent = 'Click the mystery box to unlock adventure!';
    }
    
    // Clear any remaining particles
    particleBurst.innerHTML = '';
}

function playEnhancedTreasureSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        
        // Create a more complex treasure opening sound
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // First tone (magical chime)
        oscillator1.frequency.setValueAtTime(523, audioContext.currentTime); // C5
        oscillator1.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.3); // G5
        
        // Second tone (harmony)
        oscillator2.frequency.setValueAtTime(659, audioContext.currentTime); // E5
        oscillator2.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3); // A5
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator1.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.5);
        
        oscillator2.start(audioContext.currentTime + 0.1);
        oscillator2.stop(audioContext.currentTime + 0.6);
    }
}

// Add advanced floating gem keyframe
const advancedGemStyle = document.createElement('style');
advancedGemStyle.textContent = `
    @keyframes advancedFloatingGem {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5) rotate(0deg);
        }
        15% {
            opacity: 1;
        }
        85% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-150px) scale(1.8) rotate(720deg);
        }
    }
`;
document.head.appendChild(advancedGemStyle);

// Enhanced Smooth Scrolling - FIXED
function setupSmoothScrolling() {
    // Get all navigation links with more specific targeting
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const ctaButtons = document.querySelectorAll('[data-target^="#"]');
    
    console.log('Setting up smooth scrolling for', allNavLinks.length, 'links');
    
    // Handle all navigation links
    allNavLinks.forEach((link, index) => {
        console.log('Adding listener to link', index, ':', link.getAttribute('href'));
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Handle CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Smooth scroll triggered by:', this.getAttribute('href') || this.getAttribute('data-target'));
    
    if (isScrolling) {
        console.log('Already scrolling, ignoring request');
        return;
    }
    
    let targetId = this.getAttribute('href') || this.getAttribute('data-target');
    
    if (!targetId) {
        console.log('No target found');
        return;
    }
    
    if (targetId.startsWith('#')) {
        targetId = targetId.substring(1);
    }
    
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        console.log('Scrolling to:', targetId);
        isScrolling = true;
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offsetTop = targetElement.offsetTop - navbarHeight;
        
        smoothScrollTo(Math.max(0, offsetTop), 800, () => {
            isScrolling = false;
            console.log('Scroll complete');
        });
        
        // Close mobile menu if open
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
        
        // Update URL hash
        if (window.history && window.history.pushState) {
            window.history.pushState(null, null, `#${targetId}`);
        }
    } else {
        console.log('Target element not found:', targetId);
    }
}

// Scroll Effects
function setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for hero background
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroImage = heroSection.querySelector('img');
        if (heroImage) {
            const parallaxSpeed = 0.3;
            heroImage.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
    }
    
    // Fade in animations for elements
    const animatedElements = document.querySelectorAll('[class*="animate-scroll-fade"]');
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Update navbar background
    updateNavbarBackground(scrollY);
    
    // Floating elements movement
    updateFloatingElements(scrollY);
}

function updateNavbarBackground(scrollY) {
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateFloatingElements(scrollY) {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = 0.15 + (index * 0.05);
        const translateY = scrollY * speed;
        element.style.transform = `translateY(${translateY}px) rotate(${translateY * 0.05}deg)`;
    });
}

// Enhanced Navbar Scroll Effect
function setupNavbarScroll() {
    let lastScrollTop = 0;
    const threshold = 10;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) < threshold) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease-in-out';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease-in-out';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Registration Functionality
function setupRegistration() {
    if (!registerBtn) return;
    
    registerBtn.addEventListener('click', handleRegistration);
    
    registerBtn.addEventListener('mouseenter', () => {
        registerBtn.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.5)';
    });
    
    registerBtn.addEventListener('mouseleave', () => {
        registerBtn.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)';
    });
}

function handleRegistration() {
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<div class="loading-spinner inline-block mr-2"></div>Processing...';
    registerBtn.disabled = true;
    
    setTimeout(() => {
        showRegistrationModal();
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
    }, 2000);
}

function showRegistrationModal() {
    const modal = document.createElement('div');
    modal.id = 'registration-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.style.opacity = '0';
    
    modal.innerHTML = `
        <div class="bg-gradient-to-br from-slate-800 to-amber-900 p-8 rounded-2xl max-w-md w-full text-center border-2 border-amber-500/40 registration-card transform scale-0.8">
            <div class="text-6xl mb-4">🏴‍☠️</div>
            <h3 class="text-2xl font-bold text-amber-400 mb-4 font-pirate">Ahoy, Matey!</h3>
            <p class="text-gray-300 mb-6">
                Your registration has been received! Keep an eye out for further instructions from the ACSES crew.
            </p>
            <div class="space-y-4">
                <div class="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                    <p class="text-green-300 font-semibold">Registration Fee: ₹50</p>
                </div>
                <p class="text-sm text-gray-400">
                    Contact ACSES for payment instructions
                </p>
                <button onclick="closeRegistrationModal()" class="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-bold py-3 px-6 rounded-full transition-all duration-300">
                    Set Sail! ⚓
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal appearance
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
        const card = modal.querySelector('.registration-card');
        if (card) {
            card.style.transform = 'scale(1)';
            card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeRegistrationModal();
        }
    });
}

window.closeRegistrationModal = function() {
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.style.opacity = '0';
        const card = modal.querySelector('.registration-card');
        if (card) {
            card.style.transform = 'scale(0.8)';
        }
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
};

// Enhanced Particle System
function setupParticleSystem() {
    createAmbientParticles();
    setInterval(createAmbientParticles, 15000);
}

function createAmbientParticles() {
    const particleContainer = document.body;
    const particleCount = 3;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(245, 158, 11, 0.8), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: 100vh;
                pointer-events: none;
                z-index: 1;
                animation: ambientParticleFloat ${Math.random() * 8 + 12}s linear infinite;
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }, i * 2000);
    }
}

// Add ambient particle animation
const ambientParticleStyle = document.createElement('style');
ambientParticleStyle.textContent = `
    @keyframes ambientParticleFloat {
        0% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        5% { 
            opacity: 1;
        }
        95% { 
            opacity: 1;
        }
        100% { 
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(ambientParticleStyle);

// Animation Observer for Performance
function setupAnimationObserver() {
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate-scroll-fade');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-scroll-fade');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Enhanced Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 't':
            if (!treasureOpened && !animationInProgress) {
                openEnhancedTreasureBox();
            }
            break;
        case 'escape':
            closeRegistrationModal();
            mobileMenu?.classList.add('hidden');
            break;
        case 'r':
            registerBtn?.focus();
            break;
        case 'h':
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'e':
            document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'n':
            document.getElementById('rounds')?.scrollIntoView({ behavior: 'smooth' });
            break;
    }
});

// Enhanced Touch Events for Mobile
function setupTouchEvents() {
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
    });
    
    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        const touchDuration = Date.now() - touchStartTime;
        
        // Only handle quick swipes (under 300ms)
        if (touchDuration < 300) {
            handleSwipeGesture();
        }
    });
    
    function handleSwipeGesture() {
        const swipeDistance = touchStartY - touchEndY;
        const threshold = 50;
        
        if (Math.abs(swipeDistance) > threshold && !isScrolling) {
            const sections = ['hero', 'event', 'rounds', 'register'];
            const currentSection = getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);
            
            if (swipeDistance > 0 && currentIndex < sections.length - 1) {
                // Swipe up - next section
                const nextSection = document.getElementById(sections[currentIndex + 1]);
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (swipeDistance < 0 && currentIndex > 0) {
                // Swipe down - previous section
                const prevSection = document.getElementById(sections[currentIndex - 1]);
                if (prevSection) {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }
}

function getCurrentSection() {
    const sections = ['hero', 'event', 'rounds', 'register'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                return sectionId;
            }
        }
    }
    
    return 'hero'; // Default to hero
}

setupTouchEvents();

// URL Hash Navigation Support
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = targetElement.offsetTop - navbarHeight;
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

window.addEventListener('popstate', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const offsetTop = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    }
});

// Performance Optimization
function optimizeAnimations() {
    const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                            navigator.connection?.effectiveType === 'slow-2g' ||
                            navigator.connection?.effectiveType === '2g';
    
    if (isLowPerformance) {
        document.body.classList.add('reduced-motion');
        
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.3s !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
}

optimizeAnimations();

// Error Handling
window.addEventListener('error', (e) => {
    console.log('Application error:', e.error);
});

// Prevent zoom on iOS double-tap
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - window.lastTouchEnd <= 300) {
        event.preventDefault();
    }
    window.lastTouchEnd = now;
}, false);

// Service Worker Registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Service Worker support detected');
    });
}

// Debug Mode
if (window.location.hash === '#debug') {
    document.body.classList.add('debug-mode');
    console.log('Debug mode enabled');
    
    const debugStyle = document.createElement('style');
    debugStyle.textContent = `
        .debug-mode * {
            border: 1px solid rgba(255, 0, 0, 0.2) !important;
        }
        .debug-mode .treasure-chest {
            border: 2px solid rgba(0, 255, 0, 0.8) !important;
        }
    `;
    document.head.appendChild(debugStyle);
}