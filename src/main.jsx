import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import { SearchProvider } from "./Context/Searchcontext.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import ErrorBoundary from "./Components/ErrorBoundary";

// Create router with error boundary
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "*",
        element: <PageNotFound />,
        handle: { hideSearch: true },
      },
    ],
  },
]);

// Get root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create root with performance optimizations
const root = createRoot(rootElement);

// Render with StrictMode for development optimizations
root.render(
  <StrictMode>
    <ErrorBoundary>
      <SearchProvider>
        <RouterProvider router={routes} />
      </SearchProvider>
    </ErrorBoundary>
  </StrictMode>
);
