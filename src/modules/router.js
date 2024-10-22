import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./auth/router";

// Combine routes from different modules
const combinedRoutes = [
  ...authRoutes,
  // Add other route modules here
];

const router = createBrowserRouter(combinedRoutes);

export default router;
