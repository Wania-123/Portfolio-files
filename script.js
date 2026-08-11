// ==========================================================
// Mobile nav toggle
// ==========================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================
// Active nav link on scroll
// ==========================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const setActiveLink = () => {
  let currentId = '';
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ==========================================================
// Scroll reveal animations
// ==========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================================
// FAQ accordion
// ==========================================================
const accordionTriggers = document.querySelectorAll('.accordion__trigger');

accordionTriggers.forEach(trigger => {
  const panel = document.getElementById(trigger.getAttribute('aria-controls'));

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Close all other panels
    accordionTriggers.forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
        otherPanel.style.maxHeight = null;
      }
    });

    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
  });
});

// ==========================================================
// Appointment form validation (prototype only — no submission)
// ==========================================================
const form = document.getElementById('appointmentForm');
const formSuccess = document.getElementById('formSuccess');

const validators = {
  name: value => value.trim().length >= 2 || 'Please enter your full name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
  phone: value => /^[0-9+\-\s()]{7,}$/.test(value) || 'Please enter a valid phone number.',
  date: value => value.trim().length > 0 || 'Please select a preferred date.',
  sessionType: value => value.trim().length > 0 || 'Please select a session type.',
};

const showError = (field, message) => {
  const input = form.elements[field];
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  if (message) {
    input.classList.add('is-invalid');
    errorEl.textContent = message;
  } else {
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
  }
};

Object.keys(validators).forEach(field => {
  const input = form.elements[field];
  input.addEventListener('blur', () => {
    const result = validators[field](input.value);
    showError(field, result === true ? '' : result);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  Object.keys(validators).forEach(field => {
    const input = form.elements[field];
    const result = validators[field](input.value);
    if (result !== true) {
      isValid = false;
      showError(field, result);
    } else {
      showError(field, '');
    }
  });

  if (isValid) {
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    form.reset();
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  } else {
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) firstInvalid.focus();
  }
});

// ==========================================================
// Back to top button
// ==========================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================
// Footer year
// ==========================================================
document.getElementById('year').textContent = new Date().getFullYear();
