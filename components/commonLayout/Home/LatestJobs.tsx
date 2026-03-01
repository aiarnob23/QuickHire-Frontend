'use client';
import BG from '@/public/images/home/LatestJobBG.jpg';

import Link from 'next/link';
import { ArrowRight, Dot } from 'lucide-react';
import { IJob, JobStatus, JobType, WorkSetting, } from '@/types/job';
import Image from 'next/image';
import { formatJobType } from '@/lib/utils';
import { getCategoryStyles } from '@/lib/category-theme';

const featuredJobs: IJob[] = [
    {
        _id: '1',
        title: 'Email Marketing Specialist',
        company: 'Revolut',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'Madrid, Spain',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.REMOTE,
        categories: ['Marketing', 'Design'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
    {
        _id: '2',
        title: 'Brand Designer',
        company: 'Dropbox',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'San Francisco, US',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.HYBRID,
        categories: ['Design', 'Business'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
    {
        _id: '3',
        title: 'Data Analyst',
        company: 'Twitter',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'San Diego, US',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.ON_SITE,
        categories: ['Technology'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
    {
        _id: '4',
        title: 'Product Designer',
        company: 'ClassPass',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'Manchester, UK',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.REMOTE,
        categories: ['Design', 'Marketing'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
    {
        _id: '5',
        title: 'Email Marketing Specialist',
        company: 'Revolut',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'Madrid, Spain',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.REMOTE,
        categories: ['Marketing', 'Design'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
    {
        _id: '6',
        title: 'Brand Designer',
        company: 'Dropbox',
        companyLogo: 'https://imgs.search.brave.com/1BkkDIfCXrB7CIVYsoSceKHsU_erj4Jwnj-s3LoVhJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmM1MDNkMDgxYjJm/MDEyMzY5ZmM1ZDIv/Njc0MDAwZDZjMGE0/MmQ0MWY4YzMzMWJl/X2Ryb3Bib3gtMi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc',
        location: 'San Francisco, US',
        jobType: JobType.FULL_TIME,
        workSetting: WorkSetting.HYBRID,
        categories: ['Design', 'Business'],
        description: 'Full job description...',
        requirements: [],
        status: JobStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFeatured: true,
    },
];


export default function LatestJobsOpen() {
    const jobs = featuredJobs.filter(job => job.isFeatured);

    return (
        <section
            className=" min-h-screen bg-cover bg-no-repeat flex items-center"
            style={{
                backgroundImage: `url(${BG.src})`,
            }}
        >
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-heading">
                        Latest <span className="text-secondary">jobs</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">

                    {jobs.map((job) => (
                        <Link
                            key={job._id.toString()}
                            href={`/jobs/${job._id}`}
                            className="group border border-border bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className='flex items-center gap-8'>
                                <div className=''>
                                    <Image
                                        src={job.companyLogo as string}
                                        alt="company logo"
                                        width={64}
                                        height={64}
                                        className="w-12 h-12"
                                    />

                                </div>

                                <div>
                                    <div className='my-5'>
                                        <h3 className="text-xl font-semibold text-heading">{job.title}</h3>
                                        <p className=" text-subheading text-sm flex items-center">{job.company} <Dot /> {job.location}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div>
                                            <h5 className='px-4 py-2 text-xs text-medium rounded-full border border-chart-2 text-chart-2 font-semibold '>{formatJobType(job.jobType)}</h5>
                                        </div>
                                        <span className='border-r text-muted h-8' />
                                        <div className=" flex flex-wrap gap-2">
                                            {job.categories.map((cat) => {
                                                const styles = getCategoryStyles(cat);

                                                return (
                                                    <span
                                                        key={cat}
                                                        className={`px-4 py-2 text-xs rounded-full font-semibold ${styles.border} ${styles.text}`}
                                                    >
                                                        {cat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}