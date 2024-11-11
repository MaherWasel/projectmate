import ProfilePage from "./pages/ProfilePage";

const profileRoutes = [
  {
    path: "/profile/:username",
    element: <ProfilePage />,
  },
];

export default profileRoutes;
