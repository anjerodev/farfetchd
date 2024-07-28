import {
  Ban,
  Check,
  Copy,
  History,
  Loader2,
  LucideProps,
  Moon,
  Plus,
  Sun,
  Trash,
  WandSparkles,
  X,
} from 'lucide-react'

export type IconProps = LucideProps

const Sparkles = (props: LucideProps) => (
  <svg
    width="24"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M8.664 15.735c.245.173.537.265.836.264v-.004a1.442 1.442 0 0 0 1.327-.872l.613-1.864a2.871 2.871 0 0 1 1.817-1.812l1.778-.578a1.443 1.443 0 0 0-.052-2.74l-1.755-.57a2.876 2.876 0 0 1-1.822-1.823l-.578-1.777a1.446 1.446 0 0 0-2.732.022l-.583 1.792a2.877 2.877 0 0 1-1.77 1.786l-1.777.571a1.444 1.444 0 0 0 .017 2.734l1.754.569a2.888 2.888 0 0 1 1.822 1.826l.578 1.775c.099.283.283.529.527.701Zm-.374-4.25a4.056 4.056 0 0 0-.363-.413h.003a4.394 4.394 0 0 0-1.72-1.063l-1.6-.508 1.611-.524a4.4 4.4 0 0 0 1.69-1.065 4.448 4.448 0 0 0 1.041-1.708l.515-1.582.516 1.587a4.373 4.373 0 0 0 2.781 2.773l1.62.522-1.59.515a4.38 4.38 0 0 0-2.774 2.775l-.515 1.582-.515-1.585a4.368 4.368 0 0 0-.7-1.306Zm8.041 9.297a1.123 1.123 0 0 1-.41-.549l-.328-1.007a1.294 1.294 0 0 0-.821-.823l-.991-.323A1.147 1.147 0 0 1 13 16.997a1.143 1.143 0 0 1 .771-1.08l1.006-.326a1.3 1.3 0 0 0 .8-.819l.324-.992a1.143 1.143 0 0 1 2.157-.021l.329 1.014a1.3 1.3 0 0 0 .82.816l.992.323a1.141 1.141 0 0 1 .039 2.165l-1.014.329a1.3 1.3 0 0 0-.818.822l-.322.989a1.146 1.146 0 0 1-1.753.565Zm-1.03-3.783A2.789 2.789 0 0 1 17 18.708a2.795 2.795 0 0 1 1.7-1.7 2.814 2.814 0 0 1-1.718-1.708A2.807 2.807 0 0 1 15.3 17l.001-.001Z"
      fill="currentColor"
    />
  </svg>
)

export const Icons = {
  copy: Copy,
  loader: Loader2,
  lightMode: Sun,
  darkMode: Moon,
  trash: Trash,
  corsError: Ban,
  ai: Sparkles,
  prettify: WandSparkles,
  history: History,
  check: Check,
  cancel: X,
  add: Plus,
}
