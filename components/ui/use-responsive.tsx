import { useEffect, useState } from "react";

const BREAKPOINTS = {
  SM: 0,
  MD: 600,
  LG: 960,
  XL: 1200
};

type ResponsiveStyles<T> = {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
} | T;

export const useResponsive = <T,>(styles: ResponsiveStyles<T>) => {
  const [responsiveStyles, setResponsiveStyles] = useState<T | undefined>();

  useEffect(() => {
    const getResponsive = (inputStyles: ResponsiveStyles<T>) => {
      let current;
      if (typeof inputStyles === "object" && inputStyles !== null) {
        const stylesObj = inputStyles as { sm?: T; md?: T; lg?: T; xl?: T };
        if (stylesObj.sm && window.innerWidth >= BREAKPOINTS.SM) {
          current = stylesObj.sm;
        }
        if (stylesObj.md && window.innerWidth >= BREAKPOINTS.MD) {
          current = stylesObj.md;
        }
        if (stylesObj.lg && window.innerWidth >= BREAKPOINTS.LG) {
          current = stylesObj.lg;
        }
        if (stylesObj.xl && window.innerWidth >= BREAKPOINTS.XL) {
          current = stylesObj.xl;
        }
      } else {
        current = inputStyles as T;
      }
      return current;
    };

    const listener = () => {
      setResponsiveStyles(getResponsive(styles));
    };

    listener();

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [styles]);

  return responsiveStyles;
};