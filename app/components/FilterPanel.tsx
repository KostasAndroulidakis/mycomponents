import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

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
    <div className={`bg-white border ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.ROUNDED}`}>
      <div className={`${DIMENSIONS.BG_LIGHT} ${DIMENSIONS.CELL_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT}`}>
        <h3 className={`${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary ${DIMENSIONS.UPPERCASE_TRACKED}`}>
          {title}
        </h3>
      </div>
      <div className={`${DIMENSIONS.FILTER_PANEL_MAX_HEIGHT} overflow-y-auto`}>
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
                        : 'text-mouser-text-tertiary hover:bg-mouser-hover-gray'
                      }`}
                  >
                    <span className={DIMENSIONS.FLEX_BETWEEN}>
                      <span className="truncate">{item}</span>
                      {isSelected && (
                        <svg className={`${DIMENSIONS.CHECK_ICON_SIZE} text-mouser-primary ${DIMENSIONS.ML_2} ${DIMENSIONS.FLEX_SHRINK_0}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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