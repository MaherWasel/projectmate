import MyProjectsPage from "./pages/MyProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
const myProjectsRoutes = [
  {
    path: "/profile/:username/projects",
    element: <MyProjectsPage />,
  },
  {
    path: "myProjects/create",
    element: <CreateProjectPage />,
  },
];

export default myProjectsRoutes;
