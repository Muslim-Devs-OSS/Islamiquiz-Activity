/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            "colors": {
                "inverse-surface": "#f5f5f5",
                "outline-variant": "#4d4d4d",
                "primary-fixed": "#ff4d4d",
                "primary-container": "#7a0000",
                "background": "#0a0a0c",
                "on-primary-fixed-variant": "#990000",
                "surface-container-highest": "#35353a",
                "secondary-container": "#b38f00",
                "tertiary-fixed-dim": "#cc3333",
                "surface-container-lowest": "#050505",
                "on-tertiary-container": "#ffcccc",
                "on-tertiary-fixed-variant": "#991f1f",
                "surface-dim": "#0a0a0c",
                "on-background": "#f5f5f5",
                "on-secondary-container": "#ffeebb",
                "outline": "#808080",
                "primary": "#ff2a2a",
                "surface-container-low": "#121214",
                "error": "#ffb4ab",
                "inverse-on-surface": "#2a2a2e",
                "tertiary-container": "#991f1f",
                "on-secondary-fixed": "#4d3e00",
                "on-tertiary": "#ffffff",
                "surface-bright": "#3a3a40",
                "surface-variant": "#2a2a2e",
                "on-secondary": "#332900",
                "on-primary-fixed": "#4d0000",
                "secondary-fixed": "#ffdf33",
                "on-surface-variant": "#a3a3a3",
                "on-tertiary-fixed": "#4d0f0f",
                "on-error": "#690005",
                "secondary-fixed-dim": "#cca600",
                "surface": "#1a1a1c",
                "on-surface": "#f5f5f5",
                "on-error-container": "#ffdad6",
                "on-secondary-fixed-variant": "#806600",
                "surface-container-high": "#2c2c30",
                "surface-container": "#232326",
                "on-primary-container": "#ffcccc",
                "primary-fixed-dim": "#cc0000",
                "secondary": "#ffd700",
                "tertiary": "#ff4d4d",
                "error-container": "#93000a",
                "on-primary": "#ffffff",
                "tertiary-fixed": "#ff8080",
                "surface-tint": "#ff2a2a",
                "inverse-primary": "#ff8080"
            },
            "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            "spacing": {
                "lg": "40px",
                "margin-desktop": "48px",
                "md": "24px",
                "margin-mobile": "16px",
                "sm": "12px",
                "xs": "4px",
                "unit": "8px",
                "xl": "64px",
                "gutter": "20px"
            },
            "fontFamily": {
                "label-bold": ["Quicksand"],
                "body-md": ["Quicksand"],
                "body-lg": ["Quicksand"],
                "display-lg-mobile": ["Bricolage Grotesque"],
                "display-lg": ["Bricolage Grotesque"],
                "headline-sm": ["Bricolage Grotesque"],
                "headline-md": ["Bricolage Grotesque"]
            },
            "fontSize": {
                "label-bold": ["14px", { "lineHeight": "1.0", "fontWeight": "700" }],
                "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "500" }],
                "body-lg": ["18px", { "lineHeight": "1.5", "fontWeight": "600" }],
                "display-lg-mobile": ["36px", { "lineHeight": "1.1", "fontWeight": "800" }],
                "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                "headline-sm": ["24px", { "lineHeight": "1.2", "fontWeight": "700" }],
                "headline-md": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }]
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ],
}
