document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

// Cookie Consent Popup
const cookieConsent = document.createElement('div');
cookieConsent.className = 'cookie-consent';
cookieConsent.innerHTML = `
        <h4>We use cookies</h4>
        <p>We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
        <div class="cookie-consent-actions">
            <button id="accept-cookies" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Accept</button>
        </div>
    `;

// Check if user has already accepted
if (!localStorage.getItem('cookieConsent')) {
    document.body.appendChild(cookieConsent);
    // Small delay to allow animation
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 100);

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.remove('show');
        setTimeout(() => {
            cookieConsent.remove();
        }, 300);
    });
}

