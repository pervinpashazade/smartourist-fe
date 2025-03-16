import { Content } from "antd/es/layout/layout";
import { PageHeader } from "@ant-design/pro-layout";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/consts";
import BookingTable from "./components/BookingTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback } from "react";

const routes = [
  {
    path: ROUTES.DASHBOARD.index,
    breadcrumbName: "Dashboard",
  },
  {
    path: ROUTES.BOOKING.LIST,
    breadcrumbName: "Booking List",
  },
];

const BookingList = () => {
  const navigate = useNavigate();

  const redirectToCreateBooking = useCallback(() => {
    navigate(ROUTES.BOOKING.CREATE);
  }, []);

  return (
    <>
      <PageHeader
        style={{ paddingBottom: "1rem" }}
        breadcrumb={{
          routes,
          itemRender(route, _, routes) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? (
              <span>{route.title}</span>
            ) : (
              <Link to={route.path as string}>{route.title}</Link>
            );
          },
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={redirectToCreateBooking}
        >
          Create Booking
        </Button>
      </PageHeader>
      <Content className="bg-wrapper">
        <BookingTable />
      </Content>
    </>
  );
};

export default BookingList;
