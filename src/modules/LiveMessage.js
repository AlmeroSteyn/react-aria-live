import PropTypes from 'prop-types';
import { Component } from 'react';

class LiveMessage extends Component {
  static contextTypes = {
    announcePolite: PropTypes.func.isRequired,
    announceAssertive: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.announce = this.announce.bind(this);
  }

  componentDidMount() {
    this.announce();
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (message !== prevProps.message) {
      this.announce();
    }
  }

  announce() {
    const { message, 'aria-live': ariaLive } = this.props;
    if (message) {
      if (ariaLive === 'assertive') {
        this.context.announceAssertive(message);
      }
      if (ariaLive === 'polite') {
        this.context.announcePolite(message);
      }
    }
  }

  render() {
    return null;
  }
}

export default LiveMessage;
