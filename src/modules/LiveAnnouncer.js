import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Announcer from './Announcer';

class LiveAnnouncer extends Component {
  constructor(props) {
    super(props);

    this.announcePolite = this.announcePolite.bind(this);
    this.announceAssertive = this.announceAssertive.bind(this);
  }

  state = {
    announcePoliteMessage: '',
    announceAssertiveMessage: '',
  };

  static childContextTypes = {
    announcePolite: PropTypes.func.isRequired,
    announceAssertive: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      announcePolite: this.announcePolite,
      announceAssertive: this.announceAssertive,
    };
  }

  announcePolite(message) {
    this.setState({
      announcePoliteMessage: message,
    });
  }
  announceAssertive(message) {
    this.setState({
      announceAssertiveMessage: message,
    });
  }

  render() {
    const { announcePoliteMessage, announceAssertiveMessage } = this.state;
    return (
      <div>
        <Announcer
          assertiveMessage={announceAssertiveMessage}
          politeMessage={announcePoliteMessage}
        />
        {this.props.children}
      </div>
    );
  }
}

export default LiveAnnouncer;
