import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import LiveMessenger from '../LiveMessenger';
import LiveAnnouncer from '../LiveAnnouncer';
import { useAnnouncer } from '../useAnnouncer';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function HookConsumerButton() {
  const { announcePolite, announceAssertive } = useAnnouncer();
  return (
    <div>
      <button
        id="hook-polite"
        type="button"
        onClick={() => announcePolite('Polite from hook')}
      />
      <button
        id="hook-assertive"
        type="button"
        onClick={() => announceAssertive('Assertive from hook')}
      />
    </div>
  );
}

describe('LiveMessenger and useAnnouncer', () => {
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

  it('should announce assertive messages via LiveMessenger', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessenger>
            {({ announceAssertive }) => (
              <button
                type="button"
                onClick={() => {
                  announceAssertive('Demo message');
                }}
              />
            )}
          </LiveMessenger>
        </LiveAnnouncer>
      );
    });

    act(() => {
      container.querySelector('button').click();
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('Demo message');
    expect(blocks[1].textContent).toBe('');
    expect(blocks[2].textContent).toBe('');
    expect(blocks[3].textContent).toBe('');
  });

  it('should announce polite messages via LiveMessenger', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <LiveMessenger>
            {({ announcePolite }) => (
              <button
                type="button"
                onClick={() => {
                  announcePolite('Demo message');
                }}
              />
            )}
          </LiveMessenger>
        </LiveAnnouncer>
      );
    });

    act(() => {
      container.querySelector('button').click();
    });

    const blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('');
    expect(blocks[1].textContent).toBe('');
    expect(blocks[2].textContent).toBe('Demo message');
    expect(blocks[3].textContent).toBe('');
  });

  it('should announce polite and assertive messages via useAnnouncer hook', () => {
    act(() => {
      root.render(
        <LiveAnnouncer>
          <HookConsumerButton />
        </LiveAnnouncer>
      );
    });

    act(() => {
      container.querySelector('#hook-polite').click();
    });

    let blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[2].textContent).toBe('Polite from hook');

    act(() => {
      container.querySelector('#hook-assertive').click();
    });

    blocks = container.querySelectorAll('[aria-live]');
    expect(blocks[0].textContent).toBe('Assertive from hook');
  });

  it('should pass fallback functions without LiveAnnouncer', () => {
    act(() => {
      root.render(
        <LiveMessenger>
          {(context) => {
            expect(context).toBeDefined();
            expect(typeof context.announceAssertive).toBe('function');
            expect(typeof context.announcePolite).toBe('function');
            return null;
          }}
        </LiveMessenger>
      );
    });
  });
});
