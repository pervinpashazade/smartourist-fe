import "./index.scss";

import React from "react";
import { Form, Input, Button, notification } from "antd";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../app/consts";
import { useAuth } from "../../../contexts/AuthContext";

interface ILoginFormValues {
  username: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogin = ({ username, password }: ILoginFormValues) => {
    setIsLoading(true);
    axios
      .post<ILoginFormValues, AxiosResponse<ILoginResponse>>(
        `${API_URL}/auth/login`,
        {
          username,
          password,
        }
      )
      .then(({ data }) => {
        console.log("login rsp", data.access_token);
        login(data.access_token);
      })
      .catch((error: any) => {
        notification.error({
          message: error.response?.data?.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <img src="/images/login-visual.webp" alt="visual" />
      </div>
      <div className="auth-page__main">
        <div className="auth-page__main__content">
          <div className="auth-page__main__content__logo">
            <img src="/SmartTourist-logo.webp" alt="logo" />
          </div>
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
