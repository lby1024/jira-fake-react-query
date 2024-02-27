import { useEffect } from 'react';

export const useMounted = (cb: Function) => {

  useEffect(() => {
    const unmouted = cb()
    return unmouted
  }, []);
};
