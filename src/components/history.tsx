import { BodyTypeEnum, Method } from '@/lib/types'
import { useHistory } from '@/hooks/use-history'
import { Button } from '@/components/ui/button'
import { useFetcher } from '@/components/contexts/fetcher-context'
import { Icons } from '@/components/icons'

import { HistoryItem } from './history-item'

export const History = () => {
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
      <ul className="space-y-1">
        {history.map((item, index) => (
          <HistoryItem
            key={`history-${item.endpoint}-${item.method}`}
            item={item}
            index={index}
          />
        ))}
      </ul>
    </section>
  )
}
