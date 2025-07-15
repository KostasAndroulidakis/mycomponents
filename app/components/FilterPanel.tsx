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
    <div className="bg-white border border-gray-200 rounded">
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {isLoading ? (
          <div className="px-3 py-4 text-center text-xs text-gray-500">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="px-3 py-4 text-center text-xs text-gray-500">
            No items available
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <li key={item}>
                  <button
                    onClick={() => onItemClick(item)}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors duration-150 
                      ${isSelected 
                        ? 'bg-blue-50 text-blue-700 font-medium hover:bg-blue-100' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="truncate">{item}</span>
                      {isSelected && (
                        <svg className="w-3 h-3 text-blue-600 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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