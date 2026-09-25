// Navbar behaviour: dropdown groups, mobile drawer, shrink/hide on scroll, theme toggle.

const DESKTOP = window.matchMedia('(min-width: 901px)');

function closeAllGroups(except?: HTMLElement) {
  document.querySelectorAll<HTMLElement>('[data-nav-group]').forEach((group) => {
    if (group === except) return;
    group.classList.remove('navbar-custom__group--open');
    group.querySelector('.navbar-custom__group-trigger')?.setAttribute('aria-expanded', 'false');
    group.querySelector<HTMLElement>('.navbar-custom__dropdown')?.setAttribute('hidden', '');
  });
}

function setGroup(group: HTMLElement, open: boolean) {
  group.classList.toggle('navbar-custom__group--open', open);
  group.querySelector('.navbar-custom__group-trigger')?.setAttribute('aria-expanded', String(open));
  const dd = group.querySelector<HTMLElement>('.navbar-custom__dropdown');
  if (!dd) return;
  if (open) dd.removeAttribute('hidden');
  else dd.setAttribute('hidden', '');
}

function setDrawer(open: boolean) {
  const drawer = document.getElementById('site-nav-drawer');
  const scrim = document.getElementById('site-nav-scrim');
  const burger = document.getElementById('site-nav-hamburger');
  drawer?.classList.toggle('navbar-custom__links--open', open);
  scrim?.classList.toggle('navbar-custom__scrim--open', open);
  burger?.classList.toggle('navbar-custom__hamburger--open', open);
  burger?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

export function applyTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage unavailable */
  }
  const toggle = document.getElementById('theme-toggle');
  toggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  const icon = toggle?.querySelector<HTMLElement>('[data-theme-icon]');
  if (icon) {
    // Restart the icon-in animation.
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = '';
  }
}

function toggleTheme(event: MouseEvent) {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || reduce) {
    applyTheme(next);
    return;
  }
  document.documentElement.style.setProperty('--theme-x', `${event.clientX}px`);
  document.documentElement.style.setProperty('--theme-y', `${event.clientY}px`);
  doc.startViewTransition(() => applyTheme(next));
}

export function initNavbar() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Dropdown groups — hover on desktop, click everywhere.
  document.querySelectorAll<HTMLElement>('[data-nav-group]').forEach((group) => {
    const trigger = group.querySelector<HTMLButtonElement>('.navbar-custom__group-trigger');
    let hoverTimer: number | undefined;
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !group.classList.contains('navbar-custom__group--open');
      closeAllGroups(group);
      setGroup(group, open);
    });
    group.addEventListener('mouseenter', () => {
      if (!DESKTOP.matches) return;
      window.clearTimeout(hoverTimer);
      closeAllGroups(group);
      setGroup(group, true);
    });
    group.addEventListener('mouseleave', () => {
      if (!DESKTOP.matches) return;
      hoverTimer = window.setTimeout(() => setGroup(group, false), 120);
    });
  });

  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('[data-nav-group]')) closeAllGroups();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllGroups();
      setDrawer(false);
    }
  });

  // Mobile drawer.
  document.getElementById('site-nav-hamburger')?.addEventListener('click', () => {
    const open = !document.getElementById('site-nav-drawer')?.classList.contains('navbar-custom__links--open');
    setDrawer(open);
  });
  document.getElementById('site-nav-scrim')?.addEventListener('click', () => setDrawer(false));
  document.querySelectorAll('#site-nav-drawer a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));

  // Shrink after 10px, hide when scrolling down past 400px, reveal on scroll up.
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('navbar-custom--shrunk', y > 10);
    nav.classList.toggle('navbar-custom--scrolled', y > 10);
    const goingDown = y > lastY;
    const anyOpen = document.querySelector('.navbar-custom__group--open, .navbar-custom__links--open');
    nav.classList.toggle('navbar-custom--hidden', goingDown && y > 400 && !anyOpen);
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();

  // Theme toggle.
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  // Search + terminal buttons broadcast events the islands listen for.
  document.querySelectorAll('[data-open-palette]').forEach((el) =>
    el.addEventListener('click', () => window.dispatchEvent(new CustomEvent('kb:open-palette'))),
  );
  document.querySelectorAll('[data-open-terminal]').forEach((el) =>
    el.addEventListener('click', () => window.dispatchEvent(new CustomEvent('kb:open-terminal'))),
  );
}
