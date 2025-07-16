import { useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { FilterPanel } from "./FilterPanel";
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
      <div className={`${DIMENSIONS.HEADER_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mouser-text-primary">{UI_TEXT.LABELS.APPLIED_FILTERS}</h2>
          {hasFilters && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAllFilters}
                className={`text-xs text-mouser-primary-light hover:text-mouser-hover-blue font-medium ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING_LIGHT}`}
              >
                {UI_TEXT.ACTIONS.RESET_ALL}
              </button>
              <button
                onClick={handleClearAllFilters}
                className={`${DIMENSIONS.BUTTON_PADDING} bg-mouser-primary text-white ${DIMENSIONS.LABEL_TEXT_MEDIUM} rounded hover:bg-mouser-hover-blue ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING}`}
              >
                {UI_TEXT.ACTIONS.APPLY_FILTERS}
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasFilters && (
          <div className="mt-2">
            <div className={`flex flex-wrap ${DIMENSIONS.BADGE_GAPS}`}>
              {selectedManufacturer && (
                <span className={`inline-flex items-center ${DIMENSIONS.BADGE_PADDING} rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
                  {UI_TEXT.FILTER_BADGES.MANUFACTURER} {selectedManufacturer}
                  <button
                    onClick={() => handleManufacturerClick(selectedManufacturer)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className={`inline-flex items-center ${DIMENSIONS.BADGE_PADDING} rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
                  {UI_TEXT.FILTER_BADGES.CATEGORY} {selectedCategory}
                  <button
                    onClick={() => handleCategoryClick(selectedCategory)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className={`inline-flex items-center ${DIMENSIONS.BADGE_PADDING} rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
                  {UI_TEXT.FILTER_BADGES.SUBCATEGORY} {selectedSubcategory}
                  <button
                    onClick={() => handleSubcategoryClick(selectedSubcategory)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProductType && (
                <span className={`inline-flex items-center ${DIMENSIONS.BADGE_PADDING} rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
                  {UI_TEXT.FILTER_BADGES.PRODUCT_TYPE} {selectedProductType}
                  <button
                    onClick={() => handleProductTypeClick(selectedProductType)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${DIMENSIONS.FILTER_GRID_GAPS}`}>
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