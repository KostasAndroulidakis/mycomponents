import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

interface FilterPanelProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onItemClick: (item: string) => void;
  isLoading?: boolean;
}

export function FilterPanel({ 
  title, 
  items, 
  selectedItems, 
  onItemClick,
  isLoading = false 
}: FilterPanelProps) {
  return (
    <div className={`bg-white border ${DIMENSIONS.BORDER_LIGHT} rounded`}>
      <div className={`${DIMENSIONS.BG_LIGHT} ${DIMENSIONS.CELL_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT}`}>
        <h3 className={`${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary uppercase tracking-wide`}>{title}</h3>
      </div>
      <div className={`${DIMENSIONS.FILTER_PANEL_MAX_HEIGHT} overflow-y-auto`}>
        {isLoading ? (
          <div className={`${DIMENSIONS.SECTION_PADDING} text-center text-xs text-mouser-text-disabled`}>
            {UI_TEXT.STATUS_MESSAGES.LOADING}
          </div>
        ) : items.length === 0 ? (
          <div className={`${DIMENSIONS.SECTION_PADDING} text-center text-xs text-mouser-text-disabled`}>
            {UI_TEXT.STATUS_MESSAGES.NO_ITEMS_AVAILABLE}
          </div>
        ) : (
          <ul className={`divide-y ${DIMENSIONS.BORDER_LIGHT}`}>
            {items.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <li key={item}>
                  <button
                    onClick={() => onItemClick(item)}
                    className={`w-full text-left ${DIMENSIONS.CELL_PADDING} text-xs ${DIMENSIONS.TRANSITION_COLORS} 
                      ${isSelected 
                        ? 'bg-mouser-filter-badge-bg text-mouser-primary font-medium hover:bg-mouser-filter-badge-hover-bg' 
                        : 'text-mouser-text-tertiary hover:bg-mouser-hover-gray'
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="truncate">{item}</span>
                      {isSelected && (
                        <svg className={`${DIMENSIONS.CHECK_ICON_SIZE} text-mouser-primary ml-2 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
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