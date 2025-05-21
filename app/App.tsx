import { ThemeProvider, useThemeContext } from "@/components/theme-provider";  // Import the custom ThemeProvider
import { Heading } from "@/components/heading";
import { Zote } from "@/components/zote";
import { Toaster } from "sonner";

export default function App() {
  const { theme, setTheme } = useThemeContext();
  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          {/* Favicon links and other head content */}
        </head>
        <body>
          <main className="min-h-screen bg-background text-foreground">
            <Heading title="zote" theme={theme} setTheme={setTheme} />
            <Zote />
            <Toaster />
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
