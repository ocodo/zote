import { Input } from "@/components/ui/input"
import { useNerdIconSearchState } from "@/context/nerd-icon-search-context"
import { NerdFontSearchResult } from "@/data/nerd-font-search"
import { FloatBox } from "./floating-info"

export const ZoteNerdIcon = ({
  result: {
    name,
    char,
    code,
    group
  }
}: {
  result: NerdFontSearchResult
}) => (
  <FloatBox body={
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

export const ZoteNerdIconSearch = () => {
  const {
    searchText,
    setSearchText,
    searchResults,
  } = useNerdIconSearchState()

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value || "")
  }

  return (
    <div className="bg-background text-foreground rounded-xl border border-zinc-700 p-4 my-4 gap-2">
      <div className="text-xl font-bold flex justify-end flex-wrap gap-x-2 gap-2">
        <Input
          type="search"
          className="font-thin"
          placeholder="Nerd Font icons..."
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>
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
