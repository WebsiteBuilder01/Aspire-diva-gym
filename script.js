
/*
  IRONVAULT FITNESS WEBSITE
  IMPORTANT:
  Replace the sample WhatsApp number below with the gym's real number.
  Include country code 91 for India, without +, spaces or dashes.
*/

const GYM_WHATSAPP_NUMBER = "918136078937";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// WhatsApp enquiry buttons
document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    if (!/^\d{10,15}$/.test(GYM_WHATSAPP_NUMBER)) {
      alert("Please configure the gym's real WhatsApp number in script.js first.");
      return;
    }

    const message = link.dataset.message ||
      "Hi! I would like to enquire about joining your gym.";

    const whatsappURL =
      "https://wa.me/" + GYM_WHATSAPP_NUMBER +
      "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});

// Automatic copyright year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Reveal elements as the visitor scrolls
const revealElements = document.querySelectorAll(
  ".facility-card, .program-card, .price-card, .trainer-card, " +
  ".value-strip > div, .intro-grid, .offer-box, .location-grid, " +
  ".faq-layout, .section-heading"
);

revealElements.forEach(element => {
  element.classList.add("js-reveal");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}

// Keep one FAQ answer open at a time
document.querySelectorAll(".faq-list details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-list details").forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});
