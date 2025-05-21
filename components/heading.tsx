import { Button } from '@/components/ui/button'
import { Menu, Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { ZoteIcon } from '@/components/zote-icon'
import { useContext, useEffect } from 'react'
import { ThemeContext } from './theme-provider'

interface HeadingProps {
  title: string
}

function Heading(props: HeadingProps) {
  const { title } = props
  const { toggleTheme, theme } = useContext(ThemeContext)

  useEffect(() => (
    console.log(`Theme: ${theme}`)
  ), [theme])

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Button variant="ghost" size="icon" onClick={() => toast("Chicken Wing")}>
        <Menu className="h-6 w-6" />
      </Button>
      <div className='flex items-center'>
        <ZoteIcon width={'4rem'} height={'4rem'} />
        <h1 className="text-6xl font-black tracking-tighter">{title}</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      </Button>
    </header>
  )
}

export { Heading }
