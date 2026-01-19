// ==================== 
// Navigation & Scroll Effects
// ==================== 

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// Mobile Menu Toggle
// ==================== 

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(10px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-10px)' 
        : 'none';
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ==================== 
// Intersection Observer for Animations
// ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, visual cards, and sections
const animateElements = document.querySelectorAll(
    '.feature-card, .visual-card, .stat, .info-item, .about-text, .download-info, .download-visual'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== 
// Form Handling
// ==================== 

// Email notification form
const emailForm = document.querySelector('.email-form');
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = emailForm.querySelector('.email-input');
        const email = emailInput.value;
        
        // Simulate form submission
        const button = emailForm.querySelector('.btn-primary');
        const originalText = button.textContent;
        button.textContent = 'Submitting...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Subscribed!';
            button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
            emailInput.value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }, 1500);
        
        console.log('Email subscription:', email);
    });
}

// Contact form
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Message Sent!';
            button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
            contactForm.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }, 1500);
        
        console.log('Contact form submitted');
    });
}

// ==================== 
// Interactive Elements
// ==================== 

// Add hover effect to store badges
const storeBadges = document.querySelectorAll('.badge');
storeBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        // Add a pulse animation
        badge.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            badge.style.animation = '';
        }, 300);
        
        console.log('Store badge clicked:', badge.classList.contains('app-store') ? 'App Store' : 'Play Store');
    });
});

// ==================== 
// Gradient Orb Animation
// ==================== 

const orbs = document.querySelectorAll('.gradient-orb');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrbs() {
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.0005;
        const currentTransform = orb.style.transform || '';
        
        const rect = orb.getBoundingClientRect();
        const orbX = rect.left + rect.width / 2;
        const orbY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - orbX) * speed;
        const deltaY = (mouseY - orbY) * speed;
        
        orb.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== 
// Parallax Scrolling Effect
// ==================== 

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .phone-mockup');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ==================== 
// Dynamic Background Effect
// ==================== 

// Create animated particles in the background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Add particle float animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @media (max-width: 968px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ==================== 
// Feature Card Stagger Animation
// ==================== 

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ==================== 
// Scroll Progress Indicator
// ==================== 

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = (window.pageYOffset / documentHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ff88 0%, #00d4ff 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${scrolled}%`;
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ==================== 
// Console Easter Egg
// ==================== 

console.log('%c🍃 Nightleaf Studios', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to StoryChoice.AI!', 'color: #00d4ff; font-size: 16px;');
console.log('%cInterested in joining our team? Contact us at careers@nightleafstudios.com', 'color: #b3b3b3; font-size: 12px;');

// ==================== 
// Page Load Animation
// ==================== 

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== 
// Performance Optimization
// ==================== 

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollProgress = debounce(updateScrollProgress, 10);
window.removeEventListener('scroll', updateScrollProgress);
window.addEventListener('scroll', debouncedScrollProgress);

// ==================== 
// Accessibility Enhancements
// ==================== 

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Focus management for interactive elements
const focusableElements = document.querySelectorAll(
    'a[href], button, input, textarea, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid var(--accent-primary)';
        el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
        el.style.outline = '';
        el.style.outlineOffset = '';
    });
});

console.log('✓ Nightleaf Studios website initialized');
