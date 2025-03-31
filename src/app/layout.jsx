import './globals.css'
import { ThemeProvider } from "@/app/context/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <ThemeToggle /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
