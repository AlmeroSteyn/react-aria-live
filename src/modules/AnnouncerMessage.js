import PropTypes from 'prop-types';
import { Component } from 'react';

function generateId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class AnnouncerMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    'aria-live': PropTypes.string.isRequired,
    clearOnUnmount: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['true', 'false']),
    ]),
    announceAssertive: PropTypes.func,
    announcePolite: PropTypes.func,
  };

  componentDidMount() {
    this.announce();
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (message !== prevProps.message) {
      this.announce();
    }
  }

  componentWillUnmount() {
    const { clearOnUnmount, announceAssertive, announcePolite } = this.props;
    if (clearOnUnmount === true || clearOnUnmount === 'true') {
      announceAssertive('');
      announcePolite('');
    }
  }

  announce = () => {
    const {
      message,
      'aria-live': ariaLive,
      announceAssertive,
      announcePolite,
    } = this.props;
    if (ariaLive === 'assertive') {
      announceAssertive(message || '', generateId());
    }
    if (ariaLive === 'polite') {
      announcePolite(message || '', generateId());
    }
  };

  render() {
    return null;
  }
}

export default AnnouncerMessage;
