import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/partials/Layout";
import Home from "./pages/Home";
import Boost from "./pages/Boost";
import Leaderboard from "./pages/Leaderboard";
import Earn from "./pages/Earn";
import Friends from "./pages/Friends";
import Missions from "./pages/Missions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "boost",
        element: <Boost />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "earn",
        element: <Earn />,
      },
      {
        path: "missions",
        element: <Missions />,
      },
    ],
  },
]);

export default router;
