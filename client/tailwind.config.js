
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['"Playfair Display"', 'serif'],
                body: ['"Mulish"', 'sans-serif'],
            },
            colors: {
                primary: '#C5A065', // Luxury Gold
                secondary: '#1F2937', // Dark Slate
                accent: '#F3F4F6', // Light Gray
                surface: '#FFFFFF',
            },
            boxShadow: {
                'elegant': '0 4px 20px rgba(0,0,0,0.05)',
                'hover': '0 10px 25px rgba(0,0,0,0.1)'
            },
            borderRadius: {
                'luxury': '2px', // Sharper corners
            }
        },
    },
    plugins: [],
}
