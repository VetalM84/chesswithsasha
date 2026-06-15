// --- 1. Mobile Menu Interactivity ---
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links-container');

  if (mobileMenuBtn && navLinksContainer) {
    if (mobileMenuBtn.dataset.listenerAdded === 'true') return;
    mobileMenuBtn.dataset.listenerAdded = 'true';

    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

      // Toggle visibility
      navLinksContainer.classList.toggle('hidden');
      navLinksContainer.classList.toggle('flex');
    });

    // Close mobile menu on link click
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (!navLinksContainer.classList.contains('hidden')) {
          navLinksContainer.classList.add('hidden');
          navLinksContainer.classList.remove('flex');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

// Add DOMContentLoaded observer actions as secondary thread
document.addEventListener('DOMContentLoaded', () => {

  // --- 2. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 3. Interactive Scheduler Application ---
  const bookingContainer = document.getElementById('booking-app-container');
  if (bookingContainer) {
    initScheduler(bookingContainer);
  }
});

/**
 * Initializes the Calendly scheduling calendar widget
 */
function initScheduler(container) {
  // Clear the loading indicator and set height for the Calendly iframe
  container.innerHTML = '';
  container.style.height = '700px';
  container.style.minHeight = '700px';

  // PLACEHOLDER: Replace this URL with your actual Calendly event/profile URL
  const calendlyUrl = 'https://calendly.com/vetalmit/30min';

  function loadWidget() {
    if (typeof Calendly !== 'undefined') {
      Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: container,
        prefill: {},
        pageSettings: {
          backgroundColor: '1a1c1c', // Match surface-ebony (#1a1c1c)
          primaryColor: 'c5a059',    // Match accent-gold (#c5a059)
          textColor: 'ffffff'        // Match pure-white (#ffffff)
        }
      });
    } else {
      // Retry after a short delay if the Calendly script isn't fully loaded yet
      setTimeout(loadWidget, 100);
    }
  }

  loadWidget();
}
