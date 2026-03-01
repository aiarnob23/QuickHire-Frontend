import { serverBaseUrl } from "@/lib/baseUrl";

/**
 * Handle admin login 
 * @param loginData { email, password }
 */
export const loginAdmin = async (loginData: any) => {
    const response = await serverBaseUrl.post('/auth/login', loginData);
    
    // Store token if login is successful
    if (response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    
    return response.data;
};