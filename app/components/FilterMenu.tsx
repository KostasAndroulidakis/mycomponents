import { FilterMenuHeader } from "./FilterMenuHeader";
import { FilterGrid } from "./FilterGrid";
import { useFilterState } from "~/hooks/useFilterState";
import { DIMENSIONS } from "~/constants/dimensions";

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
  const filterState = useFilterState();

  return (
    <div className={DIMENSIONS.CONTAINER_CARD}>
      <FilterMenuHeader
        hasFilters={filterState.hasFilters}
        onClearAll={filterState.handlers.handleClearAllFilters}
        searchParams={filterState.searchParams}
        onRemoveManufacturer={filterState.handlers.handleManufacturerClick}
        onRemoveCategory={filterState.handlers.handleCategoryClick}
        onRemoveSubcategory={filterState.handlers.handleSubcategoryClick}
        onRemoveProductType={filterState.handlers.handleProductTypeClick}
      />

      <FilterGrid
        manufacturers={manufacturers}
        filterState={filterState}
      />
    </div>
  );
}