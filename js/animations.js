/**
 * HELIOSUNTECH PLASTICS - ADVANCED ANIMATIONS & INTERACTION CONTROLLER
 * Handles scroll-triggered staggered reveals, animated metric counters,
 * and 3D card tilt micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initNavbarScrollEffect();
  initScrollReveal();
  initAnimatedCounters();
  initSmoothNavIndicator();
});

/**
 * 0. Seamless Page-to-Page Transition System with Progress Loading Bar
 */
function initPageTransitions() {
  // Ensure top progress bar element exists
  let bar = document.getElementById('pageProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'pageProgressBar';
    document.body.appendChild(bar);
  }

  // Gracefully enter page on load
  document.body.classList.add('page-enter');
  bar.classList.add('is-loading');
  bar.style.width = '65%';
  setTimeout(() => {
    bar.style.width = '100%';
    setTimeout(() => {
      bar.classList.remove('is-loading');
      bar.style.width = '0%';
    }, 200);
  }, 100);

  // Smooth exit transition on internal link click
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors, external protocols, downloads, target="_blank", or modifier clicks
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank' ||
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
    ) {
      return;
    }

    // Check if it's an internal site navigation
    const isInternal = !href.startsWith('http://') && !href.startsWith('https://') || href.includes(window.location.hostname);
    if (!isInternal) return;

    // If anchor on the same page, ignore exit transition
    const currentBase = window.location.pathname.split('/').pop() || 'index.html';
    const targetBase = href.split('?')[0].split('#')[0];
    if (currentBase === targetBase && href.includes('#')) {
      return;
    }

    e.preventDefault();

    // Trigger silky page-exit and progress bar sweep
    bar.classList.add('is-loading');
    bar.style.width = '35%';
    document.body.classList.remove('page-enter');
    document.body.classList.add('page-exit');

    setTimeout(() => {
      bar.style.width = '85%';
    }, 90);

    setTimeout(() => {
      window.location.href = href;
    }, 210);
  });

  // Restore page state when returning via browser back/forward cache
  window.addEventListener('pageshow', (event) => {
    document.body.classList.remove('page-exit');
    document.body.classList.add('page-enter');
    if (bar) {
      bar.classList.remove('is-loading');
      bar.style.width = '0%';
    }
  });
}

/**
 * 0.5. Dynamic Sticky Navbar Blur on Scroll
 */
function initNavbarScrollEffect() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}


/**
 * 1. Intersection Observer for Scroll Reveals & Staggered Elements
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .stagger-container');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * 2. Animated Counter Numbers (Counts from 0 to target value on scroll)
 */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = (target * easeOut).toFixed(decimals);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => counterObserver.observe(el));
}



/**
 * 4. Nav Active State & Smooth Anchor Scrolling
 */
function initSmoothNavIndicator() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
