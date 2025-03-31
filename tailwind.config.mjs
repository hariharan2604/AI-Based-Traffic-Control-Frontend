/** @type {import('tailwindcss').Config} */
export const content = [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
    extend: {
        fontFamily: {
            sans: ['var(--font-inter)'],
        },
    },
};
export const plugins = [];

export const darkMode = "class"