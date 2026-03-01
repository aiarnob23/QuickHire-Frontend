import BG from '@/public/images/home/LatestJobBG.jpg';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllJobs } from '@/services/jobServices';
import { IJob } from '@/lib/types/job';
import LatestJobCard from '../Jobs/LatestJobCard';

export default async function LatestJobsOpen() {
    const jobs = await getAllJobs();

    return (
        <section
            className="py-12 mt-12 md:mt-32 bg-cover bg-no-repeat flex items-center"
            style={{
                backgroundImage: `url(${BG.src})`,
            }}
        >
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-14">
                    <h2 className="text-xl md:text-5xl font-bold text-heading">
                        Latest <span className="text-secondary md:-ml-1.5">jobs Open</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all text-sm md:text-xl"
                    >
                        Show all jobs
                        <ArrowRight size={18} />
                    </Link>
                </div>


                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">

                    {jobs.map((job: IJob) => (
                        <LatestJobCard key={job._id} job={job} />
                    ))}
                </div>

            </div>
        </section>
    );
}