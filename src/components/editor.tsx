import { forwardRef } from 'react'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { tags as t } from '@lezer/highlight'
import { createTheme, type CreateThemeOptions } from '@uiw/codemirror-themes'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from 'codemirror'

import { cn } from '@/lib/utils'

const defaultSettings: CreateThemeOptions['settings'] = {
  background: 'transparent',
  foreground: 'hsl(var(--e-foreground))',
  caret: 'hsl(var(--e-caret))',
  selection: 'hsl(var(--e-selection)/0.3)',
  selectionMatch: 'hsl(var(--e-selection-match))',
  gutterBackground: 'transparent',
  gutterForeground: 'hsl(var(--e-gutter-foreground))',
  gutterBorder: 'transparent',
  lineHighlight: 'hsl(var(--e-selection)/0.2)',
  fontSize: '14px',
}

const style: CreateThemeOptions['styles'] = [
  { tag: t.keyword, color: 'hsl(var(--e-keyword))' },
  {
    tag: [t.name, t.deleted, t.character, t.macroName],
    color: 'hsl(var(--e-name))',
  },
  { tag: [t.propertyName], color: 'hsl(var(--e-property-name))' },
  {
    tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
    color: 'hsl(var(--e-string))',
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: 'hsl(var(--e-function))',
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: 'hsl(var(--e-constant))',
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: 'hsl(var(--e-definition))',
  },
  { tag: [t.className], color: 'hsl(var(--e-class-name))' },
  {
    tag: [
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
      t.bracket,
    ],
    color: 'hsl(var(--e-number))',
  },
  { tag: [t.typeName], color: 'hsl(var(--e-type-name))' },
  { tag: [t.operator, t.operatorKeyword], color: 'hsl(var(--e-operator))' },
  { tag: [t.url, t.escape, t.regexp, t.link], color: 'hsl(var(--e-url))' },
  { tag: [t.meta, t.comment], color: 'hsl(var(--e-comment))' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: 'hsl(var(--e-heading))' },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: 'hsl(var(--e-atom))',
  },
  { tag: t.invalid, color: 'hsl(var(--e-invalid))' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  {
    tag: [t.bracket],
    color: 'hsl(var(--e-bracket))',
  },
  {
    tag: [t.squareBracket],
    color: 'hsl(var(--e-number))',
  },
]

const themeInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'dark', settings = {}, styles = [] } = options || {}
  return createTheme({
    theme: theme,
    settings: {
      ...defaultSettings,
      ...settings,
    },
    styles: [...style, ...styles],
  })
}

const theme = themeInit()

export const Editor = forwardRef<
  React.ElementRef<typeof CodeMirror>,
  React.ComponentPropsWithoutRef<typeof CodeMirror> & {
    language?: 'html' | 'json' | 'javascript'
  }
>(({ className, language, extensions = [], ...props }, ref) => {
  const getLanguage = () => {
    switch (language) {
      case 'html':
        return html()
      case 'javascript':
        return javascript()
      default:
        return json()
    }
  }
  return (
    <CodeMirror
      extensions={[EditorView.lineWrapping, getLanguage(), ...extensions]}
      theme={theme}
      className={cn(
        'flex flex-1 flex-col [&_.cm-editor.cm-focused]:outline-none [&_.cm-editor]:h-full [&_.cm-foldPlaceholder]:border-none [&_.cm-foldPlaceholder]:bg-transparent',
        className
      )}
      {...props}
      ref={ref}
    />
  )
})
