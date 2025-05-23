import Case from 'case'
import { useRef } from "react";
import { gitIconColorKeys } from './zote';

type ZoteColorSwatchProps = {
  label: string
  value: string | undefined
  onChange: (newColor: string) => void
}

const CheckerBoard = () => (
  <div className='checkerboard w-28 h-16'>
  </div>
)

const ColorSwatch = ({ value }: { value: string }) => (
  <svg
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={`Select color ${value}`}
    role="button"
  >
    <rect
      x="0"
      y="0"
      width="256"
      height="256"
      fill="currentColor"
    />
  </svg>
)

export const ZoteColorSwatch: React.FC<ZoteColorSwatchProps> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const presentationName = (name: string) => {
    name = gitIconColorKeys.includes(name)
      ? `GIT_${name}`
      : name
    name = name == 'REMOTE_COLOR'
      ? 'SSH:Remote color'
      : name
    return Case.capital(name)
  }

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-28 shadow-md hover:shadow-xl rounded-md flex flex-col justify-center items-center">

      <div className="h-16" style={{ color: value }}>
        {value
          ? <ColorSwatch value={value} />
          : <CheckerBoard />
        }
      </div>

      <div className='bg-white text-black w-full p-2'>
        <div className="text-xxs">{presentationName(label)}</div>
        <div className="text-xxs font-bold">{value ? value.toLowerCase() : "use default"}</div>
      </div>

      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="hidden"
      />
    </div>
  );
};
