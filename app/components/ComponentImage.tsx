import { useState } from "react";
import { type InventoryItem } from "~/services/inventoryService";
import { PATHS } from "~/constants/paths";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for the ComponentImage component
 */
interface ComponentImageProps {
  /** Inventory item containing image data */
  item: InventoryItem;
}

/**
 * Component image display with error handling
 * Shows placeholder when image fails to load
 */
export function ComponentImage({ item }: ComponentImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (!item.Image || hasError) {
    return (
      <div className={`${DIMENSIONS.COMPONENT_IMAGE_CONTAINER} bg-mouser-bg-medium ${DIMENSIONS.ROUNDED} ${DIMENSIONS.FLEX_CENTER}`}>
        <span className={`${DIMENSIONS.TEXT_XS} text-mouser-text-disabled`}>
          {UI_TEXT.STATUS_MESSAGES.NO_IMAGE}
        </span>
      </div>
    );
  }

  return (
    <div className={`${DIMENSIONS.COMPONENT_IMAGE_CONTAINER} bg-mouser-bg-medium ${DIMENSIONS.ROUNDED} ${DIMENSIONS.FLEX_CENTER}`}>
      <img
        src={`${PATHS.COMPONENT_IMAGES}${item.Image}`}
        alt={item.Description}
        className={`${DIMENSIONS.COMPONENT_IMAGE_SIZE} ${DIMENSIONS.OBJECT_COVER} ${DIMENSIONS.ROUNDED}`}
        onError={handleImageError}
      />
    </div>
  );
}