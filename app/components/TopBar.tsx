import { Link, useLoaderData } from "@remix-run/react";
import { SearchBar } from "./SearchBar";

interface TopBarProps {
  totalComponents?: number;
}

export function TopBar({ totalComponents }: TopBarProps) {
  return (
    <header className="bg-[#005F6A] shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-white hover:text-gray-200 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-[#FFA500] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span>MyComponents</span>
            </Link>
          </div>

          {/* Search Bar - Now takes up more space */}
          <div className="flex-1">
            <SearchBar className="w-full" />
          </div>

          {/* Total Components Count */}
          <div className="flex-shrink-0">
            <div className="text-white text-sm font-medium">
              Total: {totalComponents?.toLocaleString() || '0'} components
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}