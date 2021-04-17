// https://stackoverflow.com/a/56267719/2829540
import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
