import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { AuthLayout } from "./pages/_layouts/auth";
import { AppLayout } from "./pages/_layouts/app";
import { Orders } from "./pages/app/orders/orders";

// export const router = createBrowserRouter([
//     { path: '/', element: <Dashboard /> },
//     { path: '/sign-in', element: <SingIn /> }
// ])

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);
