import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const ZoteSwitchValue = ({
    onLabel,
    offLabel,
    checked,
    offValue,
    onValue,
    onCheckedChange,
}: {
    onLabel: string,
    offLabel?: string | undefined,
    checked: string,
    offValue: string,
    onValue: string,
    onCheckedChange: Dispatch<SetStateAction<string>>,
}) => {
    offLabel = offLabel ? offLabel : onLabel

    const isOn: boolean = checked != ""

    const toggle = () => checked == onValue ?
        onCheckedChange(offValue) :
        onCheckedChange(onValue)

    return (
        <div className="inline-flex">
            <span className='text-xs mr-2'>
                {checked != "" ? onLabel : offLabel}
            </span>
            <Checkbox checked={checked != ""} onCheckedChange={toggle} />
        </div>
    )
}

const ZoteBooleanSwitch = ({
    onLabel,
    offLabel,
    className,
    checked,
    onCheckedChange
}: {
    onLabel: string,
    offLabel?: string,
    className?: string,
    checked: boolean,
    onCheckedChange: Dispatch<SetStateAction<boolean>>,
}) => {

    const toggle = () => { onCheckedChange(!checked) }

    offLabel = offLabel ? offLabel : onLabel

    return (
        <div className="inline-flex mb-2">
            <span className={cn(`text-xs mr-2`,className)}>
                {checked ? onLabel : offLabel}
            </span>
            <Checkbox checked={checked} onCheckedChange={toggle} className={cn(className)} />
        </div>
    )
}

export const ZotePreviewControls = ({
    gitRepo, setGitRepo,
    merging, setMerging,
    untracked, setUntracked,
    modified, setModified,
    staged, setStaged,
    ahead, setAhead,
    behind, setBehind
}: {
    gitRepo: boolean,
    setGitRepo: Dispatch<SetStateAction<boolean>>,
    merging: boolean,
    setMerging: Dispatch<SetStateAction<boolean>>,
    untracked: boolean,
    setUntracked: Dispatch<SetStateAction<boolean>>,
    modified: boolean,
    setModified: Dispatch<SetStateAction<boolean>>,
    staged: boolean,
    setStaged: Dispatch<SetStateAction<boolean>>,
    ahead: string,
    setAhead: Dispatch<SetStateAction<string>>,
    behind: string,
    setBehind: Dispatch<SetStateAction<string>>,
}) => (
    <div>
        <ZoteBooleanSwitch
            onLabel=" "
            className="font-mono text-sm mr-3 mt-3"
            checked={gitRepo}
            onCheckedChange={setGitRepo}
        />
        {gitRepo ? (
            <div>
                <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
                    <div className="mb-1">Git Info</div>
                    <div className="flex flex-wrap gap-2">
                        <ZoteBooleanSwitch onLabel='merging' checked={merging} onCheckedChange={setMerging} />
                        <ZoteBooleanSwitch onLabel='untracked' checked={untracked} onCheckedChange={setUntracked} />
                        <ZoteBooleanSwitch onLabel='modified' checked={modified} onCheckedChange={setModified} />
                        <ZoteBooleanSwitch onLabel='staged' checked={staged} onCheckedChange={setStaged} />
                        <ZoteSwitchValue onLabel="ahead" onValue="1" offValue="" checked={ahead} onCheckedChange={setAhead} />
                        <ZoteSwitchValue onLabel="behind" onValue="1" offValue="" checked={behind} onCheckedChange={setBehind} />
                    </div>
                </div>
            </div>
        ) : ''}
    </div>
)