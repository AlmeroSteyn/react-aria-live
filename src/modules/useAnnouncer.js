import { useContext } from 'react';
import AnnouncerContext from './AnnouncerContext';

export function useAnnouncer() {
  return useContext(AnnouncerContext);
}

export const useAriaLive = useAnnouncer;

export default useAnnouncer;
