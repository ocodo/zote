import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useGitPreviewState } from "@/context/git-preview-state-context";

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
  offValue?: string,
  onValue: string,
  onCheckedChange: Dispatch<SetStateAction<string>>,
}) => {
  offLabel = offLabel
    ? offLabel
    : onLabel

  const isOn: boolean = checked != ""

  const toggle = () => checked == onValue
    ? onCheckedChange(offValue || "")
    : onCheckedChange(onValue)

  return (
    <div className="inline-flex">
      <Checkbox checked={checked != ""} onCheckedChange={toggle} />
      <span className='text-xs ml-2'>
        {checked != ""
          ? onLabel
          : offLabel}
      </span>
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
      <Checkbox checked={checked} onCheckedChange={toggle} className={cn(className)} />
      <span className={cn(`text-xs ml-2`, className)}>
        {checked
          ? onLabel
          : offLabel}
      </span>
    </div>
  )
}

export const ZotePreviewControls = () => {
  const {
    gitRepo,
    setGitRepo,
    merging,
    setMerging,
    untracked,
    setUntracked,
    modified,
    setModified,
    staged,
    setStaged,
    ahead,
    setAhead,
    behind,
    setBehind,
  } = useGitPreviewState();

  return (
    <div>
      <ZoteBooleanSwitch
        onLabel=" "
        className="font-mono text-sm mt-3"
        checked={gitRepo}
        onCheckedChange={setGitRepo}
      />
      {gitRepo && (
        <div className="bg-black text-white rounded-xl border border-zinc-700 p-4 my-4">
          <div className="mb-3 font-mono text-4xl">
             <span className="text-orange-700 ml-2"> </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <ZoteBooleanSwitch onLabel="merging" checked={merging} onCheckedChange={setMerging} />
            <ZoteBooleanSwitch onLabel="untracked" checked={untracked} onCheckedChange={setUntracked} />
            <ZoteBooleanSwitch onLabel="modified" checked={modified} onCheckedChange={setModified} />
            <ZoteBooleanSwitch onLabel="staged" checked={staged} onCheckedChange={setStaged} />
            <ZoteSwitchValue onLabel="ahead" onValue="1" checked={ahead} onCheckedChange={setAhead} />
            <ZoteSwitchValue onLabel="behind" onValue="1" checked={behind} onCheckedChange={setBehind} />
          </div>
        </div>
      )}
    </div>
  );
};
