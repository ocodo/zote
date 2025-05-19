import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { zotePresets } from '@/data/zote-presets'
import { ZotePresetSelector } from '@/components/zote-preset-selector'
import { ZoteExportThemeDialog } from '@/components/zote-export-theme'

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

type ColorState = Record<ColorKeys, string | undefined>

const defaultColors: ColorState = {
    AT_COLOR: "#AA9966",
    BRACKET_COLOR: "#c7a23c",
    NAME_COLOR: "#fff2d6",
    MACHINE_COLOR: "#ffaf00",
    TIME_COLOR: "#fff2d6",
    DATE_COLOR: "#ff9900",
    PATH_COLOR: "#ffdf87",
    RVM_COLOR: "#ffaf00",
    AHEAD_COLOR: "#AA3333",
    BEHIND_COLOR: "#00FFFF",
    MERGING_COLOR: "#CC33CC",
    UNTRACKED_COLOR: "#AA3333",
    MODIFIED_COLOR: "#FFFFAA",
    STAGED_COLOR: "#559955",
    REMOTE_COLOR: "#FFBB55",
    GIT_ICON_COLOR: "#FFAF00",
    GIT_LOCATION_COLOR: "#aa760e",
}

/*
  Defaults from zsh script
: ${AT_COLOR="#FFFFFF"}
: ${BRACKET_COLOR="#c7a23c"}
: ${NAME_COLOR="#fff2d6"}
: ${MACHINE_COLOR="#ffaf00"}
: ${TIME_COLOR="#ffffff"}
: ${DATE_COLOR="#ffffff"}
: ${PATH_COLOR="#ffdf87"}
: ${RVM_COLOR="#ffaf00"}
: ${AHEAD_COLOR="#AA3333"}
: ${AHEAD_ICON="🢁"}
: ${BEHIND_COLOR="#00FFFF"}
: ${BEHIND_ICON="🢃"}
: ${MERGING_COLOR="#CC33CC"}
: ${MERGING_ICON=" "}
: ${UNTRACKED_COLOR="#AA3333"}
: ${UNTRACKED_ICON="●"}
: ${MODIFIED_COLOR="#FFFFAA"}
: ${MODIFIED_ICON="●"}
: ${STAGED_COLOR="#559955"}
: ${STAGED_ICON="●"}
: ${REMOTE_COLOR="#83cbff"}
: ${REMOTE_ICON="🌐"}
: ${GIT_ICON=" "}
: ${GIT_ICON_COLOR="#FFFFFF"}
: ${GIT_LOCATION_COLOR="#FFFFFF"}
: ${DIVIDER="|"}
: ${ZSH_PROMPT_WEEK_DAY="%(0w,Sun,)%(1w,Mon,)%(2w,Tue,)%(3w,Wed,)%(4w,Thu,)%(5w,Fri,)%(6w,Sat,)"}
*/

const visibleColorKeys: (keyof ColorState)[] = [
    'BRACKET_COLOR',
    'NAME_COLOR',
    'MACHINE_COLOR',
    'TIME_COLOR',
    'PATH_COLOR',
    'DATE_COLOR',
    'RVM_COLOR'
]

export const Zote: React.FC = () => {
    const [colors, setColors] = useState<ColorState>(defaultColors)
    const [selectedTheme, setSelectedTheme] = useState<string>('Custom')
    const [customColors, setCustomColors] = useState<ColorState>(defaultColors)

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
            setColors(preset.colors)
        }

    }
    return (
        <div className="max-w-3xl p-6 mx-auto">
            <h2 className="text-3xl font-black tracking-tighter mb-6">zote: zsh ocodo prompt theme editor</h2>
            <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
                <ZotePromptPreview colors={colors} host={selectedTheme.toLowerCase()} />
            </div>
            <ZotePresetSelector
                selected={selectedTheme}
                onSelect={handlePresetSelect}
                customColors={customColors}
            />
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
            <ZoteExportThemeDialog colors={colors} defaultName={selectedTheme} />
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

type ZoteColorPickerRowProps = {
    label: string
    value: string | undefined
    onChange: (newColor: string) => void
}

import { useRef } from "react";

const ZoteColorPickerRow: React.FC<ZoteColorPickerRowProps> = ({ label, value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <Card className="p-4 shadow-md hover:shadow-lg rounded-md flex flex-col justify-center items-center">
            <div className="text-sm font-medium mb-2">{label}</div>
            <div className="ml-2 font-mono text-sm mb-2">{value}</div>

            <div className="w-12 h-12" onClick={handleClick} style={{ color: value }}>
                <svg
                    viewBox="0 0 48 48"
                    className="w-full h-full cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label={`Select color ${value}`}
                    role="button"
                >
                    <circle
                        cx="24"
                        cy="24"
                        r="22"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <input
                ref={inputRef}
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="hidden"
            />
        </Card>
    );
};


type ZotePromptPreviewProps = {
    colors: ColorState
    host: string
}

const ZotePromptPreview: React.FC<ZotePromptPreviewProps> = ({ colors, host }) => {
    const {
        BRACKET_COLOR,
        NAME_COLOR,
        MACHINE_COLOR,
        TIME_COLOR,
        PATH_COLOR
    } = colors

    return (
        <div className="font-mono text-lg leading-relaxed">
            <div>
                <span style={{ color: BRACKET_COLOR }}>[</span>
                <span style={{ color: BRACKET_COLOR }}>% </span>
                <span style={{ color: NAME_COLOR }}>ocodo</span>
                <span style={{ color: BRACKET_COLOR }}>@</span>
                <span style={{ color: MACHINE_COLOR }}>{host}</span>
                <span style={{ color: BRACKET_COLOR }}>|</span>
                <span style={{ color: TIME_COLOR }}>09:11AM</span>
                <span style={{ color: BRACKET_COLOR }}>]</span>
            </div>
            <div>
                <span style={{ color: BRACKET_COLOR }}>[</span>
                <span style={{ color: PATH_COLOR }}>~/workspace/zote</span>
                <span style={{ color: BRACKET_COLOR }}>]</span>
            </div>
        </div>
    )
}
