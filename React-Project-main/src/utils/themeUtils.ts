// src/utils/themeUtils.ts

// Typography configuration
export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    serif: ["Georgia", "serif"],
    mono: ["Monaco", "monospace"],
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeight: {
    thin: "100",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
};

// Spacing scale
export const spacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
};

// Border radius values
export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

// Box shadow presets
export const boxShadow = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
};

// Animation durations
export const transitionDuration = {
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
};

// Z-index scale
export const zIndex = {
  auto: "auto",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
};

// Responsive breakpoints
export const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Helper functions
export const getSpacing = (size: string | number): string => {
  if (typeof size === "number") return `${size * 0.25}rem`;
  return spacing[size as keyof typeof spacing] || size.toString();
};

export const getShadow = (size: keyof typeof boxShadow): string => {
  return boxShadow[size] || boxShadow.default;
};

export const getFontSize = (size: keyof typeof typography.fontSize): string => {
  return typography.fontSize[size] || typography.fontSize.base;
};

export const getBorderRadius = (size: keyof typeof borderRadius): string => {
  return borderRadius[size] || borderRadius.default;
};

export const getTransitionDuration = (
  duration: keyof typeof transitionDuration,
): string => {
  return transitionDuration[duration] || transitionDuration[300];
};

// CSS class helpers
export const createAnimationClass = (
  animation: string,
  duration: string = "0.3s",
): string => {
  return `transition-all duration-${duration} ease-in-out ${animation}`;
};

export const createShadowClass = (
  shadowType: keyof typeof boxShadow,
): string => {
  return `shadow-${shadowType}`;
};

export default {
  typography,
  spacing,
  borderRadius,
  boxShadow,
  transitionDuration,
  zIndex,
  screens,
  getSpacing,
  getShadow,
  getFontSize,
  getBorderRadius,
  getTransitionDuration,
  createAnimationClass,
  createShadowClass,
};
