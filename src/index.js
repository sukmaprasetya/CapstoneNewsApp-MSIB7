import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import ProgammingPage from "./pages/ProgrammingPage";
import CovidPage from "./pages/CovidPage";
import SavedNewsPage from "./pages/SavedNews";
import SearchPage from "./pages/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "programming",
        element: <ProgammingPage />,
      },
      {
        path: "covid-19",
        element: <CovidPage />,
      },
      {
        path: "saved",
        element: <SavedNewsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>
);

reportWebVitals();
