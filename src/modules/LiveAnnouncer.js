import React, { Component } from 'react';
import Announcer from './Announcer';
import AnnouncerContext from './AnnouncerContext';

class LiveAnnouncer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcePoliteMessage: '',
      announceAssertiveMessage: '',
      updateFunctions: {
        announcePolite: this.announcePolite,
        announceAssertive: this.announceAssertive,
      },
    };
  }

  announcePolite = message => {
    this.setState({
      announcePoliteMessage: message,
    });
  };

  announceAssertive = message => {
    this.setState({
      announceAssertiveMessage: message,
    });
  };

  render() {
    const {
      announcePoliteMessage,
      announceAssertiveMessage,
      updateFunctions,
    } = this.state;
    return (
      <AnnouncerContext.Provider value={updateFunctions}>
        <Announcer
          assertiveMessage={announceAssertiveMessage}
          politeMessage={announcePoliteMessage}
        />
        {this.props.children}
      </AnnouncerContext.Provider>
    );
  }
}

export default LiveAnnouncer;
