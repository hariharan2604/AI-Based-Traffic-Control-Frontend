"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-3 rounded-full bg-gray-100 dark:bg-gray-900 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <MdLightMode className="text-yellow-400 text-3xl drop-shadow-md" />
            ) : (
                <MdDarkMode className="text-gray-700 dark:text-white text-3xl drop-shadow-md" />
            )}
        </button>
    );
}
