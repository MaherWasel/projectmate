import MyProjectsPage from "./pages/MyProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
const myProjectsRoutes = [
  {
    path: "myProjects",
    element: <MyProjectsPage />,
  },
  {
    path: "myProjects/create",
    element: <CreateProjectPage />,
  },
];

export default myProjectsRoutes;
