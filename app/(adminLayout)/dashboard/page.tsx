"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getAllJobs, deleteJob } from "@/services/jobServices";
import { IJob } from "@/lib/types/job";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useModal from "@/components/modal/useModal";
import Modals from "@/components/modal";

export default function AdminDashboardJobPage() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const router = useRouter();
    const { open } = useModal();

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getAllJobs();
            setJobs(data);
        };

        fetchJobs();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteJob(id);
        setJobs((prev) => prev.filter((job) => job._id !== id));
        router.refresh();
    };

    return (
        <div className="p-8">
            <div className="flex  justify-between mb-4 ">
                <h1 className="text-2xl font-semibold mb-6">All Jobs</h1>
                <Button
                    onClick={() => open([{ modalId: "modal", openId: "add-job" }])}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={18} /> Add Job
                </Button>

            </div>
            <div className="rounded-xl border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-4 py-3">Title</TableHead>
                            <TableHead className="px-4 py-3">Company</TableHead>
                            <TableHead className="px-4 py-3">Location</TableHead>
                            <TableHead className="px-4 py-3">Type</TableHead>
                            <TableHead className="px-4 py-3">Work Setting</TableHead>
                            <TableHead className="px-4 py-3">Status</TableHead>
                            <TableHead className="px-4 py-3">Salary</TableHead>
                            <TableHead className="px-4 py-3">Featured</TableHead>
                            <TableHead className="px-4 py-3">Created</TableHead>
                            <TableHead className="px-4 py-3 text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="px-4 py-3 font-medium">
                                    {job.title}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.company}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.location}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.jobType.replace("_", " ").toUpperCase()}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.workSetting.replace("_", " ").toUpperCase()}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    <Badge variant="outline">
                                        {job.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.salaryRange
                                        ? `${job.salaryRange.currency} ${job.salaryRange.min} - ${job.salaryRange.max}`
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {job.isFeatured ? (
                                        <Badge className="bg-green-500">Yes</Badge>
                                    ) : (
                                        <Badge variant="secondary">No</Badge>
                                    )}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="px-4 py-3 text-center">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="text-red-500 hover:text-red-700 transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently
                                                    delete the job.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(job._id)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Modals />
        </div>
    );
}