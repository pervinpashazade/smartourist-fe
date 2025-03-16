import { Button, Result } from "antd";
import { ROUTES } from "../../routes/consts";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      style={{
        height: "75dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      extra={
        <Button type="primary" href={ROUTES.DASHBOARD.index}>
          Back Dashboard
        </Button>
      }
    />
  );
};

export default NotFound;
