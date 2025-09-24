/* eslint-disable @typescript-eslint/no-this-alias */
import { useEffect, useState, useRef } from 'react';

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > element?.current?.getBoundingClientRect().bottom
        ? setSticky(true)
        : setSticky(false);
    };

    // This function handles the scroll performance issue
    const debounce = (func, wait = 20, immediate = true) => {
      let timeoutId;
      const debounced = (...args) => {
        const later = () => {
          timeoutId = null;
          if (!immediate) {
            func(...args);
          }
        };
        const callNow = immediate && !timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
        if (callNow) {
          func(...args);
        }
      };

      debounced.cancel = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      return debounced;
    };

    const debouncedHandleScroll = debounce(handleScroll);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      debouncedHandleScroll.cancel();
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return { isSticky, element };
}

export default useSticky;
