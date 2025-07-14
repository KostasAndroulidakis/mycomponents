import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readFileSync } from "fs";
import { InventoryTable } from "~/components/InventoryTable";
import { FilterMenu } from "~/components/FilterMenu";

interface InventoryItem {
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

export const meta: MetaFunction = () => {
  return [
    { title: "Components" },
    { name: "description", content: "Electronic Components Inventory" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const csvFilePath = "data/inventory.csv";
    const csvData = readFileSync(csvFilePath, "utf-8");
    
    // Get search params for filtering
    const url = new URL(request.url);
    const manufacturerFilter = url.searchParams.get("manufacturer");
    const categoryFilter = url.searchParams.get("category");
    const subcategoryFilter = url.searchParams.get("subcategory");
    const productTypeFilter = url.searchParams.get("productType");
    const searchQuery = url.searchParams.get("q");
    
    // Parse CSV manually since the file has extra commas
    const lines = csvData.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    let results: InventoryItem[] = [];
    const manufacturersSet = new Set<string>();
    
    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let current = '';
      let inQuotes = false;
      
      // Parse CSV line handling quoted fields
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current); // Add the last value
      
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
        
        // Collect unique manufacturers
        if (item.Manufacturer) {
          manufacturersSet.add(item.Manufacturer);
        }
      }
    }
    
    // Get sorted manufacturers list
    const manufacturers = Array.from(manufacturersSet).sort();
    
    // Apply filters
    if (manufacturerFilter) {
      results = results.filter(item => item.Manufacturer === manufacturerFilter);
    }
    
    if (categoryFilter) {
      results = results.filter(item => item.Category === categoryFilter);
    }
    
    if (subcategoryFilter) {
      results = results.filter(item => item.Subcategory === subcategoryFilter);
    }
    
    if (productTypeFilter) {
      results = results.filter(item => item.ProductType === productTypeFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.Description.toLowerCase().includes(query) ||
        item.ManufacturerPartNumber.toLowerCase().includes(query) ||
        item.Manufacturer.toLowerCase().includes(query) ||
        item.Category.toLowerCase().includes(query) ||
        item.Subcategory.toLowerCase().includes(query) ||
        item.ProductType.toLowerCase().includes(query)
      );
    }
    
    return json({ inventory: results, manufacturers });
  } catch (error) {
    console.error('Error loading inventory:', error);
    return json({ inventory: [], manufacturers: [] });
  }
}

export default function Index() {
  const { inventory, manufacturers } = useLoaderData<typeof loader>();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <FilterMenu manufacturers={manufacturers} />
      
      <InventoryTable inventory={inventory} />
    </div>
  );
}
