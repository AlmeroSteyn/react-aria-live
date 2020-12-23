import { useContext } from 'react';
import AnnouncerContext from '../modules/AnnouncerContext';

const useAriaLive = () => useContext(AnnouncerContext);
export default useAriaLive;
