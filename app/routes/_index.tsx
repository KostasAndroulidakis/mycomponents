import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { InventoryTable } from "~/components/InventoryTable";
import { FilterMenu } from "~/components/FilterMenu";
import { getInventoryData, type InventoryFilters } from "~/services/inventoryService";
import { DIMENSIONS } from "~/constants/dimensions";

export const meta: MetaFunction = () => {
  return [
    { title: "Components" },
    { name: "description", content: "Electronic Components Inventory" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Get search params for filtering
  const url = new URL(request.url);
  const filters: InventoryFilters = {
    manufacturer: url.searchParams.get("manufacturer") || undefined,
    category: url.searchParams.get("category") || undefined,
    subcategory: url.searchParams.get("subcategory") || undefined,
    productType: url.searchParams.get("productType") || undefined,
    searchQuery: url.searchParams.get("q") || undefined,
  };

  const data = getInventoryData(filters);
  return json({ inventory: data.inventory, manufacturers: data.manufacturers });
}

export default function Index() {
  const { inventory, manufacturers } = useLoaderData<typeof loader>();

  return (
    <div className={`w-full ${DIMENSIONS.MAIN_PADDING} ${DIMENSIONS.CONTENT_PADDING} ${DIMENSIONS.SECTION_SPACING}`}>
      <FilterMenu manufacturers={manufacturers} />

      <InventoryTable inventory={inventory} />
    </div>
  );
}
