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
      newParams.delete(filterType);
      FILTER_HIERARCHY[filterType].forEach(downstreamFilter => {
        newParams.delete(downstreamFilter);
      });
    } else {
      // Select new filter value and clear downstream selections
      newParams.set(filterType, value);
      FILTER_HIERARCHY[filterType].forEach(downstreamFilter => {
        newParams.delete(downstreamFilter);
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
    newParams.delete(filter);
  });
  
  setSearchParams(newParams);
};

export const hasActiveFilters = (searchParams: URLSearchParams): boolean => {
  const allFilters: FilterType[] = ["manufacturer", "category", "subcategory", "productType"];
  return allFilters.some(filter => searchParams.has(filter));
};