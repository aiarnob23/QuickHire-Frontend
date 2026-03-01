"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Resolver, Controller, useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { X, Plus, Trash2, Globe, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

import { createJob } from "@/services/jobServices"
import { JobType, WorkSetting, ExperienceLevel, SalaryCurrency, JobStatus, IJob } from "@/lib/types/job"
import useModal from "../modal/useModal"
import { useRouter } from "next/navigation"
import { jobSchema, JobFormValues } from "@/lib/schemas/job.schema"

export function AddJobFormDialog() {
    const { close } = useModal()
    const router = useRouter();

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema) as unknown as Resolver<JobFormValues>, 
        defaultValues: {
            title: "",
            company: "",
            location: "",
            jobType: JobType.FULL_TIME,
            workSetting: WorkSetting.ON_SITE,
            status: JobStatus.ACTIVE,
            experienceLevel: ExperienceLevel.JUNIOR,
            categories: "",
            description: "",
            requirements: [""],
            responsibilities: [],
            salaryRange: { min: 0, max: 0, currency: SalaryCurrency.BDT },
            isFeatured: false,
            shortDescription: "",
            companyWebsite: "",
            companyLogo: "",
            expiresAt: ""
        },
    })

    const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
        control: form.control,
        name: "requirements" as never, // Explicitly casting to stop 'never' error
    })

    const { fields: resFields, append: appendRes, remove: removeRes } = useFieldArray({
        control: form.control,
        name: "responsibilities" as never, // Explicitly casting to stop 'never' error
    })

    const onSubmit = async (values: JobFormValues) => {
        try {
            const payload = {
                ...values,
                categories: values.categories
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean),
                expiresAt: values.expiresAt ? new Date(values.expiresAt) : undefined,
            }

            await createJob(payload as unknown as IJob) 
            toast.success("Job published successfully")
            router.refresh()
            close(["modal"])
        } catch (error) {
            console.log(error)
            toast.error("Failed to publish job")
        }
    }

    return (
        <Card className="w-full max-w-3xl border-none shadow-none bg-background">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <CardTitle className="text-2xl font-bold">Create Job Posting</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => close(["modal"])}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="pt-6 overflow-y-auto max-h-[85vh]">
                <form id="add-job-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-l-4 border-primary pl-2">Basic Information</h3>
                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}><FieldLabel>Job Title</FieldLabel><Input {...field} /><FieldError errors={[fieldState.error]} /></Field>
                            )} />
                            <Controller name="company" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}><FieldLabel>Company Name</FieldLabel><Input {...field} /><FieldError errors={[fieldState.error]} /></Field>
                            )} />
                            <Controller name="location" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}><FieldLabel>Location</FieldLabel><Input {...field} /><FieldError errors={[fieldState.error]} /></Field>
                            )} />
                            <Controller name="categories" control={form.control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}><FieldLabel>Categories (comma separated)</FieldLabel><Input {...field} placeholder="Frontend, Nodejs" /><FieldError errors={[fieldState.error]} /></Field>
                            )} />
                        </FieldGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-l-4 border-primary pl-2">Settings & Status</h3>
                        <FieldGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Controller name="jobType" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Type</FieldLabel><Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(JobType).map(v => <SelectItem key={v} value={v}>{v.replace('_', ' ')}</SelectItem>)}</SelectContent></Select></Field>
                            )} />
                            <Controller name="workSetting" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Setting</FieldLabel><Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(WorkSetting).map(v => <SelectItem key={v} value={v}>{v.replace('_', ' ')}</SelectItem>)}</SelectContent></Select></Field>
                            )} />
                            <Controller name="experienceLevel" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Experience</FieldLabel><Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(ExperienceLevel).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></Field>
                            )} />
                            <Controller name="status" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Status</FieldLabel><Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(JobStatus).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></Field>
                            )} />
                        </FieldGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-l-4 border-primary pl-2">Salary & Compensation</h3>
                        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border bg-muted/20">
                            <Controller name="salaryRange.min" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Min Salary</FieldLabel><Input {...field} type="number" /></Field>
                            )} />
                            <Controller name="salaryRange.max" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Max Salary</FieldLabel><Input {...field} type="number" /></Field>
                            )} />
                            <Controller name="salaryRange.currency" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Currency</FieldLabel><Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(SalaryCurrency).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></Field>
                            )} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-l-4 border-primary pl-2">Job Description</h3>
                        <Controller name="shortDescription" control={form.control} render={({ field }) => (
                            <Field><FieldLabel>Short Summary</FieldLabel><Input {...field} placeholder="One-liner about the role" /></Field>
                        )} />
                        <Controller name="description" control={form.control} render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}><FieldLabel>Full Description</FieldLabel><Textarea {...field} rows={6} /><FieldError errors={[fieldState.error]} /></Field>
                        )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <FieldLabel className="font-bold">Requirements</FieldLabel>
                            {reqFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input {...form.register(`requirements.${index}` as const)} placeholder="Requirement..." />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeReq(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" className="w-full border-dashed" onClick={() => appendReq("")}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                        </div>

                        <div className="space-y-4">
                            <FieldLabel className="font-bold">Responsibilities</FieldLabel>
                            {resFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input {...form.register(`responsibilities.${index}` as const)} placeholder="Responsibility..." />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeRes(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" className="w-full border-dashed" onClick={() => appendRes("")}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-l-4 border-primary pl-2">Assets & Meta</h3>
                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller name="companyWebsite" control={form.control} render={({ field }) => (
                                <Field><FieldLabel className="flex items-center gap-2"><Globe className="w-4 h-4" /> Website URL</FieldLabel><Input {...field} /></Field>
                            )} />
                            <Controller name="companyLogo" control={form.control} render={({ field }) => (
                                <Field><FieldLabel className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Logo URL</FieldLabel><Input {...field} /></Field>
                            )} />
                            <Controller name="expiresAt" control={form.control} render={({ field }) => (
                                <Field><FieldLabel>Expiration Date</FieldLabel><Input {...field} type="date" /></Field>
                            )} />
                            <Controller name="isFeatured" control={form.control} render={({ field }) => (
                                <div className="flex items-center space-x-3 pt-8">
                                    <Checkbox id="featured" checked={field.value} onCheckedChange={field.onChange} />
                                    <label htmlFor="featured" className="text-sm font-bold cursor-pointer">Mark as Featured</label>
                                </div>
                            )} />
                        </FieldGroup>
                    </div>

                    <div className="border-t pt-8 flex justify-end gap-3 pb-6">
                        <Button variant="ghost" type="button" onClick={() => form.reset()}>Reset</Button>
                        <Button type="submit" className="px-10 font-bold">Publish Job Now</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}