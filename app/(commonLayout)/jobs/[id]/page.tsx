import ApplyForm from "@/components/commonLayout/Jobs/ApplicationForm";
import JobDetailsComponent from "@/components/commonLayout/Jobs/JobDetails";
import { getJobById } from "@/services/jobServices";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetails({ params }: PageProps) {
  const { id } = await params;
  
  const job = await getJobById(id);

  return (
    <div className="container mx-auto py-8">
      <JobDetailsComponent job={job} />
      <div className="mt-10">
        <ApplyForm jobId={id} />
      </div>
    </div>
  );
}