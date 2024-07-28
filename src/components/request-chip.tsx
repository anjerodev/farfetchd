import { cn } from '@/lib/utils'

interface Props {
  label: string
  value?: any
  render?: (value: any) => React.ReactNode
}

export const RequestChip = ({ label, value, render }: Props) => {
  return (
    <div
      className={cn(
        'space-x-2 rounded-md px-2 py-1',
        value && 'border bg-muted/50'
      )}
    >
      <span
        className={cn(
          'text-muted-foreground/50',
          value && 'text-muted-foreground'
        )}
      >
        {label}
      </span>
      {render && value && render(value)}
    </div>
  )
}
