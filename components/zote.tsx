import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { zotePresets } from '@/data/zote-presets'
import { ZotePresetSelector } from '@/components/zote-preset-selector'
import { ZoteExportThemeDialog } from '@/components/zote-export-theme'

type ColorKeys =
    | 'BracketColor'
    | 'NameColor'
    | 'MachineColor'
    | 'TimeColor'
    | 'DateColor'
    | 'PathColor'
    | 'RVM_Color'

type ColorState = Record<ColorKeys, string>

const defaultColors: ColorState = {
    BracketColor: '#865e3c',
    NameColor: '#ff5555',
    MachineColor: '#55ffff',
    TimeColor: '#ffaa00',
    DateColor: '#00ffaa', // not displayed
    PathColor: '#aaaaaa',
    RVM_Color: '#ff00ff', // not displayed
}

const visibleColorKeys: (keyof ColorState)[] = [
    'BracketColor',
    'NameColor',
    'MachineColor',
    'TimeColor',
    'PathColor',
    'DateColor',
    'RVM_Color'
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
    value: string
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
    const { BracketColor: Bc, NameColor: Nc, MachineColor: Mc, TimeColor: Tc, PathColor: Pc } = colors

    return (
        <div className="font-mono text-lg leading-relaxed">
            <div>
                <span style={{ color: Bc }}>[</span>
                <span style={{ color: Bc }}>% </span>
                <span style={{ color: Nc }}>jason</span>
                <span style={{ color: Bc }}>@</span>
                <span style={{ color: Mc }}>{host}</span>
                <span style={{ color: Bc }}>|</span>
                <span style={{ color: Tc }}>09:11AM</span>
                <span style={{ color: Bc }}>]</span>
            </div>
            <div>
                <span style={{ color: Bc }}>[</span>
                <span style={{ color: Pc }}>~/workspace/zote</span>
                <span style={{ color: Bc }}>]</span>
            </div>
        </div>
    )
}
