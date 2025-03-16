import { lazy } from "react";
import { ROUTES } from "./consts";

const Login = lazy(() => import("../pages/public/auth/Login"));
const NotFound = lazy(() => import("../pages/errors/NotFound"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const Calendar = lazy(() => import("../pages/private/Calendar"));
const BookingList = lazy(() => import("../pages/private/Booking/List"));
const BookingCreate = lazy(() => import("../pages/private/Booking/Create"));

export interface IRoute {
  path: string;
  element: JSX.Element;
  isPrivate: boolean;
  requiredPermissions: string[];
}

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
    isPrivate: false,
    requiredPermissions: [],
  },
  {
    path: ROUTES.ERROR.NOT_FOUND,
    element: <NotFound />,
    isPrivate: false,
    requiredPermissions: [],
  },
];

export const PRIVATE_ROUTES: IRoute[] = [
  {
    path: ROUTES.CALENDAR.index,
    element: <Calendar />,
    isPrivate: true,
    requiredPermissions: [],
  },
  {
    path: ROUTES.DASHBOARD.index,
    element: <Dashboard />,
    isPrivate: true,
    requiredPermissions: [],
  },
  {
    path: ROUTES.BOOKING.LIST,
    element: <BookingList />,
    isPrivate: true,
    requiredPermissions: [],
  },
  {
    path: ROUTES.BOOKING.CREATE,
    element: <BookingCreate />,
    isPrivate: true,
    requiredPermissions: [],
  },
];
