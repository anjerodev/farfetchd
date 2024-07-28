import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export const DevToolbar = () => {
  const { setTheme, theme } = useTheme()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-0 left-1 z-[53] m-1 flex w-fit items-center gap-0.5 rounded-md border bg-popover p-1 backdrop-blur-sm transition-transform hover:translate-x-0">
      <div className="text-body-sm flex h-10 w-10 items-center justify-center rounded-xl bg-card/5 p-3 font-mono">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Icons.lightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icons.darkMode className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
