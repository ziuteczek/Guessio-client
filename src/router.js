import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Join from "./pages/Join";
import Play from "./pages/Play";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/enter/:joinType",
    element: <Join />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

export default router;
