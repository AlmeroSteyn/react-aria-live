import React from 'react';

const AnnouncerContext = React.createContext({
  announceAssertive: logContextWarning,
  announcePolite: logContextWarning,
});

function logContextWarning() {
  console.warn('Announcement failed, LiveAnnouncer context is missing');
}

export default AnnouncerContext;
