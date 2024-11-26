import InfoPage from "./pages/InfoPage";
import PolicyPage from "./pages/PolicyPage";
import TermsPage from "./pages/TermsPage";
const infoRoutes = [
  {
    path: "/",
    element: <InfoPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/policy",
    element: <PolicyPage />,
  },
];

export default infoRoutes;
