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
    oldPoliteMessageId: '',
    oldAssertiveMessage: '',
    oldAssertiveMessageId: '',
    setAlternatePolite: false,
    setAlternateAssertive: false,
  };

  static propTypes = {
    politeMessage: PropTypes.string,
    assertiveMessage: PropTypes.string,
  };

  static getDerivedStateFromProps(nextProps, state) {
    const {
      oldPolitemessage,
      oldPoliteMessageId,
      oldAssertiveMessage,
      oldAssertiveMessageId,
    } = state;
    const {
      politeMessage,
      politeMessageId,
      assertiveMessage,
      assertiveMessageId,
    } = nextProps;

    if (
      oldPolitemessage !== politeMessage ||
      oldPoliteMessageId !== politeMessageId
    ) {
      return {
        politeMessage1: state.setAlternatePolite ? '' : politeMessage,
        politeMessage2: state.setAlternatePolite ? politeMessage : '',
        oldPolitemessage: politeMessage,
        oldPoliteMessageId: politeMessageId,
        setAlternatePolite: !state.setAlternatePolite,
      };
    }

    if (
      oldAssertiveMessage !== assertiveMessage ||
      oldAssertiveMessageId !== assertiveMessageId
    ) {
      return {
        assertiveMessage1: state.setAlternateAssertive ? '' : assertiveMessage,
        assertiveMessage2: state.setAlternateAssertive ? assertiveMessage : '',
        oldAssertiveMessage: assertiveMessage,
        oldAssertiveMessageId: assertiveMessageId,
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
      <React.Fragment>
        <MessageBlock aria-live="assertive" message={assertiveMessage1} />
        <MessageBlock aria-live="assertive" message={assertiveMessage2} />
        <MessageBlock aria-live="polite" message={politeMessage1} />
        <MessageBlock aria-live="polite" message={politeMessage2} />
      </React.Fragment>
    );
  }
}

export default Announcer;
