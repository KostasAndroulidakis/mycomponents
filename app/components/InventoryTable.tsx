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
    <div className={`${DIMENSIONS.CONTAINER_CARD} ${DIMENSIONS.OVERFLOW_HIDDEN}`}>
      <div className={`${DIMENSIONS.HEADER_PADDING} border-b ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
        <div className={DIMENSIONS.FLEX_BETWEEN}>
          <h2 className={`${DIMENSIONS.TEXT_SM} ${DIMENSIONS.FONT_SEMIBOLD} text-mouser-text-primary`}>
            {UI_TEXT.LABELS.RESULTS} {inventory.length.toLocaleString()}
          </h2>
          <div className={`${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
            {UI_TEXT.LABELS.SMART_FILTERING}
          </div>
        </div>
      </div>

      <div className={DIMENSIONS.OVERFLOW_X_AUTO}>
        <table className={`${DIMENSIONS.MIN_W_FULL} ${DIMENSIONS.DIVIDE_Y} ${DIMENSIONS.BORDER_LIGHT}`}>
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
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP}`}>
                  <ComponentImage item={item} />
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP} ${DIMENSIONS.TEXT_XS} text-mouser-text-primary ${DIMENSIONS.FONT_MEDIUM}`}>
                  {item.ManufacturerPartNumber}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP} ${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
                  {item.Manufacturer}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.TEXT_XS} text-mouser-text-primary ${DIMENSIONS.MAX_W_XS}`}>
                  <div className="truncate" title={item.Description}>{item.Description}</div>
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP} ${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
                  {item.Category}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP} ${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
                  {item.Subcategory}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP} ${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
                  {item.ProductType}
                </td>
                <td className={`${DIMENSIONS.CELL_PADDING} ${DIMENSIONS.WHITESPACE_NOWRAP}`}>
                  <span className={`${DIMENSIONS.INLINE_FLEX_ITEMS} ${DIMENSIONS.PX_2_PY_05} ${DIMENSIONS.ROUNDED} ${DIMENSIONS.LABEL_TEXT_MEDIUM} bg-mouser-quantity-bg text-mouser-success`}>
                    {item.Quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inventory.length === 0 && (
        <div className={`${DIMENSIONS.TEXT_CENTER} ${DIMENSIONS.PY_8}`}>
          <p className={`${DIMENSIONS.TEXT_XS} text-mouser-text-disabled`}>
            {UI_TEXT.STATUS_MESSAGES.NO_COMPONENTS_FOUND}
          </p>
        </div>
      )}
    </div>
  );
}