import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { Home } from "../routes/Home";
import { NotFound } from "../routes/NotFound";
import { Lab1 } from "../labs/Lab1";
import { Lab2 } from "../labs/Lab2";
import { Lab3 } from "../labs/Lab3";
import { Lab4 } from "../labs/Lab4";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/labs/lab-1",
    element: (
      <AppLayout>
        <Lab1 />
      </AppLayout>
    ),
  },
  {
    path: "/labs/lab-2",
    element: (
      <AppLayout>
        <Lab2 />
      </AppLayout>
    ),
  },
  {
    path: "/labs/lab-3",
    element: (
      <AppLayout>
        <Lab3 />
      </AppLayout>
    ),
  },
  {
    path: "/labs/lab-4",
    element: (
      <AppLayout>
        <Lab4 />
      </AppLayout>
    ),
  },
  {
    path: "*",
    element: (
      <AppLayout>
        <NotFound />
      </AppLayout>
    ),
  },
]);
