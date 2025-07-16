import { PATHS } from "~/constants/paths";
import { CONFIG } from "~/constants/config";
import { parseCSVFile, parseCSVLine, validateCSVRow, getCSVValue, CSV_FIELD_INDICES } from "~/utils/csvUtils";

export interface InventoryItem {
  ID: string;
  Image: string;
  ManufacturerPartNumber: string;
  Manufacturer: string;
  Description: string;
  Category: string;
  Subcategory: string;
  ProductType: string;
  Quantity: string;
}

export interface InventoryFilters {
  manufacturer?: string;
  category?: string;
  subcategory?: string;
  productType?: string;
  searchQuery?: string;
}

export interface InventoryData {
  inventory: InventoryItem[];
  manufacturers: string[];
  totalCount: number;
}


/**
 * Loads and parses the inventory CSV file
 */
export function loadInventoryData(): InventoryItem[] {
  try {
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
  } catch (error) {
    console.error('Error loading inventory data:', error);
    return [];
  }
}

/**
 * Gets the total count of inventory items
 */
export function getInventoryCount(): number {
  try {
    const csvResult = parseCSVFile(PATHS.INVENTORY_CSV);
    return csvResult.dataRowCount;
  } catch (error) {
    console.error('Error getting inventory count:', error);
    return 0;
  }
}

/**
 * Filters inventory items based on provided filters
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
 */
export function getInventoryData(filters: InventoryFilters = {}): InventoryData {
  try {
    const allItems = loadInventoryData();
    const manufacturers = extractManufacturers(allItems);
    const filteredItems = filterInventory(allItems, filters);

    return {
      inventory: filteredItems,
      manufacturers,
      totalCount: allItems.length
    };
  } catch (error) {
    console.error('Error in getInventoryData:', error);
    return {
      inventory: [],
      manufacturers: [],
      totalCount: 0
    };
  }
}