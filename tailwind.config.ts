import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        'ultra-violet': '#655a7c',
        'african-violet': '#ab92bf',
        'powder-blue': '#afc1d6',
        'mint-green': '#cef9f2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--ultra-violet), var(--african-violet), var(--powder-blue), var(--mint-green))',
        'gradient-top': 'linear-gradient(0deg, var(--ultra-violet), var(--african-violet), var(--powder-blue), var(--mint-green))',
        'gradient-right': 'linear-gradient(90deg, var(--ultra-violet), var(--african-violet), var(--powder-blue), var(--mint-green))',
      },
    },
  },
  plugins: [],
} satisfies Config;
