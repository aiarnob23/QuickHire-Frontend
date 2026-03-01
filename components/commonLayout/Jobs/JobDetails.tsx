import { IJob } from '@/lib/types/job';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Globe, 
  Layers, 
  CheckCircle, 
  Building2,
  Calendar
} from 'lucide-react';
import Image from 'next/image';

interface JobDetailsProps {
  job: IJob;
}

export default function JobDetailsComponent({ job }: JobDetailsProps) {
  if (!job) return null;

  // Helper to format enum strings to readable labels
  const formatEnum = (str: string) => str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className=" border border-muted/20 bg-muted/10 rounded-2xl p-4 md:p-8 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6  items-start justify-between border-b border-border pb-10">
        <div className="flex gap-5">
          {job.companyLogo ? (
            <Image
              src={job.companyLogo} 
              alt={job.company} 
              height={80}
              width={80}
              className="w-20 h-20 rounded-2xl border border-border object-contain bg-card p-2"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl border border-border bg-muted flex items-center justify-center">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-heading tracking-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-subheading items-center">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-4 h-4 text-primary" /> {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> {job.location}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                {formatEnum(job.jobType)}
              </span>
            </div>
          </div>
        </div>

        {job.salaryRange && (
          <div className="p-4 rounded-2xl bg-secondary/14 border border-border min-w-50 text-center md:text-right">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Salary Range</p>
            <div className="text-2xl font-bold text-heading mt-1">
              {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-chart-2/30 bg-card">
              <Globe className="w-5 h-5 text-chart-2 mb-2" />
              <p className="text-xs text-muted-foreground">Work Setting</p>
              <p className="text-sm font-semibold">{formatEnum(job.workSetting)}</p>
            </div>
            <div className="p-4 rounded-xl border border-chart-3/30 bg-card">
              <Layers className="w-5 h-5 text-chart-3 mb-2" />
              <p className="text-xs text-muted-foreground">Experience</p>
              <p className="text-sm font-semibold">{job.experienceLevel || 'Not Specified'}</p>
            </div>
            <div className="p-4 rounded-xl border border-chart-4/30 bg-card">
              <Clock className="w-5 h-5 text-chart-4 mb-2" />
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold">{formatEnum(job.status)}</p>
            </div>
            <div className="p-4 rounded-xl border border-chart-5/30 bg-card">
              <Calendar className="w-5 h-5 text-chart-5 mb-2" />
              <p className="text-xs text-muted-foreground">Posted On</p>
              <p className="text-sm font-semibold">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-heading mb-4">Job Description</h3>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Requirements & Responsibilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-heading">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-heading">Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((res, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-muted/30 sticky top-8">
            <h4 className="font-bold text-heading mb-4">Job Categories</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {job.categories.map((cat) => (
                <span key={cat} className="px-3 py-1 bg-card text-foreground text-sm rounded-lg border border-border">
                  {cat}
                </span>
              ))}
            </div>

            {job.companyWebsite && (
              <a 
                href={job.companyWebsite} 
                target="_blank" 
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-card text-muted-foreground font-semibold hover:bg-primary/5 transition-colors"
              >
                Visit Company Website <Globe className="w-4 h-4" />
              </a>
            )}
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.applicants?.length || 0} People Applied
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}