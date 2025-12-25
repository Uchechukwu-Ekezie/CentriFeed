import type { Config } from "tailwindcss"

/**
 * Tailwind CSS configuration file.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F68FF",
          dark: "#0B4CC0",
        },
      },
      backgroundImage: {
        hero: "radial-gradient(1200px 600px at 20% 0%, rgba(15,104,255,0.15), transparent), radial-gradient(1000px 500px at 80% 20%, rgba(236,72,153,0.12), transparent)",
      },
    },
  },
  darkMode: "class",
}

export default config

