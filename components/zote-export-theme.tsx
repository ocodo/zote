import React, { useState, useRef } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

const ZoteExportPreviewEntry = ({
    key,
    label,
    value
}: {
    key: string,
    label: string,
    value: string
}) => (
    <div key={key} className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value }} />
        <span>{label}="{value}"</span>
    </div>)

const ZoteExportPreview = ({
    sections
}: {
    sections: Record<string, string>[]
}) => sections.map((section) => (
    Object.entries(section).map(([key, value]) => {
        const label = key
        return (
            <ZoteExportPreviewEntry key={key} label={label} value={value} />
        )
    })))

type ZoteExportThemeDialogProps = {
    sections: Record<string, string>[]
    defaultName: string
}

export const ZoteExportThemeDialog: React.FC<ZoteExportThemeDialogProps> = ({
    sections,
    defaultName = 'Custom'
}) => {
    const [themeName, setThemeName] = useState(defaultName)
    const [clipboardSuccess, setClipboardSuccess] = useState(false)
    const copyButtonRef = useRef<HTMLButtonElement>(null)

    const exportSections = (sections: Record<string, string>[]) => sections.map(
        (section) => Object.entries(section).map(
            ([key, value]) => `${key}="${value}"`)
            .join('\n'))

    const exportContent = `# Theme name: ${themeName}

    ${exportSections(sections)}

source ~/.zsh.d/lib/theme-engine-truecolor.zsh
`

    const handleCopyToClipboard = async () => {
        const errorMessage = "Copy to Clipboard Failed"

        try {
            await navigator.clipboard.writeText(exportContent)
            setClipboardSuccess(true)

            setTimeout(() => {
                setClipboardSuccess(false)
                toast(errorMessage)
            }, 2000)
        } catch (err) {
            toast(errorMessage)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Export</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Export Theme</DialogTitle>
                    <DialogDescription>Exports the theme via clipboard</DialogDescription>
                </DialogHeader>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Theme Name</label>
                    <input
                        className="w-full px-3 py-2 border border-zinc-700
                         bg-zinc-900 text-white rounded-md"
                        value={themeName}
                        onChange={e => setThemeName(e.target.value)}
                    />
                </div>

                <div className="space-y-1 bg-zinc-900 text-green-400 font-mono text-sm p-4
                  rounded-md border border-zinc-700 whitespace-pre-wrap">
                    <ZoteExportPreview sections={sections} />
                </div>

                <DialogFooter className="mt-4 flex justify-between items-center">
                    <Button
                        ref={copyButtonRef}
                        variant="default"
                        className="flex items-center gap-2"
                        onClick={handleCopyToClipboard}
                    >
                        <Copy size={16} />
                        {clipboardSuccess ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                    <DialogTrigger asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

