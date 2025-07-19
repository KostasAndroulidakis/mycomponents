import { Link } from "@remix-run/react";
import { SearchBar } from "./SearchBar";
import { DIMENSIONS } from "~/constants/dimensions";
import { PATHS } from "~/constants/paths";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for the TopBar component
 */
interface TopBarProps {
  /** Total number of components to display in the header */
  totalComponents?: number;
}

/**
 * Main application header with branding, search, and component count
 * Features responsive design with Mouser-inspired styling
 */
export function TopBar({ totalComponents }: TopBarProps) {
  return (
    <header className={`bg-mouser-primary ${DIMENSIONS.SHADOW_SM} border-b ${DIMENSIONS.BORDER_LIGHT}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className={`${DIMENSIONS.FLEX_BETWEEN} ${DIMENSIONS.HEADER_HEIGHT} ${DIMENSIONS.HEADER_GAPS}`}>
          {/* Logo and Brand */}
          <div className={DIMENSIONS.FLEX_SHRINK_0}>
            <Link
              to={PATHS.HOME}
              className={`${DIMENSIONS.FLEX_ITEMS_CENTER} ${DIMENSIONS.SPACE_X_2} ${DIMENSIONS.TEXT_XL} ${DIMENSIONS.FONT_BOLD} text-white hover:text-mouser-text-white-hover ${DIMENSIONS.BRAND_TRANSITION} ${DIMENSIONS.FOCUS_RING}`}
            >
              <div className={`${DIMENSIONS.LOGO_SIZE} bg-mouser-orange ${DIMENSIONS.ROUNDED_LG} ${DIMENSIONS.FLEX_CENTER}`}>
                <span className={`text-white ${DIMENSIONS.FONT_BOLD} ${DIMENSIONS.TEXT_SM}`}>
                  {UI_TEXT.BRAND.LOGO_ABBREVIATION}
                </span>
              </div>
              <span>{UI_TEXT.BRAND.BRAND_NAME}</span>
            </Link>
          </div>

          {/* Search Bar - Now takes up more space */}
          <div className="flex-1">
            <SearchBar className="w-full" />
          </div>

          {/* Total Components Count */}
          <div className={DIMENSIONS.FLEX_SHRINK_0}>
            <div className={`text-white ${DIMENSIONS.TEXT_SM} ${DIMENSIONS.FONT_MEDIUM}`}>
              {UI_TEXT.LABELS.TOTAL} {totalComponents?.toLocaleString() || UI_TEXT.DEFAULTS.COUNT_FALLBACK} {UI_TEXT.LABELS.COMPONENTS}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}