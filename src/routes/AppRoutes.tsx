import { Routes, Route } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from ".";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import { MainLayout } from "../components/Layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import ProLoader from "../components/Lib/ProLoader/ProLoader";

const NotFound = React.lazy(() => import("../pages/errors/NotFound"));

const AppRouter: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      ) : (
        <MainLayout>
          <ProLoader visible={loading}>
            <Routes>
              {PRIVATE_ROUTES.map(
                ({ path, element, isPrivate, requiredPermissions }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      !isPrivate ? (
                        element
                      ) : (
                        <PrivateRoute
                          element={element}
                          isAuthenticated={isAuthenticated}
                          requiredPermissions={requiredPermissions}
                          userPermissions={[]}
                        />
                      )
                    }
                  />
                )
              )}

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProLoader>
        </MainLayout>
      )}
    </>
  );
};

export default AppRouter;
