import { useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { FilterPanel } from "./FilterPanel";
import { CATEGORIES } from "~/constants/categories";
import { DIMENSIONS } from "~/constants/dimensions";
import { createFilterHandler, clearAllFilters, hasActiveFilters } from "~/utils/filterUtils";

interface FilterMenuProps {
  className?: string;
  manufacturers?: string[];
}

export function FilterMenu({ manufacturers = [] }: FilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedManufacturer = searchParams.get("manufacturer") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSubcategory = searchParams.get("subcategory") || "";
  const selectedProductType = searchParams.get("productType") || "";

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
    <div className="bg-white rounded-lg shadow-sm border border-mouser-border-light">
      <div className="px-4 py-3 border-b border-mouser-border-light bg-mouser-bg-light">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mouser-text-primary">Applied Filters:</h2>
          {hasFilters && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAllFilters}
                className="text-xs text-mouser-primary-light hover:text-mouser-hover-blue font-medium transition-colors duration-150"
              >
                Reset All
              </button>
              <button
                onClick={handleClearAllFilters}
                className="px-3 py-1 bg-mouser-primary text-white text-xs font-medium rounded hover:bg-mouser-hover-blue transition-colors duration-150"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasFilters && (
          <div className="mt-2">
            <div className={`flex flex-wrap ${DIMENSIONS.BADGE_GAPS}`}>
              {selectedManufacturer && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-mouser-filter-badge-bg text-mouser-primary">
                  Manufacturer: {selectedManufacturer}
                  <button
                    onClick={() => handleManufacturerClick(selectedManufacturer)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-mouser-filter-badge-bg text-mouser-primary">
                  Category: {selectedCategory}
                  <button
                    onClick={() => handleCategoryClick(selectedCategory)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-mouser-filter-badge-bg text-mouser-primary">
                  Subcategory: {selectedSubcategory}
                  <button
                    onClick={() => handleSubcategoryClick(selectedSubcategory)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProductType && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-mouser-filter-badge-bg text-mouser-primary">
                  Product Type: {selectedProductType}
                  <button
                    onClick={() => handleProductTypeClick(selectedProductType)}
                    className={`ml-1 ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue`}
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
            title="Manufacturer"
            items={manufacturers}
            selectedItems={selectedManufacturer ? [selectedManufacturer] : []}
            onItemClick={handleManufacturerClick}
          />

          {/* Category Filter */}
          <FilterPanel
            title="Category"
            items={categories}
            selectedItems={selectedCategory ? [selectedCategory] : []}
            onItemClick={handleCategoryClick}
          />

          {/* Subcategory Filter */}
          <FilterPanel
            title="Subcategory"
            items={subcategories}
            selectedItems={selectedSubcategory ? [selectedSubcategory] : []}
            onItemClick={handleSubcategoryClick}
            isLoading={Boolean(selectedCategory && subcategories.length === 0)}
          />

          {/* Product Type Filter */}
          <FilterPanel
            title="Product Type"
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