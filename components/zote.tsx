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
        <div className="font-sans max-w-3xl p-6 mx-auto">
            <h2 className="text-3xl font-black tracking-tighter mb-6">zsh ocodo theme editor</h2>

            <div className="grid gap-4">
                {visibleColorKeys.map(key => (
                    <ColorPickerRow
                        key={key}
                        label={key}
                        value={colors[key]}
                        onChange={value => handleColorChange(key, value)}
                    />
                ))}
            </div>

            {/* ZotePresetSelector with selected and onSelect */}
            <ZotePresetSelector
                selected={selectedTheme}
                onSelect={handlePresetSelect}
                customColors={customColors}
            />

            <h3 className="text-xl font-semibold mt-10 mb-2">Preview</h3>
            <div className="bg-zinc-900 text-white rounded-xl border border-zinc-700 p-4 my-4">
                <PromptPreview colors={colors} />
            </div>


            <ZoteExportThemeDialog colors={colors} defaultName={selectedTheme} />


            <h3 className="text-xl font-semibold mt-8 mb-2">Shell Export</h3>
            <ShellExport colors={colors} />
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

type ColorPickerRowProps = {
    label: string
    value: string
    onChange: (newColor: string) => void
}

const ColorPickerRow: React.FC<ColorPickerRowProps> = ({ label, value, onChange }) => {
    return (
        <Card className="flex items-center gap-4 p-4 shadow-md hover:shadow-lg rounded-md">
            <label className="w-36 text-sm font-medium">{label}:</label>
            <input
                type="color"
                className="w-12 h-12 rounded-full border-none cursor-pointer"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <span className="ml-2 font-mono text-sm">{value}</span>
        </Card>
    )
}

type PromptPreviewProps = {
    colors: ColorState
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ colors }) => {
    const { BracketColor: Bc, NameColor: Nc, MachineColor: Mc, TimeColor: Tc, PathColor: Pc } = colors

    return (
        <div className="font-mono text-lg leading-relaxed">
            <div>
                <span style={{ color: Bc }}>[</span>
                <span style={{ color: Bc }}>% </span>
                <span style={{ color: Nc }}>jason</span>
                <span style={{ color: Bc }}>@</span>
                <span style={{ color: Mc }}>neptune</span>
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

type ShellExportProps = {
    colors: ColorState
}

const ShellExport: React.FC<ShellExportProps> = ({ colors }) => {
    const exportString = Object.entries(colors)
        .map(([key, value]) => `${key}="${value}"`)
        .join('\n')

    return (
        <pre className="bg-zinc-800 text-green-400 text-sm p-4 rounded-lg whitespace-pre-wrap">
            {exportString}
        </pre>
    )
}
