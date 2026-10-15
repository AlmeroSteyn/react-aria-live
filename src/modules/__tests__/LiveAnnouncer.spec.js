import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import LiveMessage from '../LiveMessage';
import LiveAnnouncer from '../LiveAnnouncer';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('LiveAnnouncer', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('should set polite messages in DOM live region', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessage message="Demo message" aria-live="polite" />
        </LiveAnnouncer>
      );
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('');
    expect(blocks[2].textContent).toBe('Demo message');
  });

  it('should set assertive messages in DOM live region', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessage message="Demo message" aria-live="assertive" />
        </LiveAnnouncer>
      );
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('Demo message');
    expect(blocks[2].textContent).toBe('');
  });

  it('should re-trigger initial mount announcement on next frame for VoiceOver AXLiveRegionChanged', async () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessage message="Initial route loaded" aria-live="polite" />
        </LiveAnnouncer>
      );
    });

    let blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[2].textContent).toBe('Initial route loaded');
    expect(blocks[3].textContent).toBe('');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });

    blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[2].textContent).toBe('');
    expect(blocks[3].textContent).toBe('Initial route loaded');
  });
});
