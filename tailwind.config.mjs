import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				ink: {
					DEFAULT: "#060709",
					soft: "#0A0C10",
					panel: "#0E1116",
					raised: "#141821",
				},
				bone: "#F2EFE6",
				muted: "#939AA5",
				line: "rgba(242, 239, 230, 0.10)",
				primary: "#D6DADF",
				secondary: "#8A919C",
				accent: "#5EEAD4",
				"accent-soft": "#99F6E4",
				"accent-ink": "#032B25",
				main: "#0E3B36",
				success: "#4ADE80",
				warning: "#FBBF24",
				glass: "rgba(6, 7, 9, 0.55)",
			},
			fontFamily: {
				sans: ["Onest Variable", "system-ui", "-apple-system", "sans-serif"],
				display: ["Bricolage Grotesque Variable", "Onest Variable", "system-ui", "sans-serif"],
				mono: ["Azeret Mono Variable", "ui-monospace", "SFMono-Regular", "monospace"],
				ubuntu: ["Onest Variable", "system-ui", "sans-serif"],
			},
			maxWidth: {
				"8xl": "88rem",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.75rem",
			},
			boxShadow: {
				glow: "0 0 0 1px rgba(94, 234, 212, 0.18), 0 24px 60px -24px rgba(94, 234, 212, 0.35)",
			},
			keyframes: {
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-50%)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-line": {
					"0%, 100%": { opacity: "0.35" },
					"50%": { opacity: "1" },
				},
			},
			animation: {
				marquee: "marquee 38s linear infinite",
				float: "float 7s ease-in-out infinite",
				"pulse-line": "pulse-line 3s ease-in-out infinite",
			},
		},
	},
	plugins: [typography],
}
