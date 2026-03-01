import { Button } from '@/components/ui/button';
import CTABG from '@/public/images/home/ctaBG.jpg';
import DashboardDemo from '@/public/images/home/dashboard.jpg';
import Image from 'next/image'

export default function CTA() {
    return (
        <div
            className="w-full mt-32 px-12 py-20 bg-cover container mx-auto bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${CTABG.src})`,
            }}
        >
            <div className="flex justify-between px-12">

                {/* Content */}
                <section className="flex items-start justify-center flex-col gap-6 text-center">
                    <h1 className="text-6xl max-w-lg leading-20 text-left font-bold text-primary-foreground">
                        Start posting jobs today
                    </h1>
                    <p className="text-primary-foreground text-xl font-medium">
                        Start posting jobs for only $10.
                    </p>
                    <Button className=" text-primary bg-card font-bold rounded-sm hover:bg-card cursor-pointer">
                        Sign Up For Free
                    </Button>
                </section>

                {/* dashboard image */}
                <section className='relative -bottom-20'>
                    <Image
                        src={DashboardDemo}
                        alt="dashboard demo"
                        width={600}
                        height={600}
                        className=''
                    />
                </section>

            </div>
        </div>
    );
}