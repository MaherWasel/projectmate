import LoginPage from "../auth/pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const notFoundRoute = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default notFoundRoute;
