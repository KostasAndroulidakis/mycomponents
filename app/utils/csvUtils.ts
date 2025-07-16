import { readFileSync } from "fs";

export interface CSVParseResult {
  lines: string[];
  rowCount: number;
  dataRowCount: number;
}

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

export const CSV_CONFIG = {
  EXPECTED_COLUMN_COUNT: 9,
  HEADER_ROW_INDEX: 0,
  DATA_START_INDEX: 1,
} as const;

/**
 * Parses a CSV line handling quoted fields properly
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
 */
export function validateCSVRow(values: string[], expectedCount: number = CSV_CONFIG.EXPECTED_COLUMN_COUNT): boolean {
  return values.length >= expectedCount;
}

/**
 * Safely gets a value from a CSV row by index with trimming
 */
export function getCSVValue(values: string[], index: number): string {
  return values[index]?.trim() || '';
}