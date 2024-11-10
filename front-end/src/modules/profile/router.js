import ProfilePage from "./pages/ProfilePage";

const profileRoutes = [
  {
    path: "/myProfile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
];

export default profileRoutes;
