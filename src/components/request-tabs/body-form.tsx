import { ReactNode, useEffect, useState } from 'react'
import { CoreMessage, generateText } from 'ai'
import { ollama } from 'ollama-ai-provider'

import { BodyTypeEnum } from '@/lib/types'
import { preprocessJson, prettify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Editor } from '@/components/editor'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'

export const BodyForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [nItems, setNItems] = useState(1)
  const [error, setError] = useState<ReactNode | undefined>()

  const { form } = useFetcher()
  form.watch('bodyType')
  form.watch('body')

  const generateBody = async () => {
    const reqTypes = form.getValues('reqTypes')

    if (!reqTypes) {
      setError('Please add types first.')
      return
    }

    const messages: CoreMessage[] = [
      {
        role: 'user',
        content:
          'Create a JSON body of 1 item following the next schema: type User = { name: string, age: number, city: string, registered: boolean }',
      },
      {
        role: 'assistant',
        content: `{ 
          "name": "John",
          "age": 30, 
          "city": "New York", 
          "registered": true
           }`,
      },
      {
        role: 'user',
        content:
          'Create a JSON body of 3 items following the next schema: type Item = { price: number, quantity: number, color: string } type Order = { items: Item[] }',
      },
      {
        role: 'assistant',
        content: `[
          { "items": [{"price": 10, "quantity": 2, "color": "red"}, {"price": 20, "quantity": 1, "color": "blue"}] },
          { "items": [{"price": 15, "quantity": 1, "color": "green"}] },
          { "items": [{"price": 5, "quantity": 3, "color": "yellow"}, {"price": 25, "quantity": 2, "color": "purple"}, {"price": 30, "quantity": 1, "color": "black"}] }
          ]`,
      },
      {
        role: 'user',
        content: `Create a JSON body of ${nItems} items following the next schema: ${reqTypes}`,
      },
    ]

    try {
      setError(undefined)
      setIsPending(true)
      const response = await generateText({
        model: ollama('llama3.1:latest'),
        system:
          'You are a helpful assistant that only returns valid JSON with the types that the user provides. DO NOT return empty or null values, at least it is specify on the types.',
        messages,
        temperature: 1,
      })

      const formattedJson = await prettify({
        content: preprocessJson(response.text),
        parser: 'json',
      })

      /* NOTE: For some reason, streaming with messages from ollama doesn't work */

      /*const { textStream } = await streamText({
          model: ollama('llama3.1:latest'),
          system:
            'You are a helpful assistant that only returns valid JSON with the keys that the user provides.',
          messages,
          temperature: 1,
        })
  
        for await (const textPart of textStream) {
          const currentValue = form.getValues('body') || ''
          form.setValue('body', `${currentValue}${textPart}`)
        }*/

      form.setValue('body', formattedJson)
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        setError(
          <>
            Install ollama and run <br />
            <code className="rounded bg-red-500/20 px-1 py-0.5">
              pull llama3.1
            </code>
            <br />
            More info at{' '}
            <a href="https://ollama.com/" target="_blank" className="underline">
              https://ollama.com
            </a>
          </>
        )
        return
      }
      setError('Please make sure the types have the correct format.')
    } finally {
      setIsPending(false)
    }
  }

  const prettifyBody = async () => {
    const text = form.getValues('body') || ''

    if (!text || typeof text !== 'string') return

    try {
      // Prettify raw text, to add double quotes in keys
      const formattedText = await prettify({
        content: text,
        parser: 'json',
      })
      // Preprocess json to add tab indentation
      const formattedJson = await prettify({
        content: preprocessJson(formattedText),
        parser: 'json',
      })
      form.setValue('body', formattedJson)
    } catch (e) {}
  }

  return (
    <>
      <div className="flex grow flex-col overflow-auto py-2">
        {(() => {
          if (isPending) {
            return (
              <p className="relative w-fit pl-4 pr-1 pt-4 text-muted-foreground">
                Generating body
                <LoadingDots />
              </p>
            )
          }

          if (form.getValues('bodyType') === BodyTypeEnum.JSON) {
            return (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <Editor
                    value={String(field.value)}
                    onChange={field.onChange}
                  />
                )}
              />
            )
          }

          return null
        })()}
      </div>
      <footer className="flex h-14 shrink-0 items-center justify-end gap-1 border-t px-3 py-2">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button type="button" size="icon" variant="ghost">
                    <Icons.ai />
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">AI generation</h4>
                    <p className="text-sm text-muted-foreground">
                      The body will be autogenerated following the types schema
                      defined in the Types tab.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="items" className="col-span-2">
                        Number of Items
                      </Label>
                      <Input
                        type="number"
                        id="items"
                        defaultValue={1}
                        className="h-8"
                        onChange={(e) => setNItems(Number(e.target.value))}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>
                  <Button onClick={generateBody} disabled={isPending}>
                    Generate
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>
              <span>Generate body with AI</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={prettifyBody}
                disabled={isPending}
              >
                <Icons.prettify className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Prettify</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </>
  )
}

const LoadingDots = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    let length = 0
    const intervalId = setInterval(() => {
      length = (length + 1) % 4
      setDots('.'.repeat(length))
    }, 250)

    return () => clearInterval(intervalId)
  }, [])

  return <span className="absolute right-0 translate-x-full">{dots}</span>
}
