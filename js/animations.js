// ========================================
// PARTICLE EFFECTS & ANIMATIONS
// ========================================

// Create Particle Background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const container = document.createElement('div');
    container.id = 'particles-container';
    hero.appendChild(container);
    
    // Create 80 particles for a starfield effect
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random size (small variation)
        const size = Math.random() * 2 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
    
    console.log('✨ Particle starfield created');
}

// Parallax Effect on Scroll
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const particles = document.getElementById('particles-container');
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add hover effect to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.trifecta-card, .service-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Professional Golden Moon Cursor
function initMoonCursor() {
    // Create moon cursor element
    const moon = document.createElement('div');
    moon.className = 'cursor-moon';
    document.body.appendChild(moon);
    
    let mouseX = 0;
    let mouseY = 0;
    let moonX = 0;
    let moonY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        moon.style.opacity = '0.8';
    });
    
    // Smooth follow animation
    function animateMoon() {
        // Smooth easing
        moonX += (mouseX - moonX) * 0.15;
        moonY += (mouseY - moonY) * 0.15;
        
        moon.style.left = moonX + 'px';
        moon.style.top = moonY + 'px';
        
        requestAnimationFrame(animateMoon);
    }
    
    animateMoon();
    
    // Add active state on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .hover-lift');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            moon.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            moon.classList.remove('active');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        moon.style.opacity = '0';
    });
    
    console.log('🌙 Professional moon cursor activated');
}

// Particle Canvas for Hero Section
function createParticleCanvas() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const particles = [];
    const particleCount = 60;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
    
    console.log('✨ Particle canvas created with', particleCount, 'particles');
}

// Intersection Observer for Fade-in Animations
function initFadeInObserver() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    
    console.log('👁️ Fade-in observer initialized for', fadeElements.length, 'elements');
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Cursor Trail Effect (Optional)
let cursorTrailEnabled = false;
function initCursorTrail() {
    if (!cursorTrailEnabled) return;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 600);
    });
    
    console.log('✨ Cursor trail enabled');
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const statusDiv = form.querySelector('.form-status');
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        statusDiv.style.display = 'none';
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with actual endpoint)
        try {
            // For now, just show success after delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            statusDiv.textContent = '✓ Message sent successfully! I\'ll get back to you within 24 hours.';
            statusDiv.className = 'form-status success';
            statusDiv.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Log to console (for demo)
            console.log('📧 Form submitted:', data);
            
        } catch (error) {
            // Show error message
            statusDiv.textContent = '✗ Failed to send message. Please email directly at hannah.pagade@gmail.com';
            statusDiv.className = 'form-status error';
            statusDiv.style.display = 'block';
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
    
    console.log('📧 Contact form handler initialized');
}

// Keyboard Navigation Enhancement
function enhanceKeyboardNav() {
    // Add visible focus to all interactive elements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        el.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // Add skip-to-content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--gold);
        color: var(--black);
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    console.log('⌨️ Keyboard navigation enhanced');
}

// Lazy Load Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const iframes = document.querySelectorAll('iframe[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        console.log('🖼️ Native lazy loading active');
    } else {
        // Fallback for older browsers
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        lazyLoadObserver.unobserve(element);
                    }
                }
            });
        });
        
        images.forEach(img => lazyLoadObserver.observe(img));
        iframes.forEach(iframe => lazyLoadObserver.observe(iframe));
        
        console.log('🖼️ Lazy loading polyfill active');
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createParticleCanvas();
    initParallax();
    initCardEffects();
    initMoonCursor();
    initFadeInObserver();
    initCounterAnimation();
    initCursorTrail();
    initContactForm();
    enhanceKeyboardNav();
    initLazyLoading();
    
    console.log('🎨 All animations and enhancements loaded');
});
