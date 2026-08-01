/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cm: {
          bg: "#08070C",
          bgAlt: "#0D0B14",
          surface: "#161320",
          surface2: "#1F1B2E",
          purple: "#A855F7",
          purpleDeep: "#6D28D9",
          violet: "#C084FC",
          text: "#F4F2F8",
          muted: "#948EA3",
          line: "rgba(244,242,248,0.1)",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        sans: ["'Sora'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        "cm-scroll": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "cm-blink": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.25 } },
        "cm-glow": { "0%, 100%": { opacity: 0.45, transform: "scale(1)" }, "50%": { opacity: 0.8, transform: "scale(1.06)" } },
        "cm-fade-up": { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        "cm-fade": { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        "cm-scroll": "cm-scroll 38s linear infinite",
        "cm-blink": "cm-blink 1.6s ease-in-out infinite",
        "cm-glow": "cm-glow 6s ease-in-out infinite",
        "cm-fade-up": "cm-fade-up 0.7s ease both",
        "cm-fade": "cm-fade 0.15s ease both",
      },
    },
  },
  plugins: [],
};
