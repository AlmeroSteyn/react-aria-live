import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Announcer from '../Announcer';

describe('Announcer', () => {
  it('should render correctly via snapshot', () => {
    const wrapper = shallow(<Announcer assertiveMessage="" politeMessage="" />);

    const tree = shallowToJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should alternate assertive messages', () => {
    const wrapper = shallow(<Announcer assertiveMessage="" politeMessage="" />);

    wrapper.setProps({ assertiveMessage: 'I am a message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: 'I am a message',
      assertiveMessage2: '',
      politeMessage1: '',
      politeMessage2: '',
    });
    expect(wrapper.find('MessageBlock').get(0).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(1).props.message).toBe('');

    wrapper.setProps({ assertiveMessage: 'I am a changed message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: 'I am a changed message',
      politeMessage1: '',
      politeMessage2: '',
    });
    expect(wrapper.find('MessageBlock').get(0).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(1).props.message).toEqual(
      'I am a changed message'
    );
  });

  it('should alternate polite messages', () => {
    const wrapper = shallow(<Announcer assertiveMessage="" politeMessage="" />);

    wrapper.setProps({ politeMessage: 'I am a message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: '',
      politeMessage1: 'I am a message',
      politeMessage2: '',
    });
    expect(wrapper.find('MessageBlock').get(2).props.message).toBe(
      'I am a message'
    );
    expect(wrapper.find('MessageBlock').get(3).props.message).toBe('');

    wrapper.setProps({ politeMessage: 'I am a changed message' });

    expect(wrapper.state()).toEqual({
      assertiveMessage1: '',
      assertiveMessage2: '',
      politeMessage1: '',
      politeMessage2: 'I am a changed message',
    });
    expect(wrapper.find('MessageBlock').get(2).props.message).toEqual('');
    expect(wrapper.find('MessageBlock').get(3).props.message).toEqual(
      'I am a changed message'
    );
  });
});
