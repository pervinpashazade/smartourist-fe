import "antd/dist/reset.css";
import "./assets/scss/main.scss";

// import ErrorBoundary from "./components/ErrorBoundary";
import AppRouter from "./routes/AppRoutes";
import { CookiesProvider } from "react-cookie";
import { ConfigProvider } from "antd";

export const App: React.FC = () => {
  return (
    <div className="app">
      {/* <ErrorBoundary> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7f54ff",
            colorBgBase: "#eaeff9",
            colorBgContainer: "#eaeff9",
          },
        }}
      >
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <AppRouter />
        </CookiesProvider>
      </ConfigProvider>
      {/* </ErrorBoundary> */}
    </div>
  );
};
