import AdminHomeScreen2 from "./pages/Home";
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

];

export default adminHomeRoute;