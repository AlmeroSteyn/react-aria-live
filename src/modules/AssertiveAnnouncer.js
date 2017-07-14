import PropTypes from 'prop-types';
import React from 'react';
import A11yAnnounceHOC from './AnnouncerHOC';
import AssertiveMessage from './AssertiveMessage';

const AssertiveAnnouncer = ({ message1, message2 }) =>
  <div>
    <AssertiveMessage message={message1 ? message1 : ''} />
    <AssertiveMessage message={message2 ? message2 : ''} />
  </div>;

AssertiveAnnouncer.propTypes = {
  message1: PropTypes.string,
  message2: PropTypes.string,
};

export default A11yAnnounceHOC(AssertiveAnnouncer);
