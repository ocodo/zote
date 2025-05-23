import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react"

type NerdIconSearchStateType = {
  searchText: string | undefined
  setSearchText: Dispatch<SetStateAction<string | undefined>>
  searchResults: string[] | undefined
  setSearchResults: Dispatch<SetStateAction<string[] | undefined>>
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
  const [searchText, setSearchText] = useState<string | undefined>()
  const [searchResults, setSearchResults] = useState<string[] | undefined>()

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
