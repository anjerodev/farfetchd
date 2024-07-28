import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'

export const ArrayFieldForm = ({ name }: { name: 'headers' | 'params' }) => {
  const { form } = useFetcher()
  const { fields, insert, remove } = useFieldArray({
    control: form.control,
    name,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    keyName: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { value } = e.target
    const indexValues = form.getValues(`${name}.${index}`)

    const isEmpty =
      value === '' &&
      Object.entries(indexValues).filter(
        ([key, value]) => key !== keyName && value !== ''
      ).length === 0

    if (index === fields.length - 1 && value.length > 0) {
      insert(fields.length, { key: '', value: '' }, { shouldFocus: false })
    } else if (isEmpty) {
      remove(index)
      form.setFocus(`${name}.${index}.key`)
    }

    onChange(e)
  }

  const handleRemove = (index: number) => {
    remove(index)
    form.setFocus(`${name}.${index}.key`)
  }

  return (
    <div className="space-y-2 p-2">
      {fields.map(({ id }, index) => (
        <div className="group relative flex items-center gap-2" key={id}>
          <FormField
            control={form.control}
            name={`${name}.${index}.key`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="name"
                    onChange={(e) => handleChange(e, index, 'key', onChange)}
                    className="text-[#7aa2f7]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${name}.${index}.value`}
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="value"
                    onChange={(e) => handleChange(e, index, 'value', onChange)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {index !== fields.length - 1 && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute right-1 hidden size-8 rounded-sm group-hover:flex group-hover:animate-in group-hover:zoom-in"
              onClick={() => handleRemove(index)}
            >
              <Icons.trash className="size-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
