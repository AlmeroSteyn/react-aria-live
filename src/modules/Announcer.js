import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageBlock from './MessageBlock';

class Announcer extends Component {
  state = {
    assertiveMessage1: '',
    assertiveMessage2: '',
    politeMessage1: '',
    politeMessage2: '',
    oldPolitemessage: '',
    oldAssertiveMessage: '',
    setAlternatePolite: false,
    setAlternateAssertive: false,
  };

  static propTypes = {
    politeMessage: PropTypes.string,
    assertiveMessage: PropTypes.string,
  };

  static getDerivedStateFromProps(nextProps, state) {
    const { oldPolitemessage, oldAssertiveMessage } = state;
    const { politeMessage, assertiveMessage } = nextProps;

    if (oldPolitemessage !== politeMessage) {
      return {
        politeMessage1: state.setAlternatePolite ? '' : politeMessage,
        politeMessage2: state.setAlternatePolite ? politeMessage : '',
        oldPolitemessage: politeMessage,
        setAlternatePolite: !state.setAlternatePolite,
      };
    }

    if (oldAssertiveMessage !== assertiveMessage) {
      return {
        assertiveMessage1: state.setAlternateAssertive ? '' : assertiveMessage,
        assertiveMessage2: state.setAlternateAssertive ? assertiveMessage : '',
        oldAssertiveMessage: assertiveMessage,
        setAlternateAssertive: !state.setAlternateAssertive,
      };
    }

    return null;
  }

  render() {
    const {
      assertiveMessage1,
      assertiveMessage2,
      politeMessage1,
      politeMessage2,
    } = this.state;
    return (
      <div>
        <MessageBlock aria-live="assertive" message={assertiveMessage1} />
        <MessageBlock aria-live="assertive" message={assertiveMessage2} />
        <MessageBlock aria-live="polite" message={politeMessage1} />
        <MessageBlock aria-live="polite" message={politeMessage2} />
      </div>
    );
  }
}

export default Announcer;
