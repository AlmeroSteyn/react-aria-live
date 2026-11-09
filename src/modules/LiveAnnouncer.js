import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Announcer from './Announcer';
import AnnouncerContext from './AnnouncerContext';

class LiveAnnouncer extends Component {
  static propTypes = {
    children: PropTypes.node,
    voiceOverDelay: PropTypes.number,
  };

  static defaultProps = {
    voiceOverDelay: 0,
  };

  constructor(props) {
    super(props);
    this.isRegionMounted = false;
    this.mountTimers = [];
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

  componentDidMount() {
    this.isRegionMounted = true;
  }

  componentWillUnmount() {
    this.isRegionMounted = false;
    this.mountTimers.forEach((t) => clearTimeout(t));
    this.mountTimers = [];
  }

  scheduleVoiceOverMountRefresh = (type, message, id) => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (!this.isRegionMounted) return;
      if (type === 'polite' && this.state.announcePoliteMessage === message) {
        this.setState({
          politeMessageId: `${id || 'init'}-vo`,
        });
      } else if (
        type === 'assertive' &&
        this.state.announceAssertiveMessage === message
      ) {
        this.setState({
          assertiveMessageId: `${id || 'init'}-vo`,
        });
      }
    }, 60);
    this.mountTimers.push(timer);
  };

  announcePolite = (message, id) => {
    const wasMounted = this.isRegionMounted;
    const delay = this.props.voiceOverDelay;
    if (delay > 0) {
      const timer = setTimeout(() => {
        if (!this.isRegionMounted) return;
        this.setState({
          announcePoliteMessage: message,
          politeMessageId: id ? id : '',
        });
      }, delay);
      this.mountTimers.push(timer);
      return;
    }
    this.setState({
      announcePoliteMessage: message,
      politeMessageId: id ? id : '',
    });
    if (!wasMounted && message) {
      this.scheduleVoiceOverMountRefresh('polite', message, id);
    }
  };

  announceAssertive = (message, id) => {
    const wasMounted = this.isRegionMounted;
    const delay = this.props.voiceOverDelay;
    if (delay > 0) {
      const timer = setTimeout(() => {
        if (!this.isRegionMounted) return;
        this.setState({
          announceAssertiveMessage: message,
          assertiveMessageId: id ? id : '',
        });
      }, delay);
      this.mountTimers.push(timer);
      return;
    }
    this.setState({
      announceAssertiveMessage: message,
      assertiveMessageId: id ? id : '',
    });
    if (!wasMounted && message) {
      this.scheduleVoiceOverMountRefresh('assertive', message, id);
    }
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
