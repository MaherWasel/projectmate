import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./auth/router";
import notFoundRoute from "./not-found/router";
import homeRoute from "./home/routes";
import myInvitesRoute from "./invites/routes";
import formExample from "./formExample/router";
import adminRoute from "./admin/router";

// Combine routes from different modules
const combinedRoutes = [
  ...authRoutes,
  ...notFoundRoute,
  ...homeRoute,
  ...myInvitesRoute,
  ...formExample,
  ...adminRoute,

  // Add other route modules here
];

const router = createBrowserRouter(combinedRoutes);

export default router;
