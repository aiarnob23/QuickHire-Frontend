
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedJobs } from '@/services/jobServices';
import { IJob } from '@/lib/types/job';
import JobCard from '../Jobs/JobCard';

export default async function FeaturedJobsSection() {
    const jobs = await getFeaturedJobs();

    return (
        <section className="mt-32">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-14">
                    <h2 className="text-xl  md:text-5xl  font-bold text-heading">
                        Featured <span className="text-secondary -ml-1.5">jobs</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="flex text-sm md:text-xl items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
                    >
                        Show all jobs
                        <ArrowRight size={18} />
                    </Link>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {jobs.map((job: IJob) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>

            </div>
        </section>
    );
}