import Link from 'next/link';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { formatJobType } from '@/lib/utils';
import { getCategoryStyles } from '@/lib/category-theme';
import { IJob } from '@/lib/types/job';

interface JobCardProps {
  job: IJob;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group border border-border bg-card rounded-xl 
                 p-4 md:p-6 
                 transition-all duration-300 
                 hover:shadow-lg hover:-translate-y-1"
    >
      {/* card top */}
      <div className="flex justify-between items-start">
        <Image
          src={job.companyLogo as string}
          alt="company logo"
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />

        <h5 className="px-2 md:px-3 py-1 
                       text-xs md:text-sm 
                       border border-primary/50 
                       rounded-lg md:rounded-xl 
                       text-primary whitespace-nowrap">
          {formatJobType(job.jobType)}
        </h5>
      </div>

      {/* card header */}
      <div className="my-4 md:my-5">
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

      {/* card description */}
      <p className="text-muted mt-2 text-xs md:text-sm line-clamp-3">
        {job.description}
      </p>

      {/* card bottom */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.categories.map((cat) => {
          const styles = getCategoryStyles(cat);

          return (
            <span
              key={cat}
              className={`px-3 md:px-4 py-1.5 md:py-2 
                         text-[10px] md:text-xs 
                         font-semibold rounded-full 
                         ${styles.bg} ${styles.text}`}
            >
              {cat}
            </span>
          );
        })}
      </div>
    </Link>
  );
}