import React from 'react';
import { mount } from 'enzyme';
import LiveMessage from '../LiveMessage';

describe('LiveMessage', () => {
  it('should announce assertive messages on mount', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    mount(<LiveMessage message="Demo message" aria-live="assertive" />, {
      context,
    });

    expect(context.announcePolite).not.toHaveBeenCalled();
    expect(context.announceAssertive).toHaveBeenCalledWith('Demo message');
  });

  it('should announce assertive messages on update', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(<LiveMessage message="" aria-live="assertive" />, {
      context,
    });

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(context.announcePolite).not.toHaveBeenCalled();
    expect(context.announceAssertive).toHaveBeenCalledWith(
      'Demo message changed'
    );
  });

  it('should announce polite messages on mount', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    mount(<LiveMessage message="Demo message" aria-live="polite" />, {
      context,
    });

    expect(context.announceAssertive).not.toHaveBeenCalled();
    expect(context.announcePolite).toHaveBeenCalledWith('Demo message');
  });

  it('should announce polite messages on update', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(<LiveMessage message="" aria-live="polite" />, {
      context,
    });

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(context.announceAssertive).not.toHaveBeenCalled();
    expect(context.announcePolite).toHaveBeenCalledWith('Demo message changed');
  });
});
