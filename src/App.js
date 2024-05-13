import "./App.css";
import React, { Suspense } from "react";
import routes from "./Routes/AllRoutes";
import { PublicRoute } from "./Routes/PublicRoutes";
import { PrivateRoute } from "./Routes/PrivateRoutes";
import GeneralLayout from "./Pages/Layout/GeneralLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <ToastContainer autoClose={2000} />

        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <>
                    <GeneralLayout
                      isPublic={route.isPublic}
                      isGuest={route.isGuest}
                      isPrivate={route.isPrivate}
                      isAuth={route.isAuth}
                      theme={route.theme ?? "black"}
                    >
                      <Suspense fallback={<div>loading...</div>}>
                        {!route.isPublic ? (
                          <PrivateRoute props={route} role={route?.role} Component={Component} />
                        ) : (
                          <PublicRoute props={route} role={route?.role} Component={Component} />
                        )}
                      </Suspense>
                    </GeneralLayout>
                  </>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
