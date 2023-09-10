import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#1DB954",
            },
        },
    },
    plugins: [tailwindScrollbar({ nocompatible: true })],
};
