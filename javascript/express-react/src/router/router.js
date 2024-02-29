import { createBrowserRouter } from "react-router-dom";

import { SingleColumn } from "@components/layout";
import { GlobalErrorHandler } from "@components/app/global-error-handler";

// Pages
import { HomePage } from "@pages/home";
import { SignInPage } from "@pages/sign-in";
import { RegisterPage } from "@pages/register";
import { FilmListPage, EditFilmPage } from "@pages/film";
import { DashboardPage } from "@pages/dashboard";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: SingleColumn,
      errorElement: GlobalErrorHandler(),
      children: [
        {
          path: "",
          Component: HomePage,
        },
        {
          path: "sign-in",
          Component: SignInPage,
        },
        {
          path: "register",
          Component: RegisterPage,
        },
        {
          path: "films",
          Component: FilmListPage,
        },
        {
          path: "film/:filmId/",
          Component: EditFilmPage,
        },
      ],
    },
    {
      path: "/dashboard/",
      Component: SingleColumn,
      errorElement: GlobalErrorHandler(),
      children: [
        {
          path: "",
          Component: DashboardPage,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);
