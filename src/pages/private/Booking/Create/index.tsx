import "./index.scss";

import { Button, Divider, Steps } from "antd";
import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { PageHeader } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes/consts";
import { BookingSummary } from "./components/Summary";
import dayjs from "dayjs";

const BookingCreate = () => {
  const [current, setCurrent] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const STEPS = [
    { component: <Step1 setProgress={setProgress} /> },
    { component: <Step2 /> },
    { component: <Step3 setProgress={setProgress} /> },
    { component: <Step3 setProgress={setProgress} /> },
  ];
  const routes = [
    {
      path: ROUTES.DASHBOARD.index,
      breadcrumbName: "Dashboard",
    },
    {
      path: ROUTES.BOOKING.LIST,
      breadcrumbName: "Create Booking",
    },
  ];

  return (
    <div>
      <PageHeader
        style={{ marginBottom: ".5rem" }}
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
      />

      <Steps
        percent={progress}
        current={current}
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
        items={[
          {
            title: "Booking Details",
          },
          {
            title: "Addons",
          },
          {
            title: "Payment",
          },
          {
            title: "Overview",
          },
        ]}
      />

      <div className="booking-create">
        <div className="booking-create__body">
          <div>
            <div style={{ marginTop: 24 }}>{STEPS[current].component}</div>
          </div>
          <div>
            <BookingSummary
              yachtName="Azimut 53ft KAMI"
              guestsCount={2}
              addons={[
                {
                  name: "Jetski Supercharger 1.8L",
                  price: 500,
                  quantity: 2,
                },
                {
                  name: "Beef Kebab",
                  price: 139,
                  quantity: 3,
                },
              ]}
              bankFee={0}
              fromDate={dayjs("2025-08-01T00:04:00.000Z").format(
                "D MMM YYYY / HH:mm"
              )}
              toDate={dayjs("2025-08-01T08:00:00.000Z").format(
                "D MMM YYYY / HH:mm"
              )}
              subtotal={0}
              total={0}
              vat={0}
            />
          </div>
        </div>
        <div className="booking-create__footer">
          <Divider />
          <div className="booking-create__footer__actions">
            {current > 0 && (
              <Button size="large" onClick={prev} style={{ marginRight: 8 }}>
                Previous
              </Button>
            )}
            {current < STEPS.length - 1 ? (
              <Button type="primary" size="large" onClick={next}>
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={() => console.log("Finish")}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCreate;
