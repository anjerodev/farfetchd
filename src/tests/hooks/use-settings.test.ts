import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'bun:test'

import { defaultSettings } from '@/lib/constants'
import { useSettings } from '@/hooks/use-settings'

describe('useSettings', () => {
  it('should initialize with defaultSettings', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current.settings).toEqual(defaultSettings)
  })

  it('should update settings', () => {
    const { result } = renderHook(() => useSettings())

    act(() => {
      result.current.mutateSettings.set({ name: 'theme', value: 'light' })
    })

    expect(result.current.settings).toEqual({
      ...defaultSettings,
      theme: 'light',
    })
  })

  it('should reset settings', () => {
    const { result } = renderHook(() => useSettings())

    act(() => {
      result.current.mutateSettings.reset()
    })

    expect(result.current.settings).toEqual(defaultSettings)
  })
})
