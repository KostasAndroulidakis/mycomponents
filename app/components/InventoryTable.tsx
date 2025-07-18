import { type InventoryItem } from "~/services/inventoryService";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";
import { ComponentImage } from "./ComponentImage";

/**
 * Props for the InventoryTable component
 */
interface InventoryTableProps {
  /** Array of inventory items to display */
  inventory: InventoryItem[];
}

/**
 * Data table component for displaying inventory items
 * Features responsive design with hover effects and empty state handling
 */
export function InventoryTable({ inventory }: InventoryTableProps) {
  return (
    <div className={`${DIMENSIONS.CONTAINER_CARD} overflow-hidden`}>
      <div className={`${DIMENSIONS.HEADER_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mouser-text-primary">{UI_TEXT.LABELS.RESULTS} {inventory.length.toLocaleString()}</h2>
          <div className="text-xs text-mouser-text-tertiary">
            {UI_TEXT.LABELS.SMART_FILTERING}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${DIMENSIONS.BORDER_LIGHT}`}>
          <thead className={DIMENSIONS.BG_LIGHT}>
            <tr>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.IMAGE}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.PART_NUMBER}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.MANUFACTURER}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.DESCRIPTION}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.CATEGORY}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.SUBCATEGORY}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.PRODUCT_TYPE}
              </th>
              <th className={`${DIMENSIONS.CELL_PADDING} text-left ${DIMENSIONS.LABEL_TEXT_SEMIBOLD} text-mouser-text-secondary`}>
                {UI_TEXT.TABLE_HEADERS.QUANTITY}
              </th>
            </tr>
          </thead>
          <tbody className={`bg-white divide-y ${DIMENSIONS.BORDER_LIGHT}`}>
            {inventory.map((item) => (
              <tr key={item.ID} className={`hover:bg-mouser-hover-gray ${DIMENSIONS.TRANSITION_COLORS}`}>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap`}>
                  <ComponentImage item={item} />
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap text-xs text-mouser-text-primary font-medium`}>
                  {item.ManufacturerPartNumber}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap text-xs text-mouser-text-tertiary`}>
                  {item.Manufacturer}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} text-xs text-mouser-text-primary max-w-xs`}>
                  <div className="truncate" title={item.Description}>{item.Description}</div>
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap text-xs text-mouser-text-tertiary`}>
                  {item.Category}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap text-xs text-mouser-text-tertiary`}>
                  {item.Subcategory}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap text-xs text-mouser-text-tertiary`}>
                  {item.ProductType}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} whitespace-nowrap`}>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-quantity-bg text-mouser-success`}>
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
          <p className="text-xs text-mouser-text-disabled">{UI_TEXT.STATUS_MESSAGES.NO_COMPONENTS_FOUND}</p>
        </div>
      )}
    </div>
  );
}