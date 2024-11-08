import AdminHomeScreen2 from "./pages/Home";
import ReportsPage from "./pages/reports";
import AdminUsersView from "./pages/ViewUsers";
const adminHomeRoute = [
  {
    path: "/admin/home",
    element: <AdminHomeScreen2 />,
  },
  {
    path: "/admin/users",
    element: <AdminUsersView />,
  },
  {
    path: "/admin/reports",
    element: <ReportsPage />,
  },
];

export default adminHomeRoute;
