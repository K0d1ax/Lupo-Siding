import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        /** High Plains Neon signature palette */
        neon: {
          DEFAULT: "hsl(var(--neon))",
          soft: "hsl(var(--neon-soft))",
          dim: "hsl(var(--neon-dim))",
        },
        flare: {
          DEFAULT: "hsl(var(--flare))",
          soft: "hsl(var(--flare-soft))",
        },
        glacier: {
          DEFAULT: "hsl(var(--glacier))",
          soft: "hsl(var(--glacier-soft))",
        },
        copper: {
          DEFAULT: "hsl(var(--copper))",
          soft: "hsl(var(--copper-soft))",
        },
        granite: {
          900: "hsl(220 30% 3%)",
          800: "hsl(220 26% 5%)",
          700: "hsl(220 24% 8%)",
          600: "hsl(220 20% 12%)",
          500: "hsl(220 17% 17%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 14px)",
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(255,255,255,0.55), 0 0 10px -2px rgba(196,228,255,0.5), 0 0 34px -10px rgba(140,200,255,0.42), inset 0 1px 0 rgba(255,255,255,0.14)",
        "neon-lg":
          "0 0 0 1px rgba(255,255,255,0.7), 0 0 18px -2px rgba(203,232,255,0.6), 0 0 70px -14px rgba(150,205,255,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
        "neon-flare":
          "0 0 0 1px rgba(255,224,178,0.65), 0 0 20px -4px rgba(255,177,60,0.55), 0 0 70px -18px rgba(255,150,40,0.4)",
        glass: "0 24px 70px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)",
        lift: "0 30px 90px -40px rgba(0,0,0,0.95)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
        "flare-sweep": "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)",
      },
      backgroundSize: {
        grid: "56px 56px",
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
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        snowfall: {
          "0%": { transform: "translate3d(0,-10%,0)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translate3d(-6vw,110vh,0)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.55)", opacity: "0.9" },
          "80%,100%": { transform: "scale(2.4)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        "dash-draw": {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.24s cubic-bezier(0.32,0.72,0,1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.32,0.72,0,1)",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 38s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
