import React from 'react';
import { mount } from 'enzyme';
import AnnouncerMessage from '../AnnouncerMessage';

describe('LiveMessage', () => {
  it('should announce assertive messages on mount', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="assertive"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(announceAssertiveSpy).toHaveBeenCalledWith('Demo message');
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

    expect(announceAssertiveSpy).toHaveBeenCalledWith('');
    expect(announcePoliteSpy).not.toHaveBeenCalled();
  });

  it('should announce assertive messages on update', () => {
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

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(announcePoliteSpy).not.toHaveBeenCalled();
    expect(announceAssertiveSpy).toHaveBeenCalledWith('Demo message changed');
  });

  it('should announce polite messages on mount', () => {
    const announceAssertiveSpy = jest.fn();
    const announcePoliteSpy = jest.fn();

    mount(
      <AnnouncerMessage
        message="Demo message"
        aria-live="polite"
        announceAssertive={announceAssertiveSpy}
        announcePolite={announcePoliteSpy}
      />
    );

    expect(announceAssertiveSpy).not.toHaveBeenCalled();
    expect(announcePoliteSpy).toHaveBeenCalledWith('Demo message');
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
    expect(announcePoliteSpy).toHaveBeenCalledWith('');
  });

  it('should announce polite messages on update', () => {
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

    wrapper.setProps({ message: 'Demo message changed' });

    wrapper.update();

    expect(announceAssertiveSpy).not.toHaveBeenCalled();
    expect(announcePoliteSpy).toHaveBeenCalledWith('Demo message changed');
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
