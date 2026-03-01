import Image from "next/image"
import Vector from "@/public/images/home/Vector.jpg";
import HeroBG from "@/public/images/home/Banner.jpg";
import JobSearchBar from "./JobSearchBar";


export default function Banner() {
    return (
        <div
            className="min-h-150 md:min-h-screen px-4 md:px-0 bg-cover bg-no-repeat -mt-1 md:-mt-20 flex items-center"
            style={{
                backgroundImage: `url(${HeroBG.src})`,
                backgroundPosition: 'center 0%'
            }}
        >
            <section className="container mx-auto">
                <h1 className="text-3xl md:text-7xl font-bold md:max-w-lg md:leading-20">Discover more than <span className="text-secondary">5000+ Jobs</span></h1>
                <Image
                    src={Vector}
                    alt="vector"
                    width={500}
                    height={500}
                    className=""
                />
                <p className="text-muted max-w-xl mt-8 font-normal text-sm md:text-xl">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                <JobSearchBar />
                <p className="text-subheading text-sm mt-6">Popular : UI Designer, UX Researcher, Android, Admin</p>
            </section>
        </div>
    )
}
