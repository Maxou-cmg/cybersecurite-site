// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function() {
            const isOpen = question.getAttribute('aria-expanded') === 'true';
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherAnswer.style.maxHeight = '0';
                    otherQuestion.querySelector('.faq-toggle').textContent = '+';
                }
            });

            // Toggle current item
            if (isOpen) {
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.style.maxHeight = '0';
                question.querySelector('.faq-toggle').textContent = '+';
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('.faq-toggle').textContent = '−';
            }
        });
    });
});
