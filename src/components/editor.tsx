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
  foreground: '#787c99',
  caret: '#c0caf5',
  selection: '#474b6640',
  selectionMatch: '#16161e',
  gutterBackground: 'transparent',
  gutterForeground: '#787c99',
  gutterBorder: 'transparent',
  lineHighlight: '#474b6611',
  fontSize: '14px',
}

const style: CreateThemeOptions['styles'] = [
  { tag: t.keyword, color: '#bb9af7' },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: '#c0caf5' },
  { tag: [t.propertyName], color: '#7aa2f7' },
  {
    tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
    color: '#9ece6a',
  },
  { tag: [t.function(t.variableName), t.labelName], color: '#7aa2f7' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#bb9af7' },
  { tag: [t.definition(t.name), t.separator], color: '#c0caf5' },
  { tag: [t.className], color: '#c0caf5' },
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
    color: '#ff9e64',
  },
  { tag: [t.typeName], color: '#0db9d7' },
  { tag: [t.operator, t.operatorKeyword], color: '#bb9af7' },
  { tag: [t.url, t.escape, t.regexp, t.link], color: '#b4f9f8' },
  { tag: [t.meta, t.comment], color: '#444b6a' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: '#89ddff' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#c0caf5' },
  { tag: t.invalid, color: '#ff5370' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  {
    tag: [t.bracket],
    color: '#b4f9f8',
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
