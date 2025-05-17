import React, { useState, useRef } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

type ZoteExportThemeDialogProps = {
    colors: Record<string, string>
    defaultName?: string
}

export const ZoteExportThemeDialog: React.FC<ZoteExportThemeDialogProps> = ({ colors, defaultName = 'Custom' }) => {
    const [themeName, setThemeName] = useState(defaultName)
    const [clipboardSuccess, setClipboardSuccess] = useState(false)
    const copyButtonRef = useRef<HTMLButtonElement>(null)

    const exportContent = `# Theme name: ${themeName}

${Object.entries(colors).map(([key, value]) => `${key}="${value}"`).join('\n')}

source ~/.zsh.d/lib/theme-engine-truecolor.zsh
`

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(exportContent)
            setClipboardSuccess(true)

            // Reset success state after 2 seconds
            setTimeout(() => {
                setClipboardSuccess(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy to clipboard:', err)
            // Handle the error case if needed
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
                        className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md"
                        value={themeName}
                        onChange={e => setThemeName(e.target.value)}
                    />
                </div>

                <div className="space-y-1 bg-zinc-900 text-green-400 font-mono text-sm p-4 rounded-md border border-zinc-700 whitespace-pre-wrap">
                    {Object.entries(colors).map(([key, value]) => {
                        const label = key

                        return (
                            <div key={key} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value }} />
                                <span>{label}="{value}"</span>
                            </div>
                        )
                    })}
                </div>

                <DialogFooter className="mt-4 flex justify-between items-center">
                    <Button
                        ref={copyButtonRef}
                        variant="default"
                        className="flex items-center gap-2"
                        onClick={handleCopyToClipboard} // Add the click handler here
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
