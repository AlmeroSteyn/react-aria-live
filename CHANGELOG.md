## 3.0.1

- **Hide empty live regions from screen reader swipe navigation (`MessageBlock.js`)**: Added `aria-hidden="true"` whenever a `MessageBlock` has no message, so the four `role="status"` / `role="alert"` nodes are fully removed from the TalkBack and VoiceOver linear swipe order while idle (empty live regions previously sat in the accessibility tree and could surface as ghost "status" / "estado" stops on mobile). The attribute is dropped as soon as a message is broadcast, so announcements are unaffected.

## 3.0.0

### Screen Reader & VoiceOver Compatibility (macOS / iOS / Windows / Android)
- **Fixed VoiceOver silent announcements (`MessageBlock.js`)**: Replaced hardcoded `role="log"` (which carries implicit `aria-atomic="false"` and `aria-live="polite"` in WebKit's `AXLiveRegion` mapping) with `role="status"` for `polite` regions and `role="alert"` for `assertive` regions, and added explicit `aria-atomic="true"` and `aria-relevant="additions text"` (resolves `#37`).
- **Fixed on-mount announcements in VoiceOver (`LiveAnnouncer.js`)**: Added post-mount frame refresh so announcements triggered during initial mount (such as route transitions with `<LiveMessage />`) fire `AXLiveRegionChanged` after WebKit registers the empty live region container. Added optional `voiceOverDelay` prop.
- **Fixed `clearOnUnmount` simultaneous state update bug (`Announcer.js`)**: Updated `Announcer.getDerivedStateFromProps` so simultaneous updates to `politeMessage` and `assertiveMessage` are merged into a single state transition rather than returning early after `politeMessage` (resolves `#20`).
- **Removed extra wrapper `<div>` (`Announcer.js`)**: Replaced the outer `<div>` around the four `MessageBlock` nodes with `React.Fragment` to avoid breaking parent Flexbox/Grid layouts (resolves `#12`).
- **Updated visually-hidden styles (`MessageBlock.js`)**: Added standard comma-separated `clip: 'rect(0, 0, 0, 0)'` and `clipPath: 'inset(50%)'`.

### Developer Experience & Modernization
- **Added `useAnnouncer` / `useAriaLive` React Hook (`useAnnouncer.js`)**: Allows functional components to call `announcePolite(message, id)` and `announceAssertive(message, id)` directly (implements `#25`).
- **Added TypeScript definitions (`index.d.ts`)**: Bundled full type declarations for all components and hooks (resolves `#14`).
- **React 17, 18 & 19 Support (`package.json`)**: Updated `peerDependencies.react` to `">=16.3.0"` (resolves `#35`).
- **Removed external `uuid` dependency (`AnnouncerMessage.js`)**: Uses native `crypto.randomUUID()` with an RFC4122 v4 fallback.
- **Modernized build & test suite**: Migrated from deprecated `nwb` / Babel 6 / Enzyme to Vite (dual ESM + CJS output, `< 2 kB` gzipped) and Vitest + React 18 DOM testing, plus an interactive verification demo with a real-time DOM live-region inspector.

## 2.0.5
- Fixed bug in Announcer state comparison logic.

## 2.0.3
- Fixed babel build output for ES modules.

## 2.0.0
- Updated to React 16.3 context API.
