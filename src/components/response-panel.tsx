import { cn, formatSize, formatTime } from '@/lib/utils'
import { ClipboardButton } from '@/components/clipboard-button'
import { Editor } from '@/components/editor'
import { useFetcher } from '@/components/fetcher-provider'
import { Icons } from '@/components/icons'
import { RequestChip } from '@/components/request-chip'

export const ResponsePanel = () => {
  const { isPending, result } = useFetcher()

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3">
        <RequestChip
          label="Request"
          value={result?.method}
          render={(value) => (
            <span className="uppercase text-foreground">{value}</span>
          )}
        />
        <RequestChip
          label="Response"
          value={result}
          render={({ status, ok }) => (
            <span className={cn(ok ? 'text-green-500' : 'text-red-500')}>
              {`${status} ${ok ? 'OK' : 'Error'}`}
            </span>
          )}
        />
        <ClipboardButton
          className="ml-auto text-muted-foreground"
          variant="ghost"
          disabled={!result?.content}
          value={result?.content || ''}
          tooltip="Copy response"
        />
      </header>
      <div className="flex min-h-0 grow flex-col overflow-auto py-2">
        {isPending ? (
          <div className="flex min-h-0 grow flex-col items-center justify-center">
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <div className="flex min-h-0 grow flex-col">
            {(() => {
              if (result?.cors) {
                return (
                  <div className="flex h-full items-center justify-center gap-3 p-12 text-center text-muted-foreground">
                    <div className="relative max-w-md space-y-2">
                      <p>Check your console output for CORS errors.</p>
                      <p>
                        If it is the case, we recommend you to install the
                        official{' '}
                        <a
                          className="underline hover:text-foreground"
                          href="https://chrome.google.com/webstore/detail/farfetchd-chrome-extenison"
                          target="_blank"
                        >
                          Farfetchd Chrome Extension
                        </a>{' '}
                        to automatically add
                      </p>
                      <p>
                        <span className="rounded-sm bg-muted px-2 py-0.5 font-mono">
                          Access-Control-Allow-Origin: *
                        </span>
                      </p>
                      <p>to the Response Headers.</p>
                      <Icons.corsError className="absolute inset-x-0 top-0 mx-auto size-12 -translate-y-[150%]" />
                    </div>
                  </div>
                )
              }
              if (result) {
                return (
                  <Editor
                    value={result?.ok ? result?.content : '{}'}
                    editable={false}
                    language={result.language}
                  />
                )
              }

              return (
                <p className="mx-5 my-3 text-sm text-muted-foreground">
                  No request made yet.
                </p>
              )
            })()}
          </div>
        )}
      </div>
      <footer className="flex min-h-14 shrink-0 items-center border-t px-3 py-2">
        {!result?.ok ? (
          <div className="text-red-500">{result?.content}</div>
        ) : (
          <div className="ml-auto w-fit space-x-3 text-right text-sm text-muted-foreground">
            <span>{formatSize(parseFloat(result?.size || '0'))}</span>
            <span>{formatTime(parseFloat(result?.time || '0'))}</span>
          </div>
        )}
      </footer>
    </div>
  )
}
