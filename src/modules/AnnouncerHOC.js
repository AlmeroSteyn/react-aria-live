import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default InnerComponent =>
  class extends Component {
    state = {
      message1: '',
      message2: '',
    };

    setAlternate = false;

    static propTypes = {
      message: PropTypes.string.isRequired,
    };

    componentWillReceiveProps(nextProps) {
      const { message } = nextProps;
      if (message !== this.props.message) {
        if (this.setAlternate) {
          this.setAlternate = false;
          this.setState({ message1: '' }, () => {
            this.setState({
              message2: message,
            });
          });
        } else {
          this.setAlternate = true;
          this.setState({ message2: '' }, () => {
            this.setState({
              message1: message,
            });
          });
        }
      }
    }

    render() {
      const { message, ...restProps } = this.props;
      return (
        <InnerComponent
          message1={this.state.message1}
          message2={this.state.message2}
          {...restProps}
        />
      );
    }
  };
