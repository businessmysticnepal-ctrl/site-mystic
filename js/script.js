document.addEventListener('DOMContentLoaded', function() {
    
    // --- Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    window.addEventListener('load', () => {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        mainContent.classList.remove('invisible');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });

    // --- Animated Stat Counters Logic ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.getElementById('stats');

    const startCounter = (el) => {
        const goal = parseInt(el.dataset.goal, 10);
        let count = 0;
        const speed = 200; // Speed of counting, can be adjusted
        const duration = Math.min(goal / speed, 2000); // Max 2 seconds animation
        const increment = goal / (duration / 16.67); // Frames per second logic
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= goal) {
                el.innerText = goal.toLocaleString();
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(count).toLocaleString();
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(number => {
                    startCounter(number);
                });
                observer.unobserve(statsSection); // Only animate once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(statsSection);

    // --- Enhanced Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#3b82f6';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Thanks for your message! We will be in touch soon.';
                formStatus.style.color = '#10b981';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = 'Oops! There was a problem submitting your form.';
                }
                formStatus.style.color = '#ef4444';
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a network problem.';
            formStatus.style.color = '#ef4444';
        }

        setTimeout(() => {
            formStatus.textContent = '';
        }, 6000);
    });
});
