import { readFileSync } from "fs";
import { PATHS } from "~/constants/paths";

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
 * Parses a CSV line handling quoted fields properly
 */
function parseCSVLine(line: string): string[] {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

/**
 * Loads and parses the inventory CSV file
 */
export function loadInventoryData(): InventoryItem[] {
  try {
    const csvData = readFileSync(PATHS.INVENTORY_CSV, "utf-8");
    const lines = csvData.split('\n').filter(line => line.trim());
    
    const results: InventoryItem[] = [];

    // Skip header row (index 0)
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      if (values.length >= 9) {
        const item: InventoryItem = {
          ID: values[0]?.trim() || '',
          Image: values[1]?.trim() || '',
          ManufacturerPartNumber: values[2]?.trim() || '',
          Manufacturer: values[3]?.trim() || '',
          Description: values[4]?.trim() || '',
          Category: values[5]?.trim() || '',
          Subcategory: values[6]?.trim() || '',
          ProductType: values[7]?.trim() || '',
          Quantity: values[8]?.trim() || '',
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
    const csvData = readFileSync(PATHS.INVENTORY_CSV, "utf-8");
    const lines = csvData.split('\n').filter(line => line.trim());
    // Subtract 1 for header row
    return lines.length - 1;
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
  const allItems = loadInventoryData();
  const manufacturers = extractManufacturers(allItems);
  const filteredItems = filterInventory(allItems, filters);

  return {
    inventory: filteredItems,
    manufacturers,
    totalCount: allItems.length
  };
}