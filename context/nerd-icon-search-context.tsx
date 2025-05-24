import { NerdFontSearchResults, nerdSearchDebounced, searchNerdFontByName } from "@/data/nerd-font-search"
import { debounce } from "@/lib/debounce"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

type NerdIconSearchStateType = {
  searchText?: string
  setSearchText: Dispatch<SetStateAction<string>>
  searchResults?: NerdFontSearchResults
  setSearchResults: Dispatch<SetStateAction<NerdFontSearchResults | undefined>>
}

const NerdIconSearchStateContext = createContext<NerdIconSearchStateType | undefined>(undefined)

export const useNerdIconSearchState = (): NerdIconSearchStateType => {
  const context = useContext(NerdIconSearchStateContext)
  if (!context) {
    throw new Error("useNerdIconSearchState must be used within a NerdIconSearchProvider")
  }
  return context
}

export const NerdIconSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<NerdFontSearchResults>()

  useEffect(() => {
    if (searchText.length > 2) {
      console.log(`Searching for ${searchText}`)
      const results = nerdSearchDebounced(searchText, undefined, setSearchResults)
    }
  }, [searchText])

  return (
    <NerdIconSearchStateContext.Provider
      value={{
        searchText,
        setSearchText,
        searchResults,
        setSearchResults,
      }}>
      {children}
    </NerdIconSearchStateContext.Provider>
  )
}
