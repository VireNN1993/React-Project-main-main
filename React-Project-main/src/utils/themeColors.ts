// src/utils/themeColors.ts
export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

// Beautiful gradient combinations
export const gradients = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  sunset: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
  ocean: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
  forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  royal: "linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)",
  fire: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
  sky: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
};

// Helper function to get color with opacity
export const getColor = (colorPath: string, opacity = 1): string => {
  const keys = colorPath.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = colors;

  for (const key of keys) {
    value = value[key];
    if (!value) return "#000000";
  }

  if (opacity === 1) return value;

  // Convert hex to rgba
  const hex = value.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Get gradient by name
export const getGradient = (name: keyof typeof gradients): string => {
  return gradients[name] || gradients.primary;
};

export default colors;
