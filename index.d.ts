import * as React from 'react';

export interface AnnouncerContextValue {
  announcePolite: (message: string, id?: string) => void;
  announceAssertive: (message: string, id?: string) => void;
}

export interface LiveAnnouncerProps {
  children?: React.ReactNode;
  voiceOverDelay?: number;
}

export class LiveAnnouncer extends React.Component<LiveAnnouncerProps> {}

export interface LiveMessageProps {
  message: string;
  'aria-live': 'polite' | 'assertive';
  clearOnUnmount?: boolean | 'true' | 'false';
}

export const LiveMessage: React.FC<LiveMessageProps>;

export interface LiveMessengerProps {
  children: (context: AnnouncerContextValue) => React.ReactNode;
}

export const LiveMessenger: React.FC<LiveMessengerProps>;

export function useAnnouncer(): AnnouncerContextValue;
export function useAriaLive(): AnnouncerContextValue;
