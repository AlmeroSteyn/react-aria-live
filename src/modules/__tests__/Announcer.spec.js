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
    const wrapper = mount(
      <Announcer
        assertiveMessage="I am a message"
        politeMessage=""
        assertiveMessageId=""
        politeMessageId=""
      />
    );

    expect(wrapper.state().assertiveMessage1).toBe('I am a message');
    expect(wrapper.state().assertiveMessage2).toBe('');

    expect(wrapper.find('MessageBlock').get(0).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(1).props.message).toBe('');

    wrapper.setProps({ assertiveMessage: 'I am a changed message' });

    expect(wrapper.state().assertiveMessage1).toBe('');
    expect(wrapper.state().assertiveMessage2).toBe('I am a changed message');

    expect(wrapper.find('MessageBlock').get(0).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(1).props.message).toEqual(
      'I am a changed message'
    );
  });

  it('should alternate polite messages', () => {
    const wrapper = mount(
      <Announcer
        assertiveMessage=""
        politeMessage="I am a message"
        assertiveMessageId=""
        politeMessageId=""
      />
    );

    expect(wrapper.state().politeMessage1).toBe('I am a message');
    expect(wrapper.state().politeMessage2).toBe('');

    expect(wrapper.find('MessageBlock').get(2).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(3).props.message).toBe('');

    wrapper.setProps({ politeMessage: 'I am a changed message' });

    expect(wrapper.state().politeMessage1).toBe('');
    expect(wrapper.state().politeMessage2).toBe('I am a changed message');

    expect(wrapper.find('MessageBlock').get(2).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(3).props.message).toEqual(
      'I am a changed message'
    );
  });
});
