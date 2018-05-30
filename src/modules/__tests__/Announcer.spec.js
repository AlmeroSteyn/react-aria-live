import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Announcer from '../Announcer';

describe('Announcer', () => {
  it('should render correctly via snapshot', () => {
    const wrapper = mount(<Announcer assertiveMessage="" politeMessage="" />);

    const tree = mountToJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should alternate assertive messages', () => {
    const wrapper = mount(<Announcer assertiveMessage="" politeMessage="" />);

    wrapper.setProps({ assertiveMessage: 'I am a message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: 'I am a message',
      assertiveMessage2: '',
      oldAssertiveMessage: 'I am a message',
      oldPolitemessage: '',
      politeMessage1: '',
      politeMessage2: '',
      setAlternateAssertive: true,
      setAlternatePolite: false,
    });
    expect(wrapper.find('MessageBlock').get(0).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(1).props.message).toBe('');

    wrapper.setProps({ assertiveMessage: 'I am a changed message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: 'I am a changed message',
      oldAssertiveMessage: 'I am a changed message',
      oldPolitemessage: '',
      politeMessage1: '',
      politeMessage2: '',
      setAlternateAssertive: false,
      setAlternatePolite: false,
    });
    expect(wrapper.find('MessageBlock').get(0).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(1).props.message).toEqual(
      'I am a changed message'
    );
  });

  it('should alternate polite messages', () => {
    const wrapper = mount(<Announcer assertiveMessage="" politeMessage="" />);

    wrapper.setProps({ politeMessage: 'I am a message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: '',
      oldAssertiveMessage: '',
      oldPolitemessage: 'I am a message',
      politeMessage1: 'I am a message',
      politeMessage2: '',
      setAlternateAssertive: false,
      setAlternatePolite: true,
    });
    expect(wrapper.find('MessageBlock').get(2).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(3).props.message).toBe('');

    wrapper.setProps({ politeMessage: 'I am a changed message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: '',
      oldAssertiveMessage: '',
      oldPolitemessage: 'I am a changed message',
      politeMessage1: '',
      politeMessage2: 'I am a changed message',
      setAlternateAssertive: false,
      setAlternatePolite: false,
    });
    expect(wrapper.find('MessageBlock').get(2).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(3).props.message).toEqual(
      'I am a changed message'
    );
  });
});
