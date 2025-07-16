import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { InventoryTable } from "~/components/InventoryTable";
import { FilterMenu } from "~/components/FilterMenu";
import { getInventoryData, type InventoryFilters } from "~/services/inventoryService";
import { DIMENSIONS } from "~/constants/dimensions";
import { UI_TEXT } from "~/constants/ui-text";

/**
 * Meta function to set page title and description
 */
export const meta: MetaFunction = () => {
  return [
    { title: UI_TEXT.PAGE_METADATA.PAGE_TITLE },
    { name: "description", content: UI_TEXT.PAGE_METADATA.PAGE_DESCRIPTION },
  ];
};

/**
 * Loader function to fetch inventory data with filters from URL parameters
 * @param request HTTP request object containing URL search parameters
 * @returns JSON response with filtered inventory data and manufacturers
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // Get search params for filtering
  const url = new URL(request.url);
  
  // Extract filters with proper null handling
  const filters: InventoryFilters = {};
  
  const manufacturer = url.searchParams.get(UI_TEXT.SEARCH_PARAMS.MANUFACTURER);
  if (manufacturer) filters.manufacturer = manufacturer;
  
  const category = url.searchParams.get(UI_TEXT.SEARCH_PARAMS.CATEGORY);
  if (category) filters.category = category;
  
  const subcategory = url.searchParams.get(UI_TEXT.SEARCH_PARAMS.SUBCATEGORY);
  if (subcategory) filters.subcategory = subcategory;
  
  const productType = url.searchParams.get(UI_TEXT.SEARCH_PARAMS.PRODUCT_TYPE);
  if (productType) filters.productType = productType;
  
  const searchQuery = url.searchParams.get(UI_TEXT.SEARCH_PARAMS.QUERY);
  if (searchQuery) filters.searchQuery = searchQuery;

  const data = getInventoryData(filters);
  return json({ 
    inventory: data.inventory, 
    manufacturers: data.manufacturers 
  });
}

/**
 * Main index page component displaying inventory with filtering capabilities
 * @returns JSX component with filter menu and inventory table
 */
export default function Index() {
  const { inventory, manufacturers } = useLoaderData<typeof loader>();

  return (
    <div className={`w-full ${DIMENSIONS.MAIN_PADDING} ${DIMENSIONS.CONTENT_PADDING} ${DIMENSIONS.SECTION_SPACING}`}>
      <FilterMenu manufacturers={manufacturers} />

      <InventoryTable inventory={inventory} />
    </div>
  );
}
