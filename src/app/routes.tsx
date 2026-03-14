import { createHashRouter } from "react-router";
import DebateList from "./pages/DebateList";
import DebateDetail from "./pages/DebateDetail";

export const router = createHashRouter([
  {
    path: "/",
    Component: DebateList,
  },
  {
    path: "/debate/:id",
    Component: DebateDetail,
  },
]);
