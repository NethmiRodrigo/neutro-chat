import { Login } from "../components/login/Login";
import { Home } from "../components/home/Home";
import { Register } from "../components/register/Register";

export const routes = [
  {
    name: "Home",
    component: <Home />,
    path: "/",
    type: "public",
  },
  {
    name: "Login",
    component: <Login />,
    path: "/login",
    type: "public",
  },
  {
    name: "Register",
    component: <Register />,
    path: "/register",
    type: "private",
  },
];
