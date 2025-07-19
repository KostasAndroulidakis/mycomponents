/**
 * Additional styling constants not covered in dimensions.ts
 * Following SSOT principle for CSS class management
 */

export const STYLING = {
  /**
   * Placeholder styling classes
   */
  PLACEHOLDER: {
    DISABLED: "placeholder-mouser-text-disabled",
    FOCUS_TERTIARY: "focus:placeholder-mouser-text-tertiary",
  },

  /**
   * Icon size constants
   * Used for @heroicons/react imports
   */
  ICON_SIZES: {
    SMALL: "16",
    MEDIUM: "20",
    LARGE: "24",
  },
} as const;

export type StylingKey = keyof typeof STYLING;
export type StylingValue = typeof STYLING[StylingKey];