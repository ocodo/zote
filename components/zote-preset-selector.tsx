import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog' // Local imports for Shadcn Dialog components
import { zotePresets } from '@/data/zote-presets'
import { HugeiconsPackageAdd } from '@/components/hugeicons-package-add'

type ColorRecord = Record<string, string | undefined>
type ZotePresetSelectorProps = {
  selected: string
  onSelect: (presetName: string) => void
  customColors: ColorRecord
}

export const ZotePresetSelector: React.FC<ZotePresetSelectorProps> = ({
  selected,
  onSelect,
  customColors,
}) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (presetName: string) => {
    onSelect(presetName)
    setOpen(false)
  }

  function renderColorBar(colors: ColorRecord): React.ReactElement {
    const colorKeys = Object.keys(colors);
    const stripeWidth = 10;

    return (
      <div className="color-bar flex ml-4 justify-start">
        {colorKeys.map((key) => (
          <span
            key={key}
            style={{
              width: `${stripeWidth}px`,
              height: '20px',
              backgroundColor: colors[key],
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="font-bold mb-2">Presets</div>
      {/* Shadcn Dialog Wrapper */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Dialog Trigger Button */}
        <DialogTrigger asChild>
          <button className="w-full p-2 border border-zinc-600 rounded-md light:bg-zinc-100 dark:bg-zinc-800  dark:text-white flex justify-between items-center">
            <span>{selected === 'Custom' ? 'Custom' : selected}</span>
          </button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="bg-background text-foreground rounded-md max-h-[70vh] overflow-auto p-4 shadow-lg">
          <DialogTitle>Select a Theme Preset</DialogTitle>
          <DialogDescription>
            Choose a preset or select "Custom" to edit your theme.
          </DialogDescription>

          {/* Preset Selection Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelect('Custom')}
              className={`${selected === 'Custom' ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-300 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-100'
                } py-2 px-3 rounded-md cursor-pointer flex justify-between items-center`}
            >
              <span>Custom</span>
              {renderColorBar(customColors)}
            </button>

            {/* Add new preset button */}
            <button
              onClick={() => {
                // Trigger add new preset dialog or action
              }}
              className="py-2 px-3 rounded-md text-left dark:hover:bg-zinc-700 hover:bg-zinc-300 hover:text-zinc-700 dark:hover:text-white flex items-center gap-2"
            >
              <HugeiconsPackageAdd />
              <span className="text-sm font-medium">
                Add New Preset...
              </span>
            </button>

            {/* Visual separator */}
            <div className="border-t border-zinc-600 my-2" />

            {zotePresets.map((preset) => (
              <button
                key={preset.themeName}
                onClick={() => preset.themeName && handleSelect(preset.themeName)}
                className={`${selected === preset.themeName ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-300 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-100'
                } py-2 px-3 rounded-md cursor-pointer flex justify-between items-center`}
              >
                <span>{preset.themeName}</span>
                {renderColorBar(preset.colors)}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
