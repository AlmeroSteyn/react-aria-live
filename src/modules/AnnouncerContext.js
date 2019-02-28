import React from 'react';

const AnnouncerContext = React.createContext({
    announceAssertive: logContextWarning,
    announcePolite: logContextWarning,
});

function logContextWarning() {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Announcement failed, LiveAnnouncer is missing from the component tree');
    }
}

export default AnnouncerContext;
