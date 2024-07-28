import { useState } from 'react'

import { BodyTypeEnum, FetchSchemaType, Method } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useHistory } from '@/hooks/use-history'
import { Icons } from '@/components/icons'

import { useFetcher } from './fetcher-provider'
import { Button } from './ui/button'

export const Sidebar = () => {
  return (
    <aside className="hidden p-3 pr-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <History />
    </aside>
  )
}

const History = () => {
  const { form, clearResult } = useFetcher()
  const { history } = useHistory()

  const addEmpty = () => {
    const values = {
      endpoint: '',
      method: Method.GET,
      bodyType: BodyTypeEnum.JSON,
      body: '',
      reqTypes: '',
      headers: [{ key: '', value: '' }],
      params: [{ key: '', value: '' }],
    }
    form.reset(values)
    clearResult()
    form.setFocus('endpoint')
  }

  return (
    <section className="flex-1 space-y-3 overflow-auto">
      <header className="flex h-10 items-center justify-between px-2">
        <div className="flex items-center gap-2 font-medium">
          <Icons.history className="size-4" />
          History
        </div>
        <Button variant="ghost" size="icon" onClick={addEmpty}>
          <Icons.add className="size-5" />
        </Button>
      </header>
      <div className="space-y-1">
        {history.map((item, index) => (
          <HistoryItem
            key={`history-${item.endpoint}-${item.method}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

const HistoryItem = ({
  item,
  index,
}: {
  item: FetchSchemaType
  index: number
}) => {
  const { form } = useFetcher()
  const [deleting, setDeleting] = useState(false)
  const { mutateHistory } = useHistory()

  const handleDelete = () => mutateHistory.removeItem(index)

  const handleSetItem = () => {
    form.reset(item)
  }

  return (
    <div className="group/history-item flex w-full items-center gap-1 rounded bg-card/50 pr-2 text-sm transition-colors hover:bg-card">
      <button
        className="flex h-10 w-full min-w-0 grow items-center gap-2 p-2"
        onClick={handleSetItem}
      >
        <span
          className={cn(
            'pointer-events-none w-14 shrink-0 rounded-sm px-1 py-0.5 text-center text-xs uppercase',
            item.method === Method.GET && 'bg-green-400/20 text-green-400',
            item.method === Method.POST && 'bg-blue-400/20 text-blue-400',
            item.method === Method.PUT && 'bg-yellow-400/20 text-yellow-400',
            item.method === Method.PATCH && 'bg-purple-400/20 text-purple-400',
            item.method === Method.DELETE && 'bg-red-400/20 text-red-400'
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
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              className="hidden size-8 group-hover/history-item:flex group-hover/history-item:animate-in group-hover/history-item:fade-in"
            >
              <Icons.check className="size-4" />
            </Button>
            <Button
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
            onClick={() => setDeleting(true)}
            variant="ghost"
            size="icon"
            className="hidden size-8 group-hover/history-item:flex group-hover/history-item:animate-in group-hover/history-item:fade-in"
          >
            <Icons.trash className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
