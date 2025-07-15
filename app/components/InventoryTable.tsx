interface InventoryItem {
  ID: string;
  Image: string;
  ManufacturerPartNumber: string;
  Manufacturer: string;
  Description: string;
  Category: string;
  Subcategory: string;
  ProductType: string;
  Quantity: string;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export function InventoryTable({ inventory }: InventoryTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Results: {inventory.length.toLocaleString()}</h2>
          <div className="text-xs text-gray-500">
            Smart Filtering
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Image
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Part #
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Mfr.
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Description
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Category
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Subcategory
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Product Type
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">
                Qty.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {inventory.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.Image ? (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <img
                        src={`/data/images/components/${item.Image}`}
                        alt={item.Description}
                        className="w-8 h-8 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<span class="text-xs text-gray-400">No Image</span>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {item.ManufacturerPartNumber}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                  {item.Manufacturer}
                </td>
                <td className="px-3 py-2 text-xs text-gray-900 max-w-xs">
                  <div className="truncate" title={item.Description}>{item.Description}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                  {item.Category}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                  {item.Subcategory}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                  {item.ProductType}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    {item.Quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {inventory.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xs text-gray-500">No components found.</p>
        </div>
      )}
    </div>
  );
}