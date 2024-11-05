import { useState, useEffect } from 'react';

import { ScreenType } from 'src/types/common';

const breakpoints = {
  mobile: 1024,
};

const useResponsive = (): ScreenType | null => {
  const [screenType, setScreenType] = useState<ScreenType | null>(null);

  const updateScreenType = () => {
    const width = window.innerWidth;
    if (width < breakpoints.mobile) {
      setScreenType(ScreenType.Mobile);
    } else {
      setScreenType(ScreenType.Desktop);
    }
  };

  useEffect(() => {
    updateScreenType();
    window.addEventListener('resize', updateScreenType);
    return () => window.removeEventListener('resize', updateScreenType);
  }, []);

  return screenType;
};

export default useResponsive;
