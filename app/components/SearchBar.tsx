import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Default value for the search input */
  defaultValue?: string;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Search input component with magnifying glass icon
 * Integrates with Remix forms for server-side search handling
 */
export function SearchBar({ 
  placeholder = UI_TEXT.ACTIONS.SEARCH_PLACEHOLDER, 
  defaultValue = "",
  className = ""
}: SearchBarProps) {
  return (
    <Form method="get" className={`${DIMENSIONS.RELATIVE} ${className}`}>
      <div className={DIMENSIONS.RELATIVE}>
        <div className={`${DIMENSIONS.ABSOLUTE_ICON_LEFT} ${DIMENSIONS.PL_3} ${DIMENSIONS.FLEX_ITEMS_CENTER} ${DIMENSIONS.POINTER_EVENTS_NONE}`}>
          <MagnifyingGlassIcon className={`${DIMENSIONS.SEARCH_ICON_SIZE} text-mouser-text-disabled`} aria-hidden="true" />
        </div>
        <input
          type="search"
          name={UI_TEXT.SEARCH_PARAMS.QUERY}
          className={`${DIMENSIONS.BLOCK_W_FULL} ${DIMENSIONS.PL_10} ${DIMENSIONS.PR_3} ${DIMENSIONS.PY_2} ${DIMENSIONS.BORDER} ${DIMENSIONS.BORDER_MEDIUM} ${DIMENSIONS.ROUNDED_LG} ${DIMENSIONS.LEADING_5} ${DIMENSIONS.BG_WHITE} placeholder-mouser-text-disabled focus:placeholder-mouser-text-tertiary ${DIMENSIONS.FOCUS_RING_LIGHT} ${DIMENSIONS.SEARCH_TRANSITION}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </Form>
  );
}