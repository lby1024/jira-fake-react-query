import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay = 300) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setV(value);
      clearTimeout(timer)
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return v;
};