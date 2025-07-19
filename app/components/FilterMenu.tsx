import { useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { FilterPanel } from "./FilterPanel";
import { FilterMenuHeader } from "./FilterMenuHeader";
import { CATEGORIES } from "~/constants/categories";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";
import { createFilterHandler, clearAllFilters, hasActiveFilters } from "~/utils/filterUtils";

/**
 * Props for the FilterMenu component
 */
interface FilterMenuProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Array of available manufacturers for filtering */
  manufacturers?: string[];
}

/**
 * Main filter menu component with hierarchical filtering capabilities
 * Manages manufacturer, category, subcategory, and product type filters
 */
export function FilterMenu({ manufacturers = [] }: FilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract current filter values for filter panels
  const selectedManufacturer = searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER) || "";
  const selectedCategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY) || "";
  const selectedSubcategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY) || "";
  const selectedProductType = searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE) || "";

  // Get available categories
  const categories = useMemo(() =>
    CATEGORIES.map(cat => cat.name),
    []
  );

  // Get available subcategories based on selected category
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    return category ? category.subcategories.map(sub => sub.name) : [];
  }, [selectedCategory]);

  // Get available product types based on selected subcategory
  const productTypes = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    if (!category) return [];
    const subcategory = category.subcategories.find(sub => sub.name === selectedSubcategory);
    return subcategory ? subcategory.productTypes : [];
  }, [selectedCategory, selectedSubcategory]);

  const handleManufacturerClick = createFilterHandler("manufacturer", selectedManufacturer, searchParams, setSearchParams);
  const handleCategoryClick = createFilterHandler("category", selectedCategory, searchParams, setSearchParams);
  const handleSubcategoryClick = createFilterHandler("subcategory", selectedSubcategory, searchParams, setSearchParams);
  const handleProductTypeClick = createFilterHandler("productType", selectedProductType, searchParams, setSearchParams);

  const handleClearAllFilters = () => clearAllFilters(searchParams, setSearchParams);

  const hasFilters = hasActiveFilters(searchParams);

  return (
    <div className={DIMENSIONS.CONTAINER_CARD}>
      <FilterMenuHeader
        hasFilters={hasFilters}
        onClearAll={handleClearAllFilters}
        searchParams={searchParams}
        onRemoveManufacturer={handleManufacturerClick}
        onRemoveCategory={handleCategoryClick}
        onRemoveSubcategory={handleSubcategoryClick}
        onRemoveProductType={handleProductTypeClick}
      />

      <div className="p-4">
        <div className={`${DIMENSIONS.GRID_RESPONSIVE_4} ${DIMENSIONS.FILTER_GRID_GAPS}`}>
          {/* Manufacturer Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.MANUFACTURER}
            items={manufacturers}
            selectedItems={selectedManufacturer ? [selectedManufacturer] : []}
            onItemClick={handleManufacturerClick}
          />

          {/* Category Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.CATEGORY}
            items={categories}
            selectedItems={selectedCategory ? [selectedCategory] : []}
            onItemClick={handleCategoryClick}
          />

          {/* Subcategory Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.SUBCATEGORY}
            items={subcategories}
            selectedItems={selectedSubcategory ? [selectedSubcategory] : []}
            onItemClick={handleSubcategoryClick}
            isLoading={Boolean(selectedCategory && subcategories.length === 0)}
          />

          {/* Product Type Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.PRODUCT_TYPE}
            items={productTypes}
            selectedItems={selectedProductType ? [selectedProductType] : []}
            onItemClick={handleProductTypeClick}
            isLoading={Boolean(selectedSubcategory && productTypes.length === 0)}
          />
        </div>
      </div>
    </div>
  );
}