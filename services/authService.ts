import { serverBaseUrl } from "@/lib/baseUrl";

/**
 * Handle admin login 
 * @param loginData { email, password }
 */
export const loginAdmin = async (loginData: any) => {
    const response = await serverBaseUrl.post('/auth/login', loginData);
    return response.data;
};