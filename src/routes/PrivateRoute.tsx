import { Navigate } from "react-router-dom";
import { ROUTES } from "./consts";

interface IPrivateRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
  requiredPermissions?: string[];
  userPermissions?: string[];
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  element,
  isAuthenticated,
  requiredPermissions,
  userPermissions,
}) => {
  if (!isAuthenticated) return <Navigate to={ROUTES.AUTH.LOGIN} replace />;

  // Check permissions
  const hasPermission = requiredPermissions?.every((perm) =>
    userPermissions?.includes(perm)
  );

  if (requiredPermissions && !hasPermission) {
    return <Navigate to={ROUTES.ERROR.UNAUTHORIZED} replace />;
  }

  return element;
};

export default PrivateRoute;
