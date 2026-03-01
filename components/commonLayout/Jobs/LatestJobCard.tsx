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
      className="group border border-border bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center gap-8">
        <div>
          <Image
            src={job.companyLogo as string}
            alt="company logo"
            width={64}
            height={64}
            className="w-12 h-12"
          />
        </div>

        <div>
          <div className="my-5">
            <h3 className="text-xl font-semibold text-heading">
              {job.title}
            </h3>
            <p className="text-subheading text-sm flex items-center">
              {job.company} <Dot /> {job.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <h5 className="px-4 py-2 text-xs text-medium rounded-full border border-chart-2 text-chart-2 font-semibold">
                {formatJobType(job.jobType)}
              </h5>
            </div>

            <span className="border-r text-muted h-8" />

            <div className="flex flex-wrap gap-2">
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
  );
}