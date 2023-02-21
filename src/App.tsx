import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes, routes } from "./utils/routes-config";

import AuthentitcationContext from "./contexts/AuthenticationContext";
import Authorized from "./components/auth/Authorized";
import Menu from "./components/Menu";
import { claimModel } from "./models/auth.models";
import configureInterceptor from "./utils/httpInterceptors";
import { getClaims } from "./utils/handleJwt";
import { useState } from "react";

configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claimModel[]>(getClaims);
  
  return (
    <BrowserRouter>
      <AuthentitcationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <Authorized
          authorized={
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          }
          notAuthorized={
            <Routes>
              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          }
        ></Authorized>
      </AuthentitcationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
