import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search components...", 
  defaultValue = "",
  className = ""
}: SearchBarProps) {
  return (
    <Form method="get" className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-mouser-text-disabled" aria-hidden="true" />
        </div>
        <input
          type="search"
          name="q"
          className="block w-full pl-10 pr-3 py-2 border border-mouser-border-medium rounded-lg leading-5 bg-white placeholder-mouser-text-disabled focus:outline-none focus:placeholder-mouser-text-tertiary focus:ring-2 focus:ring-mouser-primary-light focus:border-mouser-primary-light transition duration-150 ease-in-out"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </Form>
  );
}