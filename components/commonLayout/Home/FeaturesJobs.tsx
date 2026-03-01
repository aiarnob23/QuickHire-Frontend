
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedJobs } from '@/services/jobServices';
import { IJob } from '@/lib/types/job';
import JobCard from '../Jobs/JobCard';

export default async function FeaturedJobsSection() {
    const jobs = await getFeaturedJobs();

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-heading">
                        Featured <span className="text-secondary">jobs</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all"
                    >
                        Show all jobs
                        <ArrowRight size={18} />
                    </Link>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {jobs.map((job: IJob) => (
                        <><JobCard job={job} /></>
                    ))}
                </div>

            </div>
        </section>
    );
}