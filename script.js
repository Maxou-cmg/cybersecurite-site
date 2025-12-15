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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initScrollToTop();
});
