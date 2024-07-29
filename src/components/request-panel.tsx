import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFetcher } from '@/components/fetcher-provider'

import { BodyForm } from './request-tabs/body-form'
import { HeadersForm } from './request-tabs/headers-form'
import { ParamsForm } from './request-tabs/params-form'
import { TypesForm } from './request-tabs/types-form'

const TABS = {
  HEADERS: 'headers',
  PARAMS: 'params',
  BODY: 'body',
  TYPES: 'types',
}

export const RequestPanel = () => {
  const { form } = useFetcher()

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col">
      <Tabs defaultValue={TABS.HEADERS} className="flex h-full flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={TABS.HEADERS}>
              Headers
              {form.getValues('headers').filter((header) => header.key !== '')
                .length > 0 && (
                <span className="ml-3 size-2 shrink-0 rounded-full bg-primary" />
              )}
            </TabsTrigger>
            <TabsTrigger value={TABS.PARAMS}>
              Params
              {form.getValues('params').filter((param) => param.key !== '')
                .length > 0 && (
                <span className="ml-3 size-2 shrink-0 rounded-full bg-primary" />
              )}
            </TabsTrigger>
            <TabsTrigger value={TABS.BODY}>
              Body
              {form.getValues('body') !== '' && (
                <span className="ml-3 size-2 shrink-0 rounded-full bg-primary" />
              )}
            </TabsTrigger>
            <TabsTrigger value={TABS.TYPES}>
              Types
              {form.getValues('reqTypes') !== '' && (
                <span className="ml-3 size-2 shrink-0 rounded-full bg-primary" />
              )}
            </TabsTrigger>
          </TabsList>
        </header>
        <TabsContent value={TABS.HEADERS}>
          <HeadersForm />
        </TabsContent>
        <TabsContent value={TABS.PARAMS}>
          <ParamsForm />
        </TabsContent>
        <TabsContent
          value={TABS.BODY}
          className="grow flex-col overflow-hidden data-[state=active]:flex"
        >
          <BodyForm />
        </TabsContent>
        <TabsContent
          value={TABS.TYPES}
          className="grow flex-col overflow-hidden data-[state=active]:flex"
        >
          <TypesForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
