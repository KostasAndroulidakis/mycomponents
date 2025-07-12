import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readFileSync } from "fs";
import { InventoryTable } from "~/components/InventoryTable";

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
    
    // Parse CSV manually since the file has extra commas
    const lines = csvData.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    const results: InventoryItem[] = [];
    
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
      }
    }
    
    return json({ inventory: results });
  } catch (error) {
    console.error('Error loading inventory:', error);
    return json({ inventory: [] });
  }
}

export default function Index() {
  const { inventory } = useLoaderData<typeof loader>();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to MyComponents
        </h1>
        <p className="text-gray-600">
          Your electronic components inventory management system.
        </p>
      </div>
      
      <InventoryTable inventory={inventory} />
    </div>
  );
}
