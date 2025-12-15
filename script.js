// Dark Mode Toggle
function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (toggle) toggle.innerHTML = '☀️';
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkNow = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkNow);
            toggle.innerHTML = isDarkNow ? '☀️' : '🌙';
        });
    }
}

// Language Toggle
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('language') || 'fr';
    
    if (langToggle) {
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            localStorage.setItem('language', newLang);
            // In a real app, this would reload content in the new language
            alert(newLang === 'en' ? 'Language switched to English' : 'Langue changée en Français');
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const topBtn = document.getElementById('scroll-to-top');
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Intersection Observer for Animations on Scroll
function initIntersectionObserver() {
    const elements = document.querySelectorAll('.toc-card, .threat-card, .tool-card, .resource-card, .faq-item, h2, p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Service Worker Registration
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('Service Worker registered:', registration);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }
}

// Search and Filter Functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.toc-card, .threat-card, .resource-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// Analytics - Track Page Views
function initAnalytics() {
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
    localStorage.setItem('pageViews', pageViews);
    console.log(`Page views: ${pageViews}`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initLanguageToggle();
    initScrollToTop();
    initIntersectionObserver();
    initServiceWorker();
    initSearch();
    initAnalytics();
});

// Parallax scrolling effect
document.addEventListener('scroll', () => {
    const heroes = document.querySelectorAll('.hero');
    heroes.forEach(hero => {
        hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    });
