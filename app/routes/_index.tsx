import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Components" },
    { name: "description", content: "Electronic Components Inventory" },
  ];
};

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to MyComponents
        </h1>
        <p className="text-gray-600">
          Your electronic components inventory management system.
        </p>
      </div>
    </div>
  );
}
