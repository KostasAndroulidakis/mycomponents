import { useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { CATEGORIES } from "~/constants/categories";
import { UI_TEXT } from "~/constants/ui-text";
import { createFilterHandler, clearAllFilters, hasActiveFilters } from "~/utils/filterUtils";

/**
 * Return type for useFilterState hook
 */
export interface FilterState {
  /** Current URL search parameters */
  searchParams: URLSearchParams;
  /** Currently selected filter values */
  selectedFilters: {
    manufacturer: string;
    category: string;
    subcategory: string;
    productType: string;
  };
  /** Available filter options */
  filterOptions: {
    categories: string[];
    subcategories: string[];
    productTypes: string[];
  };
  /** Filter action handlers */
  handlers: {
    handleManufacturerClick: (value: string) => void;
    handleCategoryClick: (value: string) => void;
    handleSubcategoryClick: (value: string) => void;
    handleProductTypeClick: (value: string) => void;
    handleClearAllFilters: () => void;
  };
  /** Whether any filters are currently active */
  hasFilters: boolean;
}

/**
 * Custom hook for managing filter state and derived data
 * Encapsulates all filter-related state logic and computations
 */
export function useFilterState(): FilterState {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract current filter values
  const selectedManufacturer = searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER) || "";
  const selectedCategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY) || "";
  const selectedSubcategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY) || "";
  const selectedProductType = searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE) || "";

  // Compute available categories (static, but memoized for consistency)
  const categories = useMemo(() =>
    CATEGORIES.map(cat => cat.name),
    []
  );

  // Compute available subcategories based on selected category
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    return category ? category.subcategories.map(sub => sub.name) : [];
  }, [selectedCategory]);

  // Compute available product types based on selected subcategory
  const productTypes = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    if (!category) return [];
    const subcategory = category.subcategories.find(sub => sub.name === selectedSubcategory);
    return subcategory ? subcategory.productTypes : [];
  }, [selectedCategory, selectedSubcategory]);

  // Create filter handlers
  const handleManufacturerClick = createFilterHandler("manufacturer", selectedManufacturer, searchParams, setSearchParams);
  const handleCategoryClick = createFilterHandler("category", selectedCategory, searchParams, setSearchParams);
  const handleSubcategoryClick = createFilterHandler("subcategory", selectedSubcategory, searchParams, setSearchParams);
  const handleProductTypeClick = createFilterHandler("productType", selectedProductType, searchParams, setSearchParams);

  const handleClearAllFilters = () => clearAllFilters(searchParams, setSearchParams);

  const hasFilters = hasActiveFilters(searchParams);

  return {
    searchParams,
    selectedFilters: {
      manufacturer: selectedManufacturer,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      productType: selectedProductType,
    },
    filterOptions: {
      categories,
      subcategories,
      productTypes,
    },
    handlers: {
      handleManufacturerClick,
      handleCategoryClick,
      handleSubcategoryClick,
      handleProductTypeClick,
      handleClearAllFilters,
    },
    hasFilters,
  };
}