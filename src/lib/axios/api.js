import axios from "axios";

const baseURL = "https://api.cricapi.com/v1/";
axios.defaults.baseURL = `${baseURL}`;

const instance = axios.create();

instance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Accept: "application/json",
        };
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default instance;
