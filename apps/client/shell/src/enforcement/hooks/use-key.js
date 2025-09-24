import { useRef, useEffect } from 'react';

export default function useKey(keyCode, cb, activeImageViewer) {
  const callBackRef = useRef(cb === null ? {} : cb);

  useEffect(() => {
    callBackRef.current = cb;
  });

  useEffect(() => {
    function handleKeyPress(e) {
      if (activeImageViewer && keyCode !== 'Enter') {
        return
      }
      if (e.key === keyCode) {
        callBackRef.current(e);
      }
    }
    window.addEventListener('keyup', handleKeyPress);
    return () => window.removeEventListener('keyup', handleKeyPress);
  }, [keyCode, activeImageViewer]);
}