/**
 * Application path constants
 * Following SSOT principle - all paths defined in one place
 */

export const PATHS = {
  // Data paths
  INVENTORY_CSV: "data/inventory.csv",
  COMPONENT_IMAGES: "/data/images/components/",
  
  // Static assets
  FAVICON: "/favicon.ico",
  LOGO_DARK: "/logo-dark.png",
  LOGO_LIGHT: "/logo-light.png",
  
  // Routes
  HOME: "/",
} as const;

export type PathKey = keyof typeof PATHS;
export type PathValue = typeof PATHS[PathKey];