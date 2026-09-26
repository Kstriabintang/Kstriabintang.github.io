// Interactive dotted globe (cobe v2). Auto-rotates, drag to spin, re-themes with data-theme.
// cobe v2 has no internal loop: we call globe.update() every frame ourselves.

import type { Globe, Marker } from 'cobe';

type Theme = 'dark' | 'light';

const PALETTE: Record<Theme, { dark: number; diffuse: number; mapBrightness: number; baseColor: [number, number, number]; markerColor: [number, number, number]; glowColor: [number, number, number] }> = {
  dark: { dark: 1, diffuse: 1.2, mapBrightness: 4, baseColor: [0.15, 0.15, 0.25], markerColor: [0.008, 0.667, 0.69], glowColor: [0.05, 0.05, 0.15] },
  light: { dark: 0, diffuse: 2.5, mapBrightness: 1.5, baseColor: [0.9, 0.93, 0.97], markerColor: [0.96, 0.35, 0.3], glowColor: [0.85, 0.88, 0.95] },
};

// cobe's phi that brings a longitude to the front of the globe.
const phiFor = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);

const currentTheme = (): Theme => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

function initPlacePills(section: HTMLElement) {
  const pills = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-place]'));
  const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-place-card]'));
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const id = pill.dataset.place;
      const wasActive = pill.classList.contains('travel-globe__country--active');
      pills.forEach((p) => {
        p.classList.remove('travel-globe__country--active');
        p.setAttribute('aria-expanded', 'false');
      });
      cards.forEach((c) => (c.hidden = true));
      if (wasActive) return;
      pill.classList.add('travel-globe__country--active');
      pill.setAttribute('aria-expanded', 'true');
      const card = cards.find((c) => c.dataset.placeCard === id);
      if (card) card.hidden = false;
    });
  });
}

export function initGlobe() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-globe]');
  const section = canvas?.closest<HTMLElement>('section');
  if (!canvas || !section) return;
  initPlacePills(section);

  const markers: Marker[] = JSON.parse(canvas.dataset.markers || '[]');
  // Start facing the first marker (home base) so it is visible on first paint.
  const START_PHI = markers[0] ? phiFor(markers[0].location[1]) : 0;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let globe: Globe | null = null;
  let raf = 0;
  let visible = false;
  let autoPhi = 0;
  let dragOffset = 0;
  let pointerStart: number | null = null;
  let createGlobeFn: typeof import('cobe').default | null = null;
  let cobePromise: Promise<typeof import('cobe').default> | null = null;

  // Warm the cobe chunk (kept out of the initial bundle) so it is ready before scroll.
  const loadCobe = () => {
    if (!cobePromise) {
      cobePromise = import('cobe').then((mod) => {
        createGlobeFn = mod.default;
        return mod.default;
      });
    }
    return cobePromise;
  };

  const size = () => (canvas.parentElement?.offsetWidth || canvas.offsetWidth || 420) * dpr;

  const frame = () => {
    if (!globe) return;
    if (pointerStart === null && !reduce) autoPhi += 0.005;
    const s = size();
    globe.update({ phi: START_PHI + autoPhi + dragOffset, width: s, height: s });
    raf = visible && !reduce ? requestAnimationFrame(frame) : 0;
  };

  const start = () => {
    if (!raf && globe) raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const build = () => {
    if (!createGlobeFn) return;
    stop();
    globe?.destroy();
    const s = size();
    globe = createGlobeFn(canvas, {
      devicePixelRatio: dpr,
      width: s,
      height: s,
      phi: START_PHI + autoPhi + dragOffset,
      theta: 0.3,
      scale: 1.1,
      mapSamples: 16000,
      markers,
      ...PALETTE[currentTheme()],
    });
    canvas.classList.add('travel-globe__canvas--visible');
    frame();
    if (visible) start();
  };

  // Drag to rotate.
  canvas.addEventListener('pointerdown', (e) => {
    pointerStart = e.clientX - dragOffset * 200;
    canvas.style.cursor = 'grabbing';
    canvas.setPointerCapture?.(e.pointerId);
  });
  const release = () => {
    pointerStart = null;
    canvas.style.cursor = 'grab';
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerout', release);
  canvas.addEventListener('pointermove', (e) => {
    if (pointerStart === null) return;
    dragOffset = (e.clientX - pointerStart) / 200;
    if (!raf) frame();
  });

  // Prefetch the cobe chunk during idle time so it is downloaded (and the map
  // pre-generated) well before the visitor scrolls the globe into view.
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
  if (ric) ric(() => loadCobe(), { timeout: 2500 });
  else window.setTimeout(() => loadCobe(), 1200);

  // Build the globe as the section nears the viewport; pause it off-screen.
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible && !globe) {
        loadCobe().then(build);
      } else if (visible) {
        start();
      } else {
        stop();
      }
    },
    { rootMargin: '600px 0px' },
  );
  io.observe(canvas);

  // Rebuild with the matching palette whenever the theme flips.
  new MutationObserver(() => build()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : visible && start()));
  window.addEventListener('resize', () => {
    if (!raf) frame();
  });
}
