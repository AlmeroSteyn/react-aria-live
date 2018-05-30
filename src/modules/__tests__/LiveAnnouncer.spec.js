import React from 'react';
import { mount } from 'enzyme';
import LiveMessage from '../LiveMessage';
import LiveAnnouncer from '../LiveAnnouncer';

describe('LiveAnnouncer', () => {
  it('should set polite messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessage message="Demo message" aria-live="polite" />
      </LiveAnnouncer>
    );

    expect(wrapper.state().announceAssertiveMessage).toBe('');
    expect(wrapper.state().announcePoliteMessage).toBe('Demo message');
  });

  it('should set assertive messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessage message="Demo message" aria-live="assertive" />
      </LiveAnnouncer>
    );

    expect(wrapper.state().announceAssertiveMessage).toBe('Demo message');
    expect(wrapper.state().announcePoliteMessage).toBe('');
  });
});
