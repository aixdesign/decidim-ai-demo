import { createBrowserRouter } from "react-router";
import DebateList from "./pages/DebateList";
import DebateDetail from "./pages/DebateDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DebateList,
  },
  {
    path: "/debate/:id",
    Component: DebateDetail,
  },
]);
