import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./auth/router";
import notFoundRoute from "./not-found/router";
import homeRoute from "./home/routes";
import myInvitesRoute from "./invites/routes";
import formExample from "./formExample/router";
import adminRoutes from "./admin/router";
import myProjectsRoutes from "./my_projects/routes";
import profileRoutes from "./profile/router";
import projectRoutes from "./project/routes";
import infoRoutes from "./info/routes";

// Combine routes from different modules
const combinedRoutes = [
  ...authRoutes,
  ...notFoundRoute,
  ...homeRoute,
  ...myInvitesRoute,
  ...formExample,
  ...profileRoutes,
  ...adminRoutes,
  ...myProjectsRoutes,
  ...projectRoutes,
  ...infoRoutes,
];

const router = createBrowserRouter(combinedRoutes);

export default router;
