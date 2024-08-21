import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'bun:test'

import { walkThroughSetUp } from '@/lib/constants'
import { BodyTypeEnum, FetchSchemaType, Method } from '@/lib/types'
import { useHistory } from '@/hooks/use-history'

describe('useHistory', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with walkThroughSetUp', () => {
    const { result } = renderHook(() => useHistory())
    expect(result.current.history).toEqual(walkThroughSetUp)
  })

  it('should add an item to history', () => {
    const { result } = renderHook(() => useHistory())
    const newItem: FetchSchemaType = {
      endpoint: 'http://localhost:3000',
      method: Method.GET,
      bodyType: BodyTypeEnum.JSON,
      body: '',
      reqTypes: '',
      headers: [],
      params: [],
    }

    act(() => {
      result.current.mutateHistory.add(newItem)
    })

    expect(result.current.history).toHaveLength(walkThroughSetUp.length + 1)
    expect(result.current.history[result.current.history.length - 1]).toEqual(
      newItem
    )
  })

  it('should remove an item from history', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.mutateHistory.removeItem(0)
    })

    expect(result.current.history).toHaveLength(walkThroughSetUp.length - 1)
  })

  it('should clear history', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.mutateHistory.clear()
    })

    expect(result.current.history).toHaveLength(0)
  })
})
