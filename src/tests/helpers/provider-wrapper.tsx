import { FetcherProvider } from '@/components/contexts/fetcher-context'
import { ThemeProvider } from '@/components/theme-provider'

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <FetcherProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </FetcherProvider>
  )
}
