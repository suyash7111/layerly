// Layerly interactions. Replace the placeholder with your WhatsApp number before publishing.
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Country code + number, digits only (example: 919876543210)

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const opened = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }));
}

// Gentle scroll reveals; content remains visible when reduced motion is preferred.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const inquiryForm = document.querySelector('#inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = document.querySelector('#formError');
    if (error) error.textContent = '';
    if (!inquiryForm.reportValidity()) return;

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER) || WHATSAPP_NUMBER.includes('X')) {
      if (error) error.textContent = 'Before publishing, add your WhatsApp number in script.js (country code + number, digits only).';
      return;
    }

    const data = new FormData(inquiryForm);
    const message = [
      'Hello Layerly! I would like to enquire about a website project.', '',
      `Name: ${data.get('name')}`,
      `Business / brand: ${data.get('business')}`,
      `Service: ${data.get('service')}`,
      `Approximate budget: ${data.get('budget') || 'Not decided yet'}`, '',
      `Project details: ${data.get('details')}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
