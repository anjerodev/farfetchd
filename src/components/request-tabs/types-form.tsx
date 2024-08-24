import { prettify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useFetcher } from '@/components/contexts/fetcher-context'
import { Editor } from '@/components/editor'
import { Icons } from '@/components/icons'

export const TypesForm = () => {
  const { form } = useFetcher()
  form.watch('reqTypes')

  const prettifyTypes = async () => {
    const text = form.getValues('reqTypes') || ''

    if (!text || typeof text !== 'string') return

    try {
      const formattedText = await prettify({
        content: text,
        parser: 'typescript',
      })
      form.setValue('reqTypes', formattedText)
    } catch (e) {}
  }

  return (
    <>
      <div className="flex grow flex-col overflow-auto py-2">
        <FormField
          control={form.control}
          name="reqTypes"
          render={({ field }) => (
            <Editor
              value={String(field.value)}
              onChange={field.onChange}
              language="javascript"
            />
          )}
        />
      </div>
      <footer className="flex h-14 shrink-0 items-center justify-end gap-1 border-t px-3 py-2">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={prettifyTypes}
              >
                <Icons.prettify className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Prettify</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </>
  )
}
