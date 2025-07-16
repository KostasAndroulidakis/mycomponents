import { type InventoryItem } from "~/services/inventoryService";
import { PATHS } from "~/constants/paths";
import { DIMENSIONS } from "~/constants/dimensions";

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export function InventoryTable({ inventory }: InventoryTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-mouser-border-light overflow-hidden">
      <div className="px-4 py-3 border-b border-mouser-border-light bg-mouser-bg-light">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mouser-text-primary">Results: {inventory.length.toLocaleString()}</h2>
          <div className="text-xs text-mouser-text-tertiary">
            Smart Filtering
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-mouser-border-light">
          <thead className="bg-mouser-bg-light">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Image
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Part #
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Mfr.
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Description
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Category
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Subcategory
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Product Type
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-mouser-text-secondary">
                Qty.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-mouser-border-light">
            {inventory.map((item, index) => (
              <tr key={index} className="hover:bg-mouser-hover-gray transition-colors duration-150">
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.Image ? (
                    <div className={`${DIMENSIONS.COMPONENT_IMAGE_CONTAINER} bg-mouser-bg-medium rounded flex items-center justify-center`}>
                      <img
                        src={`${PATHS.COMPONENT_IMAGES}${item.Image}`}
                        alt={item.Description}
                        className={`${DIMENSIONS.COMPONENT_IMAGE_SIZE} object-cover rounded`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<span class="text-xs text-mouser-text-disabled">No Image</span>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`${DIMENSIONS.COMPONENT_IMAGE_CONTAINER} bg-mouser-bg-medium rounded flex items-center justify-center`}>
                      <span className="text-xs text-mouser-text-disabled">No Image</span>
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-mouser-text-primary font-medium">
                  {item.ManufacturerPartNumber}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-mouser-text-tertiary">
                  {item.Manufacturer}
                </td>
                <td className="px-3 py-2 text-xs text-mouser-text-primary max-w-xs">
                  <div className="truncate" title={item.Description}>{item.Description}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-mouser-text-tertiary">
                  {item.Category}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-mouser-text-tertiary">
                  {item.Subcategory}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-mouser-text-tertiary">
                  {item.ProductType}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-mouser-quantity-bg text-mouser-success">
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
          <p className="text-xs text-mouser-text-disabled">No components found.</p>
        </div>
      )}
    </div>
  );
}