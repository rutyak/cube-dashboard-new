import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LineChart from "./components/LineChart"; 
import BarChart from "./components/BarChart";
import AreaChart from "./components/AreaChart";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Dashboard/>
  },
  {
    path: "/line",
    element: <LineChart />,
  },
  {
    path: "/bar",
    element: <BarChart />, 
  },
  {
    path: "/area",
    element: <AreaChart />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
