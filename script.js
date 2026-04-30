// script.js

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // how much of the element should be visible before revealing

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger reveal on load for elements already in view
reveal();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        const formData = new FormData(contactForm);
        const object = {};
        formData.forEach((value, key) => object[key] = value);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://formsubmit.co/ajax/lochanajayasinghe2002@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent! (Check your email to activate it for the first time)';
                contactForm.reset();
            } else {
                formStatus.className = 'form-status error';
                formStatus.textContent = result.error || 'Failed to send message.';
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Network error. Please try again later.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

