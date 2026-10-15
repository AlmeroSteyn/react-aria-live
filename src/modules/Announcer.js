import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
    politeMessageId: PropTypes.string,
    assertiveMessage: PropTypes.string,
    assertiveMessageId: PropTypes.string,
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

    let nextState = null;

    if (
      oldPolitemessage !== politeMessage ||
      oldPoliteMessageId !== politeMessageId
    ) {
      nextState = {
        ...(nextState || {}),
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
      nextState = {
        ...(nextState || {}),
        assertiveMessage1: state.setAlternateAssertive ? '' : assertiveMessage,
        assertiveMessage2: state.setAlternateAssertive ? assertiveMessage : '',
        oldAssertiveMessage: assertiveMessage,
        oldAssertiveMessageId: assertiveMessageId,
        setAlternateAssertive: !state.setAlternateAssertive,
      };
    }

    return nextState;
  }

  render() {
    const {
      assertiveMessage1,
      assertiveMessage2,
      politeMessage1,
      politeMessage2,
    } = this.state;
    return (
      <Fragment>
        <MessageBlock aria-live="assertive" message={assertiveMessage1} />
        <MessageBlock aria-live="assertive" message={assertiveMessage2} />
        <MessageBlock aria-live="polite" message={politeMessage1} />
        <MessageBlock aria-live="polite" message={politeMessage2} />
      </Fragment>
    );
  }
}

export default Announcer;
