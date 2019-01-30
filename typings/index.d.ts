import * as React from 'react'

export interface LiveAnnouncerContextProps {
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
}

export interface LiveMessageProps {
  message: string;
  ['aria-live']: string;
  clearOnUnmount?: boolean | "true" | "false";
}

export class LiveAnnouncer extends React.Component { }
export class LiveMessage extends React.Component<LiveMessageProps, {}> { }
export class LiveMessenger extends React.Component<React.ConsumerProps<LiveAnnouncerContextProps>> { }
