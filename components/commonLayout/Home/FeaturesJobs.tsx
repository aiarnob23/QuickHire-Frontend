
import Link from 'next/link';
import { ArrowRight, Dot } from 'lucide-react';
import Image from 'next/image';
import { formatJobType } from '@/lib/utils';
import { getCategoryStyles } from '@/lib/category-theme';
import { getFeaturedJobs } from '@/services/jobServices';
import { IJob } from '@/types/job';

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
                        <Link
                            key={job._id.toString()}
                            href={`/jobs/${job._id}`}
                            className="group border border-border bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >

                            {/*card top */}
                            <div className='flex  justify-between'>
                                <Image
                                    src={job.companyLogo as string}
                                    alt="company logo"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12"
                                />
                                <h5 className='border border-primary px-3 flex rounded-sm justify-center text-primary items-center'>{formatJobType(job.jobType)}</h5>
                            </div>

                            {/* card header */}
                            <div className='my-5'>
                                <h3 className="text-xl font-semibold text-heading">{job.title}</h3>
                                <p className=" text-subheading text-sm flex items-center">{job.company} <Dot /> {job.location}</p>
                            </div>

                            {/* card description */}
                            <p className="text-muted mt-2 text-sm">{job.description}</p>

                            {/* card bottom   */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {job.categories.map((cat) => {
                                    const styles = getCategoryStyles(cat);

                                    return (
                                        <span
                                            key={cat}
                                            className={`px-4 py-2 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}
                                        >
                                            {cat}
                                        </span>
                                    );
                                })}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}