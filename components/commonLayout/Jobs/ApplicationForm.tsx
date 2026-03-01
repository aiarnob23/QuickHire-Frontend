"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Loader2,
    Send,
    Phone,
    Linkedin,
    Github,
    Globe,
    Calendar,
} from "lucide-react";
import { ApplicationFormValues, applicationSchema } from "@/lib/schemas/application.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationStatus, ExpectedSalaryCurrency, IApplication } from "@/lib/types/application";

interface ApplyFormProps {
    jobId: string;
}

export default function ApplyForm({
    jobId,
}: ApplyFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        mode: "onChange",
        defaultValues: {
            jobId,
            status: ApplicationStatus.PENDING,
            isImmediatelyAvailable: false,
            totalYearsOfExperience: 0,
            noticePeriodInMonths: 0,
            expectedSalary: {
                amount: 0,
                currency: ExpectedSalaryCurrency.BDT,
            },
        },
    });

    const isImmediatelyAvailable = watch("isImmediatelyAvailable");

    const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
        setIsSubmitting(true);

        try {
            const payload: Omit<
                IApplication,
                "_id" | "createdAt" | "updatedAt"
            > = {
                ...data,
                portfolioLink: data.portfolioLink || undefined,
                linkedInProfileLink: data.linkedInProfileLink || undefined,
                githubProfileLink: data.githubProfileLink || undefined,
                noticePeriodInMonths: data.isImmediatelyAvailable
                    ? 0
                    : data.noticePeriodInMonths,
            };

            console.log("Submitting:", payload);

            await new Promise((r) => setTimeout(r, 1500));
            reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    const ErrorMessage = ({
        message,
    }: {
        message?: string;
    }) =>
        message ? (
            <p className="text-sm text-destructive mt-1">
                {message}
            </p>
        ) : null;

    const RequiredMark = () => (
        <span className="text-destructive ml-1">*</span>
    );

    return (
        <section className="mt-16 border-muted/20 bg-muted/10 rounded-3xl border shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b">
                <h2 className="text-2xl font-bold">
                    Application Form
                </h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 space-y-8"
            >
                {/* PERSONAL INFO */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <Label className="mb-2">
                            Full Name <RequiredMark />
                        </Label>
                        <Input {...register("name")} />
                        <ErrorMessage message={errors.name?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">
                            Email <RequiredMark />
                        </Label>
                        <Input type="email" {...register("email")} />
                        <ErrorMessage message={errors.email?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">
                            <Phone className="w-3 h-3 inline mr-1" />
                            Phone Number (Ex:01xxxxxxxxx) <RequiredMark />
                        </Label>
                        <Input {...register("phoneNumber")} />
                        <ErrorMessage message={errors.phoneNumber?.message} />
                    </div>
                </div>

                {/* LINKS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label className="mb-2">
                            Resume Link <RequiredMark />
                        </Label>
                        <Input {...register("resumeLink")} />
                        <ErrorMessage message={errors.resumeLink?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">
                            <Linkedin className="w-3 h-3 inline mr-1" />
                            LinkedIn
                        </Label>
                        <Input {...register("linkedInProfileLink")} />
                        <ErrorMessage message={errors.linkedInProfileLink?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">
                            <Github className="w-3 h-3 inline mr-1" />
                            GitHub
                        </Label>
                        <Input {...register("githubProfileLink")} />
                        <ErrorMessage message={errors.githubProfileLink?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">
                            <Globe className="w-3 h-3 inline mr-1" />
                            Portfolio
                        </Label>
                        <Input {...register("portfolioLink")} />
                        <ErrorMessage message={errors.portfolioLink?.message} />
                    </div>
                </div>

                {/* EXPERIENCE */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <Label className="mb-2">
                            Experience (Years) <RequiredMark />
                        </Label>
                        <Input
                            type="number"
                            {...register("totalYearsOfExperience", {
                                valueAsNumber: true,
                            })}
                        />
                        <ErrorMessage message={errors.totalYearsOfExperience?.message} />
                    </div>

                    <div>
                        <Label className="mb-2">Current Company</Label>
                        <Input {...register("currentCompany")} />
                    </div>

                    <div>
                        <Label className="mb-2">Current Designation</Label>
                        <Input {...register("currentDesignation")} />
                    </div>
                </div>

                {/* SKILLS & SALARY */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* <div>
                        <Label className="mb-2">
                            Skills (comma separated) <RequiredMark />
                        </Label>
                        <Input {...register("skills")} />
                        <ErrorMessage message={errors.skills?.message} />
                    </div> */}

                    <div>
                        <Label className="mb-2">
                            Expected Salary (BDT) <RequiredMark />
                        </Label>
                        <Input
                            type="number"
                            {...register("expectedSalary.amount", {
                                valueAsNumber: true,
                            })}
                        />
                        <ErrorMessage message={errors.expectedSalary?.amount?.message} />
                    </div>
                </div>

                {/* AVAILABILITY */}
                <div className="grid md:grid-cols-2 gap-6 items-end">
                    <div>
                        <Label className="mb-2">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Notice Period (Months) <RequiredMark />
                        </Label>
                        <Input
                            type="number"
                            disabled={isImmediatelyAvailable}
                            {...register("noticePeriodInMonths", {
                                valueAsNumber: true,
                            })}
                        />
                        <ErrorMessage message={errors.noticePeriodInMonths?.message} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={isImmediatelyAvailable}
                            onCheckedChange={(checked) =>
                                setValue("isImmediatelyAvailable", !!checked)
                            }
                        />
                        <Label>Immediately Available</Label>
                    </div>
                </div>

                {/* COVER NOTE */}
                <div>
                    <Label className="mb-2">Cover Note</Label>
                    <Textarea {...register("coverNote")} />
                    <ErrorMessage message={errors.coverNote?.message} />
                </div>

                {/* SUBMIT */}
                <div className="pt-4 border-t">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Submit Application
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </section>
    );
}