import { useEffect, useState } from 'react';

export function useIsDev() {
  const [isDev, setIsDev] = useState<boolean>(false);

  useEffect(() => {
    window.api.isDev().then((isDev: boolean) => {
      setIsDev(isDev);
    });
  }, []);

  return isDev;
}
