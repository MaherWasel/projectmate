import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./auth/router";
import notFoundRoute from "./not-found/router";

// Combine routes from different modules
const combinedRoutes = [
  ...authRoutes,
  ...notFoundRoute,

  // Add other route modules here
];

const router = createBrowserRouter(combinedRoutes);

export default router;
