/**
 * UI dimension constants
 * Following SSOT principle - all dimensions and layout values defined in one place
 */

export const DIMENSIONS = {
  // Header dimensions
  HEADER_HEIGHT: "h-16",
  
  // Filter panel dimensions
  FILTER_PANEL_MAX_HEIGHT: "max-h-48",
  
  // Image dimensions
  COMPONENT_IMAGE_CONTAINER: "w-10 h-10",
  COMPONENT_IMAGE_SIZE: "w-8 h-8",
  
  // Icon dimensions
  LOGO_SIZE: "w-8 h-8",
  CLOSE_BUTTON_SIZE: "w-3 h-3",
  SEARCH_ICON_SIZE: "h-5 w-5",
  CHECK_ICON_SIZE: "w-3 h-3",
  
  // Spacing
  MAIN_PADDING: "px-4 sm:px-6 lg:px-8",
  SECTION_SPACING: "space-y-8",
  CONTENT_PADDING: "py-8",
  
  // Component spacing
  FILTER_GRID_GAPS: "gap-4",
  BADGE_GAPS: "gap-2",
  HEADER_GAPS: "gap-8",
  
  // Common padding patterns
  CELL_PADDING: "px-3 py-2",
  HEADER_PADDING: "px-4 py-3",
  BADGE_PADDING: "px-2 py-1",
  SECTION_PADDING: "px-3 py-4",
  BUTTON_PADDING: "px-3 py-1",
  FILTER_CONTENT_PADDING: "p-4",
  
  // Text styles
  LABEL_TEXT_SEMIBOLD: "text-xs font-semibold",
  LABEL_TEXT_MEDIUM: "text-xs font-medium",
  
  // Visual effects
  TRANSITION_COLORS: "transition-colors duration-150",
  SHADOW_SM: "shadow-sm",
  
  // Focus states
  FOCUS_RING: "focus:outline-none focus:ring-2 focus:ring-mouser-primary focus:border-mouser-primary",
  FOCUS_RING_LIGHT: "focus:outline-none focus:ring-2 focus:ring-mouser-primary-light focus:border-mouser-primary-light",
  
  // Border patterns
  BORDER: "border",
  BORDER_B: "border-b",
  BORDER_LIGHT: "border-mouser-border-light",
  BORDER_MEDIUM: "border-mouser-border-medium",
  
  // Background patterns
  BG_LIGHT: "bg-mouser-bg-light",
  BG_WHITE: "bg-mouser-bg-white",
  
  // Container patterns
  CONTAINER_CARD: "bg-mouser-bg-white rounded-lg shadow-sm border border-mouser-border-light",
  
  // Layout patterns
  FLEX_BETWEEN: "flex items-center justify-between",
  FLEX_CENTER: "flex items-center justify-center",
  FLEX_ITEMS_CENTER: "flex items-center",
  FLEX_WRAP: "flex flex-wrap",
  INLINE_FLEX_ITEMS: "inline-flex items-center",
  
  // Grid patterns
  GRID_RESPONSIVE_4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  
  // Spacing utilities
  ML_1: "ml-1",
  ML_2: "ml-2",
  MT_2: "mt-2",
  GAP_3: "gap-3",
  PL_3: "pl-3",
  PL_10: "pl-10",
  PR_3: "pr-3",
  PY_2: "py-2",
  PY_8: "py-8",
  PX_2_PY_05: "px-2 py-0.5",
  SPACE_X_2: "space-x-2",
  
  // Border radius
  ROUNDED: "rounded",
  ROUNDED_LG: "rounded-lg",
  
  // Typography
  TEXT_XS: "text-xs",
  TEXT_SM: "text-sm",
  TEXT_XL: "text-xl",
  FONT_MEDIUM: "font-medium",
  FONT_SEMIBOLD: "font-semibold",
  FONT_BOLD: "font-bold",
  LEADING_5: "leading-5",
  UPPERCASE_TRACKED: "uppercase tracking-wide",
  
  // Layout utilities
  RELATIVE: "relative",
  BLOCK_W_FULL: "block w-full",
  ABSOLUTE_ICON_LEFT: "absolute inset-y-0 left-0",
  POINTER_EVENTS_NONE: "pointer-events-none",
  OVERFLOW_HIDDEN: "overflow-hidden",
  OVERFLOW_X_AUTO: "overflow-x-auto",
  OVERFLOW_Y_AUTO: "overflow-y-auto",
  MIN_W_FULL: "min-w-full",
  MIN_H_SCREEN: "min-h-screen",
  W_FULL: "w-full",
  W_FULL_TEXT_LEFT: "w-full text-left",
  TEXT_CENTER: "text-center",
  WHITESPACE_NOWRAP: "whitespace-nowrap",
  MAX_W_XS: "max-w-xs",
  OBJECT_COVER: "object-cover",
  DIVIDE_Y: "divide-y",
  FLEX_SHRINK_0: "flex-shrink-0",
  FLEX_1: "flex-1",
  TRUNCATE: "truncate",
  
  // Transitions
  SEARCH_TRANSITION: "transition duration-150 ease-in-out",
  BRAND_TRANSITION: "transition-colors duration-200",
  
  // Hover states
  HOVER_BG_GRAY: "hover:bg-mouser-hover-gray",
  
  // Table styles
  TABLE_HEADER_CELL: "px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary",
  TABLE_CELL_BASE: "px-3 py-2 whitespace-nowrap",
  TABLE_CELL_PRIMARY: "px-3 py-2 whitespace-nowrap text-xs text-mouser-text-primary font-medium",
  TABLE_CELL_SECONDARY: "px-3 py-2 whitespace-nowrap text-xs text-mouser-text-tertiary",
  TABLE_CELL_DESCRIPTION: "px-3 py-2 text-xs text-mouser-text-primary max-w-xs",
  TABLE_CELL_QUANTITY: "px-3 py-2 whitespace-nowrap text-xs font-medium text-mouser-success",
  TABLE_CONTAINER: "min-w-full divide-y divide-mouser-border-light",
} as const;

export type DimensionKey = keyof typeof DIMENSIONS;
export type DimensionValue = typeof DIMENSIONS[DimensionKey];