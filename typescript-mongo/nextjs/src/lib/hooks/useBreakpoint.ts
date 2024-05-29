import React from 'react';

export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl2: 1536,
} as const;

export const useBreakpoint = () => {
  // Tack window inner width
  const [innerWidth, setInnerWidth] = React.useState<number>(() => window.innerWidth);

  // Listen for window resize events
  React.useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setInnerWidth]);

  const isSm = React.useMemo(() => {
    return innerWidth < Breakpoints.sm;
  }, [innerWidth]);

  const isMd = React.useMemo(() => {
    return innerWidth >= Breakpoints.sm && innerWidth < Breakpoints.md;
  }, [innerWidth]);

  const isLg = React.useMemo(() => {
    return innerWidth >= Breakpoints.md && innerWidth < Breakpoints.lg;
  }, [innerWidth]);

  const isXl = React.useMemo(() => {
    return innerWidth >= Breakpoints.lg && innerWidth < Breakpoints.xl;
  }, [innerWidth]);

  const is2xl = React.useMemo(() => {
    return innerWidth >= Breakpoints.xl2;
  }, [innerWidth]);

  // And up variants

  const isSmAndUp = React.useMemo(() => {
    return innerWidth >= Breakpoints.sm;
  }, [innerWidth]);

  const isMdAndUp = React.useMemo(() => {
    return innerWidth >= Breakpoints.md;
  }, [innerWidth]);

  const isLgAndUp = React.useMemo(() => {
    return innerWidth >= Breakpoints.lg;
  }, [innerWidth]);

  const isXlAndUp = React.useMemo(() => {
    return innerWidth >= Breakpoints.xl;
  }, [innerWidth]);

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isSmAndUp,
    isMdAndUp,
    isLgAndUp,
    isXlAndUp,
  };
};
