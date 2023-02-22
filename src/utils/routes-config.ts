import CreateWarehouse from "./../components/CreateWarehouse";
import HomePage from "./../pages/HomePage";
import Login from "./../components/auth/Login";
import Register from "./../components/auth/Register";

export const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
];

export const routes = [
  { path: "/", component: HomePage },
  { path: "/create", component: CreateWarehouse },
  { path: "/register", component: Register },
  { path: "/login", component: Login }  
];
