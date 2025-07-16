import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ 
  placeholder = UI_TEXT.ACTIONS.SEARCH_PLACEHOLDER, 
  defaultValue = "",
  className = ""
}: SearchBarProps) {
  return (
    <Form method="get" className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className={`${DIMENSIONS.SEARCH_ICON_SIZE} text-mouser-text-disabled`} aria-hidden="true" />
        </div>
        <input
          type="search"
          name={UI_TEXT.SEARCH_PARAMS.QUERY}
          className={`block w-full pl-10 pr-3 py-2 border border-mouser-border-medium rounded-lg leading-5 bg-white placeholder-mouser-text-disabled focus:placeholder-mouser-text-tertiary ${DIMENSIONS.FOCUS_RING_LIGHT} transition duration-150 ease-in-out`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </Form>
  );
}