/**
 * Application configuration constants
 * Following SSOT principle - all configuration values defined in one place
 */

export const CONFIG = {
  // Server configuration
  SERVER: {
    ABORT_DELAY: 5_000, // 5 seconds timeout for server-side rendering
    ERROR_STATUS_CODE: 500,
    CONTENT_TYPE_HTML: "text/html",
  },

  // External URLs
  EXTERNAL_URLS: {
    GOOGLE_FONTS_PRECONNECT: "https://fonts.googleapis.com",
    GOOGLE_FONTS_GSTATIC: "https://fonts.gstatic.com",
    GOOGLE_FONTS_CSS: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=optional",
  },

  // HTML Meta values
  META: {
    CHARSET: "utf-8",
    VIEWPORT: "width=device-width, initial-scale=1",
    HTML_LANG: "en",
    CROSSORIGIN_ANONYMOUS: "anonymous",
  },

  // CSV Processing
  CSV: {
    EXPECTED_COLUMN_COUNT: 9,
    HEADER_ROW_INDEX: 0,
    DATA_START_INDEX: 1,
  },

  // Application defaults
  DEFAULTS: {
    COMPONENTS_COUNT: 0,
    SCROLL_BEHAVIOR: "overflow-y-scroll",
  },
} as const;

export type ConfigKey = keyof typeof CONFIG;
export type ConfigValue = typeof CONFIG[ConfigKey];