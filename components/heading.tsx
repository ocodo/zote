import { Button } from '@/components/ui/button'
import { Menu, Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { ZoteIcon } from './zote-icon'

interface HeadingProps {
  setTheme: (theme: string) => void
  theme?: string | null
  title: string
}

function Heading(props: HeadingProps) {
  const { setTheme, theme, title } = props

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Button variant="ghost" size="icon" onClick={() => toast("Not implemented")}>
        <Menu className="h-6 w-6" />
      </Button>
      <div className='flex items-center'>
      <ZoteIcon width={'4rem'} height={'4rem'} />
      <h1 className="text-6xl font-black tracking-tighter">{title}</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      </Button>
    </header>
  )
}

export { Heading }
