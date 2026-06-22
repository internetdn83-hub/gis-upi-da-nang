// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('mobile-open');
  navCta?.classList.toggle('mobile-open');
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  const start = performance.now();
  const duration = 2000;
  const isDecimal = String(target).includes('.');

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = isDecimal
      ? (target * ease).toFixed(1)
      : Math.floor(target * ease);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = document.querySelectorAll('.stat-item');
      items.forEach(item => {
        const count = parseFloat(item.dataset.count);
        const suffix = item.dataset.suffix || '';
        const numEl = item.querySelector('.stat-number');
        animateCounter(numEl, count, suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) statsObserver.observe(statsSection);

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

const revealElements = [
  '.feature-card', '.step', '.pricing-card',
  '.section-header', '.cta-card',
  '.stat-item', '.footer-links-group'
];

revealElements.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
    revealObserver.observe(el);
  });
});

// ===== SEARCH SUGGESTIONS =====
const suggestions = [
  'Đường Lê Lợi, Quận 1, TP.HCM',
  'Phường Hàng Bài, Hoàn Kiếm, Hà Nội',
  'Quận Hải Châu, Đà Nẵng',
  'Phường Bến Nghé, Quận 1',
  'Huyện Hóc Môn, TP.HCM',
];

const searchInput = document.getElementById('hero-search-input');
const searchBtn = document.getElementById('hero-search-btn');

// Animated placeholder cycling
let phIdx = 0;
const placeholders = [
  'Nhập địa chỉ, tên đường, thửa đất...',
  'Ví dụ: 123 Nguyễn Huệ, Quận 1...',
  'Ví dụ: Thửa 156, Tờ bản đồ 12...',
  'Ví dụ: Khu đô thị Phú Mỹ Hưng...',
];

setInterval(() => {
  if (searchInput && document.activeElement !== searchInput) {
    phIdx = (phIdx + 1) % placeholders.length;
    searchInput.placeholder = placeholders[phIdx];
  }
}, 3000);

// Search tags click
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = tag.textContent;
      searchInput.focus();
    }
  });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu if open
      navLinks?.classList.remove('mobile-open');
      navCta?.classList.remove('mobile-open');
    }
  });
});

// ===== PARALLAX HERO BG =====
const heroBg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// ===== MOBILE NAV STYLES (inject) =====
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links.mobile-open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 65px; left: 0; right: 0;
      background: rgba(5,13,26,0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 20px 24px;
      gap: 4px;
      z-index: 999;
    }
    .nav-cta.mobile-open {
      display: flex !important;
      position: fixed;
      bottom: 24px; left: 24px; right: 24px;
      z-index: 999;
      gap: 10px;
    }
    .nav-cta.mobile-open .btn-ghost { flex: 1; justify-content: center; }
    .nav-cta.mobile-open .btn-primary { flex: 1.5; justify-content: center; }
    .nav-links.mobile-open a {
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 1rem;
    }
    .nav-links a.active { color: var(--teal) !important; background: var(--teal-dim) !important; }
  }
`;
document.head.appendChild(mobileStyle);

console.log('🗺️ GIS Quy Hoạch Landing Page – Ready!');
