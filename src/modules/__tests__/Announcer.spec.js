import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Announcer from '../Announcer';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Announcer', () => {
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

  it('should render 4 live region blocks (2 assertive, 2 polite)', () => {
    act(() => {
      root.render(<Announcer assertiveMessage="" politeMessage="" />);
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks.length).toBe(4);
    expect(blocks[0].getAttribute('aria-live')).toBe('assertive');
    expect(blocks[1].getAttribute('aria-live')).toBe('assertive');
    expect(blocks[2].getAttribute('aria-live')).toBe('polite');
    expect(blocks[3].getAttribute('aria-live')).toBe('polite');
  });

  it('should alternate assertive messages between block 0 and block 1', () => {
    act(() => {
      root.render(
        <Announcer
          assertiveMessage="I am a message"
          politeMessage=""
          assertiveMessageId=""
          politeMessageId=""
        />
      );
    });

    let blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('I am a message');
    expect(blocks[1].textContent).toBe('');

    act(() => {
      root.render(
        <Announcer
          assertiveMessage="I am a changed message"
          politeMessage=""
          assertiveMessageId=""
          politeMessageId=""
        />
      );
    });

    blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('');
    expect(blocks[1].textContent).toBe('I am a changed message');
  });

  it('should alternate polite messages between block 2 and block 3', () => {
    act(() => {
      root.render(
        <Announcer
          assertiveMessage=""
          politeMessage="I am a message"
          assertiveMessageId=""
          politeMessageId=""
        />
      );
    });

    let blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[2].textContent).toBe('I am a message');
    expect(blocks[3].textContent).toBe('');

    act(() => {
      root.render(
        <Announcer
          assertiveMessage=""
          politeMessage="I am a changed message"
          assertiveMessageId=""
          politeMessageId=""
        />
      );
    });

    blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[2].textContent).toBe('');
    expect(blocks[3].textContent).toBe('I am a changed message');
  });
});
