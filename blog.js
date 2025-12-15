// Blog and Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('.newsletter-message');
            
            // Simulate form submission (in a real app, this would send to a backend)
            localStorage.setItem('newsletter_email', email);
            
            this.style.display = 'none';
            message.style.display = 'block';
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.style.display = 'block';
                message.style.display = 'none';
                this.reset();
            }, 3000);
        });
    }

    // Blog Post Read More Links
    const readMoreLinks = document.querySelectorAll('.blog-read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const post = this.closest('.blog-post');
            const excerpt = post.querySelector('.blog-excerpt');
            
            if (excerpt.style.maxHeight === 'none') {
                excerpt.style.maxHeight = '80px';
                this.textContent = 'Lire plus →';
            } else {
                excerpt.style.maxHeight = 'none';
                this.textContent = 'Lire moins ←';
            }
        });
    });

    // Category filtering (optional enhancement)
    const categoryLinks = document.querySelectorAll('[href^="#category-"]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('href').replace('#category-', '');
            console.log('Filter by category:', category);
            // In a real app, this would filter blog posts
        });
    });
});
