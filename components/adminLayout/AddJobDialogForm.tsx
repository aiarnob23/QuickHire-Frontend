"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { X, Plus, Trash2 } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJob } from "@/services/jobServices"
import { JobType, WorkSetting, ExperienceLevel, SalaryCurrency, JobStatus } from "@/lib/types/job"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import useModal from "../modal/useModal"

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.nativeEnum(JobType),
  workSetting: z.nativeEnum(WorkSetting),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  description: z.string().min(10, "Description is required"),
  requirements: z.array(z.string()).min(1, "Add at least one requirement"),
  salaryRange: z.object({
    min: z.coerce.number(),
    max: z.coerce.number(),
    currency: z.nativeEnum(SalaryCurrency),
  }),
  categories: z.string().min(1, "Category is required"),
})

type JobFormValues = z.infer<typeof jobSchema>

export function AddJobFormDialog() {
  const { close } = useModal()
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      jobType: JobType.FULL_TIME,
      workSetting: WorkSetting.ON_SITE,
      experienceLevel: ExperienceLevel.JUNIOR,
      description: "",
      requirements: [""],
      salaryRange: { min: 0, max: 0, currency: SalaryCurrency.BDT },
      categories: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements" as never,
  })

  const onSubmit = async (values: JobFormValues) => {
    try {
      const payload = {
        ...values,
        categories: values.categories.split(",").map(c => c.trim())
      }
      await createJob(payload)
      toast.success("Job created successfully")
      close(["modal"])
    } catch (error: any) {
      toast.error("Failed to create job")
    }
  }

  return (
    <Card className="w-full max-w-2xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-xl">Add New Job</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => close(["modal"])}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="pt-6 overflow-y-auto max-h-[70vh]">
        <form id="add-job-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Job Title</FieldLabel>
                  <Input {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input {...field} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid grid-cols-2 gap-4">
             <Controller
              name="jobType"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Job Type</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.values(JobType).map(v => <SelectItem key={v} value={v}>{v.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="workSetting"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Work Setting</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.values(WorkSetting).map(v => <SelectItem key={v} value={v}>{v.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="space-y-4">
            <FieldLabel>Requirements</FieldLabel>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input {...form.register(`requirements.${index}` as const)} placeholder="Requirement..." />
                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="secondary" size="sm" onClick={() => append("")}>
              <Plus className="h-4 w-4 mr-2" /> Add More
            </Button>
          </div>

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>
                <Textarea {...field} rows={4} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Button type="submit" form="add-job-form">Save Job</Button>
      </CardFooter>
    </Card>
  )
}