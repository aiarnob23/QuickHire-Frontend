import JobCard from "@/components/commonLayout/Jobs/JobCard";
import JobFilters from "@/components/commonLayout/Jobs/JobFilters";
import { getAllJobs } from "@/services/jobServices";
import { IJob } from "@/lib/types/job";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function JobListings({ searchParams }: PageProps) {
  // searchParams
  const filters = await searchParams;
  
  //filters -> backend
  const jobs = await getAllJobs({
    search: filters.search,
    category: filters.category,
    location: filters.location,
  });

  return (
    <div className="container mx-auto my-20 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold text-heading">Job <span className="text-secondary">Listings</span></h1>
      </div>

      {/* Filtering Section */}
      <section className="mb-10">
        <JobFilters />
      </section>

      {/* Job List Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {jobs && jobs.length > 0 ? (
          jobs.map((job: IJob) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No jobs found</p>
          </div>
        )}
      </section>
    </div>
  );
}