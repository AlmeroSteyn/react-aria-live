import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LiveMessage from '../LiveMessage';
import LiveAnnouncer from '../LiveAnnouncer';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('LiveMessage', () => {
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
    vi.restoreAllMocks();
  });

  it('should announce assertive messages', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessage message="Demo message" aria-live="assertive" />
        </LiveAnnouncer>
      );
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('Demo message');
    expect(blocks[1].textContent).toBe('');
    expect(blocks[2].textContent).toBe('');
    expect(blocks[3].textContent).toBe('');
  });

  it('should fail gracefully for assertive messages without LiveAnnouncer', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() => {
      act(() => {
        root.render(<LiveMessage message="Demo message" aria-live="assertive" />);
      });
    }).not.toThrow();

    expect(warn).toHaveBeenCalled();
  });

  it('should announce polite messages', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessage message="Demo message" aria-live="polite" />
        </LiveAnnouncer>
      );
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('');
    expect(blocks[1].textContent).toBe('');
    expect(blocks[2].textContent).toBe('Demo message');
    expect(blocks[3].textContent).toBe('');
  });

  it('should fail gracefully for polite messages without LiveAnnouncer', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(() => {
      act(() => {
        root.render(<LiveMessage message="Demo message" aria-live="polite" />);
      });
    }).not.toThrow();

    expect(warn).toHaveBeenCalled();
  });
});
