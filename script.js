// ==========================================================
// WHATSAPP CONFIGURATION
// Edit these two values only — every "Book an Appointment" /
// WhatsApp button on the site reads from here.
// Number must be in international format, digits only
// (country code + number, no +, spaces, or leading 0).
// Example for Pakistan: "923001234567"
// ==========================================================
const WHATSAPP_NUMBER = "923355777839";
const PSYCHOLOGIST_NAME = "Sadia Sikander";
const WHATSAPP_MESSAGE = `Hello, I would like to book an appointment with ${PSYCHOLOGIST_NAME}.`;

// ==========================================================
// Wire up every WhatsApp button on the page
// ==========================================================
const buildWhatsAppUrl = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
  link.setAttribute('href', buildWhatsAppUrl());
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});

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
