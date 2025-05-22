import React, { useState } from 'react'
import { zotePresets } from '@/data/zote-presets'
import { ZotePresetSelector } from '@/components/zote-preset-selector'
import { ZoteExportThemeDialog } from '@/components/zote-export-theme'
import { ZoteColorPickerRow } from '@/components/zote-color-picker-row'
import { ZotePromptPreview } from './zote-prompt-preview'
import { ZotePreviewControls } from './zote-preview-controls'

type ColorKeys =
    | 'AT_COLOR'
    | 'BRACKET_COLOR'
    | 'NAME_COLOR'
    | 'MACHINE_COLOR'
    | 'TIME_COLOR'
    | 'DATE_COLOR'
    | 'PATH_COLOR'
    | 'RVM_COLOR'
    | 'AHEAD_COLOR'
    | 'BEHIND_COLOR'
    | 'MERGING_COLOR'
    | 'UNTRACKED_COLOR'
    | 'MODIFIED_COLOR'
    | 'STAGED_COLOR'
    | 'REMOTE_COLOR'
    | 'GIT_ICON_COLOR'
    | 'GIT_LOCATION_COLOR'

type GitIconKeys =
    | 'AHEAD_ICON'
    | 'BEHIND_ICON'
    | 'MERGING_ICON'
    | 'UNTRACKED_ICON'
    | 'MODIFIED_ICON'
    | 'STAGED_ICON'
    | 'REMOTE_ICON'
    | 'GIT_ICON'

export type ColorState = Record<ColorKeys, string>
export type IconState = Record<GitIconKeys, string>

const defaultColors: ColorState = {
    AT_COLOR: "#FFFFFF",
    BRACKET_COLOR: "#c7a23c",
    NAME_COLOR: "#fff2d6",
    MACHINE_COLOR: "#ffaf00",
    TIME_COLOR: "#ffffff",
    DATE_COLOR: "#ffffff",
    PATH_COLOR: "#ffdf87",
    RVM_COLOR: "#ffaf00",
    AHEAD_COLOR: "#AA3333",
    BEHIND_COLOR: "#00FFFF",
    MERGING_COLOR: "#CC33CC",
    UNTRACKED_COLOR: "#AA3333",
    MODIFIED_COLOR: "#FFFFAA",
    STAGED_COLOR: "#559955",
    REMOTE_COLOR: "#83cbff",
    GIT_ICON_COLOR: "#FFFFFF",
    GIT_LOCATION_COLOR: "#FFFFFF",
}

const defaultIcons: IconState = {
    AHEAD_ICON: "🢁",
    BEHIND_ICON: "🢃",
    MERGING_ICON: " ",
    UNTRACKED_ICON: "●",
    MODIFIED_ICON: "●",
    STAGED_ICON: "●",
    REMOTE_ICON: "🌐",
    GIT_ICON: " ",
}

/*
: ${DIVIDER="|"}
: ${ZSH_PROMPT_WEEK_DAY="%(0w,Sun,)%(1w,Mon,)%(2w,Tue,)%(3w,Wed,)%(4w,Thu,)%(5w,Fri,)%(6w,Sat,)"}
*/

const visibleColorKeys: (keyof ColorState)[] = [
    'AT_COLOR',
    'BRACKET_COLOR',
    'NAME_COLOR',
    'MACHINE_COLOR',
    'TIME_COLOR',
    'PATH_COLOR',
    'REMOTE_COLOR',
    'DATE_COLOR',
    'RVM_COLOR',
    'GIT_ICON_COLOR',
    'AHEAD_COLOR',
    'BEHIND_COLOR',
    'MERGING_COLOR',
    'UNTRACKED_COLOR',
    'MODIFIED_COLOR',
    'STAGED_COLOR',
    'GIT_LOCATION_COLOR',
]

export const Zote: React.FC = () => {
    const [colors, setColors] = useState<ColorState>(defaultColors)
    const [icons, setIcons] = useState<IconState>(defaultIcons)
    const [selectedTheme, setSelectedTheme] = useState<string>('Custom')
    const [customColors, setCustomColors] = useState<ColorState>(defaultColors)

    const [gitRepo, setGitRepo] = useState<boolean>(false)
    const [merging, setMerging] = useState<boolean>(false)
    const [untracked, setUntracked] = useState<boolean>(false)
    const [staged, setStaged] = useState<boolean>(false)
    const [modified, setModified] = useState<boolean>(false)
    const [ahead, setAhead] = useState<string>("")
    const [behind, setBehind] = useState<string>("")

    const handleColorChange = (key: keyof ColorState, value: string) => {
        const updated = { ...colors, [key]: value }
        setColors(updated)
        setCustomColors(updated)

        if (selectedTheme !== 'Custom') {
            setSelectedTheme('Custom')
        }
    }

    const handlePresetSelect = (presetName: string) => {
        setSelectedTheme(presetName)

        if (presetName === 'Custom') {
            setColors(customColors)
            return
        }

        const preset = zotePresets.find((p) => p.themeName === presetName)
        if (preset) {
            setColors(preset.colors as ColorState)
        }

    }
    return (
        <div className="max-w-3xl p-6 mx-auto">
            <h2 className="text-3xl font-black tracking-tighter mb-6">zote: zsh ocodo prompt theme editor</h2>
            <ZotePresetSelector
                selected={selectedTheme}
                onSelect={handlePresetSelect}
                customColors={customColors}
            />
            <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
                <ZotePreviewControls
                    gitRepo={gitRepo}
                    setGitRepo={setGitRepo}
                    merging={merging}
                    setMerging={setMerging}
                    untracked={untracked}
                    setUntracked={setUntracked}
                    modified={modified}
                    setModified={setModified}
                    staged={staged}
                    setStaged={setStaged}
                    ahead={ahead}
                    setAhead={setAhead}
                    behind={behind}
                    setBehind={setBehind}
                />
            </div>
            <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
                <ZotePromptPreview
                    colors={colors}
                    icons={icons}
                    host={selectedTheme.toLowerCase()}
                    gitRepo={gitRepo}
                    merging={merging}
                    untracked={untracked}
                    modified={modified}
                    staged={staged}
                    ahead={ahead}
                    behind={behind}
                />
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 m-6">
                {visibleColorKeys.map(key => (
                    <ZoteColorPickerRow
                        key={key}
                        label={key}
                        value={colors[key]}
                        onChange={value => handleColorChange(key, value)}
                    />
                ))}
            </div>
            <ZoteExportThemeDialog sections={[colors, icons]} defaultName={selectedTheme} />
        </div>
    )
}
