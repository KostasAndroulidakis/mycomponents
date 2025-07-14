import { useState, useMemo } from "react";
import { useSearchParams } from "@remix-run/react";
import { FilterPanel } from "./FilterPanel";
import { CATEGORIES, type Category, type Subcategory } from "~/constants/categories";

interface FilterMenuProps {
  className?: string;
  manufacturers?: string[];
}

export function FilterMenu({ className = "", manufacturers = [] }: FilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedManufacturer = searchParams.get("manufacturer") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSubcategory = searchParams.get("subcategory") || "";
  const selectedProductType = searchParams.get("productType") || "";

  // Get available categories
  const categories = useMemo(() => 
    CATEGORIES.map(cat => cat.name), 
    []
  );

  // Get available subcategories based on selected category
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    return category ? category.subcategories.map(sub => sub.name) : [];
  }, [selectedCategory]);

  // Get available product types based on selected subcategory
  const productTypes = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return [];
    const category = CATEGORIES.find(cat => cat.name === selectedCategory);
    if (!category) return [];
    const subcategory = category.subcategories.find(sub => sub.name === selectedSubcategory);
    return subcategory ? subcategory.productTypes : [];
  }, [selectedCategory, selectedSubcategory]);

  const handleManufacturerClick = (manufacturer: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedManufacturer === manufacturer) {
      // Deselect manufacturer and clear all downstream selections
      newParams.delete("manufacturer");
      newParams.delete("category");
      newParams.delete("subcategory");
      newParams.delete("productType");
    } else {
      // Select new manufacturer and clear downstream selections
      newParams.set("manufacturer", manufacturer);
      newParams.delete("category");
      newParams.delete("subcategory");
      newParams.delete("productType");
    }
    
    setSearchParams(newParams);
  };

  const handleCategoryClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedCategory === category) {
      // Deselect category and clear all downstream selections
      newParams.delete("category");
      newParams.delete("subcategory");
      newParams.delete("productType");
    } else {
      // Select new category and clear downstream selections
      newParams.set("category", category);
      newParams.delete("subcategory");
      newParams.delete("productType");
    }
    
    setSearchParams(newParams);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedSubcategory === subcategory) {
      // Deselect subcategory and clear downstream selections
      newParams.delete("subcategory");
      newParams.delete("productType");
    } else {
      // Select new subcategory and clear downstream selections
      newParams.set("subcategory", subcategory);
      newParams.delete("productType");
    }
    
    setSearchParams(newParams);
  };

  const handleProductTypeClick = (productType: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedProductType === productType) {
      // Deselect product type
      newParams.delete("productType");
    } else {
      // Select new product type
      newParams.set("productType", productType);
    }
    
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("manufacturer");
    newParams.delete("category");
    newParams.delete("subcategory");
    newParams.delete("productType");
    setSearchParams(newParams);
  };

  const hasActiveFilters = selectedManufacturer || selectedCategory || selectedSubcategory || selectedProductType;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Applied Filters:</h2>
          {hasActiveFilters && (
            <div className="flex items-center gap-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
              >
                Reset All
              </button>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-150"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {selectedManufacturer && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Manufacturer: {selectedManufacturer}
                  <button
                    onClick={() => handleManufacturerClick(selectedManufacturer)}
                    className="ml-1.5 w-4 h-4 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => handleCategoryClick(selectedCategory)}
                    className="ml-1.5 w-4 h-4 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Subcategory: {selectedSubcategory}
                  <button
                    onClick={() => handleSubcategoryClick(selectedSubcategory)}
                    className="ml-1.5 w-4 h-4 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProductType && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Product Type: {selectedProductType}
                  <button
                    onClick={() => handleProductTypeClick(selectedProductType)}
                    className="ml-1.5 w-4 h-4 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Manufacturer Filter */}
          <FilterPanel
            title="Manufacturer"
            items={manufacturers}
            selectedItems={selectedManufacturer ? [selectedManufacturer] : []}
            onItemClick={handleManufacturerClick}
          />

          {/* Category Filter */}
          <FilterPanel
            title="Category"
            items={categories}
            selectedItems={selectedCategory ? [selectedCategory] : []}
            onItemClick={handleCategoryClick}
          />

          {/* Subcategory Filter */}
          <FilterPanel
            title="Subcategory"
            items={subcategories}
            selectedItems={selectedSubcategory ? [selectedSubcategory] : []}
            onItemClick={handleSubcategoryClick}
            isLoading={Boolean(selectedCategory && subcategories.length === 0)}
          />

          {/* Product Type Filter */}
          <FilterPanel
            title="Product Type"
            items={productTypes}
            selectedItems={selectedProductType ? [selectedProductType] : []}
            onItemClick={handleProductTypeClick}
            isLoading={Boolean(selectedSubcategory && productTypes.length === 0)}
          />
        </div>
      </div>
    </div>
  );
}