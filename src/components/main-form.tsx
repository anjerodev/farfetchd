import { Method } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'
import { RequestPanel } from '@/components/request-panel'
import { ResponsePanel } from '@/components/response-panel'

export const MainForm = () => {
  const { isPending, form, onSubmit } = useFetcher()
  form.watch('method')
  form.watch('endpoint')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-3 p-3"
      >
        <section className="flex gap-3 rounded-lg bg-card p-2">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={Method.GET}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-none bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Method.GET}>GET</SelectItem>
                    <SelectItem value={Method.POST}>POST</SelectItem>
                    <SelectItem value={Method.PUT}>PUT</SelectItem>
                    <SelectItem value={Method.PATCH}>PATCH</SelectItem>
                    <SelectItem value={Method.DELETE}>DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endpoint"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input className="border-none bg-transparent" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send
          </Button>
        </section>
        <section className="flex h-0 grow rounded-lg bg-card">
          <div className="flex h-full min-h-0 w-full items-stretch overflow-hidden">
            <div className="min-h-0 flex-1 grow-[0.4] border-r">
              <RequestPanel />
            </div>
            <div className="min-h-0 flex-1 grow-[0.6]">
              <ResponsePanel />
            </div>
          </div>
        </section>
      </form>
    </Form>
  )
}
