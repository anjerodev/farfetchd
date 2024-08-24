import { FetcherProvider } from '@/components/contexts/fetcher-context'
import { DevToolbar } from '@/components/dev-toolbar'
import { MainForm } from '@/components/main-form'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <FetcherProvider>
        <div className="grid h-dvh grid-cols-[minmax(200px,_0.3fr)_minmax(500px,_1fr)] overflow-hidden">
          <Sidebar />
          <main className="col-span-2 lg:col-span-1">
            <MainForm />
          </main>
        </div>
      </FetcherProvider>
      <DevToolbar />
    </ThemeProvider>
  )
}

export default App
