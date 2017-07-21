import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MessageBlock from '../MessageBlock';

describe('MessageBlock', () => {
  it('should render correctly via snapshot', () => {
    const wrapper = shallow(
      <MessageBlock aria-live="polite" message="Test message" />
    );

    const tree = shallowToJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly via snapshot for an empty message', () => {
    const wrapper = shallow(<MessageBlock aria-live="polite" message="" />);

    const tree = shallowToJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
