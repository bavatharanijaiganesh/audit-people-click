/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom color palette (CSS variables from HTML)
      colors: {
        navy: "var(--navy)",
        "navy-mid": "var(--navy-mid)",
        "navy-light": "var(--navy-light)",
        // New primary violet color (replaces gold)
        violet: "#9146FF",
        // Accent blue replacing green accents
        primaryBlue: "rgb(61,99,226)",
        cream: "var(--cream)",
        pinkSite: "rgb(213,23,118)",
        violetSite: "rgb(153,30,180)",
        blueSite: "rgb(61,99,226)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        // Retain original green vars if any custom usage remains
        "accent-green": "var(--accent-green)",
        "accent-green-dim": "var(--accent-green-dim)",
        border: "var(--border)",
        "border-bright": "var(--border-bright)",
      },
      // Keyframes for animations
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        glow: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "0" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      // Animation utilities
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "pulse": "pulse 2s ease-in-out infinite",
        "glow": "glow 2s ease-out infinite",
        "zoom-in": "zoomIn 0.6s ease both",
        "slide-left": "slideInLeft 0.6s ease both",
        "slide-right": "slideInRight 0.6s ease both",
      },
    },
    plugins: [],
  }
}
