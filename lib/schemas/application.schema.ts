import { z } from "zod";
import { ApplicationStatus, ExpectedSalaryCurrency } from "../types/application";

/**
 * Reusable optional URL field
 */
const optionalUrl = (label: string) =>
    z
        .string()
        .trim()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
            message: `Invalid ${label} URL`,
        });

export const applicationSchema = z
    .object({
        jobId: z.string().min(1),
        name: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email address"),
        phoneNumber: z
            .string()
            .min(11, "Phone number must be at least 11 digits"),
        resumeLink: z.string().url("Resume must be a valid URL"),
        portfolioLink: optionalUrl("portfolio"),
        linkedInProfileLink: optionalUrl("LinkedIn"),
        githubProfileLink: optionalUrl("GitHub"),
        totalYearsOfExperience: z
            .number()
            .min(0, "Experience cannot be negative")
            .max(50),
        currentCompany: z.string().optional(),
        currentDesignation: z.string().optional(),
        expectedSalary: z.object({
            amount: z.number().min(1, "Salary must be greater than 0"),
            currency: z.nativeEnum(ExpectedSalaryCurrency),
        }),
        noticePeriodInMonths: z.number().min(0),
        isImmediatelyAvailable: z.boolean(),
        coverNote: z.string().max(1000).optional(),
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