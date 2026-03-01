import { serverBaseUrl } from "@/lib/baseUrl";


//get featured jobs
export const getFeaturedJobs = async () => {
    const response = await serverBaseUrl.get('/jobs/featured');
    return response?.data?.data;
}
