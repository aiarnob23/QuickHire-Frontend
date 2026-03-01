import Image from "next/image"
import Vector from "@/public/images/home/Vector.jpg";
import HeroBG from "@/public/images/home/Banner.jpg";


export default function Banner() {
    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat flex items-center"
            style={{
                backgroundImage: `url(${HeroBG.src})`,
                backgroundPosition: 'center 0%'
            }}
        >
            <section className="container mx-auto">
                <h1 className="text-7xl font-bold max-w-sm">Discover more than <span className="text-secondary">5000+ Jobs</span></h1>
                <Image
                    src={Vector}
                    alt="vector"
                    width={500}
                    height={500}
                />
                <p className="text-muted max-w-xl font-normal text-xl">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
            </section>
        </div>
    )
}
