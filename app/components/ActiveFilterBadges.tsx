import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for individual filter badge
 */
interface FilterBadgeProps {
  /** Badge label text */
  label: string;
  /** Filter value */
  value: string;
  /** Callback when remove button is clicked */
  onRemove: () => void;
}

/**
 * Reusable filter badge component
 * Displays a filter label and value with a remove button
 */
export function FilterBadge({ label, value, onRemove }: FilterBadgeProps): JSX.Element {
  return (
    <span className={`${DIMENSIONS.INLINE_FLEX_ITEMS} ${DIMENSIONS.BADGE_PADDING} rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
      {label} {value}
      <button
        onClick={onRemove}
        className={`${DIMENSIONS.ML_1} ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
        aria-label={`Remove ${label.toLowerCase()} filter`}
      >
        {UI_TEXT.ACTIONS.CLOSE_FILTER}
      </button>
    </span>
  );
}

/**
 * Props for active filter badges container
 */
interface ActiveFilterBadgesProps {
  /** Current URL search parameters */
  searchParams: URLSearchParams;
  /** Filter action handlers */
  onRemoveManufacturer: (value: string) => void;
  onRemoveCategory: (value: string) => void;
  onRemoveSubcategory: (value: string) => void;
  onRemoveProductType: (value: string) => void;
}

/**
 * Container component for displaying all active filter badges
 * Handles the layout and rendering of multiple filter badges
 */
export function ActiveFilterBadges({
  searchParams,
  onRemoveManufacturer,
  onRemoveCategory,
  onRemoveSubcategory,
  onRemoveProductType,
}: ActiveFilterBadgesProps): JSX.Element | null {
  // Extract current filter values
  const selectedManufacturer = searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER) || "";
  const selectedCategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY) || "";
  const selectedSubcategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY) || "";
  const selectedProductType = searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE) || "";

  // Return null if no filters are active
  const hasAnyFilters = selectedManufacturer || selectedCategory || selectedSubcategory || selectedProductType;
  if (!hasAnyFilters) return null;

  return (
    <div className={DIMENSIONS.MT_2}>
      <div className={`${DIMENSIONS.FLEX_WRAP} ${DIMENSIONS.BADGE_GAPS}`}>
        {selectedManufacturer && (
          <FilterBadge
            label={UI_TEXT.FILTER_BADGES.MANUFACTURER}
            value={selectedManufacturer}
            onRemove={() => onRemoveManufacturer(selectedManufacturer)}
          />
        )}
        {selectedCategory && (
          <FilterBadge
            label={UI_TEXT.FILTER_BADGES.CATEGORY}
            value={selectedCategory}
            onRemove={() => onRemoveCategory(selectedCategory)}
          />
        )}
        {selectedSubcategory && (
          <FilterBadge
            label={UI_TEXT.FILTER_BADGES.SUBCATEGORY}
            value={selectedSubcategory}
            onRemove={() => onRemoveSubcategory(selectedSubcategory)}
          />
        )}
        {selectedProductType && (
          <FilterBadge
            label={UI_TEXT.FILTER_BADGES.PRODUCT_TYPE}
            value={selectedProductType}
            onRemove={() => onRemoveProductType(selectedProductType)}
          />
        )}
      </div>
    </div>
  );
}