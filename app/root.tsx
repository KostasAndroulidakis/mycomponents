import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { TopBar } from "./components/TopBar";
import { getInventoryCount } from "./services/inventoryService";
import { DIMENSIONS } from "./constants/dimensions";
import { CONFIG } from "~/constants/config";

import "./tailwind.css";

/**
 * Links function to define external stylesheet and font preconnections
 */
export const links: LinksFunction = () => [
  { rel: "preconnect", href: CONFIG.EXTERNAL_URLS.GOOGLE_FONTS_PRECONNECT },
  {
    rel: "preconnect",
    href: CONFIG.EXTERNAL_URLS.GOOGLE_FONTS_GSTATIC,
    crossOrigin: CONFIG.META.CROSSORIGIN_ANONYMOUS,
  },
  {
    rel: "preload",
    as: "style",
    href: CONFIG.EXTERNAL_URLS.GOOGLE_FONTS_CSS,
  },
  {
    rel: "stylesheet",
    href: CONFIG.EXTERNAL_URLS.GOOGLE_FONTS_CSS,
  },
];

/**
 * Root loader function to fetch total inventory count
 * @returns JSON response with total component count
 */
export async function loader() {
  const totalComponents = getInventoryCount();
  return json({ totalComponents });
}

/**
 * Root layout component that wraps all pages with HTML structure
 * @param children React children to render within the layout
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={CONFIG.META.HTML_LANG} className={CONFIG.DEFAULTS.SCROLL_BEHAVIOR}>
      <head>
        <meta charSet={CONFIG.META.CHARSET} />
        <meta name="viewport" content={CONFIG.META.VIEWPORT} />
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

/**
 * Root App component that provides the main application structure
 * @returns JSX component with header, main content area, and navigation
 */
export default function App() {
  const { totalComponents } = useLoaderData<typeof loader>();

  return (
    <div className={`${DIMENSIONS.MIN_H_SCREEN} ${DIMENSIONS.BG_LIGHT}`}>
      <TopBar totalComponents={totalComponents} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
