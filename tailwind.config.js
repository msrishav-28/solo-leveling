const rgbVar = (name) => ({ opacityValue }) => {
  if (opacityValue === undefined) {
    return `rgb(var(${name}))`;
  }
  return `rgb(var(${name}) / ${opacityValue})`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        void: "#020617",
        abyss: "#000000",
        mana: "#00d9ff",
        "mana-glow": "#00ffff",
        threat: "#ff0033",
        loot: "#ffd700",
        hairline: "rgba(0, 217, 255, 0.18)",
        border: rgbVar("--color-border"),
        input: rgbVar("--color-input"),
        ring: rgbVar("--color-ring"),
        background: rgbVar("--color-background"),
        foreground: rgbVar("--color-foreground"),
        primary: {
          DEFAULT: rgbVar("--color-primary"),
          foreground: rgbVar("--color-primary-foreground"),
        },
        secondary: {
          DEFAULT: rgbVar("--color-secondary"),
          foreground: rgbVar("--color-secondary-foreground"),
        },
        destructive: {
          DEFAULT: rgbVar("--color-destructive"),
          foreground: rgbVar("--color-destructive-foreground"),
        },
        muted: {
          DEFAULT: rgbVar("--color-muted"),
          foreground: rgbVar("--color-muted-foreground"),
        },
        accent: {
          DEFAULT: rgbVar("--color-accent"),
          foreground: rgbVar("--color-accent-foreground"),
        },
        popover: {
          DEFAULT: rgbVar("--color-popover"),
          foreground: rgbVar("--color-popover-foreground"),
        },
        card: {
          DEFAULT: rgbVar("--color-card"),
          foreground: rgbVar("--color-card-foreground"),
        },
        success: {
          DEFAULT: rgbVar("--color-success"),
          foreground: rgbVar("--color-success-foreground"),
        },
        warning: {
          DEFAULT: rgbVar("--color-warning"),
          foreground: rgbVar("--color-warning-foreground"),
        },
        error: {
          DEFAULT: rgbVar("--color-error"),
          foreground: rgbVar("--color-error-foreground"),
        },
        surface: {
          DEFAULT: rgbVar("--color-surface"),
          foreground: rgbVar("--color-surface-foreground"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        caption: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        system: "inset 0 1px 0 rgba(0,217,255,0.08), 0 30px 80px -40px rgba(0,217,255,0.25)",
        "system-strong": "0 0 0 1px rgba(0,217,255,0.25), 0 0 32px rgba(0,217,255,0.22)",
        "system-danger": "0 0 0 1px rgba(255,0,51,0.25), 0 0 32px rgba(255,0,51,0.2)",
        "system-loot": "0 0 0 1px rgba(255,215,0,0.25), 0 0 32px rgba(255,215,0,0.2)",
        cyberpunk: "0px 4px 12px rgba(0,0,0,0.4), 0px 0px 20px rgba(0,217,255,0.3)",
        "cyberpunk-hover": "0px 8px 24px rgba(0,0,0,0.5), 0px 0px 30px rgba(0,217,255,0.5)",
        "glow-primary": "0px 0px 20px rgba(0,217,255,0.3)",
        "glow-secondary": "0px 0px 20px rgba(147,51,234,0.3)",
        "glow-accent": "0px 0px 20px rgba(255,215,0,0.3)",
        "glow-success": "0px 0px 20px rgba(34,197,94,0.3)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-mana": "pulse-mana 2.4s ease-in-out infinite",
        ticker: "ticker 40s linear infinite",
        glitch: "glitch 0.4s steps(2, end) infinite",
        shimmer: "shimmer 1.8s linear infinite",
        "spin-slow": "spin 7s linear infinite",
        float: "float 2s ease-in-out infinite",
        "scale-in": "scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-up": "slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
        "pulse-mana": {
          "0%, 100%": { opacity: "0.72" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(1px, -1px)" },
          "60%": { transform: "translate(-2px, 0)" },
          "80%": { transform: "translate(2px, 1px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-16deg)" },
          "100%": { transform: "translateX(220%) skewX(-16deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      transitionTimingFunction: {
        system: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
