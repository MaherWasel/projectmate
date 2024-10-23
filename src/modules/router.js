import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./auth/router";
import notFoundRoute from "./not-found/router";
import homeRoute from "./home/routes";

// Combine routes from different modules
const combinedRoutes = [
  ...authRoutes,
  ...notFoundRoute,
  ...homeRoute,

  // Add other route modules here
];

const router = createBrowserRouter(combinedRoutes);

export default router;
