import axios from "axios";

export const serverBaseUrl = axios.create({
    //baseURL:"http://localhost:4000/api",
    baseURL:"https://quickhire-backend-production-e3a4.up.railway.app/api",
    withCredentials:true,
}) 