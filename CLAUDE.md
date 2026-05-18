# CLAUDE.md

> **For future Claude Code sessions.** This file is auto-loaded into context.
> Read it first, then you can resume work with Ksatria where the last session left off.
> Mirror the warm, Indonesian-leaning tone described below — Ksatria addresses Claude as `sayang`.

---

## 👤 The User — Ksatria Bintang Samudra

- **Location**: Pontianak, West Kalimantan, Indonesia 🇮🇩
- **GitHub**: [@Kstriabintang](https://github.com/Kstriabintang)
- **Email**: ksatriabintangsamudra2022@gmail.com
- **Domain**: [ksatriabintangsamudra.my.id](https://ksatriabintangsamudra.my.id)

**Positioning (May 2026 onwards)**:
**AI Engineer · Automation Builder · Solutions Architect**

Note: Ksatria explicitly repositioned from "Full Stack Developer / Bug Hunter / Bot Builder" → "AI Engineer". He's targeting the international remote (USD) market. He's transparent about being AI-native: prompt engineering, LLM orchestration, AI-augmented workflows. Don't downplay this — it's a deliberate differentiator. Own it openly.

**Background still valid in CV/About**: penetration testing (Upwork), Google Workspace admin (Kalimantan Tambang Mandiri Sept 2024 – Mar 2026), social media data analyst (Upwork). All in past tense — currently freelance/available.

---

## 💬 Working Style with Ksatria

- **Language**: Indonesia, casual. Mix sometimes with English technical terms.
- **Address**: He says `sayang` ("darling"). Mirror naturally — don't force it, but it's warm and welcomed.
- **Tone**: Confident, calm, technical. Not hype-y. Not apologetic. (His exact words.)
- **Pace**: Move fast when direction is clear. Pause and confirm when stakes are high (especially destructive ops, content/positioning decisions).
- **Decisions**: He delegates decisions ("kau pilih saja") but appreciates being told *what* you chose and *why*, with flags for things he should review.
- **Errors**: He gets frustrated quickly when commands fail repeatedly. Triage faster, explain less when frustrated.

---

## 🏗️ Project — Personal Branding Portfolio

**Repo**: https://github.com/Kstriabintang/Kstriabintang.github.io
**Live**: https://ksatriabintangsamudra.my.id (custom domain) + https://kstriabintang.github.io (fallback)
**Deploy**: GitHub Actions auto-deploy on push to `main` (`.github/workflows/deploy.yml`)

### Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 (`base: './'` for GH Pages compat) |
| Styling | Tailwind CSS 3.4 + custom CSS layer in `src/index.css` |
| Animation | GSAP + ScrollTrigger + Framer Motion |
| Icons | `react-icons/si` (Simple Icons) + `lucide-react` |
| i18n | Custom Context + hook in `src/lib/i18n.tsx` — **no library** |
| Fonts | JetBrains Mono + Inter (Google Fonts) |

### Performance Budget (HARD RULE)

**Initial JS bundle MUST stay ≤ 94 KB gzipped.** Last measured: **91.34 KB gzip** (✅).
Run `npm run build` after any change to verify the `index-*.js` chunk.

### Code Splitting

Strict pattern: only `Hero` is eager. Everything else is `lazy()` with `Suspense` skeleton fallbacks. See `src/pages/Home.tsx`.

Overlay components also lazy-loaded (to stay under budget):
- `CommandPalette` and `KonamiTerminal` lazy-loaded in `src/App.tsx`
- `SpotlightTracker` + `TabTitleEgg` are eager (tiny, listener-only)

---

## 📁 Key File Map

```
.
├── CLAUDE.md                    ← this file
├── cv-template.html             ← editable source for CV (Fraunces + IBM Plex design)
├── README.md
├── LICENSE                      ← MIT 2026 Ksatria
├── index.html                   ← SEO + JSON-LD + favicon links
├── .github/workflows/deploy.yml ← auto-deploy
├── public/
│   ├── CNAME                    ← custom domain (DO NOT delete)
│   ├── favicon.svg + 3 PNG
│   ├── og-image.jpg (113 KB)
│   ├── profile-photo.jpg (34 KB)
│   ├── robots.txt, sitemap.xml
│   ├── cv/
│   │   ├── ksatria-cv-ai-engineer.html
│   │   └── ksatria-cv-ai-engineer.pdf  ← downloaded as "Ksatria-Bintang-Samudra-CV.pdf"
│   └── sertif/                  ← certificate PDFs (5 active)
│       ├── google-ai-essentials.pdf
│       ├── ethical-hacker.pdf
│       ├── isc2-cybersecurity.pdf
│       ├── expert-linux.pdf
│       └── toefl.pdf
└── src/
    ├── App.tsx                  ← LanguageProvider + lazy overlays
    ├── main.tsx                 ← no router (single page)
    ├── pages/Home.tsx           ← section order + Suspense
    ├── lib/i18n.tsx             ← Context, useTranslation, view-transition-wrapped setLocale
    ├── locales/
    │   ├── en.ts                ← canonical (id.ts must match its shape)
    │   └── id.ts
    ├── components/
    │   ├── Navbar.tsx           ← scroll spy + lang toggle
    │   ├── Footer.tsx           ← copyright only at bottom (no "Made with ❤")
    │   ├── Layout.tsx
    │   ├── ReadingProgress.tsx  ← thin top bar showing scroll %
    │   ├── KonamiTerminal.tsx   ← Easter egg (↑↑↓↓←→←→BA)
    │   ├── CommandPalette.tsx   ← Cmd+K nav palette
    │   ├── SpotlightTracker.tsx ← global mouse → CSS vars on .spotlight-card
    │   ├── Aurora.tsx           ← Hero bg blobs
    │   ├── Magnetic.tsx         ← CTA wrapper
    │   └── TabTitleEgg.tsx      ← "Come back" when tab hidden
    ├── sections/
    │   ├── Hero.tsx             ← Aurora + ParticleField + Magnetic CTAs
    │   ├── About.tsx            ← personal bio (3 pillars still use OLD labels — see Decision Flags)
    │   ├── HowIWork.tsx         ← AI-native manifesto, between About and Skills
    │   ├── Skills/
    │   │   ├── index.tsx
    │   │   ├── data.tsx         ← 8 categories, "AI & Workflow" first
    │   │   └── Terminal.tsx     ← nmap fake terminal
    │   ├── Experience.tsx       ← 4 roles, all past tense (no "Current" anymore)
    │   ├── Projects.tsx         ← 3 curated only (aktifinIMEI / Portfolio / Link Tracker)
    │   ├── Certificates.tsx     ← 5 certs with "View Certificate" buttons → /sertif/*.pdf
    │   └── Contact.tsx          ← Hire Me (mailto) + Download CV (PDF)
    └── hooks/
        ├── use-active-section.ts
        ├── use-in-viewport.ts
        ├── use-reduced-motion.ts
        └── use-mobile.ts
```

---

## ✨ Features Built (don't accidentally remove these)

- 🌌 **Aurora gradient** Hero bg (auto-pause when offscreen via `useInViewport`)
- ✨ **Particle field** Hero accent (reduced on mobile, off if `prefers-reduced-motion`)
- 🖱️ **Linux X11 cursor** — SVG data-URI in CSS, hover state changes to purple. Auto-off on touch
- 🔦 **Spotlight cards** — Linear/Vercel style. CSS vars updated by `SpotlightTracker`. Applied to: Projects, Certificates, Experience, About pillars, HowIWork pillars
- 🧲 **Magnetic CTA buttons** — Hero CTAs + Contact CTAs
- 🎬 **Film grain overlay** — desktop only, SVG `feTurbulence`
- 🌈 **Rotating gradient border** — `.current-glow` class (currently unused since no job has `status: 'Current'`, but kept for re-use)
- ⌨️ **Cmd+K command palette** — fuzzy search, lazy-loaded
- 🎮 **Konami code Easter egg** — `↑↑↓↓←→←→BA` opens playable terminal with commands: help/whoami/ls/cat/nmap/sudo hire-me/skills/social/matrix/echo/clear/exit
- 👋 **Tab title easter egg** — switches when tab loses focus
- 📊 **Scroll spy navbar** + reading progress bar (top thin gradient bar)
- 🌊 **View Transitions API** on language switch (graceful fallback)
- ♿ **Accessibility** — skip-to-content link, focus-visible rings, ARIA labels, reduced-motion respected
- 🌍 **Bilingual EN/ID** — auto-detect from `navigator.language`, persist in `localStorage`

---

## 🚦 Decision Flags (Open Items)

1. **About section pillars still show "Bug Hunter / Full Stack / Bot Builder"** with old descriptions. Spec for AI Engineer reposition didn't request changes here, so I left them. They conflict with the new positioning. Ksatria should decide:
   - (a) Keep — describes background, not headline
   - (b) Rename to "AI Engineer / Automation Builder / Solutions Architect"
   - (c) Remove pillars entirely (HowIWork has its own 3 pillars)

2. **GitHub repo auto-update** for new repos — not implemented. Projects section is curated to 3 hardcoded. If Ksatria wants auto-fetch from GitHub API, we discussed:
   - Build-time fetch (cleanest)
   - Runtime fetch (always fresh)
   - Hybrid (3 featured + auto-fetch rest)

3. **CV optimization** — TOEFL PDF is 1.0 MB. Could be compressed with ImageMagick if user wants.

---

## ⚙️ Common Operations

```bash
# Dev server (http://localhost:3000)
npm run dev

# Production build (verify bundle ≤ 94 KB gzip!)
npm run build

# Preview prod build locally
npm run preview

# Deploy: just push to main
git add .
git commit -m "..."
git push   # GH Actions auto-deploys in ~2 minutes

# Regenerate CV PDF after editing cv-template.html
chromium --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/cv/ksatria-cv-ai-engineer.pdf \
  "file://$(pwd)/cv-template.html"
cp cv-template.html public/cv/ksatria-cv-ai-engineer.html
```

---

## 🚨 Critical Don'ts

- ❌ **NEVER delete `/CNAME`** at root or `public/CNAME` — both are required. GH Pages reads root CNAME for persistent custom domain setting; `public/CNAME` becomes the served file via Vite build.
- ❌ **NEVER change GH Pages source** from "GitHub Actions" to "Deploy from a branch" — site will serve raw `src/main.tsx` and white-screen.
- ❌ **NEVER add new initial-load JS** that pushes bundle over 94 KB gzip. Lazy-load instead.
- ❌ **NEVER use `git config`** to change Ksatria's git identity. Ask him to run it himself with `!` prefix.
- ❌ **NEVER amend or force-push** to main. Always create new commits.
- ❌ **Don't add `Made with ❤` or similar emoji-laden corporate copy** — Ksatria removed it once already. Keep tone professional.

---

## ✅ Done — Final State (as of last session)

- ✅ Repo live at https://ksatriabintangsamudra.my.id (HTTPS via Let's Encrypt)
- ✅ Auto-deploy on push to `main`
- ✅ All copy in EN + ID (bilingual via i18n)
- ✅ AI Engineer repositioning complete (Hero, How I Work, Skills, Projects, SEO, CV)
- ✅ 5 certs with viewable PDF links (`/sertif/*.pdf`)
- ✅ CV download exact 2 A4 pages, 166 KB PDF
- ✅ Bundle 91.34 KB gzip (budget 94 KB)
- ✅ Konami + Cmd+K easter eggs working
- ✅ View transitions on language switch
- ✅ Custom Linux X11 cursor
- ✅ MIT LICENSE file present

---

## 🕰️ Recent Timeline (highest-level)

1. Built portfolio from scratch — React + Vite + GSAP + Framer Motion
2. Bilingual EN/ID infrastructure with view transitions
3. Code-split everything, slashed bundle 619 KB → 91 KB gzip
4. Premium effects layer: Aurora, spotlight, magnetic, grain
5. Easter eggs: Konami terminal + Cmd+K palette + tab title
6. Pushed to GitHub (`Kstriabintang/Kstriabintang.github.io`)
7. Hooked up custom domain `ksatriabintangsamudra.my.id`
8. **Major repositioning**: Full Stack Developer → AI Engineer · Automation Builder · Solutions Architect
9. CV rewrite with Fraunces serif + IBM Plex design (2-page A4)
10. 5 verified certs with viewable PDFs

---

## 💜 Last Note to Future Claude

Ksatria built this portfolio as a serious investment in his international career. Every decision was deliberate — the AI-native positioning, the bilingual reach, the performance discipline. When he asks for changes, assume the *strategic* reason matters more than the surface request. When in doubt, ask before assuming. Confirm before doing anything destructive.

He calls you `sayang`. Don't be weird about it — it's just warmth. Be warm back, but stay sharp. He values speed + precision over fluff. Match that.

Selamat melanjutkan, sayang. 🚀

— Claude Opus 4.7 (May 2026)
