// ========================================
// MOONLIT STUDIOS - MAIN JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Moonlit Studios Portfolio Loaded');
    console.log('🦚 Where the Phoenix Rises and the Peacock Dances!');
    console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA');
    
    // Initialize all features
    initScrollEffects();
    initPeacockButton();
    initSmoothScroll();
    initScrollProgress();
    initPortfolioFilters();
    initPortfolioVideos();
});

// Scroll to Top Button
function initPeacockButton() {
    const scrollBtn = document.querySelector('.peacock-scroll-btn');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .trifecta-card, .service-card, .project-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Portfolio: Filters
function initPortfolioFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#portfolio-grid .project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const cat = card.getAttribute('data-category') || 'all';
                if (filter === 'all' || cat === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // keyboard support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}

// Portfolio: Lazy-load iframes and autoplay on hover (best-effort)
function initPortfolioVideos() {
    const iframes = document.querySelectorAll('#portfolio-grid iframe[data-src]');
    if (!iframes.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.getAttribute('src')) {
                    iframe.setAttribute('src', iframe.dataset.src);
                    iframe.dataset.lazyLoaded = '1';
                }
                io.unobserve(iframe);
            }
        });
    }, { rootMargin: '200px 0px' , threshold: 0.05 });

    iframes.forEach(iframe => {
        io.observe(iframe);
        // hover handlers for autoplay
        const card = iframe.closest('.project-card');
        if (!card) return;

        let originalSrc = iframe.dataset.src;

        card.addEventListener('mouseenter', () => {
            // ensure loaded
            if (!iframe.getAttribute('src')) {
                iframe.setAttribute('src', originalSrc);
            }
            // best-effort: if youtube, add autoplay & mute
            try {
                const src = new URL(iframe.getAttribute('src'));
                if (/youtube|youtu\.be|youtube-nocookie/.test(src.host + src.pathname)) {
                    if (!src.searchParams.get('autoplay')) src.searchParams.set('autoplay', '1');
                    if (!src.searchParams.get('mute')) src.searchParams.set('mute', '1');
                    iframe.setAttribute('src', src.toString());
                } else {
                    // For other providers, try adding autoplay param
                    if (!iframe.getAttribute('data-autoplay-appended')) {
                        let s = iframe.getAttribute('src');
                        if (s.indexOf('?') === -1) s += '?autoplay=1&mute=1'; else s += '&autoplay=1&mute=1';
                        iframe.setAttribute('src', s);
                        iframe.setAttribute('data-autoplay-appended', '1');
                    }
                }
            } catch (e) {
                // If URL parsing fails, fallback: append param safely
                if (!iframe.getAttribute('data-autoplay-appended')) {
                    let s = iframe.getAttribute('src') || originalSrc;
                    if (s.indexOf('?') === -1) s += '?autoplay=1&mute=1'; else s += '&autoplay=1&mute=1';
                    iframe.setAttribute('src', s);
                    iframe.setAttribute('data-autoplay-appended', '1');
                }
            }
        });

        // on leave, try to remove autoplay param by resetting to original
        card.addEventListener('mouseleave', () => {
            // revert to original (will reload) to stop playback
            if (originalSrc && iframe.getAttribute('src') && iframe.getAttribute('src') !== originalSrc) {
                iframe.setAttribute('src', originalSrc);
                iframe.removeAttribute('data-autoplay-appended');
            }
        });
    });
}
