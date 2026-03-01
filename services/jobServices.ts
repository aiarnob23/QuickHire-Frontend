import { serverBaseUrl } from "@/lib/baseUrl";


//get all jobs
export const getAllJobs = async (params?: {
    search?: string;
    category?: string;
    location?: string;
    workSetting?: string;
}) => {
    const response = await serverBaseUrl.get('/jobs', {
        params,
    });

    return response?.data?.data;
};

//get featured jobs
export const getFeaturedJobs = async () => {
    const response = await serverBaseUrl.get('/jobs/featured');
    return response?.data?.data;
}
//get job by id
export const getJobById = async (id: string) => {
    console.log(id)
    const response = await serverBaseUrl.get(`/jobs/${id}`);
    return response?.data?.data;
}