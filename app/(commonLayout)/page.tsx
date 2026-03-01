import Banner from "@/components/commonLayout/Home/Banner";
import ExploreByCategories from "@/components/commonLayout/Home/ExploreByCategories";
import FeaturedJobsSection from "@/components/commonLayout/Home/FeaturesJobs";
import LatestJobsOpen from "@/components/commonLayout/Home/LatestJobs";
import { TrustedBy } from "@/components/commonLayout/Home/TrustedBy";



export default function HomePage() {
    return (
        <div className="">
            <Banner/>
            <TrustedBy title="Companies we helped grow"/>
            <ExploreByCategories/>
            <FeaturedJobsSection/>
            <LatestJobsOpen/>
        </div>
    );
}