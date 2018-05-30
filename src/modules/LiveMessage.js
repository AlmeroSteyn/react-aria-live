import React from 'react';
import PropTypes from 'prop-types';
import AnnouncerContext from './AnnouncerContext';
import AnnouncerMessage from './AnnouncerMessage';

const LiveMessage = props => (
  <AnnouncerContext.Consumer>
    {contextProps => <AnnouncerMessage {...contextProps} {...props} />}
  </AnnouncerContext.Consumer>
);

LiveMessage.propTypes = {
  message: PropTypes.string.isRequired,
  'aria-live': PropTypes.string.isRequired,
  clearOnUnmount: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['true', 'false']),
  ]),
};

export default LiveMessage;
