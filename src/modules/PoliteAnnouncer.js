import PropTypes from 'prop-types';
import React from 'react';
import A11yAnnounceHOC from './AnnouncerHOC';
import PoliteMessage from './PoliteMessage';

const PoliteAnnouncer = ({ message1, message2 }) =>
  <div>
    <PoliteMessage message={message1 ? message1 : ''} />
    <PoliteMessage message={message2 ? message2 : ''} />
  </div>;

PoliteAnnouncer.propTypes = {
  message1: PropTypes.string,
  message2: PropTypes.string,
};

export default A11yAnnounceHOC(PoliteAnnouncer);
