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
      className="group border border-border bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* card top */}
      <div className="flex justify-between">
        <Image
          src={job.companyLogo as string}
          alt="company logo"
          width={48}
          height={48}
          className="w-12 h-12"
        />
        <h5 className="border border-primary px-3 flex rounded-sm justify-center text-primary items-center">
          {formatJobType(job.jobType)}
        </h5>
      </div>

      {/* card header */}
      <div className="my-5">
        <h3 className="text-xl font-semibold text-heading">{job.title}</h3>
        <p className="text-subheading text-sm flex items-center">
          {job.company} <Dot /> {job.location}
        </p>
      </div>

      {/* card description */}
      <p className="text-muted mt-2 text-sm">{job.description}</p>

      {/* card bottom */}
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
  );
}