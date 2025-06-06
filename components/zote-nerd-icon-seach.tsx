import { Input } from "@/components/ui/input"
import { useNerdIconSearchState } from "@/context/nerd-icon-search-context"
import { NerdFontGlyph, NerdFontSearchResult } from "@/data/nerd-font-search"
import { FloatBox } from "./floating-info"
import React from "react"
import { Card, CardContent } from "./ui/card"

interface NerdFontGlyphSelectedProps {
  selected: NerdFontSearchResult
}

const NerdFontGlyphSelected: React.FC<NerdFontGlyphSelectedProps> = ({
  selected
}) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className='text-m'>{selected.name}</div>
        <div className='font-mono text-8xl'>{selected.char}</div>
        <div className='text-xs'>code: <span className="font-mono">{selected.code}</span></div>
      </CardContent>
    </Card>
  )
}

const ZoteNerdIcon = ({
  result
}: {
  result: NerdFontSearchResult
}) => {

  const { char, code, name, group } = result
  const { setSelected } = useNerdIconSearchState()

  return (
    <FloatBox onClick={() => setSelected(result)} body={
      <div>
        <div className="font-mono text-left text-5xl">
          {char}
        </div>
        <div className="text-foreground">{name}</div>
        <div className="font-light">
          0x{code}
        </div>
        <div className="text-xxs">
          {group}
        </div>
      </div>
    }>
      <div className="w-16 overflow-hidden">
        <div className="font-mono text-xl">
          {char}
        </div>
        <div className="font-light text-xs dark:text-slate-500 text-slate-400"
        >{name}</div>
      </div>
    </FloatBox>
  )
}

export const ZoteNerdIconSearch = () => {
  const {
    searchText,
    setSearchText,
    searchResults,
    selected,
  } = useNerdIconSearchState()

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value || "")
  }

  return (
    <div className="bg-background text-foreground rounded-xl border border-zinc-800 p-4 gap-4">
      <div className="text-xl font-bold flex justify-end flex-wrap mb-4">
        <Input
          type="search"
          className="font-thin"
          placeholder="Nerd Font icons..."
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>
      {selected ? (<NerdFontGlyphSelected selected={selected} />) : ""}
      <div className="overflow-y-scroll max-h-48 mt-2 grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] justify-start">
        {
          searchResults?.map(
            (result) => (
              <ZoteNerdIcon result={result} />
            )
          )
        }
      </div>
    </div>
  )
}
