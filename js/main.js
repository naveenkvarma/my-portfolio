// Theme toggle + time‑based
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
function applyTheme() {
  const hour = new Date().getHours();
  const isDark = html.classList.contains('dark') || hour >= 18 || hour < 6;
  html.classList.toggle('dark', isDark);
  if (themeToggle) themeToggle.textContent = isDark ? '🌞' : '🌙';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    themeToggle.textContent = html.classList.contains('dark') ? '🌞' : '🌙';
  });
}
window.addEventListener('DOMContentLoaded', applyTheme);

// MOBILE NAV TOGGLE
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    menuToggle.textContent = mobileNav.classList.contains('hidden') ? '☰' : '✖';
  });
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      menuToggle.textContent = '☰';
    })
  );
}

// BACK TO TOP
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// TYPEWRITER EFFECT (INDEX ONLY)
const txtEl = document.getElementById("typing-text");
if (txtEl) {
  const roles = ["Aspiring Cloud Engineer", "Full‑Stack Dev", "Tech Explorer", "Lifelong Learner"];
  let i = 0, j = 0, del = false;
  function type() {
    const full = roles[i];
    txtEl.textContent = full.substring(0, j);
    if (!del && j++ === full.length) del = true;
    else if (del && j-- === 0) { del = false; i = (i + 1) % roles.length; }
    setTimeout(type, del ? 100 : 200);
  }
  type();
}

// CAROUSEL (LANGUAGE / GALLERY)
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(c => {
  const track = c.querySelector('.carousel-track');
  const prev = c.querySelector('.carousel-prev');
  const next = c.querySelector('.carousel-next');
  const dots = c.querySelectorAll('.carousel-dot');
  let idx = 0;
  const total = track.children.length;
  function update(i) {
    idx = (i + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach(d => d.classList.remove('bg-gray-400'));
    dots[idx].classList.add('bg-gray-400');
  }
  next.addEventListener('click', () => update(idx + 1));
  prev.addEventListener('click', () => update(idx - 1));
  dots.forEach((d,i) => d.addEventListener('click', () => update(i)));
  let auto = setInterval(()=>update(idx+1),4000);
  c.addEventListener('mouseenter', () => clearInterval(auto));
  c.addEventListener('mouseleave', () => auto = setInterval(()=>update(idx+1),4000));
});
