   // JavaScript for mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // JavaScript for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // JavaScript for form submission (simulated)
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission success
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.classList.remove('hidden');
            formMessage.classList.add('text-green-600', 'font-semibold');

            // Reset the form after a short delay
            setTimeout(() => {
                contactForm.reset();
                formMessage.classList.add('hidden');
            }, 5000);
        });


        