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

  it('should broadcast clearall message if clearOnUmount is set to true', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(
      <LiveMessage message="" aria-live="polite" clearOnUnmount={true} />,
      {
        context,
      }
    );

    wrapper.unmount();

    expect(context.announceAssertive).toHaveBeenCalledWith('');
    expect(context.announcePolite).toHaveBeenCalledWith('');
  });

  it('should broadcast clearall message if clearOnUmount is set to "true"', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(
      <LiveMessage message="" aria-live="polite" clearOnUnmount="true" />,
      {
        context,
      }
    );

    wrapper.unmount();

    expect(context.announceAssertive).toHaveBeenCalledWith('');
    expect(context.announcePolite).toHaveBeenCalledWith('');
  });

  it('should broadcast not clearall message if clearOnUmount is set to "false"', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(
      <LiveMessage message="Demo" aria-live="polite" clearOnUnmount="false" />,
      {
        context,
      }
    );

    wrapper.unmount();

    expect(context.announceAssertive).not.toHaveBeenCalledWith('');
    expect(context.announcePolite).not.toHaveBeenCalledWith('');
  });

  it('should broadcast not clearall message if clearOnUmount is set to false', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(
      <LiveMessage message="Demo" aria-live="polite" clearOnUnmount={false} />,
      {
        context,
      }
    );

    wrapper.unmount();

    expect(context.announceAssertive).not.toHaveBeenCalledWith('');
    expect(context.announcePolite).not.toHaveBeenCalledWith('');
  });

  it('should broadcast not clearall message if clearOnUmount is omitted', () => {
    const context = {
      announcePolite: jest.fn(),
      announceAssertive: jest.fn(),
    };

    const wrapper = mount(<LiveMessage message="Demo" aria-live="polite" />, {
      context,
    });

    wrapper.unmount();

    expect(context.announceAssertive).not.toHaveBeenCalledWith('');
    expect(context.announcePolite).not.toHaveBeenCalledWith('');
  });
});
