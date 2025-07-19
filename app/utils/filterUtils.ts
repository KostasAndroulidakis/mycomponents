import { UI_TEXT, FILTER_TYPES, type FilterType } from "~/constants/ui-text";
import type { InventoryFilters } from "~/services/inventoryService";

/**
 * Extracted filter parameter values from URL search parameters
 */
export interface ExtractedFilterParams {
  manufacturer: string;
  category: string;
  subcategory: string;
  productType: string;
  query: string;
}

/**
 * Defines the hierarchical relationship between filters
 */
interface FilterHierarchy {
  manufacturer: FilterType[];
  category: FilterType[];
  subcategory: FilterType[];
  productType: FilterType[];
}

/**
 * Hierarchical filter dependencies - when a filter changes, 
 * all downstream filters are cleared
 */
const FILTER_HIERARCHY: FilterHierarchy = {
  manufacturer: ["category", "subcategory", "productType"],
  category: ["subcategory", "productType"],
  subcategory: ["productType"],
  productType: [],
};

/**
 * Maps filter types to their corresponding URL parameter names
 */
const FILTER_PARAM_MAP = {
  manufacturer: UI_TEXT.SEARCH_PARAMS.MANUFACTURER,
  category: UI_TEXT.SEARCH_PARAMS.CATEGORY,
  subcategory: UI_TEXT.SEARCH_PARAMS.SUBCATEGORY,
  productType: UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE,
} as const;

/**
 * Creates a filter handler function for a specific filter type
 * @param filterType Type of filter to create handler for
 * @param currentValue Current selected value for this filter
 * @param searchParams Current URL search parameters
 * @param setSearchParams Function to update URL search parameters
 * @returns Filter handler function
 */
export const createFilterHandler = (
  filterType: FilterType,
  currentValue: string,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void
) => {
  return (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (currentValue === value) {
      // Deselect current filter and clear downstream selections
      newParams.delete(FILTER_PARAM_MAP[filterType]);
      FILTER_HIERARCHY[filterType].forEach(downstreamFilter => {
        newParams.delete(FILTER_PARAM_MAP[downstreamFilter]);
      });
    } else {
      // Select new filter value and clear downstream selections
      newParams.set(FILTER_PARAM_MAP[filterType], value);
      FILTER_HIERARCHY[filterType].forEach(downstreamFilter => {
        newParams.delete(FILTER_PARAM_MAP[downstreamFilter]);
      });
    }

    setSearchParams(newParams);
  };
};

/**
 * Clears all active filters from the URL parameters
 * @param searchParams Current URL search parameters
 * @param setSearchParams Function to update URL search parameters
 */
export const clearAllFilters = (
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void
) => {
  const newParams = new URLSearchParams(searchParams);
  const allFilters = FILTER_TYPES;
  
  allFilters.forEach(filter => {
    newParams.delete(FILTER_PARAM_MAP[filter]);
  });
  
  setSearchParams(newParams);
};

/**
 * Checks if any filters are currently active
 * @param searchParams Current URL search parameters
 * @returns True if any filters are active
 */
export const hasActiveFilters = (searchParams: URLSearchParams): boolean => {
  const allFilters = FILTER_TYPES;
  return allFilters.some(filter => searchParams.has(FILTER_PARAM_MAP[filter]));
};

/**
 * Extracts all filter parameters from URL search parameters
 * Centralizes the logic for extracting filter values to eliminate duplication
 * @param searchParams URL search parameters to extract from
 * @returns Object containing all extracted filter values with empty string defaults
 */
export const extractFilterParams = (searchParams: URLSearchParams): ExtractedFilterParams => {
  return {
    manufacturer: searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER) || "",
    category: searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY) || "",
    subcategory: searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY) || "",
    productType: searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE) || "",
    query: searchParams.get(UI_TEXT.SEARCH_PARAMS.QUERY) || "",
  };
};

/**
 * Converts extracted filter parameters to InventoryFilters format for service layer
 * @param params Extracted filter parameters from URL
 * @returns InventoryFilters object with only non-empty values
 */
export const convertToInventoryFilters = (params: ExtractedFilterParams): InventoryFilters => {
  const filters: InventoryFilters = {};
  
  if (params.manufacturer) filters.manufacturer = params.manufacturer;
  if (params.category) filters.category = params.category;
  if (params.subcategory) filters.subcategory = params.subcategory;
  if (params.productType) filters.productType = params.productType;
  if (params.query) filters.searchQuery = params.query;
  
  return filters;
};