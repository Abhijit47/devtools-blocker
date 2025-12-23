# devtools-blocker

React hook to block common DevTools shortcuts and right-click context menu. Built in TypeScript, ships with CJS/ESM and type definitions.

## Installation

```bash
npm install devtools-blocker
# or
yarn add devtools-blocker
# or
pnpm add devtools-blocker
```

## Quick usage (client component)

```tsx
'use client';

import { useDevtoolsBlocker } from 'devtools-blocker';

export function DevtoolsBlocker() {
  useDevtoolsBlocker();
  return null;
}
```

Place `DevtoolsBlocker` high in your component tree (e.g., in `layout.tsx` or `_app.tsx`) so it registers listeners once.

## Provider-style usage (for app shells/layouts)

```tsx
'use client';

import { PropsWithChildren } from 'react';
import { useDevtoolsBlocker } from 'devtools-blocker';

export function DevtoolsBlockerProvider({ children }: PropsWithChildren) {
  useDevtoolsBlocker();
  return <>{children}</>;
}

// Example
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <DevtoolsBlockerProvider>{children}</DevtoolsBlockerProvider>
      </body>
    </html>
  );
}
```

## What it does

- Prevents right-click context menu
- Blocks common DevTools shortcuts: F12, Ctrl/Cmd+Shift+I/J/C/K, Cmd+Opt+U
- Works on Windows, macOS, Linux
- Covers various keyboard layouts (QWERTY, AZERTY, QWERTZ)
- Handles both physical and virtual keyboards
- Accounts for modifier keys (Shift, Ctrl, Alt, Meta)
- Ignores inputs in text fields, textareas, and contenteditable elements
- Cleans up event listeners on unmount
- Lightweight (~0.5 KB minified + gzipped)

## Notes

- Requires React 16.8+ (hooks). Works in Next.js client components.
- The hook has no options; it registers listeners on mount and cleans up on unmount.
- This is a deterrent, not a security measure—advanced users can still open DevTools.

## Development

```bash
npm run dev   # watch mode
npm run build # generate dist and types
```

## Testing

```bash
npm test
```

Tests run with Vitest (jsdom) and currently pass.

## License

MIT
