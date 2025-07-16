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
  
  // Text styles
  LABEL_TEXT_SEMIBOLD: "text-xs font-semibold",
  LABEL_TEXT_MEDIUM: "text-xs font-medium",
  
  // Visual effects
  TRANSITION_COLORS: "transition-colors duration-150",
  SHADOW_SM: "shadow-sm",
  
  // Border patterns
  BORDER_LIGHT: "border-mouser-border-light",
  
  // Background patterns
  BG_LIGHT: "bg-mouser-bg-light",
  
  // Container patterns
  CONTAINER_CARD: "bg-white rounded-lg shadow-sm border border-mouser-border-light",
} as const;

export type DimensionKey = keyof typeof DIMENSIONS;
export type DimensionValue = typeof DIMENSIONS[DimensionKey];