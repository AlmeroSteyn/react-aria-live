import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AnnouncerMessage from '../AnnouncerMessage';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const guidRegex = /^(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}$/;

describe('AnnouncerMessage', () => {
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

  it('should announce assertive messages on mount', () => {
    let param1 = '';
    let param2 = '';

    const announceAssertiveSpy = vi.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announcePoliteSpy = vi.fn();

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="assertive"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    expect(param1).toBe('Demo message');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announceAssertiveSpy).toHaveBeenCalled();
    expect(announcePoliteSpy).not.toHaveBeenCalled();
  });

  it('should announce assertive messages on update', () => {
    let param1 = '';
    let param2 = '';

    const announceAssertiveSpy = vi.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announcePoliteSpy = vi.fn();

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="assertive"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message changed"
          aria-live="assertive"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    expect(param1).toBe('Demo message changed');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announcePoliteSpy).not.toHaveBeenCalled();
    expect(announceAssertiveSpy).toHaveBeenCalledTimes(2);
  });

  it('should announce polite messages on mount and update', () => {
    const announcePoliteSpy = vi.fn();
    const announceAssertiveSpy = vi.fn();

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="polite"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    expect(announcePoliteSpy).toHaveBeenCalledTimes(1);
    expect(announcePoliteSpy.mock.calls[0][0]).toBe('Demo message');

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Updated polite"
          aria-live="polite"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    expect(announcePoliteSpy).toHaveBeenCalledTimes(2);
    expect(announcePoliteSpy.mock.calls[1][0]).toBe('Updated polite');
  });

  it('should broadcast clearall message if clearOnUnmount is true or "true"', () => {
    const announceAssertiveSpy = vi.fn();
    const announcePoliteSpy = vi.fn();

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="polite"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
          clearOnUnmount={true}
        />
      );
    });

    act(() => {
      root.unmount();
    });

    expect(announceAssertiveSpy).toHaveBeenCalledWith('');
    expect(announcePoliteSpy).toHaveBeenCalledWith('');

    root = createRoot(container);
  });

  it('should not announce when the message prop has not changed', () => {
    const announceAssertiveSpy = vi.fn();
    const announcePoliteSpy = vi.fn();

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="assertive"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    act(() => {
      root.render(
        <AnnouncerMessage
          message="Demo message"
          aria-live="assertive"
          announceAssertive={announceAssertiveSpy}
          announcePolite={announcePoliteSpy}
        />
      );
    });

    expect(announceAssertiveSpy).toHaveBeenCalledTimes(1);
  });
});
