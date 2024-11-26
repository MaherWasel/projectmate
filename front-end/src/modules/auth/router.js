// authRoutes.js
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default authRoutes;
