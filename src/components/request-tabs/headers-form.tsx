import { useFieldArray } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'

export const HeadersForm = () => {
  const { form } = useFetcher()
  const { fields, insert, remove } = useFieldArray({
    control: form.control,
    name: 'headers',
  })
  form.watch('headers')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    keyName: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { value } = e.target
    const indexValues = form.getValues(`headers.${index}`)

    const isEmpty =
      value === '' &&
      Object.entries(indexValues).filter(
        ([key, value]) => key !== keyName && value !== ''
      ).length === 0

    if (index === fields.length - 1 && value.length > 0) {
      insert(
        fields.length,
        { key: '', value: '', secret: false },
        { shouldFocus: false }
      )
    } else if (isEmpty) {
      remove(index)
      form.setFocus(`headers.${index}.key`)
    }

    onChange(e)
  }

  const handleRemove = (index: number) => {
    remove(index)
    form.setFocus(`headers.${index}.key`)
  }

  return (
    <div className="space-y-2 p-2">
      {fields.map(({ id }, index) => (
        <div className="group relative flex items-center gap-2" key={id}>
          <FormField
            control={form.control}
            name={`headers.${index}.key`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="name"
                    onChange={(e) => handleChange(e, index, 'key', onChange)}
                    className={cn('w-full text-[#7aa2f7]')}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`headers.${index}.value`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="relative grow space-y-0">
                <FormControl>
                  <Input
                    type={
                      form.getValues(`headers.${index}.secret`)
                        ? 'password'
                        : 'text'
                    }
                    placeholder="value"
                    onChange={(e) => handleChange(e, index, 'value', onChange)}
                    {...field}
                  />
                </FormControl>
                <div className="absolute inset-y-1 right-1 flex w-0 items-center justify-end bg-background transition-[width] group-hover:w-8">
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
          <FormField
            control={form.control}
            name={`headers.${index}.secret`}
            render={({ field }) => (
              <FormItem className="relative grow space-y-0">
                <FormControl>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-8 shrink-0"
                    onClick={() => field.onChange(!field.value)}
                  >
                    {field.value ? (
                      <Icons.hide className="size-4" />
                    ) : (
                      <Icons.show className="size-4" />
                    )}
                  </Button>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  )
}
