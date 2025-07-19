import { FilterPanel } from "./FilterPanel";
import { FilterState } from "~/hooks/useFilterState";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for FilterGrid component
 */
interface FilterGridProps {
  /** Array of available manufacturers for filtering */
  manufacturers: string[];
  /** Filter state from useFilterState hook */
  filterState: Pick<FilterState, "selectedFilters" | "filterOptions" | "handlers">;
}

/**
 * Grid layout component containing all filter panels
 * Organizes manufacturer, category, subcategory, and product type filters
 */
export function FilterGrid({ manufacturers, filterState }: FilterGridProps): JSX.Element {
  const { selectedFilters, filterOptions, handlers } = filterState;

  return (
    <div className={DIMENSIONS.FILTER_CONTENT_PADDING}>
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
  );
}