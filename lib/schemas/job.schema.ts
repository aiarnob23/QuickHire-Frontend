import * as z from "zod"
import {
  JobType,
  WorkSetting,
  ExperienceLevel,
  SalaryCurrency,
  JobStatus,
} from "@/lib/types/job"

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),

  jobType: z.nativeEnum(JobType),
  workSetting: z.nativeEnum(WorkSetting),
  status: z.nativeEnum(JobStatus),

  experienceLevel: z.nativeEnum(ExperienceLevel).optional(),

  categories: z.string().min(1, "At least one category required"),

  shortDescription: z.string().optional(),
  description: z.string().min(10, "Full description is required"),

  requirements: z.array(z.string().min(1, "Requirement cannot be empty")).min(1, "At least one requirement required"),

  responsibilities: z.array(z.string()).default([]), 
  salaryRange: z.object({
    min: z.coerce.number().min(0),
    max: z.coerce.number().min(0),
    currency: z.nativeEnum(SalaryCurrency),
  }).refine((data) => data.max >= data.min, {
    message: "Max salary must be greater than min salary",
    path: ["max"],
  }),

  companyWebsite: z.string().url().optional().or(z.literal("")),
  companyLogo: z.string().url().optional().or(z.literal("")),

  isFeatured: z.boolean().default(false),
  expiresAt: z.string().optional(),
})

export type JobFormValues = z.infer<typeof jobSchema>