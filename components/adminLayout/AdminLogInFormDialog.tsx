"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { X, Lock, Mail, Loader2 } from "lucide-react"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import useModal from "../modal/useModal"
import { loginAdmin } from "@/services/authService"


// Define login schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function AdminLogInFormDialog() {
    const { close } = useModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        setIsLoading(true)
        try {
            const response = await loginAdmin(values)

            if (response.success) {
                toast.success("Login successful")
                close(["modal"])

                window.location.replace("/dashboard");
                router.refresh()
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            const message = err.response?.data?.message || err.message || "Something went wrong";
            toast.error(message);
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md border-none shadow-none bg-background">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div>
                    <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
                    <p className="text-sm text-muted-foreground">Sign in to manage job listings</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => close(["modal"])}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="pt-8">
                <form id="admin-login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup className="space-y-4">
                        {/* Email Input */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Default : admin@example.com"
                                        disabled={isLoading}
                                        className="bg-muted/10"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />

                        {/* Password Input */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Default : @Admin123"
                                        disabled={isLoading}
                                        className="bg-muted/10"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Button
                        type="submit"
                        className="w-full font-bold h-12"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Login to Dashboard"
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t py-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Secure Admin Access Only
                </p>
            </CardFooter>
        </Card>
    )
}