// ------------------ THEME TOGGLE + TIME BASED ------------------
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function applyTimeBasedTheme() {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;
  if (isNight) {
    html.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '🌞';
  } else {
    html.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    if (isDark) {
      html.classList.remove('dark');
      themeToggle.textContent = '🌙';
    } else {
      html.classList.add('dark');
      themeToggle.textContent = '🌞';
    }
  });
}

window.addEventListener('DOMContentLoaded', applyTimeBasedTheme);

// ------------------ TYPEWRITER EFFECT ------------------
const roles = [
  "Aspiring Cloud Engineer",
  "Full-Stack Developer in Progress",
  "Adventure Enthusiast",
  "Tech Explorer | Lifelong Learner"
];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = roles[i];
  const display = current.substring(0, j);
  const typingText = document.getElementById("typing-text");
  if (typingText) typingText.textContent = display;

  if (!isDeleting && j < current.length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 100 : 200);
}

window.addEventListener("DOMContentLoaded", type);

// ------------------ BACK TO TOP ------------------
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ------------------ MOBILE NAV TOGGLE ------------------
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

// ------------------ CAROUSEL ------------------
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('#dots .dot');
let autoSlide;
let index = 0;

if (carousel && prevBtn && nextBtn && dots.length > 0) {
  const slides = carousel.children;
  const totalSlides = slides.length;

  function updateSlide(i) {
    index = i;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('bg-gray-400'));
    if (dots[index]) {
      dots[index].classList.add('bg-gray-400');
    }
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    updateSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide(index);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlide(i));
  });

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index = (index + 1) % totalSlides;
      updateSlide(index);
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  carousel.parentElement.addEventListener('mouseenter', stopAutoSlide);
  carousel.parentElement.addEventListener('mouseleave', startAutoSlide);

  updateSlide(index);
  startAutoSlide();
}