import { type InventoryItem } from "~/services/inventoryService";
import { SectionHeader } from "./SectionHeader";
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
  const rightContent = (
    <div className={`${DIMENSIONS.TEXT_XS} text-mouser-text-tertiary`}>
      {UI_TEXT.LABELS.SMART_FILTERING}
    </div>
  );

  return (
    <div className={`${DIMENSIONS.CONTAINER_CARD} ${DIMENSIONS.OVERFLOW_HIDDEN}`}>
      <SectionHeader 
        title={`${UI_TEXT.LABELS.RESULTS} ${inventory.length.toLocaleString()}`}
        rightContent={rightContent}
      />

      <div className={DIMENSIONS.OVERFLOW_X_AUTO}>
        <table className={DIMENSIONS.TABLE_CONTAINER}>
          <thead className={DIMENSIONS.BG_LIGHT}>
            <tr>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.IMAGE}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.PART_NUMBER}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.MANUFACTURER}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.DESCRIPTION}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.CATEGORY}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.SUBCATEGORY}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.PRODUCT_TYPE}
              </th>
              <th className={DIMENSIONS.TABLE_HEADER_CELL}>
                {UI_TEXT.TABLE_HEADERS.QUANTITY}
              </th>
            </tr>
          </thead>
          <tbody className={`bg-mouser-bg-white ${DIMENSIONS.DIVIDE_Y} ${DIMENSIONS.BORDER_LIGHT}`}>
            {inventory.map((item) => (
              <tr key={item.ID} className={`${DIMENSIONS.HOVER_BG_GRAY} ${DIMENSIONS.TRANSITION_COLORS}`}>
                <td className={DIMENSIONS.TABLE_CELL_BASE}>
                  <ComponentImage item={item} />
                </td>
                <td className={DIMENSIONS.TABLE_CELL_PRIMARY}>
                  {item.ManufacturerPartNumber}
                </td>
                <td className={DIMENSIONS.TABLE_CELL_SECONDARY}>
                  {item.Manufacturer}
                </td>
                <td className={DIMENSIONS.TABLE_CELL_DESCRIPTION}>
                  <div className={DIMENSIONS.TRUNCATE} title={item.Description}>{item.Description}</div>
                </td>
                <td className={DIMENSIONS.TABLE_CELL_SECONDARY}>
                  {item.Category}
                </td>
                <td className={DIMENSIONS.TABLE_CELL_SECONDARY}>
                  {item.Subcategory}
                </td>
                <td className={DIMENSIONS.TABLE_CELL_SECONDARY}>
                  {item.ProductType}
                </td>
                <td className={DIMENSIONS.TABLE_CELL_QUANTITY}>
                  <span className={`${DIMENSIONS.INLINE_FLEX_ITEMS} ${DIMENSIONS.PX_2_PY_05} ${DIMENSIONS.ROUNDED} ${DIMENSIONS.TEXT_XS} ${DIMENSIONS.FONT_SEMIBOLD} bg-mouser-quantity-bg`}>
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