import { serverBaseUrl } from "@/lib/baseUrl";
import { IJob } from "@/lib/types/job";


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

// create job (admin only)
export const createJob = async (jobData: IJob) => {
    const response = await serverBaseUrl.post('/jobs', jobData);
    return response?.data;
};

// delete job (admin only)
export const deleteJob = async (id: string) => {
  const response = await serverBaseUrl.delete(`/jobs/${id}`);
  return response?.data;
};

