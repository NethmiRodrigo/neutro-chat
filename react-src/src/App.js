import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./utils/PrivateRoute";

import { routes } from "./constants/routes";
import firebase from "./firebase-service";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {routes.map((route) =>
            route.type === "public" ? (
              <Route
                exact
                path={route.path}
                element={route.component}
                key={route.name}
              />
            ) : (
              <Route
                exact
                path={route.path}
                element={<PrivateRoute />}
                key={route.name}
              >
                <Route
                  exact
                  path={route.path}
                  element={route.component}
                  key={route.name}
                />
              </Route>
            )
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
