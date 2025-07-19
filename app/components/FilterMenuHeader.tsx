import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for FilterMenuHeader component
 */
interface FilterMenuHeaderProps {
  /** Whether any filters are currently active */
  hasFilters: boolean;
  /** Function to clear all active filters */
  onClearAll: () => void;
  /** Current URL search parameters */
  searchParams: URLSearchParams;
  /** Filter action handlers */
  onRemoveManufacturer: (value: string) => void;
  onRemoveCategory: (value: string) => void;
  onRemoveSubcategory: (value: string) => void;
  onRemoveProductType: (value: string) => void;
}

/**
 * Header section of filter menu displaying title and active filter badges
 * Handles the display of applied filters and provides clear all functionality
 */
export function FilterMenuHeader({
  hasFilters,
  onClearAll,
  searchParams,
  onRemoveManufacturer,
  onRemoveCategory,
  onRemoveSubcategory,
  onRemoveProductType,
}: FilterMenuHeaderProps): JSX.Element {
  // Extract current filter values
  const selectedManufacturer = searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER) || "";
  const selectedCategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY) || "";
  const selectedSubcategory = searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY) || "";
  const selectedProductType = searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE) || "";

  return (
    <div className={`${DIMENSIONS.HEADER_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
      <div className={DIMENSIONS.FLEX_BETWEEN}>
        <h2 className="text-sm font-semibold text-mouser-text-primary">
          {UI_TEXT.LABELS.APPLIED_FILTERS}
        </h2>
        {hasFilters && (
          <div className={`${DIMENSIONS.FLEX_ITEMS_CENTER} ${DIMENSIONS.GAP_3}`}>
            <button
              onClick={onClearAll}
              className={`text-xs text-mouser-primary-light hover:text-mouser-hover-blue font-medium ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING_LIGHT}`}
            >
              {UI_TEXT.ACTIONS.RESET_ALL}
            </button>
            <button
              onClick={onClearAll}
              className={`${DIMENSIONS.BUTTON_PADDING} bg-mouser-primary text-white ${DIMENSIONS.LABEL_TEXT_MEDIUM} rounded hover:bg-mouser-hover-blue ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING}`}
            >
              {UI_TEXT.ACTIONS.APPLY_FILTERS}
            </button>
          </div>
        )}
      </div>

      {/* Active filter badges */}
      {hasFilters && (
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
      )}
    </div>
  );
}

/**
 * Reusable filter badge component
 * Displays a filter label and value with a remove button
 */
interface FilterBadgeProps {
  /** Badge label text */
  label: string;
  /** Filter value */
  value: string;
  /** Callback when remove button is clicked */
  onRemove: () => void;
}

function FilterBadge({ label, value, onRemove }: FilterBadgeProps): JSX.Element {
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