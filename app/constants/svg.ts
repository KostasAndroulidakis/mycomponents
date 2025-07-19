/**
 * SVG-related constants following SSOT principle
 * Centralizes all SVG attributes, paths, and related values
 */

export const SVG_CONSTANTS = {
  // ViewBox definitions for different icon sizes
  VIEWBOX_20X20: "0 0 20 20",
  VIEWBOX_24X24: "0 0 24 24",
  
  // SVG rendering rules
  FILL_RULE_EVEN_ODD: "evenodd",
  CLIP_RULE_EVEN_ODD: "evenodd",
  FILL_RULE_NON_ZERO: "nonzero",
  CLIP_RULE_NON_ZERO: "nonzero",
  
  // Fill and stroke values
  FILL_CURRENT_COLOR: "currentColor",
  FILL_NONE: "none",
  STROKE_CURRENT_COLOR: "currentColor",
  
  // Icon path data - organized by icon type
  PATHS: {
    // Checkmark icon path for filter selection
    CHECKMARK: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    
    // Close/X icon path (for future use)
    CLOSE: "M6 18L18 6M6 6l12 12",
    
    // Search icon path (reference for consistency)
    SEARCH: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  
  // ARIA attributes for accessibility
  ARIA: {
    HIDDEN: "true",
    ROLE_IMG: "img",
    ROLE_PRESENTATION: "presentation",
  },
} as const;

/**
 * Type definitions for SVG constants
 */
export type SVGViewBox = typeof SVG_CONSTANTS.VIEWBOX_20X20 | typeof SVG_CONSTANTS.VIEWBOX_24X24;
export type SVGFillRule = typeof SVG_CONSTANTS.FILL_RULE_EVEN_ODD | typeof SVG_CONSTANTS.FILL_RULE_NON_ZERO;
export type SVGClipRule = typeof SVG_CONSTANTS.CLIP_RULE_EVEN_ODD | typeof SVG_CONSTANTS.CLIP_RULE_NON_ZERO;
export type SVGIconPath = keyof typeof SVG_CONSTANTS.PATHS;

/**
 * Common SVG element configurations
 */
export const SVG_CONFIGS = {
  // Standard checkmark icon configuration
  CHECKMARK_ICON: {
    viewBox: SVG_CONSTANTS.VIEWBOX_20X20,
    fill: SVG_CONSTANTS.FILL_CURRENT_COLOR,
    fillRule: SVG_CONSTANTS.FILL_RULE_EVEN_ODD,
    clipRule: SVG_CONSTANTS.CLIP_RULE_EVEN_ODD,
    path: SVG_CONSTANTS.PATHS.CHECKMARK,
  },
  
  // Standard close icon configuration
  CLOSE_ICON: {
    viewBox: SVG_CONSTANTS.VIEWBOX_24X24,
    fill: SVG_CONSTANTS.FILL_NONE,
    stroke: SVG_CONSTANTS.STROKE_CURRENT_COLOR,
    strokeWidth: "2",
    path: SVG_CONSTANTS.PATHS.CLOSE,
  },
} as const;