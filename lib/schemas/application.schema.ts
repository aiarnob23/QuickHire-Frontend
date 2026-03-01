import { z } from "zod";
import { ApplicationStatus, ExpectedSalaryCurrency } from "../types/application";


export const applicationSchema = z
    .object({
        jobId: z.string().min(1),

        name: z.string().min(2, "Full name is required"),

        email: z.string().email("Invalid email address"),

        phoneNumber: z
            .string()
            .min(10, "Phone number must be at least 10 digits"),

        resumeLink: z.string().url("Resume must be a valid URL"),

        portfolioLink: z
            .string()
            .url("Invalid portfolio URL")
            .optional()
            .or(z.literal("")),

        linkedInProfileLink: z
            .string()
            .url("Invalid LinkedIn URL")
            .optional()
            .or(z.literal("")),

        githubProfileLink: z
            .string()
            .url("Invalid GitHub URL")
            .optional()
            .or(z.literal("")),

        totalYearsOfExperience: z
            .coerce.number()
            .min(0, "Experience cannot be negative")
            .max(50),
        currentCompany: z.string().optional(),
        currentDesignation: z.string().optional(),

        skills: z
            .string()
            .min(2, "At least one skill is required"),

        expectedSalary: z.object({
            amount: z.coerce
                .number()
                .min(1, "Salary must be greater than 0"),

            currency: z.nativeEnum(ExpectedSalaryCurrency),
        }),
        noticePeriodInMonths: z.number().min(0),

        isImmediatelyAvailable: z.boolean(),

        coverNote: z
            .string()
            .max(1000)
            .optional(),

        status: z.nativeEnum(ApplicationStatus),
    })
    .superRefine((data, ctx) => {
        if (!data.isImmediatelyAvailable && data.noticePeriodInMonths === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Notice period must be greater than 0 if not immediately available",
                path: ["noticePeriodInMonths"],
            });
        }
    });

export type ApplicationFormValues = z.infer<typeof applicationSchema>;