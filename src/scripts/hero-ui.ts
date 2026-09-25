// Hero interactions: role typewriter, scroll-indicator fade, light-theme class.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initRoleTyper() {
  const el = document.getElementById('hero-role-type');
  if (!el) return;
  let roles: string[] = [];
  try {
    roles = JSON.parse(el.dataset.roles || '[]');
  } catch {
    roles = [];
  }
  if (!roles.length) return;
  if (reduceMotion()) {
    el.textContent = roles[0];
    return;
  }
  let ri = 0;
  let ci = 0;
  let deleting = false;
  const type = () => {
    const word = roles[ri];
    el.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) {
      ci += 1;
      window.setTimeout(type, 65);
    } else if (!deleting) {
      deleting = true;
      window.setTimeout(type, 1800);
    } else if (ci > 0) {
      ci -= 1;
      window.setTimeout(type, 30);
    } else {
      deleting = false;
      ri = (ri + 1) % roles.length;
      window.setTimeout(type, 350);
    }
  };
  type();
}

function initScrollIndicator() {
  const indicator = document.getElementById('hero-scroll-indicator');
  if (!indicator) return;
  window.addEventListener(
    'scroll',
    () => {
      indicator.style.opacity = String(Math.max(0, 1 - window.scrollY / 300));
    },
    { passive: true },
  );
}

function initThemeClass() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const sync = () => hero.classList.toggle('hero--light', document.documentElement.getAttribute('data-theme') === 'light');
  sync();
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

export function initHeroUi() {
  initThemeClass();
  initRoleTyper();
  initScrollIndicator();
}
