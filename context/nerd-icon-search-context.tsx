import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

type NerdIconSearchStateType = {
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
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
  const [searchText, setSearchText] = useState("")

  return (
    <NerdIconSearchStateContext.Provider
      value={{
        searchText, setSearchText
      }}>
      {children}
    </NerdIconSearchStateContext.Provider>
  )
}
