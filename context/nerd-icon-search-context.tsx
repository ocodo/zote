import { NerdFontSearchResult, NerdFontSearchResults, nerdSearchDebounced } from "@/data/nerd-font-search"

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
  selected?: NerdFontSearchResult
  setSelected: Dispatch<SetStateAction<NerdFontSearchResult | undefined>>
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
  const [selected, setSelected] = useState<NerdFontSearchResult>()
  const [searchResults, setSearchResults] = useState<NerdFontSearchResults>()

  useEffect(() => {
      console.log(`Searching for ${searchText}`)
      nerdSearchDebounced(searchText, undefined, setSearchResults)
  }, [searchText])

  return (
    <NerdIconSearchStateContext.Provider
      value={{
        searchText,
        setSearchText,
        selected,
        setSelected,
        searchResults,
        setSearchResults,
      }}>
      {children}
    </NerdIconSearchStateContext.Provider>
  )
}
