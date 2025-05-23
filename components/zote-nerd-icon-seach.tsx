import { Input } from "@/components/ui/input"
import { useNerdIconSearchState } from "@/context/nerd-icon-search-context"

export const ZoteNerdIconSearch = () => {
  const {
    searchText,
    setSearchText
  } = useNerdIconSearchState()

  const handleSearchChange = (event: any) => setSearchText(event.target.value)

  return (
    <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
      <div className="text-xl font-bold flex justify-end flex-wrap gap-x-2 gap-2">
        <Input
          type="search"
          placeholder="Nerd Font icons..."
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>
    </div>
  )
}
