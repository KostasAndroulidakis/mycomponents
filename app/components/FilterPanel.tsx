import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";
import { SVG_CONFIGS } from "~/constants/svg";

/**
 * Props for the FilterPanel component
 */
interface FilterPanelProps {
  /** Title displayed in the panel header */
  title: string;
  /** Array of items to display in the filter list */
  items: string[];
  /** Array of currently selected items */
  selectedItems: string[];
  /** Callback function when an item is clicked */
  onItemClick: (item: string) => void;
  /** Whether the panel is in loading state */
  isLoading?: boolean;
}

/**
 * Reusable filter panel component with scrollable item list
 * Displays selectable items with visual selection indicators
 */
export function FilterPanel({
  title,
  items,
  selectedItems,
  onItemClick,
  isLoading = false
}: FilterPanelProps) {
  return (
    <div className={`${DIMENSIONS.BG_WHITE} ${DIMENSIONS.BORDER} ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.ROUNDED}`}>
      <div className={`${DIMENSIONS.BG_LIGHT} ${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.BORDER_B} ${DIMENSIONS.BORDER_LIGHT}`}>
        <h3 className={`${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary ${DIMENSIONS.UPPERCASE_TRACKED}`}>
          {title}
        </h3>
      </div>
      <div className={`${DIMENSIONS.FILTER_PANEL_MAX_HEIGHT} ${DIMENSIONS.OVERFLOW_Y_AUTO}`}>
        {isLoading ? (
          <div className={`${DIMENSIONS.SECTION_PADDING} ${DIMENSIONS.TEXT_CENTER} ${DIMENSIONS.TEXT_XS} text-mouser-text-disabled`}>
            {UI_TEXT.STATUS_MESSAGES.LOADING}
          </div>
        ) : items.length === 0 ? (
          <div className={`${DIMENSIONS.SECTION_PADDING} ${DIMENSIONS.TEXT_CENTER} ${DIMENSIONS.TEXT_XS} text-mouser-text-disabled`}>
            {UI_TEXT.STATUS_MESSAGES.NO_ITEMS_AVAILABLE}
          </div>
        ) : (
          <ul className={`${DIMENSIONS.DIVIDE_Y} ${DIMENSIONS.BORDER_LIGHT}`}>
            {items.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <li key={item}>
                  <button
                    onClick={() => onItemClick(item)}
                    className={`${DIMENSIONS.W_FULL_TEXT_LEFT} ${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.TEXT_XS} ${DIMENSIONS.TRANSITION_COLORS} ${DIMENSIONS.FOCUS_RING_LIGHT}
                      ${isSelected
                        ? `bg-mouser-filter-badge-bg text-mouser-primary ${DIMENSIONS.FONT_MEDIUM} hover:bg-mouser-filter-badge-hover-bg`
                        : `text-mouser-text-tertiary ${DIMENSIONS.HOVER_BG_GRAY}`
                      }`}
                  >
                    <span className={DIMENSIONS.FLEX_BETWEEN}>
                      <span className={DIMENSIONS.TRUNCATE}>{item}</span>
                      {isSelected && (
                        <svg
                          className={`${DIMENSIONS.CHECK_ICON_SIZE} text-mouser-primary ${DIMENSIONS.ML_2} ${DIMENSIONS.FLEX_SHRINK_0}`}
                          fill={SVG_CONFIGS.CHECKMARK_ICON.fill}
                          viewBox={SVG_CONFIGS.CHECKMARK_ICON.viewBox}
                          aria-hidden="true"
                        >
                          <path
                            fillRule={SVG_CONFIGS.CHECKMARK_ICON.fillRule}
                            d={SVG_CONFIGS.CHECKMARK_ICON.path}
                            clipRule={SVG_CONFIGS.CHECKMARK_ICON.clipRule}
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}