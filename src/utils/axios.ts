// axios.js
import Axios from "axios";
import { API_URL } from "../app/consts";
import { Cookies } from "react-cookie"
import { notification } from "antd";

const axios = Axios.create({});

const cookies = new Cookies();

axios.defaults.timeout = 120000; // Milliseconds
axios.interceptors.request.use(
    async function (config) {

        const access_token = cookies.get("token");

        if (access_token) {
            config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        config.baseURL = API_URL;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        console.log("axios error", error);

        if (error?.response?.status === 401 || error?.response?.status === 403) {
            cookies.remove("token");
            notification.error({
                message: "Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
            window.location.href = "/login";
        }
        if (error?.response?.status === 400) {
            notification.error({
                message: "Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
        if (error?.response?.status === 404) {
            // Handle not found error
        }
        if (error?.response?.status === 500) {
            // Handle internal server error
        }

        // Preserve the full error object
        return Promise.reject(error);
    }
);

export default axios;