import { FilterPanel } from "./FilterPanel";
import { FilterMenuHeader } from "./FilterMenuHeader";
import { useFilterState } from "~/hooks/useFilterState";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

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
 * Uses custom hook for state management and renders filter panels
 */
export function FilterMenu({ manufacturers = [] }: FilterMenuProps): JSX.Element {
  const {
    searchParams,
    selectedFilters,
    filterOptions,
    handlers,
    hasFilters,
  } = useFilterState();

  return (
    <div className={DIMENSIONS.CONTAINER_CARD}>
      <FilterMenuHeader
        hasFilters={hasFilters}
        onClearAll={handlers.handleClearAllFilters}
        searchParams={searchParams}
        onRemoveManufacturer={handlers.handleManufacturerClick}
        onRemoveCategory={handlers.handleCategoryClick}
        onRemoveSubcategory={handlers.handleSubcategoryClick}
        onRemoveProductType={handlers.handleProductTypeClick}
      />

      <div className="p-4">
        <div className={`${DIMENSIONS.GRID_RESPONSIVE_4} ${DIMENSIONS.FILTER_GRID_GAPS}`}>
          {/* Manufacturer Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.MANUFACTURER}
            items={manufacturers}
            selectedItems={selectedFilters.manufacturer ? [selectedFilters.manufacturer] : []}
            onItemClick={handlers.handleManufacturerClick}
          />

          {/* Category Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.CATEGORY}
            items={filterOptions.categories}
            selectedItems={selectedFilters.category ? [selectedFilters.category] : []}
            onItemClick={handlers.handleCategoryClick}
          />

          {/* Subcategory Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.SUBCATEGORY}
            items={filterOptions.subcategories}
            selectedItems={selectedFilters.subcategory ? [selectedFilters.subcategory] : []}
            onItemClick={handlers.handleSubcategoryClick}
            isLoading={Boolean(selectedFilters.category && filterOptions.subcategories.length === 0)}
          />

          {/* Product Type Filter */}
          <FilterPanel
            title={UI_TEXT.FILTER_PANELS.PRODUCT_TYPE}
            items={filterOptions.productTypes}
            selectedItems={selectedFilters.productType ? [selectedFilters.productType] : []}
            onItemClick={handlers.handleProductTypeClick}
            isLoading={Boolean(selectedFilters.subcategory && filterOptions.productTypes.length === 0)}
          />
        </div>
      </div>
    </div>
  );
}