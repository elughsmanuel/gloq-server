import axios from "axios";

export const apiTiingoRequest = axios.create({
    baseURL: process.env.API_TIINGO_BASE_URL as string,
    params: {
        token: process.env.API_TIINGO_API_TOKEN as string,
    },
});
