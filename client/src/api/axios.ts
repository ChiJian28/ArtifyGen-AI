// using global axios instance

import Axios from "axios";

if (!import.meta.env.VITE_FRONTEND_PUBLIC_API_BASE_URL) {
    console.error("env variable not set: VITE_FRONTEND_PUBLIC_API_BASE_URL");
}   

// if (process.env.VITE_PUBLIC_API_BASE_URL) {
//     console.error("env variable not set: VITE_PUBLIC_API_BASE_URL");
// }

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_FRONTEND_PUBLIC_API_BASE_URL,
});