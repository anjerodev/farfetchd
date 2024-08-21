import { useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { defaultSettings } from '@/lib/constants'
import { Settings } from '@/lib/types'

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    'settings',
    defaultSettings
  )

  const mutateSettings = useMemo(
    () => ({
      set: ({
        name,
        value,
      }: {
        name: keyof Settings
        value: Settings[keyof Settings]
      }) => {
        setSettings((prev) => ({ ...prev, [name]: value }))
      },
      reset: () => setSettings(defaultSettings),
    }),
    []
  )

  return { settings, mutateSettings }
}
