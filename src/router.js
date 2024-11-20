import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Join from "./pages/Join";
import Lobby from "./pages/Lobby";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

export default router;
