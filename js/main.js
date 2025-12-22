const initNavbar = () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
    }

    // Set active link based on current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth Scroll for Anchor Links (internal only)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                }
            }
        });
    });
};

const loadNavbar = () => {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    // Use our global navbarContent variable from js/navbar.js
    if (typeof navbarContent !== 'undefined') {
        placeholder.innerHTML = navbarContent;
        initNavbar();
    } else {
        console.error('Navbar content not found. Make sure navbar.js is loaded before main.js');
    }
};

const loadFooter = () => {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    // Use our global footerContent variable from js/footer.js
    if (typeof footerContent !== 'undefined') {
        placeholder.innerHTML = footerContent;
    } else {
        console.error('Footer content not found. Make sure footer.js is loaded before main.js');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
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

