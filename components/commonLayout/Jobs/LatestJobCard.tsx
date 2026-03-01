import Link from 'next/link';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { formatJobType } from '@/lib/utils';
import { getCategoryStyles } from '@/lib/category-theme';
import { IJob } from '@/lib/types/job';

interface LatestJobCardProps {
  job: IJob;
}

export default function LatestJobCard({ job }: LatestJobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group border border-border bg-card rounded-xl 
                 p-4 md:p-6 
                 transition-all duration-300 
                 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        
        {/* Logo */}
        <div className="flex justify-start">
          <Image
            src={job.companyLogo as string}
            alt="company logo"
            width={64}
            height={64}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
        </div>

        {/* Content */}
        <div className="w-full">
          
          {/* Title + Company */}
          <div className="mb-4 md:my-5">
            <h3 className="text-lg md:text-xl font-semibold text-heading leading-tight">
              {job.title}
            </h3>
            <p className="text-subheading text-xs md:text-sm 
                          flex flex-wrap items-center gap-1">
              {job.company}
              <Dot size={14} />
              {job.location}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row 
                          md:items-center 
                          gap-3 md:gap-2">

            {/* Job Type */}
            <h5 className="px-3 md:px-4 py-1.5 md:py-2 
                           text-[10px] md:text-xs 
                           rounded-full border 
                           border-chart-2 text-chart-2 
                           font-semibold w-fit">
              {formatJobType(job.jobType)}
            </h5>

            {/* Divider (desktop only) */}
            <span className="hidden md:block border-r text-muted h-8" />

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {job.categories.map((cat) => {
                const styles = getCategoryStyles(cat);

                return (
                  <span
                    key={cat}
                    className={`px-3 md:px-4 py-1.5 md:py-2 
                               text-[10px] md:text-xs 
                               rounded-full font-semibold 
                               ${styles.border} ${styles.text}`}
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
  );
}