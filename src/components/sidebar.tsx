import siteConfig from '@/lib/config'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import { History } from './history'
import { Settings } from './settings'

export const Sidebar = () => {
  return (
    <aside className="hidden p-3 pr-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <History />
      <footer className="flex min-h-14 shrink-0 items-center px-3 py-2">
        <Settings />
        <Button variant="ghost" size="icon" asChild>
          <a href={siteConfig.links.github} target="_blank">
            <Icons.github className="size-5" />
          </a>
        </Button>
      </footer>
    </aside>
  )
}
