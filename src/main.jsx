import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import { SearchProvider } from "./Context/Searchcontext.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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

createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <RouterProvider router={routes} />
  </SearchProvider>
);
