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
} as const;

export type DimensionKey = keyof typeof DIMENSIONS;
export type DimensionValue = typeof DIMENSIONS[DimensionKey];