import PropTypes from 'prop-types';
import React from 'react';
import offScreenStyle from './offScreenStyle';

const PoliteMessage = ({ message }) =>
  <div
    style={offScreenStyle}
    role="log"
    aria-live="polite"
    aria-relevant="additions"
    aria-atomic="true">
    {message ? message : ''}
  </div>;

PoliteMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default PoliteMessage;
