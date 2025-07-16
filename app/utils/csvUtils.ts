import { readFileSync } from "fs";
import { CONFIG } from "~/constants/config";

/**
 * Result structure for CSV parsing operations
 */
export interface CSVParseResult {
  /** Array of raw CSV lines */
  lines: string[];
  /** Total number of lines including header */
  rowCount: number;
  /** Number of data rows (excluding header) */
  dataRowCount: number;
}

/**
 * Column indices for the inventory CSV file
 * Maps field names to their position in the CSV
 */
export const CSV_FIELD_INDICES = {
  ID: 0,
  IMAGE: 1,
  MANUFACTURER_PART_NUMBER: 2,
  MANUFACTURER: 3,
  DESCRIPTION: 4,
  CATEGORY: 5,
  SUBCATEGORY: 6,
  PRODUCT_TYPE: 7,
  QUANTITY: 8,
} as const;

/**
 * Parses a CSV line handling quoted fields properly
 * @param line Raw CSV line string
 * @returns Array of parsed field values
 */
export function parseCSVLine(line: string): string[] {
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
 * Reads and parses a CSV file, returning structured data
 * @param filePath Path to the CSV file to read
 * @returns Parsed CSV data with metadata
 */
export function parseCSVFile(filePath: string): CSVParseResult {
  try {
    const csvData = readFileSync(filePath, "utf-8");
    const lines = csvData.split('\n').filter(line => line.trim());
    
    return {
      lines,
      rowCount: lines.length,
      dataRowCount: Math.max(0, lines.length - 1), // Subtract header row
    };
  } catch (error) {
    throw new Error(`Failed to read CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates that a CSV row has the expected number of columns
 * @param values Array of field values from a CSV row
 * @param expectedCount Expected number of columns
 * @returns True if the row has the expected number of columns
 */
export function validateCSVRow(values: string[], expectedCount: number = CONFIG.CSV.EXPECTED_COLUMN_COUNT): boolean {
  return values.length >= expectedCount;
}

/**
 * Safely gets a value from a CSV row by index with trimming
 * @param values Array of field values from a CSV row
 * @param index Index of the field to retrieve
 * @returns Trimmed field value or empty string if not found
 */
export function getCSVValue(values: string[], index: number): string {
  return values[index]?.trim() || '';
}