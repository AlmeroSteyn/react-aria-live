import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageBlock from './MessageBlock';

class Announcer extends Component {
  state = {
    assertiveMessage1: '',
    assertiveMessage2: '',
    politeMessage1: '',
    politeMessage2: '',
  };

  setAlternatePolite = false;
  setAlternateAssertive = false;

  static propTypes = {
    politeMessage: PropTypes.string,
    assertiveMessage: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    const {
      politeMessage: oldPolitemessage,
      assertiveMessage: oldAssertiveMessage,
    } = this.props;
    const { politeMessage, assertiveMessage } = nextProps;

    if (oldPolitemessage !== politeMessage) {
      this.setState({
        politeMessage1: this.setAlternatePolite ? '' : politeMessage,
        politeMessage2: this.setAlternatePolite ? politeMessage : '',
      });
      this.setAlternatePolite = !this.setAlternatePolite;
    }

    if (oldAssertiveMessage !== assertiveMessage) {
      this.setState({
        assertiveMessage1: this.setAlternateAssertive ? '' : assertiveMessage,
        assertiveMessage2: this.setAlternateAssertive ? assertiveMessage : '',
      });
      this.setAlternateAssertive = !this.setAlternateAssertive;
    }
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
