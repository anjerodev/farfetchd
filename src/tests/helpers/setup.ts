import { cleanup } from '@testing-library/react'
import { beforeAll } from 'bun:test'

beforeAll(() => {
  console.log('Cleaning up...')
  cleanup()
})
