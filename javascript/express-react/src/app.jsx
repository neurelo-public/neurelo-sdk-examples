import { RouterProvider } from "react-router-dom";

import { router } from "@router";
import { AppProvider } from "@components/app/provider";

export function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
