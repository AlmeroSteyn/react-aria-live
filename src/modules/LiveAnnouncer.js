import React, { Component } from 'react';
import Announcer from './Announcer';
import AnnouncerContext from './AnnouncerContext';

class LiveAnnouncer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcePoliteMessage: '',
      politeMessageId: '',
      announceAssertiveMessage: '',
      assertiveMessageId: '',
      updateFunctions: {
        announcePolite: this.announcePolite,
        announceAssertive: this.announceAssertive,
      },
    };
  }

  announcePolite = (message, id) => {
    this.setState({
      announcePoliteMessage: message,
      politeMessageId: id ? id : '',
    });
  };

  announceAssertive = (message, id) => {
    this.setState({
      announceAssertiveMessage: message,
      assertiveMessageId: id ? id : '',
    });
  };

  render() {
    const {
      announcePoliteMessage,
      politeMessageId,
      announceAssertiveMessage,
      assertiveMessageId,
      updateFunctions,
    } = this.state;
    return (
      <AnnouncerContext.Provider value={updateFunctions}>
        {this.props.children}
        <Announcer
          assertiveMessage={announceAssertiveMessage}
          assertiveMessageId={assertiveMessageId}
          politeMessage={announcePoliteMessage}
          politeMessageId={politeMessageId}
        />
      </AnnouncerContext.Provider>
    );
  }
}

export default LiveAnnouncer;
