/**
 * Mouser-inspired color palette constants
 * Following SSOT principle - all colors defined in one place
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    blue: '#004B87',
    darkBlue: '#003D6F',
    lightBlue: '#0066CC',
    orange: '#FF6900',
  },

  // Background Colors
  background: {
    white: '#FFFFFF',
    lightGray: '#F8F8F8',
    mediumGray: '#EEEEEE',
    darkGray: '#333333',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#4A4A4A',
    tertiary: '#757575',
    disabled: '#999999',
    white: '#FFFFFF',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#CCCCCC',
    dark: '#999999',
  },

  // Interactive States
  interactive: {
    hoverBlue: '#0052A3',
    activeBlue: '#002D5C',
    hoverGray: '#F0F0F0',
    focusBorder: '#0066CC',
  },

  // Status Colors
  status: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
  },

  // Component-specific colors
  components: {
    headerBg: '#004B87',
    filterBg: '#F8F8F8',
    tableBg: '#FFFFFF',
    tableHeaderBg: '#F5F5F5',
    badgeBg: '#E3F2FD',
    badgeText: '#1565C0',
  },
} as const;

// Type-safe color getter
export type ColorPath = keyof typeof colors |
  `${keyof typeof colors}.${string}`;

export const getColor = (path: ColorPath): string => {
  const keys = path.split('.');
  let value: typeof colors | string = colors;

  for (const key of keys) {
    if (typeof value === 'string') return '#000000'; // fallback
    const nextValue = (value as Record<string, unknown>)[key];
    if (!nextValue || typeof nextValue !== 'object' && typeof nextValue !== 'string') {
      return '#000000'; // fallback
    }
    value = nextValue as typeof colors | string;
  }

  return typeof value === 'string' ? value : '#000000';
};