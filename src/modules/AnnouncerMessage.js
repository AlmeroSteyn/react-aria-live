import PropTypes from 'prop-types';
import { Component } from 'react';
import uuidv4 from 'uuid/v4';

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
      announceAssertive(message || '', uuidv4());
    }
    if (ariaLive === 'polite') {
      announcePolite(message || '', uuidv4());
    }
  };

  render() {
    return null;
  }
}

export default AnnouncerMessage;
