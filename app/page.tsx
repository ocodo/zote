"use client"

import { Heading } from "@/components/heading"
import { useTheme } from "next-themes"

export default function Home() {
  const {theme, setTheme} = useTheme()

  return (
    <main className="min-h-screen bg-background text-foregroud">
        <Heading theme={theme} setTheme={setTheme} title="Template.hub" />
    </main>
  )
}

