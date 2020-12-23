import React from 'react';
import { mount } from 'enzyme';
import LiveAnnouncer from '../LiveAnnouncer';
import useAriaLive from '../useAriaLive';

function AssertiveFC() {
  const { announceAssertive } = useAriaLive();
  return <button onClick={() => announceAssertive('Demo message')} />;
}

function PoliteFC() {
  const { announcePolite } = useAriaLive();
  return <button onClick={() => announcePolite('Demo message')} />;
}

function testContext() {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useAriaLive());
    return null;
  }
  mount(<TestComponent />);
  return returnVal;
}

describe('useAriaLive', () => {
  it('should announce assertive messages', () => {
    const wrapper = mount(
      <LiveAnnouncer>
        <AssertiveFC />
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
        <PoliteFC />
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

  it('should pass dummy functions without LiveAnnouncer', () => {
    const context = testContext();
    expect(context).toBeDefined();
    expect(context).toHaveProperty('announceAssertive');
    expect(typeof context.announceAssertive).toBe('function');
    expect(context).toHaveProperty('announcePolite');
    expect(typeof context.announcePolite).toBe('function');
  });
});
