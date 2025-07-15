import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { readFileSync } from "fs";
import { TopBar } from "./components/TopBar";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const csvFilePath = "data/inventory.csv";
    const csvData = readFileSync(csvFilePath, "utf-8");
    const lines = csvData.split('\n').filter(line => line.trim());
    // Subtract 1 for header row
    const totalComponents = lines.length - 1;
    return json({ totalComponents });
  } catch (error) {
    return json({ totalComponents: 0 });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { totalComponents } = useLoaderData<typeof loader>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar totalComponents={totalComponents} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
