import { ThemeProvider } from "@/context/theme-provider"
import { Heading } from "@/components/heading"
import { Zote } from "@/components/zote";
import { Toaster } from "sonner"
import { GitPreviewProvider } from "@/context/git-preview-state-context";
import { NerdIconSearchProvider } from "@/context/nerd-icon-search-context";


export default function App() {
  return (

    <ThemeProvider>
      <GitPreviewProvider>
        <NerdIconSearchProvider>
          <main className="min-h-screen bg-background text-foreground">
            <Heading title="zote" />
            <Zote />
            <Toaster />
          </main>
        </NerdIconSearchProvider>
      </GitPreviewProvider>
    </ThemeProvider>
  )
}
