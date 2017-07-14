import PropTypes from 'prop-types';
import React from 'react';
import offScreenStyle from './offScreenStyle';

const AssertiveMessage = ({ message }) =>
  <div
    style={offScreenStyle}
    role="log"
    aria-live="assertive"
    aria-relevant="additions"
    aria-atomic="true">
    {message ? message : ''}
  </div>;

AssertiveMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AssertiveMessage;
