// ------------------ THEME TOGGLE + TIME BASED ------------------
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Set theme based on time
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

// Handle theme toggle (does not save)
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

// Apply theme on page load
window.addEventListener('DOMContentLoaded', applyTimeBasedTheme);

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
