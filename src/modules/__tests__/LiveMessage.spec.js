import React from 'react';
import { mount } from 'enzyme';
import LiveMessage from '../LiveMessage';
import LiveAnnouncer from '../LiveAnnouncer';

describe('LiveMessage', () => {
  it('should announce assertive messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessage message="Demo message" aria-live="assertive" />
      </LiveAnnouncer>
    );

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

  it('should fail gracefully for assertive messages without LiveAnnouncer', () => {
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    expect(() =>
      mount(<LiveMessage message="Demo message" aria-live="assertive" />)
    ).not.toThrow();

    expect(warn).toHaveBeenCalled();
  });

  it('should announce polite messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <LiveMessage message="Demo message" aria-live="polite" />
      </LiveAnnouncer>
    );

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

  it('should fail gracefully for polite messages without LiveAnnouncer', () => {
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    expect(() =>
      mount(<LiveMessage message="Demo message" aria-live="polite" />)
    ).not.toThrow();

    expect(warn).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
