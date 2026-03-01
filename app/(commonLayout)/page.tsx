import Banner from "@/components/commonLayout/Home/Banner";
import ExploreByCategories from "@/components/commonLayout/Home/ExploreByCategories";
import { TrustedBy } from "@/components/commonLayout/Home/TrustedBy";



export default function HomePage() {
    return (
        <div className="">
            <Banner/>
            <TrustedBy title="Companies we helped grow"/>
            <ExploreByCategories/>
        </div>
    );
}