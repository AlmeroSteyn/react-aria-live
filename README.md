# react-aria-live

Broadcast `aria-live` messages to assistive technology (**VoiceOver on macOS/iOS, NVDA, JAWS, and TalkBack**) from anywhere in your React application.

[ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) are used to communicate dynamic state changes, route transitions, toast notifications, and form validation errors to screen reader users.

The technical double announcer region implementation of `react-aria-live` was inspired by [ngA11y](https://github.com/dequelabs/ngA11y) and enhanced to ensure reliable cross-browser announcements on **WebKit / VoiceOver (`AXLiveRegion`)** as well as NVDA and JAWS.

---

## Key Features & What's New

- **VoiceOver (macOS & iOS) + NVDA + JAWS + TalkBack Compatibility**:
  - Uses semantic `role="status"` (`polite`) and `role="alert"` (`assertive`) with explicit `aria-atomic="true"` and `aria-relevant="additions text"` instead of `role="log"` (which had implicit `aria-atomic="false"` and `aria-live="polite"` in WebKit, preventing VoiceOver from announcing text replacements and assertive alerts).
  - Automatically re-triggers initial mount announcements on the next frame so VoiceOver reliably reads `<LiveMessage>` components rendered on initial mount or route transitions (resolving Issues `#20` and `#37`).
  - Fixes simultaneous `polite` + `assertive` state updates in `Announcer.getDerivedStateFromProps` when `clearOnUnmount` is used (resolving Issue `#20`).
- **React Hook (`useAnnouncer` / `useAriaLive`)**:
  - Broadcast messages from any functional component without class components or render-prop boilerplate (PR `#25`).
- **No Extra Wrapper `<div>` in the DOM**:
  - Renders the live region nodes inside a `React.Fragment` so placing `<LiveAnnouncer>` inside CSS Flex or Grid containers never breaks your layout (resolving Issue `#12`).
- **React 16.8+, 17, 18 & 19 + TypeScript Support**:
  - Broadened `peerDependencies` (`"react": ">=16.3.0"`, resolving Issue `#35`), bundled `index.d.ts` TypeScript definitions (resolving Issue `#14`), and removed the external `uuid` dependency in favor of native `crypto.randomUUID()` with an RFC4122 fallback.

---

## Installation

```bash
npm install react-aria-live
```

or

```bash
yarn add react-aria-live
```

---

## Usage

The library exports:
- **`LiveAnnouncer`**: Root provider component that renders the double-buffered visually hidden live regions.
- **`useAnnouncer` (alias `useAriaLive`)**: React Hook returning `{ announcePolite, announceAssertive }`.
- **`LiveMessage`**: Declarative component that announces whenever its `message` prop changes.
- **`LiveMessenger`**: Render-prop component providing `{ announcePolite, announceAssertive }`.

Wrap your application as high up as possible in `<LiveAnnouncer>` so the live regions remain mounted in the DOM across route and view changes.

### 1. Using the `useAnnouncer` / `useAriaLive` Hook (Recommended)

```jsx
import React from 'react';
import { LiveAnnouncer, useAnnouncer } from 'react-aria-live';

function SaveButton() {
  const { announcePolite, announceAssertive } = useAnnouncer();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          announcePolite('Changes saved successfully', String(Date.now()))
        }
      >
        Save Changes
      </button>

      <button
        type="button"
        onClick={() =>
          announceAssertive('Connection lost, please retry', String(Date.now()))
        }
      >
        Trigger Error
      </button>
    </div>
  );
}

export default function App() {
  return (
    <LiveAnnouncer>
      <SaveButton />
    </LiveAnnouncer>
  );
}
```

### 2. Using `<LiveMessage />`

If rendered inside a `LiveAnnouncer`, `<LiveMessage>` broadcasts `polite` or `assertive` messages whenever the `message` prop changes or when the component mounts with a non-empty `message`:

```jsx
import React, { useState } from 'react';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';

export default function MyApp() {
  const [a11yMessage, setA11yMessage] = useState('');

  return (
    <LiveAnnouncer>
      <LiveMessage message={a11yMessage} aria-live="polite" clearOnUnmount />
      <button
        type="button"
        onClick={() => setA11yMessage('Button Pressed')}
      >
        Press me
      </button>
    </LiveAnnouncer>
  );
}
```

### 3. Using `<LiveMessenger />`

For class components or render-prop patterns, `<LiveMessenger>` injects `{ announcePolite, announceAssertive }`:

```jsx
import React, { Fragment } from 'react';
import { LiveAnnouncer, LiveMessenger } from 'react-aria-live';

export default function MyApp() {
  return (
    <LiveAnnouncer>
      <LiveMessenger>
        {({ announcePolite, announceAssertive }) => (
          <Fragment>
            <button
              type="button"
              onClick={() => announcePolite('Polite message')}
            >
              Press me for a polite message
            </button>
            <button
              type="button"
              onClick={() =>
                announceAssertive('Assertive message', String(Date.now()))
              }
            >
              Press me for an assertive message
            </button>
          </Fragment>
        )}
      </LiveMessenger>
    </LiveAnnouncer>
  );
}
```

---

## Running the Interactive Demo & Tests Locally

```bash
# Install dependencies
npm install

# Start the interactive verification demo (with real-time DOM live-region inspector)
npm run start

# Run the unit test suite (Vitest + JSDOM)
npm test

# Build ESM + CommonJS bundles into dist/
npm run build
```

---

## License

MIT · Original author: **Almero Steyn** · VoiceOver compatibility & modernization: **Diego Javier Mena Amado** (`@ingelectronicadj`).
