import { useFieldArray } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'

export const ParamsForm = () => {
  const { form } = useFetcher()
  const { fields, insert, remove } = useFieldArray({
    control: form.control,
    name: 'params',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    keyName: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { value } = e.target
    const indexValues = form.getValues(`params.${index}`)

    const isEmpty =
      value === '' &&
      Object.entries(indexValues).every(
        ([key, value]) => key === keyName || value === ''
      )

    if (index === fields.length - 1 && value.length > 0) {
      insert(fields.length, { key: '', value: '' }, { shouldFocus: false })
    } else if (isEmpty) {
      remove(index)
      form.setFocus(`params.${index}.key`)
    }

    onChange(e)
  }

  const handleRemove = (index: number) => {
    remove(index)
    form.setFocus(`params.${index}.key`)
  }

  return (
    <div className="space-y-2 p-2">
      {fields.map(({ id }, index) => (
        <div className="group relative flex items-center gap-2" key={id}>
          <FormField
            control={form.control}
            name={`params.${index}.key`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="name"
                    onChange={(e) => handleChange(e, index, 'key', onChange)}
                    className={cn('w-full text-[hsl(var(--e-constant))]')}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`params.${index}.value`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="relative grow space-y-0">
                <FormControl>
                  <Input
                    placeholder="value"
                    onChange={(e) => handleChange(e, index, 'value', onChange)}
                    {...field}
                  />
                </FormControl>
                <div
                  className={cn(
                    'absolute inset-y-1 right-1 hidden w-0 items-center justify-end bg-card transition-[width]',
                    index !== fields.length - 1 && 'flex group-hover:w-8'
                  )}
                >
                  {index !== fields.length - 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="hidden size-8 shrink-0 rounded-sm group-hover:flex group-hover:animate-in group-hover:fade-in group-hover:slide-in-from-right-4"
                      onClick={() => handleRemove(index)}
                    >
                      <Icons.trash className="size-4" />
                    </Button>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  )
}
