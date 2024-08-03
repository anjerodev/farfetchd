export const DevToolbar = () => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-0 right-0 z-[53] m-2 flex w-fit items-center gap-0.5 rounded-md border bg-popover/60 p-1 backdrop-blur-sm">
      <div className="text-body-sm flex h-10 w-10 items-center justify-center p-3 font-mono">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
    </div>
  )
}
