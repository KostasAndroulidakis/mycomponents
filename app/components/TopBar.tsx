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
        <div className={`flex items-center justify-between ${DIMENSIONS.HEADER_HEIGHT} ${DIMENSIONS.HEADER_GAPS}`}>
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link
              to={PATHS.HOME}
              className={`flex items-center space-x-2 text-xl font-bold text-white hover:text-mouser-text-white-hover transition-colors duration-200 ${DIMENSIONS.FOCUS_RING}`}
            >
              <div className={`${DIMENSIONS.LOGO_SIZE} bg-mouser-orange rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{UI_TEXT.BRAND.LOGO_ABBREVIATION}</span>
              </div>
              <span>{UI_TEXT.BRAND.BRAND_NAME}</span>
            </Link>
          </div>

          {/* Search Bar - Now takes up more space */}
          <div className="flex-1">
            <SearchBar className="w-full" />
          </div>

          {/* Total Components Count */}
          <div className="flex-shrink-0">
            <div className="text-white text-sm font-medium">
              {UI_TEXT.LABELS.TOTAL} {totalComponents?.toLocaleString() || UI_TEXT.DEFAULTS.COUNT_FALLBACK} {UI_TEXT.LABELS.COMPONENTS}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}