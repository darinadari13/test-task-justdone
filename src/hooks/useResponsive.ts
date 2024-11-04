import { useState, useEffect } from 'react';

// Define an enum for screen types
export enum ScreenType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

// Define breakpoints for mobile, tablet, and desktop
const breakpoints = {
  mobile: 1024, // example for your mobile breakpoint
  tablet: 1280,
};

const useResponsive = (): ScreenType | null => {
  const [screenType, setScreenType] = useState<ScreenType | null>(null);

  const updateScreenType = () => {
    const width = window.innerWidth;
    if (width < breakpoints.mobile) {
      setScreenType(ScreenType.Mobile);
    } else if (width < breakpoints.tablet) {
      setScreenType(ScreenType.Tablet);
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
