import { UI_TEXT } from "~/constants/ui-text";

export type FilterType = "manufacturer" | "category" | "subcategory" | "productType";

interface FilterHierarchy {
  manufacturer: FilterType[];
  category: FilterType[];
  subcategory: FilterType[];
  productType: FilterType[];
}

const FILTER_HIERARCHY: FilterHierarchy = {
  manufacturer: ["category", "subcategory", "productType"],
  category: ["subcategory", "productType"],
  subcategory: ["productType"],
  productType: [],
};

const FILTER_PARAM_MAP = {
  manufacturer: UI_TEXT.SEARCH_PARAMS.MANUFACTURER,
  category: UI_TEXT.SEARCH_PARAMS.CATEGORY,
  subcategory: UI_TEXT.SEARCH_PARAMS.SUBCATEGORY,
  productType: UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE,
} as const;

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

export const clearAllFilters = (
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void
) => {
  const newParams = new URLSearchParams(searchParams);
  const allFilters: FilterType[] = ["manufacturer", "category", "subcategory", "productType"];
  
  allFilters.forEach(filter => {
    newParams.delete(FILTER_PARAM_MAP[filter]);
  });
  
  setSearchParams(newParams);
};

export const hasActiveFilters = (searchParams: URLSearchParams): boolean => {
  const allFilters: FilterType[] = ["manufacturer", "category", "subcategory", "productType"];
  return allFilters.some(filter => searchParams.has(FILTER_PARAM_MAP[filter]));
};