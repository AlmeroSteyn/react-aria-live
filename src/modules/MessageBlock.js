import PropTypes from 'prop-types';
import React from 'react';

const offScreenStyle = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  width: '1px',
  position: 'absolute',
};

const MessageBlock = ({ message, 'aria-live': ariaLive }) => (
  <div
    style={offScreenStyle}
    role="log"
    aria-live={ariaLive}
    aria-relevant="additions"
    aria-atomic="true">
    {message ? message : ''}
  </div>
);

MessageBlock.propTypes = {
  message: PropTypes.string.isRequired,
  'aria-live': PropTypes.string.isRequired,
};

export default MessageBlock;
