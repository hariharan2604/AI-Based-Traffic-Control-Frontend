import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[var(--bg-color)] text-[var(--text-color)] transition-all duration-300 font-sans">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
