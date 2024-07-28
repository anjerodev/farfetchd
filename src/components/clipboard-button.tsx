import { TooltipTrigger } from '@radix-ui/react-tooltip'

import { Button, ButtonProps } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip'

interface Props extends Omit<ButtonProps, 'onClick'> {
  value: string
  className?: string
  tooltip?: string
}

export const ClipboardButton = ({ value, tooltip, ...props }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleCopy} {...props}>
            <Icons.copy className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
