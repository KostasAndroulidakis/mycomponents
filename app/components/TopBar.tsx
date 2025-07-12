import { Link } from "@remix-run/react";
import { SearchBar } from "./SearchBar";

export function TopBar() {
  return (
    <header className="bg-[#005F6A] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Right side - could add user menu, notifications, etc. */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8"></div> {/* Placeholder for balance */}
          </div>
        </div>
      </div>
    </header>
  );
}