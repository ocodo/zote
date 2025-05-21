import { ThemeProvider } from "@/components/theme-provider"
import { Heading } from "@/components/heading"
import { Zote } from "@/components/zote";
import { Toaster } from "sonner"

export default function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Heading title="zote" />
        <Zote />
        <Toaster />
      </main>
    </ThemeProvider>
  )
}
