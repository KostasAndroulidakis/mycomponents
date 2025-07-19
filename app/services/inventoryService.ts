import { PATHS } from "~/constants/paths";
import { CONFIG } from "~/constants/config";
import { parseCSVFile, parseCSVLine, validateCSVRow, getCSVValue, CSV_FIELD_INDICES } from "~/utils/csvUtils";
import { withServiceErrorHandling } from "~/utils/errorUtils";

/**
 * Represents a single inventory item with all its properties
 */
export interface InventoryItem {
  /** Unique identifier for the inventory item */
  ID: string;
  /** Filename of the component image */
  Image: string;
  /** Manufacturer's part number */
  ManufacturerPartNumber: string;
  /** Component manufacturer name */
  Manufacturer: string;
  /** Detailed description of the component */
  Description: string;
  /** Main category classification */
  Category: string;
  /** Subcategory classification */
  Subcategory: string;
  /** Specific product type */
  ProductType: string;
  /** Available quantity as string */
  Quantity: string;
}

/**
 * Filter criteria for inventory searches
 */
export interface InventoryFilters {
  /** Filter by manufacturer name */
  manufacturer?: string;
  /** Filter by category */
  category?: string;
  /** Filter by subcategory */
  subcategory?: string;
  /** Filter by product type */
  productType?: string;
  /** Text search query */
  searchQuery?: string;
}

/**
 * Complete inventory data structure with metadata
 */
export interface InventoryData {
  /** Filtered inventory items */
  inventory: InventoryItem[];
  /** List of all available manufacturers */
  manufacturers: string[];
  /** Total count of all inventory items */
  totalCount: number;
}


/**
 * Loads and parses the inventory CSV file
 * @returns Array of inventory items parsed from CSV
 */
export function loadInventoryData(): InventoryItem[] {
  return withServiceErrorHandling(
    () => {
      const csvResult = parseCSVFile(PATHS.INVENTORY_CSV);
      const results: InventoryItem[] = [];

      // Skip header row, start from data rows
      for (let i = CONFIG.CSV.DATA_START_INDEX; i < csvResult.lines.length; i++) {
        const values = parseCSVLine(csvResult.lines[i]);

        if (validateCSVRow(values)) {
          const item: InventoryItem = {
            ID: getCSVValue(values, CSV_FIELD_INDICES.ID),
            Image: getCSVValue(values, CSV_FIELD_INDICES.IMAGE),
            ManufacturerPartNumber: getCSVValue(values, CSV_FIELD_INDICES.MANUFACTURER_PART_NUMBER),
            Manufacturer: getCSVValue(values, CSV_FIELD_INDICES.MANUFACTURER),
            Description: getCSVValue(values, CSV_FIELD_INDICES.DESCRIPTION),
            Category: getCSVValue(values, CSV_FIELD_INDICES.CATEGORY),
            Subcategory: getCSVValue(values, CSV_FIELD_INDICES.SUBCATEGORY),
            ProductType: getCSVValue(values, CSV_FIELD_INDICES.PRODUCT_TYPE),
            Quantity: getCSVValue(values, CSV_FIELD_INDICES.QUANTITY),
          };
          results.push(item);
        }
      }

      return results;
    },
    [], // fallback to empty array
    'loading inventory data'
  );
}

/**
 * Gets the total count of inventory items
 * @returns Total number of inventory items in the CSV file
 */
export function getInventoryCount(): number {
  return withServiceErrorHandling(
    () => {
      const csvResult = parseCSVFile(PATHS.INVENTORY_CSV);
      return csvResult.dataRowCount;
    },
    0, // fallback to zero count
    'getting inventory count'
  );
}

/**
 * Filters inventory items based on provided filters
 * @param items Array of inventory items to filter
 * @param filters Filter criteria to apply
 * @returns Filtered array of inventory items
 */
export function filterInventory(items: InventoryItem[], filters: InventoryFilters): InventoryItem[] {
  let results = [...items];

  // Apply manufacturer filter
  if (filters.manufacturer) {
    results = results.filter(item => item.Manufacturer === filters.manufacturer);
  }

  // Apply category filter
  if (filters.category) {
    results = results.filter(item => item.Category === filters.category);
  }

  // Apply subcategory filter
  if (filters.subcategory) {
    results = results.filter(item => item.Subcategory === filters.subcategory);
  }

  // Apply product type filter
  if (filters.productType) {
    results = results.filter(item => item.ProductType === filters.productType);
  }

  // Apply search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    results = results.filter(item =>
      item.Description.toLowerCase().includes(query) ||
      item.ManufacturerPartNumber.toLowerCase().includes(query) ||
      item.Manufacturer.toLowerCase().includes(query) ||
      item.Category.toLowerCase().includes(query) ||
      item.Subcategory.toLowerCase().includes(query) ||
      item.ProductType.toLowerCase().includes(query)
    );
  }

  return results;
}

/**
 * Extracts unique manufacturers from inventory items
 * @param items Array of inventory items
 * @returns Sorted array of unique manufacturer names
 */
export function extractManufacturers(items: InventoryItem[]): string[] {
  const manufacturersSet = new Set<string>();
  
  items.forEach(item => {
    if (item.Manufacturer) {
      manufacturersSet.add(item.Manufacturer);
    }
  });

  return Array.from(manufacturersSet).sort();
}

/**
 * Main service function to get filtered inventory data
 * @param filters Optional filter criteria to apply
 * @returns Complete inventory data with filtered items and metadata
 */
export function getInventoryData(filters: InventoryFilters = {}): InventoryData {
  return withServiceErrorHandling(
    () => {
      const allItems = loadInventoryData();
      const manufacturers = extractManufacturers(allItems);
      const filteredItems = filterInventory(allItems, filters);

      return {
        inventory: filteredItems,
        manufacturers,
        totalCount: allItems.length
      };
    },
    { // fallback to empty data structure
      inventory: [],
      manufacturers: [],
      totalCount: 0
    },
    'retrieving inventory data'
  );
}