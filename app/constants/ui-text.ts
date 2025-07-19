export const UI_TEXT = {
  ACTIONS: {
    RESET_ALL: "Reset All",
    APPLY_FILTERS: "Apply Filters",
    SEARCH_PLACEHOLDER: "Search components...",
    CLOSE_FILTER: "×",
  },

  LABELS: {
    APPLIED_FILTERS: "Applied Filters:",
    RESULTS: "Results:",
    SMART_FILTERING: "Smart Filtering",
    TOTAL: "Total:",
    COMPONENTS: "components",
  },

  FILTER_BADGES: {
    MANUFACTURER: "Manufacturer:",
    CATEGORY: "Category:",
    SUBCATEGORY: "Subcategory:",
    PRODUCT_TYPE: "Product Type:",
  },

  FILTER_PANELS: {
    MANUFACTURER: "Manufacturer",
    CATEGORY: "Category",
    SUBCATEGORY: "Subcategory",
    PRODUCT_TYPE: "Product Type",
  },

  TABLE_HEADERS: {
    IMAGE: "Image",
    PART_NUMBER: "Part #",
    MANUFACTURER: "Mfr.",
    DESCRIPTION: "Description",
    CATEGORY: "Category",
    SUBCATEGORY: "Subcategory",
    PRODUCT_TYPE: "Product Type",
    QUANTITY: "Qty.",
  },

  STATUS_MESSAGES: {
    LOADING: "Loading...",
    NO_ITEMS_AVAILABLE: "No items available",
    NO_IMAGE: "No Image",
    NO_COMPONENTS_FOUND: "No components found.",
  },

  BRAND: {
    LOGO_ABBREVIATION: "MC",
    BRAND_NAME: "MyComponents",
  },

  PAGE_METADATA: {
    PAGE_TITLE: "Components",
    PAGE_DESCRIPTION: "Electronic Components Inventory",
  },

  DEFAULTS: {
    COUNT_FALLBACK: "0",
  },

  SEARCH_PARAMS: {
    MANUFACTURER: "manufacturer",
    CATEGORY: "category",
    SUBCATEGORY: "subcategory",
    PRODUCT_TYPE: "productType",
    QUERY: "q",
  },

  ACCESSIBILITY: {
    REMOVE_FILTER_TEMPLATE: "Remove {0} filter",
  },

  INPUT_TYPES: {
    SEARCH: "search",
    TEXT: "text",
  },

  HTTP_METHODS: {
    GET: "get",
    POST: "post",
  },

  ERRORS: {
    UNKNOWN_ERROR: "Unknown error occurred",
    LOADING_INVENTORY: "loading inventory data",
    GETTING_COUNT: "getting inventory count",
    RETRIEVING_DATA: "retrieving inventory data",
  },
} as const;