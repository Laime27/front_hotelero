import axios from "@/lib/axiosConfig";

export const loginApi = (email: string, password: string) => {
    const response = axios.post("/login", {email, password})
    return response;
}


