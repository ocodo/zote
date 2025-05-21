import Case from 'case'
import { useRef } from "react";
import { Card } from "@/components/ui/card";

type ZoteColorPickerRowProps = {
    label: string
    value: string | undefined
    onChange: (newColor: string) => void
}

export const ZoteColorPickerRow: React.FC<ZoteColorPickerRowProps> = ({ label, value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const gitIconColorKeys = [
        'AHEAD_COLOR',
        'BEHIND_COLOR',
        'MERGING_COLOR',
        'UNTRACKED_COLOR',
        'MODIFIED_COLOR',
        'STAGED_COLOR',
    ]
    const presentationName = (name: string) => {
        name = gitIconColorKeys.includes(name) ? `GIT_${name}` : name
        return Case.capital(name)
    }

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <Card className="p-4 shadow-md hover:shadow-lg rounded-md flex flex-col justify-center items-center">
            <div className="text-xs mb-2">{presentationName(label)}</div>
            <div className="ml-2 font-mono text-sm mb-2">{value}</div>

            <div className="w-12 h-8" onClick={handleClick} style={{ color: value }}>
                <svg
                    viewBox="0 0 48 48"
                    className="w-full h-full cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label={`Select color ${value}`}
                    role="button"
                >
                    <rect
                        x="0"
                        y="0"
                        width="48"
                        height="24"
                        rx="12"
                        ry="12"
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