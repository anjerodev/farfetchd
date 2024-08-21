import { useState } from 'react'

import { FetchSchemaType, Method } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useHistory } from '@/hooks/use-history'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import { useFetcher } from './fetcher-provider'

export const HistoryItem = ({
  item,
  index,
}: {
  item: FetchSchemaType
  index: number
}) => {
  const { form, clearResult } = useFetcher()
  const [deleting, setDeleting] = useState(false)
  const { mutateHistory } = useHistory()

  const handleDelete = () => mutateHistory.removeItem(index)

  const handleSetItem = () => {
    const headersAreEmpty = item.headers.every(
      (h) => h.key === '' && h.value === ''
    )
    const paramsAreEmpty = item.params.every(
      (p) => p.key === '' && p.value === ''
    )
    const headers = headersAreEmpty
      ? item.headers
      : [...item.headers, { key: '', value: '', secret: false }]
    const params = paramsAreEmpty
      ? item.params
      : [...item.params, { key: '', value: '' }]

    form.reset({
      ...item,
      headers,
      params,
    })
    clearResult()
  }

  return (
    <li
      aria-label="History item"
      className="group/history-item flex w-full items-center gap-1 rounded bg-card/50 pr-2 text-sm transition-colors hover:bg-card"
    >
      <button
        aria-label={`Load ${item.method} of ${item.endpoint}`}
        className="flex h-10 w-full min-w-0 grow items-center gap-2 p-2"
        onClick={handleSetItem}
      >
        <span
          className={cn(
            'pointer-events-none w-14 shrink-0 rounded-sm px-1 py-0.5 text-center text-xs uppercase',
            item.method === Method.GET &&
              'bg-green-400/20 text-green-700 dark:text-green-400',
            item.method === Method.POST &&
              'bg-blue-400/20 text-blue-700 dark:text-blue-400',
            item.method === Method.PUT &&
              'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400',
            item.method === Method.PATCH &&
              'bg-purple-400/20 text-purple-700 dark:text-purple-400',
            item.method === Method.DELETE &&
              'bg-red-400/20 text-red-700 dark:text-red-400'
          )}
        >
          {item.method}
        </span>
        <p className="pointer-events-none w-full flex-1 truncate text-start text-muted-foreground">
          {item.endpoint}
        </p>
      </button>
      <div
        className={cn(
          'flex w-0 shrink-0 items-center justify-end overflow-hidden transition-[width]',
          deleting
            ? 'group-hover/history-item:w-[64px]'
            : 'group-hover/history-item:w-[32px]'
        )}
      >
        {deleting ? (
          <>
            <Button
              aria-label="Confirm delete"
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              className="hidden size-8 group-hover/history-item:flex group-hover/history-item:animate-in group-hover/history-item:fade-in"
            >
              <Icons.check className="size-4" />
            </Button>
            <Button
              aria-label="Cancel delete"
              onClick={() => setDeleting(false)}
              variant="ghost"
              size="icon"
              className="hidden size-8 group-hover/history-item:flex group-hover/history-item:animate-in group-hover/history-item:fade-in"
            >
              <Icons.cancel className="size-4" />
            </Button>
          </>
        ) : (
          <Button
            aria-label={`Delete ${item.method} of ${item.endpoint}`}
            onClick={() => setDeleting(true)}
            variant="ghost"
            size="icon"
            className="hidden size-8 group-hover/history-item:flex group-hover/history-item:animate-in group-hover/history-item:fade-in"
          >
            <Icons.trash className="size-4" />
          </Button>
        )}
      </div>
    </li>
  )
}
