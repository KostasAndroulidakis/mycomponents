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

  // Configuration-driven approach to eliminate repetition
  const filterPanelConfigs = [
    {
      key: 'manufacturer',
      title: UI_TEXT.FILTER_PANELS.MANUFACTURER,
      items: manufacturers,
      selectedValue: selectedFilters.manufacturer,
      onItemClick: handlers.handleManufacturerClick,
      isLoading: false,
    },
    {
      key: 'category',
      title: UI_TEXT.FILTER_PANELS.CATEGORY,
      items: filterOptions.categories,
      selectedValue: selectedFilters.category,
      onItemClick: handlers.handleCategoryClick,
      isLoading: false,
    },
    {
      key: 'subcategory',
      title: UI_TEXT.FILTER_PANELS.SUBCATEGORY,
      items: filterOptions.subcategories,
      selectedValue: selectedFilters.subcategory,
      onItemClick: handlers.handleSubcategoryClick,
      isLoading: Boolean(selectedFilters.category && filterOptions.subcategories.length === 0),
    },
    {
      key: 'productType',
      title: UI_TEXT.FILTER_PANELS.PRODUCT_TYPE,
      items: filterOptions.productTypes,
      selectedValue: selectedFilters.productType,
      onItemClick: handlers.handleProductTypeClick,
      isLoading: Boolean(selectedFilters.subcategory && filterOptions.productTypes.length === 0),
    },
  ] as const;

  return (
    <div className={DIMENSIONS.FILTER_CONTENT_PADDING}>
      <div className={`${DIMENSIONS.GRID_RESPONSIVE_4} ${DIMENSIONS.FILTER_GRID_GAPS}`}>
        {filterPanelConfigs.map(({ key, title, items, selectedValue, onItemClick, isLoading }) => (
          <FilterPanel
            key={key}
            title={title}
            items={items}
            selectedItems={selectedValue ? [selectedValue] : []}
            onItemClick={onItemClick}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}