/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.blade.php', './resources/**/*.tsx', './resources/**/*.ts', './resources/**/*.js'],
    safelist: ['bg-green-500', 'bg-amber-500', 'bg-red-500', 'bg-gray-500'],
    theme: {
        extend: {},
    },
    plugins: [],
};
