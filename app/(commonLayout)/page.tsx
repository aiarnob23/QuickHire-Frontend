import { Suspense } from "react";
import Banner from "@/components/commonLayout/Home/Banner";
import CTA from "@/components/commonLayout/Home/CTA";
import ExploreByCategories from "@/components/commonLayout/Home/ExploreByCategories";
import FeaturedJobsSection from "@/components/commonLayout/Home/FeaturesJobs";
import LatestJobsOpen from "@/components/commonLayout/Home/LatestJobs";
import { TrustedBy } from "@/components/commonLayout/Home/TrustedBy";
import Modals from "@/components/modal";

export default function HomePage() {
    return (
        <div>
            <Suspense fallback={null}>
                <Banner />
                <TrustedBy title="Companies we helped grow" />
                <ExploreByCategories />
                <CTA />
                <FeaturedJobsSection />
                <LatestJobsOpen />
                <Modals />
            </Suspense>
        </div>
    );
}