

import { Heading } from "@/components/heading"
import { Zote } from "@/components/zote"
import { useTheme } from "next-themes"

export default function Home() {
  const {theme, setTheme} = useTheme()

  return (
    <main className="min-h-screen bg-background text-foregroud">
        <Heading theme={theme} setTheme={setTheme} title="zote" />
        <Zote />
    </main>
  )
}

