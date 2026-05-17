/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Purple scale
        'purple-400': '#A78BFA',
        'purple-500': '#7C3AED',
        'purple-600': '#6D28D9',
        'purple-700': '#5B21B6',
        'purple-800': '#4C1D95',
        'purple-900': '#2E1065',
        // Orange scale
        'orange-400': '#FB923C',
        'orange-500': '#F97316',
        'orange-600': '#EA580C',
        // Red scale
        'red-500': '#EF4444',
        'red-600': '#DC2626',
        // Backgrounds
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#0D1117',
        'bg-tertiary': '#111827',
        'bg-quaternary': '#1A1A1A',
        // Text
        'text-primary': '#F3F4F6',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        'text-purple': '#A78BFA',
        'text-orange': '#FB923C',
        // Glass
        'glass-surface': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(124, 58, 237, 0.2)',
        'glass-highlight': 'rgba(255, 255, 255, 0.08)',
        // shadcn compat
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'jetbrains': ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        'inter': ['Inter', '"Segoe UI"', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm-space': '8px',
        'md-space': '16px',
        'lg-space': '24px',
        'xl-space': '32px',
        '2xl-space': '48px',
        '3xl-space': '64px',
        '4xl-space': '96px',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-purple-lg': '0 0 40px rgba(124, 58, 237, 0.4)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 20px rgba(124, 58, 237, 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
        'gradient-orange': 'linear-gradient(135deg, #F97316, #FB923C)',
        'gradient-hero': 'linear-gradient(180deg, #0A0A0A 0%, rgba(46, 16, 101, 0.4) 50%, #0A0A0A 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
