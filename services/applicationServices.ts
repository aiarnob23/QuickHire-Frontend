import { serverBaseUrl } from "@/lib/baseUrl";
import type { ApplicationFormValues } from "@/lib/schemas/application.schema";

export const createApplication = async (
    data: ApplicationFormValues
) => {
    try {
        const response = await serverBaseUrl.post(
            "/applications",
            data
        );

        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(
                error.response.data?.message || "Failed to create application"
            );
        }

        throw new Error("Network error. Please try again.");
    }
};