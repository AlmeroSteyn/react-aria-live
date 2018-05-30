import React from 'react';
import { mount } from 'enzyme';
import LiveMessenger from '../LiveMessenger';
import LiveAnnouncer from '../LiveAnnouncer';

describe('LiveMessage', () => {
  it('should announce assertive messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessenger>
          {({ announceAssertive }) => (
            <button
              onClick={() => {
                announceAssertive('Demo message');
              }}
            />
          )}
        </LiveMessenger>
      </LiveAnnouncer>
    );

    wrapper.find('button').simulate('click');

    expect(
      wrapper
        .find('MessageBlock')
        .at(0)
        .text()
    ).toBe('Demo message');
    expect(
      wrapper
        .find('MessageBlock')
        .at(1)
        .text()
    ).toBe('');
    expect(
      wrapper
        .find('MessageBlock')
        .at(2)
        .text()
    ).toBe('');
    expect(
      wrapper
        .find('MessageBlock')
        .at(3)
        .text()
    ).toBe('');
  });

  it('should announce polite messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessenger>
          {({ announcePolite }) => (
            <button
              onClick={() => {
                announcePolite('Demo message');
              }}
            />
          )}
        </LiveMessenger>
      </LiveAnnouncer>
    );

    wrapper.find('button').simulate('click');

    expect(
      wrapper
        .find('MessageBlock')
        .at(0)
        .text()
    ).toBe('');
    expect(
      wrapper
        .find('MessageBlock')
        .at(1)
        .text()
    ).toBe('');
    expect(
      wrapper
        .find('MessageBlock')
        .at(2)
        .text()
    ).toBe('Demo message');
    expect(
      wrapper
        .find('MessageBlock')
        .at(3)
        .text()
    ).toBe('');
  });
});
