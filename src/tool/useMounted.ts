import { useEffect } from 'react';
import { isFunction } from 'swr/_internal';

export const useMounted = (cb: Function) => {

  useEffect(() => {
    const unmouted = cb()
    if (isFunction(unmouted)) {
      return unmouted
    }
  }, []);
};
