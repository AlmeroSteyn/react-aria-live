import React from 'react';
import { mount } from 'enzyme';
import AnnouncerMessage from '../AnnouncerMessage';

const guidRegex = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/;

describe('LiveMessage', () => {
  it('should announce assertive messages on mount', () => {
    let param1 = '';
    let param2 = '';

    const announceAssertiveSpy = jest.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announcePoliteSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="assertive"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(param1).toBe('Demo message');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announceAssertiveSpy).toHaveBeenCalled();
    expect(announcePoliteSpy).not.toHaveBeenCalled();
  });

  it('should mount successfully for an empty assertive message', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message={''}
        aria-live="assertive"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(announceAssertiveSpy).toHaveBeenCalled();
    expect(announcePoliteSpy).not.toHaveBeenCalled();
  });

  it('should announce assertive messages on update', () => {
    let param1 = '';
    let param2 = '';

    const announceAssertiveSpy = jest.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="assertive"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(param1).toBe('Demo message changed');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announcePoliteSpy).not.toHaveBeenCalled();
    expect(announceAssertiveSpy).toHaveBeenCalled();
  });

  it('should announce polite messages on mount', () => {
    let param1 = '';
    let param2 = '';

    const announcePoliteSpy = jest.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announceAssertiveSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(param1).toBe('Demo message');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announceAssertiveSpy).not.toHaveBeenCalled();
    expect(announcePoliteSpy).toHaveBeenCalled();
  });

  it('should mount successfully for an empty polite message', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message={''}
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(announceAssertiveSpy).not.toHaveBeenCalled();
    expect(announcePoliteSpy).toHaveBeenCalled();
  });

  it('should announce polite messages on update', () => {
    let param1 = '';
    let param2 = '';

    const announcePoliteSpy = jest.fn((message, id) => {
      param1 = message;
      param2 = id;
    });
    const announceAssertiveSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(param1).toBe('Demo message changed');
    expect(param2.match(guidRegex)).not.toBeNull();
    expect(announcePoliteSpy).toHaveBeenCalled();
    expect(announceAssertiveSpy).not.toHaveBeenCalled();
  });

  it('should broadcast clearall message if clearOnUmount is set to true', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
        clearOnUnmount={true}
      />
    );

    wrapper.unmount();

    expect(announceAssertiveSpy).toHaveBeenCalledWith('');
    expect(announcePoliteSpy).toHaveBeenCalledWith('');
  });

  it('should broadcast clearall message if clearOnUmount is set to "true"', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
        clearOnUnmount="true"
      />
    );

    wrapper.unmount();

    expect(announceAssertiveSpy).toHaveBeenCalledWith('');
    expect(announcePoliteSpy).toHaveBeenCalledWith('');
  });

  it('should not broadcast clearall message if clearOnUmount is set to "false"', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
        clearOnUnmount="false"
      />
    );

    wrapper.unmount();

    expect(announceAssertiveSpy).not.toHaveBeenCalledWith('');
    expect(announcePoliteSpy).not.toHaveBeenCalledWith('');
  });

  it('should not broadcast clearall message if clearOnUmount is set to false', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
        clearOnUnmount={false}
      />
    );

    wrapper.unmount();

    expect(announceAssertiveSpy).not.toHaveBeenCalledWith('');
    expect(announcePoliteSpy).not.toHaveBeenCalledWith('');
  });

  it('should not broadcast clearall message if clearOnUmount is omitted', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    wrapper.unmount();

    expect(announceAssertiveSpy).not.toHaveBeenCalledWith('');
    expect(announcePoliteSpy).not.toHaveBeenCalledWith('');
  });

  it('should not announce when the message prop has not changed', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    const wrapper = mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="assertive"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    wrapper.setProps({ message: 'Demo message' });

    wrapper.update();

    expect(announceAssertiveSpy.mock.calls.length).toBe(1);
  });
});
