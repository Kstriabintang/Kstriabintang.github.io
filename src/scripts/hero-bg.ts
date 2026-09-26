// Hero background: warp starfield (dark theme) and drifting cloud sky (light theme).
// One canvas at a time, swapped live when <html data-theme> changes.

type Pointer = { x: number; y: number };

interface Scene {
  canvas: HTMLCanvasElement;
  start(): void;
  stop(): void;
  drawOnce(): void;
  destroy(): void;
}

const START_DELAY_MS = 350;
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Shared canvas loop                                                  */
/* ------------------------------------------------------------------ */

function createLoop(canvas: HTMLCanvasElement, frame: () => void, fpsCap: number) {
  let raf = 0;
  let running = false;
  let last = 0;
  const minDelta = fpsCap > 0 ? 1000 / fpsCap : 0;

  const tick = (t: number) => {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    if (minDelta && t - last < minDelta) return;
    last = t;
    frame();
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    get running() {
      return running;
    },
    canvas,
  };
}

function sizeCanvas(canvas: HTMLCanvasElement) {
  const host = canvas.parentElement;
  canvas.width = host?.clientWidth || window.innerWidth;
  canvas.height = host?.clientHeight || window.innerHeight;
}

/* ------------------------------------------------------------------ */
/* Starfield                                                           */
/* ------------------------------------------------------------------ */

class Star {
  x = 0;
  y = 0;
  z = 0;
  size = 1;
  phase = Math.random() * Math.PI * 2;
  rate = 0.5 + Math.random() * 1.6;

  constructor(private c: HTMLCanvasElement, private speed: number) {
    this.reset(true);
  }

  reset(initial = false) {
    const { width: w, height: h } = this.c;
    this.x = Math.random() * w * 2 - w;
    this.y = Math.random() * h * 2 - h;
    this.z = initial ? Math.random() * w : w;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.z -= this.speed;
    if (this.z <= 0) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D, px: number, py: number, now: number) {
    const { width: w, height: h } = this.c;
    const depth = 1 - this.z / w;
    const sx = (this.x / this.z) * (w / 2) + w / 2 + px * 0.05 * depth;
    const sy = (this.y / this.z) * (h / 2) + h / 2 + py * 0.05 * depth;
    const r = depth * this.size;
    if (r <= 0) return;
    const twinkle = 0.7 + 0.3 * Math.sin((now / 1000) * this.rate + this.phase);
    if (depth > 0.6) {
      // Near stars pick up the brand teal.
      const k = (depth - 0.6) / 0.4;
      const red = Math.round(255 - k * 253);
      const green = Math.round(255 - k * 85);
      const blue = Math.round(255 - k * 79);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${(0.8 + depth * 0.2) * twinkle})`;
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.3 + depth * 0.7) * twinkle})`;
    }
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Comet {
  x = 0;
  y = 0;
  z = 0;
  size = 1;

  constructor(private c: HTMLCanvasElement, private speed: number) {
    this.reset(true);
  }

  reset(initial = false) {
    const { width: w, height: h } = this.c;
    this.x = Math.random() * w * 2 - w;
    this.y = Math.random() * h * 2 - h;
    this.z = initial ? Math.random() * w : w;
    this.size = Math.random() * 1.5 + 1;
  }

  update() {
    this.z -= this.speed * 3;
    if (this.z <= 0) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D, px: number, py: number) {
    const { width: w, height: h } = this.c;
    const depth = 1 - this.z / w;
    const cx = w / 2;
    const cy = h / 2;
    const sx = (this.x / this.z) * (w / 2) + cx + px * 0.05 * depth;
    const sy = (this.y / this.z) * (h / 2) + cy + py * 0.05 * depth;
    const r = depth * this.size;
    if (r < 0.3) return;

    // Tail points back toward the vanishing point.
    const dx = cx - sx;
    const dy = cy - sy;
    const len = Math.hypot(dx, dy) || 1;
    const tail = depth * 70 + 20;
    const tx = sx + (dx / len) * tail;
    const ty = sy + (dy / len) * tail;

    ctx.save();
    ctx.globalAlpha = Math.min(1, depth * 2);
    const trail = ctx.createLinearGradient(sx, sy, tx, ty);
    trail.addColorStop(0, 'rgba(200, 230, 255, 0.85)');
    trail.addColorStop(0.4, 'rgba(160, 200, 255, 0.3)');
    trail.addColorStop(1, 'rgba(100, 160, 255, 0)');
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = trail;
    ctx.lineWidth = r * 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3);
    glow.addColorStop(0, 'rgba(255, 255, 255, 1)');
    glow.addColorStop(0.3, 'rgba(200, 230, 255, 0.8)');
    glow.addColorStop(1, 'rgba(100, 180, 255, 0)');
    ctx.beginPath();
    ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
    ctx.restore();
  }
}

function createStarfield(host: HTMLElement, pointer: Pointer): Scene {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  canvas.className = 'hero-canvas hero-canvas--stars';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  sizeCanvas(canvas);
  const ctx = canvas.getContext('2d')!;
  const speed = 0.6;
  const mobile = isMobile();
  let stars: Star[] = [];
  let comets: Comet[] = [];

  const populate = () => {
    stars = Array.from({ length: mobile ? 120 : 260 }, () => new Star(canvas, speed));
    comets = Array.from({ length: 2 }, () => new Comet(canvas, speed));
  };
  populate();

  const render = (animate: boolean) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const px = pointer.x - canvas.width / 2;
    const py = pointer.y - canvas.height / 2;
    const now = performance.now();
    for (const s of stars) {
      if (animate) s.update();
      s.draw(ctx, px, py, now);
    }
    for (const c of comets) {
      if (animate) c.update();
      c.draw(ctx, px, py);
    }
  };

  const loop = createLoop(canvas, () => render(true), mobile ? 30 : 0);
  const onResize = () => {
    sizeCanvas(canvas);
    populate();
    if (!loop.running) render(false);
  };
  window.addEventListener('resize', onResize);

  return {
    canvas,
    start: () => loop.start(),
    stop: () => loop.stop(),
    drawOnce: () => render(false),
    destroy() {
      loop.stop();
      window.removeEventListener('resize', onResize);
      canvas.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Cloud sky                                                           */
/* ------------------------------------------------------------------ */

interface Blob {
  ox: number;
  oy: number;
  r: number;
  a: number;
}

class Cloud {
  blobs: Blob[] = [];
  height: number;

  constructor(
    private c: HTMLCanvasElement,
    public x: number,
    public y: number,
    public width: number,
    public speed: number,
    public opacity: number,
    public depth: 0 | 1 | 2,
  ) {
    this.height = width * 0.45;
    this.blobs = this.makeBlobs();
  }

  makeBlobs(): Blob[] {
    const hw = this.width / 2;
    const hh = this.height / 2;
    const out: Blob[] = [];
    const base = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < base; i += 1) {
      const t = i / (base - 1);
      out.push({ ox: (t - 0.5) * this.width * 0.7, oy: -Math.sin(t * Math.PI) * hh * 0.3, r: hw * (0.28 + Math.random() * 0.15), a: 0.6 + Math.random() * 0.3 });
    }
    const top = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < top; i += 1) {
      out.push({ ox: (Math.random() - 0.5) * this.width * 0.6, oy: -(hh * 0.3 + Math.random() * hh * 0.5), r: hw * (0.18 + Math.random() * 0.14), a: 0.5 + Math.random() * 0.3 });
    }
    const bottom = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < bottom; i += 1) {
      out.push({ ox: (Math.random() - 0.5) * this.width * 0.8, oy: hh * (0.1 + Math.random() * 0.2), r: hw * (0.22 + Math.random() * 0.12), a: 0.4 + Math.random() * 0.2 });
    }
    return out;
  }

  update() {
    this.x += this.speed;
    if (this.x - this.width > this.c.width) {
      this.x = -this.width * 1.5;
      this.y = Math.random() * this.c.height * 0.65;
    }
  }

  draw(ctx: CanvasRenderingContext2D, px: number, py: number) {
    const parallax = [0.03, 0.015, 0.007][this.depth];
    const bx = this.x + px * parallax;
    const by = this.y + py * parallax;
    for (const b of this.blobs) {
      const x = bx + b.ox;
      const y = by + b.oy;
      const g = ctx.createRadialGradient(x, y, b.r * 0.1, x, y, b.r);
      g.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * b.a})`);
      g.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * b.a * 0.6})`);
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const CLOUD_LAYERS: { count: number; depth: 0 | 1 | 2; speed: [number, number]; width: [number, number]; opacity: [number, number] }[] = [
  { count: 2, depth: 2, speed: [0.05, 0.1], width: [220, 320], opacity: [0.35, 0.5] },
  { count: 2, depth: 1, speed: [0.08, 0.15], width: [320, 520], opacity: [0.5, 0.65] },
  { count: 2, depth: 0, speed: [0.12, 0.2], width: [420, 620], opacity: [0.6, 0.8] },
];

const between = ([a, b]: [number, number]) => a + Math.random() * (b - a);

function createCloudSky(host: HTMLElement, pointer: Pointer): Scene {
  const canvas = document.createElement('canvas');
  canvas.id = 'cloudfield';
  canvas.className = 'hero-canvas hero-canvas--sky';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  sizeCanvas(canvas);
  const ctx = canvas.getContext('2d')!;
  const mobile = isMobile();
  let clouds: Cloud[] = [];

  const populate = () => {
    clouds = [];
    for (const layer of CLOUD_LAYERS) {
      const n = mobile ? Math.ceil(layer.count / 2) : layer.count;
      for (let i = 0; i < n; i += 1) {
        const width = between(layer.width);
        clouds.push(
          new Cloud(canvas, Math.random() * canvas.width * 1.4 - width * 0.5, Math.random() * canvas.height * 0.65, width, between(layer.speed), between(layer.opacity), layer.depth),
        );
      }
    }
    clouds.sort((a, b) => b.depth - a.depth);
  };
  populate();

  const paintSky = () => {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, '#a2cde5');
    g.addColorStop(0.75, '#cfe6f2');
    g.addColorStop(1, '#eef6fa');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const sx = canvas.width * 0.82;
    const sy = canvas.height * 0.1;
    const haze = ctx.createRadialGradient(sx, sy, 0, sx, sy, 300);
    haze.addColorStop(0, 'rgba(255, 252, 235, 0.4)');
    haze.addColorStop(0.2, 'rgba(255, 248, 210, 0.2)');
    haze.addColorStop(0.5, 'rgba(255, 245, 200, 0.06)');
    haze.addColorStop(1, 'rgba(255, 245, 200, 0)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

    const core = ctx.createRadialGradient(sx, sy, 0, sx, sy, 60);
    core.addColorStop(0, 'rgba(255, 255, 245, 0.6)');
    core.addColorStop(0.5, 'rgba(255, 250, 230, 0.2)');
    core.addColorStop(1, 'rgba(255, 250, 230, 0)');
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(sx, sy, 60, 0, Math.PI * 2);
    ctx.fill();
  };

  const render = (animate: boolean) => {
    paintSky();
    const px = pointer.x - canvas.width / 2;
    const py = pointer.y - canvas.height / 2;
    for (const c of clouds) {
      if (animate) c.update();
      c.draw(ctx, px, py);
    }
  };

  const loop = createLoop(canvas, () => render(true), mobile ? 30 : 0);
  const onResize = () => {
    sizeCanvas(canvas);
    populate();
    if (!loop.running) render(false);
  };
  window.addEventListener('resize', onResize);

  return {
    canvas,
    start: () => loop.start(),
    stop: () => loop.stop(),
    drawOnce: () => render(false),
    destroy() {
      loop.stop();
      window.removeEventListener('resize', onResize);
      canvas.remove();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Controller                                                          */
/* ------------------------------------------------------------------ */

export function initHeroBackground(host: HTMLElement) {
  const pointer: Pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let scene: Scene | null = null;
  let visible = true;
  let started = false;

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  const shouldRun = () => started && visible && document.visibilityState === 'visible' && !reduceMotion();

  const sync = () => {
    if (!scene) return;
    if (shouldRun()) scene.start();
    else scene.stop();
  };

  const mount = () => {
    scene?.destroy();
    scene = isDark() ? createStarfield(host, pointer) : createCloudSky(host, pointer);
    scene.drawOnce();
    io.disconnect();
    io.observe(scene.canvas);
    sync();
  };

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      sync();
    },
    { threshold: 0 },
  );

  const onMove = (e: MouseEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  };
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.gamma === null || e.beta === null) return;
    pointer.x = window.innerWidth / 2 + e.gamma * 10;
    pointer.y = window.innerHeight / 2 + (e.beta - 45) * 10;
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('deviceorientation', onTilt, { passive: true });
  document.addEventListener('visibilitychange', sync);

  new MutationObserver(() => {
    if (started) mount();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Defer the canvas until the page is idle or the visitor interacts.
  const triggers = ['pointerdown', 'keydown', 'scroll'] as const;
  let timer = 0;
  const begin = () => {
    if (started) return;
    started = true;
    window.clearTimeout(timer);
    triggers.forEach((t) => window.removeEventListener(t, begin));
    mount();
  };
  timer = window.setTimeout(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(begin, { timeout: 500 });
    else begin();
  }, START_DELAY_MS);
  triggers.forEach((t) => window.addEventListener(t, begin, { once: true, passive: true }));
}
