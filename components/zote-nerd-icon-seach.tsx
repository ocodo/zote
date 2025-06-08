import { Input } from "@/components/ui/input"
import { useNerdIconSearchState } from "@/context/nerd-icon-search-context"
import { NerdFontSearchResult } from "@/data/nerd-font-search"
import { CircleX, CopyIcon, X, XCircle } from "lucide-react"
import React, { Dispatch, SetStateAction } from "react"
import { FloatBox } from "@/components/floating-info"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"


interface CopyableItemProps {
  label?: string;
  text: string;
  type: string;
  buttonClassName?: string;
}

const CopyableItem: React.FC<CopyableItemProps> = ({ label, text, type, buttonClassName }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast(`Copied ${type} to clipboard`);
  };

  return (
    <div className={cn("flex items-center justify-between", buttonClassName)}>
      {label && (
        <div>
          {label}: <span className="font-mono">{text}</span>
        </div>
      )}
      {!label && <span className={'icon' == type ? 'font-mono}' : ''}>{text}</span>}

      <Button
        variant="ghost"
        onClick={handleCopy}
        aria-label={`Copy ${type}`}
      >
        <CopyIcon size={20} />
      </Button>
    </div>
  );
};

interface NerdFontGlyphSelectedProps {
  selected: NerdFontSearchResult
  setSelected: Dispatch<SetStateAction<NerdFontSearchResult | undefined>>
}

const NerdFontGlyphSelected: React.FC<NerdFontGlyphSelectedProps> = ({
  selected, setSelected
}) => {

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast(`copied ${type} to clipboard`)
  }

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Selected NerdFont Icon</CardTitle>
        <div className="absolute top-4 right-4">
          <Button
            variant={'ghost'}
            onClick={() => setSelected(undefined)}>
            <X className="text-gray-600" size={24} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CopyableItem text={selected.name} type="name" />
        <CopyableItem text={selected.char} type="icon" buttonClassName="text-8xl font-mono" />
        <CopyableItem label="Code" text={selected.code} type="code" />
      </CardContent>
    </Card >
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
    setSelected,
  } = useNerdIconSearchState()

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value || "")
  }

  return (
    <div className="bg-background text-foreground rounded-xl border border-zinc-800 p-4 gap-4">
      <div className="text-xl font-bold flex justify-end flex-wrap mb-4 relative">
        <Input
          type="search"
          className="font-thin pr-10"
          placeholder="Nerd Font icons..."
          onChange={handleSearchChange}
          value={searchText}
        />
        <span
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-mono text-sm pr-2"
          onMouseDown={() => handleSearchChange({ target: { value: '' } })}></span>
      </div>
      {selected ? (<NerdFontGlyphSelected selected={selected} setSelected={setSelected} />) : ""}
      <div className="overflow-y-scroll max-h-48 mt-2 grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] justify-start">
        {
          searchResults?.map(
            (result) => (
              <ZoteNerdIcon key={result.name} result={result} />
            )
          )
        }
      </div>
    </div>
  )
}
