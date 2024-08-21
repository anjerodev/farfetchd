import { AI_PROVIDERS } from '@/lib/types'
import type { AIProvider, Theme } from '@/lib/types'
import { useSettings } from '@/hooks/use-settings'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icons } from '@/components/icons'

export const Settings = () => {
  const { setTheme } = useTheme()
  const { settings, mutateSettings } = useSettings()

  return (
    <Dialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.settings />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="gap-0 p-0"
        aria-describedby={undefined}
      >
        <DialogHeader className="border-b p-6">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 p-6">
          <SettingsItem>
            <Label htmlFor="theme">Theme</Label>
            <Select
              name="theme"
              onValueChange={(value) => {
                setTheme(value as Theme)
                mutateSettings.set({ name: 'theme', value: value as Theme })
              }}
              defaultValue={settings.theme}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </SettingsItem>
          <SettingsItem>
            <div className="space-y-1">
              <Label htmlFor="ai_provider">AI Provider</Label>
              <p className="text-sm text-muted-foreground">
                Note: <code>chrome-ai</code> will be added when stable.
              </p>
            </div>
            <Select
              name="ai_provider"
              onValueChange={(value) =>
                mutateSettings.set({
                  name: 'aiProvider',
                  value: value as AIProvider,
                })
              }
              defaultValue={settings.aiProvider}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AI_PROVIDERS).map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingsItem>
        </div>
        <DialogFooter className="p-6 pt-0">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const SettingsItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-2 rounded border border-b p-4">
      <div className="flex items-center justify-between gap-8">{children}</div>
    </div>
  )
}
