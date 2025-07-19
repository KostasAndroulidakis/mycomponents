import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";
import { extractFilterParams } from "~/utils/filterUtils";

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
    <span className={`${DIMENSIONS.INLINE_FLEX_ITEMS} ${DIMENSIONS.BADGE_PADDING} ${DIMENSIONS.ROUNDED} ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-filter-badge-bg text-mouser-primary`}>
      {label} {value}
      <button
        onClick={onRemove}
        className={`${DIMENSIONS.ML_1} ${DIMENSIONS.CLOSE_BUTTON_SIZE} text-mouser-primary hover:text-mouser-hover-blue ${DIMENSIONS.FOCUS_RING_LIGHT}`}
        aria-label={UI_TEXT.ACCESSIBILITY.REMOVE_FILTER_TEMPLATE.replace("{0}", label.toLowerCase())}
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
  // Extract current filter values using centralized utility
  const filterParams = extractFilterParams(searchParams);

  // Configuration-driven approach to eliminate repetition
  const filterConfigs = [
    {
      key: 'manufacturer',
      value: filterParams.manufacturer,
      label: UI_TEXT.FILTER_BADGES.MANUFACTURER,
      onRemove: onRemoveManufacturer,
    },
    {
      key: 'category',
      value: filterParams.category,
      label: UI_TEXT.FILTER_BADGES.CATEGORY,
      onRemove: onRemoveCategory,
    },
    {
      key: 'subcategory',
      value: filterParams.subcategory,
      label: UI_TEXT.FILTER_BADGES.SUBCATEGORY,
      onRemove: onRemoveSubcategory,
    },
    {
      key: 'productType',
      value: filterParams.productType,
      label: UI_TEXT.FILTER_BADGES.PRODUCT_TYPE,
      onRemove: onRemoveProductType,
    },
  ] as const;

  // Filter out inactive filters
  const activeFilters = filterConfigs.filter(config => config.value);

  // Return null if no filters are active
  if (activeFilters.length === 0) return null;

  return (
    <div className={DIMENSIONS.MT_2}>
      <div className={`${DIMENSIONS.FLEX_WRAP} ${DIMENSIONS.BADGE_GAPS}`}>
        {activeFilters.map(({ key, value, label, onRemove }) => (
          <FilterBadge
            key={key}
            label={label}
            value={value}
            onRemove={() => onRemove(value)}
          />
        ))}
      </div>
    </div>
  );
}