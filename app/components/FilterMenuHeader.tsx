import { ActiveFilterBadges } from "./ActiveFilterBadges";
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
  return (
    <div className={`${DIMENSIONS.HEADER_PADDING} ${DIMENSIONS.BORDER_B} ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
      <div className={DIMENSIONS.FLEX_BETWEEN}>
        <h2 className={`${DIMENSIONS.TEXT_SM} ${DIMENSIONS.FONT_SEMIBOLD} text-mouser-text-primary`}>
          {UI_TEXT.LABELS.APPLIED_FILTERS}
        </h2>
        {hasFilters && (
          <div className={`${DIMENSIONS.FLEX_ITEMS_CENTER} ${DIMENSIONS.GAP_3}`}>
            <button
              onClick={onClearAll}
              className={`${DIMENSIONS.TEXT_XS} text-mouser-primary-light hover:text-mouser-hover-blue ${DIMENSIONS.FONT_MEDIUM} ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING_LIGHT}`}
            >
              {UI_TEXT.ACTIONS.RESET_ALL}
            </button>
            <button
              onClick={onClearAll}
              className={`${DIMENSIONS.BUTTON_PADDING} bg-mouser-primary text-mouser-text-white ${DIMENSIONS.LABEL_TEXT_MEDIUM} ${DIMENSIONS.ROUNDED} hover:bg-mouser-hover-blue ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING}`}
            >
              {UI_TEXT.ACTIONS.APPLY_FILTERS}
            </button>
          </div>
        )}
      </div>

      {/* Active filter badges */}
      <ActiveFilterBadges
        searchParams={searchParams}
        onRemoveManufacturer={onRemoveManufacturer}
        onRemoveCategory={onRemoveCategory}
        onRemoveSubcategory={onRemoveSubcategory}
        onRemoveProductType={onRemoveProductType}
      />
    </div>
  );
}