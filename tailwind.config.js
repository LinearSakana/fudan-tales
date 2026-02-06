/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: "class",
    theme: {
        fontWeight: {
            normal: 450,
            bold: 590,
            extra: 700,
        },
        extend: {
            // 安全距离
            spacing: {
                'sat': 'var(--sat)',
                'sab': 'var(--sab)',
            },
            colors: {
                "primary": "#ff0055",
                "primary-dark": "#cc0044",
                "background-light": "#f8f5f6",
                "background-dark": "#230f16",
                "surface-dark": "#2f151e",
                "text-dim": "#ce8da3",
                "ink": "#0f0508",
                "accent-cyan": "#00ffff",
            },
            fontFamily: {
                sans: ["Space Grotesk", "Sarasa Gothic", "system-ui", "sans-serif"],
                display: ["Bebas Neue", "Space Grotesk", "Sarasa Gothic", "sans-serif"],
                mono: ["JetBrains Mono", "Sarasa Gothic", "Courier New", "monospace"],
                icon: ["Material Symbols Outlined"],
            },
            backgroundImage: {
                scanlines:
                    "linear-gradient(to bottom,rgba(255,0,85,0.1) 1px, transparent 1px)",
                noise:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E")',
            },
            fontSize: {
                xxs: "10px",
                xxxs: "9px",
                nano: "8px",
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': {transform: 'translateX(100%)'},
                    '100%': {transform: 'translateX(-100%)'},
                }
            }
        },
    },
    plugins: [],
};
