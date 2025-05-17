import React from 'react'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { zotePresets } from '@/data/zote-presets'

type ZotePresetSelectorProps = {
  selected: string
  onSelect: (presetName: string) => void
  customColors: Record<string, string>
}

export const ZotePresetSelector: React.FC<ZotePresetSelectorProps> = ({
  selected,
  onSelect,
  customColors,
}) => {
  const handleSelect = (presetName: string) => {
    onSelect(presetName)
  }

  const renderColorDots = (colors: Record<string, string>) => (
    <div className="flex gap-1 ml-4">
      {['BracketColor', 'MachineColor', 'NameColor', 'TimeColor', 'PathColor'].map((key) => (
        <div
          key={key}
          className="w-4 h-4 rounded-full border border-zinc-600"
          style={{ backgroundColor: colors[key] }}
        />
      ))}
    </div>
  )

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Select a Theme Preset</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full p-2 border border-zinc-700 rounded-md bg-zinc-800 text-white flex justify-between items-center">
            <span>{selected === 'Custom' ? 'Custom' : selected}</span>
            <svg
              className="w-4 h-4 ml-2 opacity-75"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-zinc-800 text-white rounded-md w-64 mt-1 shadow-lg">
          <DropdownMenuItem
            onClick={() => handleSelect('Custom')}
            className={`${
              selected === 'Custom' ? 'bg-zinc-700' : 'hover:bg-zinc-700'
            } py-2 px-3 rounded-md cursor-pointer flex justify-between items-center`}
          >
            <span>Custom</span>
            {renderColorDots(customColors)}
          </DropdownMenuItem>

          {zotePresets.map((preset) => (
            <DropdownMenuItem
              key={preset.themeName}
              onClick={() => handleSelect(preset.themeName)}
              className={`${
                selected === preset.themeName ? 'bg-zinc-700' : 'hover:bg-zinc-700'
              } py-2 px-3 rounded-md cursor-pointer flex justify-between items-center`}
            >
              <span>{preset.themeName}</span>
              {renderColorDots(preset.colors)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
