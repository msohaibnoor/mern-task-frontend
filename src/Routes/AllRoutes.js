import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../Pages/Auth/LandingPage")),
    isPublic: true,
    exact: true,
  },
  {
    path: "/sign-In",
    component: lazy(() => import("../Pages/Auth/SignIn")),
    isPublic: true,
    theme: "dark",
    exact: true,
  },
  {
    path: "/sign-up",
    component: lazy(() => import("../Pages/Auth/SignUp")),
    isPublic: true,
    theme: "dark",
    exact: true,
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../Pages/Dashboard")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/car-management",
    component: lazy(() => import("../Pages/Cars/Cars")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/category-management",
    component: lazy(() => import("../Pages/Categories/Categories")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/add-new-category",
    component: lazy(() => import("../Pages/Categories/AddNewCategory")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/edit-category/:categoryId",
    component: lazy(() => import("../Pages/Categories/AddNewCategory")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/add-new-car",
    component: lazy(() => import("../Pages/Cars/AddNewCar")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
  {
    path: "/edit-car/:carId",
    component: lazy(() => import("../Pages/Cars/AddNewCar")),
    isPublic: false,
    theme: "dark",
    exact: true,
  },
];

export default routes;
