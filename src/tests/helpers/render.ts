import { render as rtlRender, type RenderOptions } from '@testing-library/react'

import { ProviderWrapper } from './provider-wrapper'

function render(ui: React.ReactElement, options: RenderOptions = {}) {
  return rtlRender(ui, { wrapper: ProviderWrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
