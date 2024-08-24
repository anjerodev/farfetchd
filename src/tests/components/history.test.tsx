import { render } from '@/tests/helpers/render'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import { walkThroughSetUp } from '@/lib/constants'
import { History } from '@/components/history'

describe('History', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('should render History correctly', () => {
    const component = render(<History />)

    const el = component.getByText('History')
    expect(el).toBeDefined()

    // expect(component.container).toHaveTextContent('History')
  })

  it('should render History walkthrough items', () => {
    render(<History />)

    walkThroughSetUp.forEach((item) => {
      const historyItem = screen.getByText(item.endpoint)
      expect(historyItem).toBeDefined()
    })
  })

  it('should render accept and cancel button when click delete button', async () => {
    render(<History />)

    const historyItem = screen.getAllByRole('listitem', {
      name: /history item/i,
    })
    expect(historyItem).toHaveLength(walkThroughSetUp.length)

    const deleteBtn = screen.getAllByRole('button', { name: /delete/i })[0]
    expect(deleteBtn).toBeInTheDocument()

    fireEvent.click(deleteBtn)

    const acceptBtn = screen.getByRole('button', { name: /confirm/i })
    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    expect(acceptBtn).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
  })

  it('should remove an item if accept delete button is clicked', async () => {
    render(<History />)

    let historyItems = screen.getAllByRole('listitem', {
      name: /history item/i,
    })
    expect(historyItems).toHaveLength(walkThroughSetUp.length)

    const deleteBtn = screen.getAllByRole('button', { name: /delete/i })[0]

    fireEvent.click(deleteBtn)
    const acceptBtn = screen.getByRole('button', { name: /confirm/i })

    fireEvent.click(acceptBtn)

    historyItems = screen.getAllByRole('listitem', {
      name: /history item/i,
    })
    expect(historyItems).toHaveLength(walkThroughSetUp.length - 1)
  })

  it('Should not remove an item if cancel delete button is clicked', async () => {
    render(<History />)

    let historyItems = screen.getAllByRole('listitem', {
      name: /history item/i,
    })

    expect(historyItems).toHaveLength(walkThroughSetUp.length)

    const deleteBtn = screen.getAllByRole('button', { name: /delete/i })[0]

    fireEvent.click(deleteBtn)
    const cancelBtn = screen.getByRole('button', { name: /cancel/i })

    fireEvent.click(cancelBtn)
    historyItems = screen.getAllByRole('listitem', {
      name: /history item/i,
    })
    expect(historyItems).toHaveLength(walkThroughSetUp.length)
  })
})
