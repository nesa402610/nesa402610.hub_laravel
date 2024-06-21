/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        "./resources/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'xs': '320px',
            ...defaultTheme.screens,
        },

        extend: {
            animation: {
                'smoky': 'smoky 1s linear 4s',
            },
            keyframes: {
                smoky: {
                    '0%%': {opacity: 1},
                    '100%': {opacity: 0},

                }
            }
        }
    },
    plugins: [],
};
