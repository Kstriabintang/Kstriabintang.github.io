// Page-wide behaviours: scroll reveal, scroll progress bar, cursor glow.

function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.sr'));
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('sr-visible'));
    return;
  }
  // Stagger children that declare --sr-i.
  els.forEach((el) => {
    el.querySelectorAll<HTMLElement>(':scope > .sr__child').forEach((child, i) => {
      if (!child.style.transitionDelay) child.style.transitionDelay = `${i * 120}ms`;
    });
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

function initCursorGlow() {
  if (window.innerWidth <= 900 || window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  glow.style.transform = 'translate(-400px, -400px)';
  document.body.appendChild(glow);
  window.addEventListener(
    'mousemove',
    (e) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    },
    { passive: true },
  );
}

initReveal();
initScrollProgress();
initCursorGlow();
