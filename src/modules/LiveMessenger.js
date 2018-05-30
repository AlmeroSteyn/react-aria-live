import React from 'react';
import PropTypes from 'prop-types';
import AnnouncerContext from './AnnouncerContext';

const LiveMessenger = ({ children }) => (
  <AnnouncerContext.Consumer>
    {contextProps => children(contextProps)}
  </AnnouncerContext.Consumer>
);

LiveMessenger.propTypes = {
  children: PropTypes.func.isRequired,
};

export default LiveMessenger;
