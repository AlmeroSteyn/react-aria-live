import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MessageBlock from '../MessageBlock';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('MessageBlock', () => {
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

  it('should render polite region with role="status", aria-atomic="true" and aria-relevant="additions text" for VoiceOver + NVDA', () => {
    act(() => {
      root.render(<MessageBlock aria-live="polite" message="Test message" />);
    });

    const div = container.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.getAttribute('aria-live')).toBe('polite');
    expect(div.getAttribute('role')).toBe('status');
    expect(div.getAttribute('aria-atomic')).toBe('true');
    expect(div.getAttribute('aria-relevant')).toBe('additions text');
    expect(div.textContent).toBe('Test message');
  });

  it('should render assertive region with role="alert" and empty text when message is empty', () => {
    act(() => {
      root.render(<MessageBlock aria-live="assertive" message="" />);
    });

    const div = container.querySelector('div');
    expect(div.getAttribute('aria-live')).toBe('assertive');
    expect(div.getAttribute('role')).toBe('alert');
    expect(div.getAttribute('aria-atomic')).toBe('true');
    expect(div.textContent).toBe('');
  });
});
