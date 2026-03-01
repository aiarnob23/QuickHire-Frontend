'use client';

import { ArrowRight, Briefcase, Megaphone, Wallet, Monitor, Code2, BarChart3, Palette, Users } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { title: 'Design', jobs: 235, icon: Palette },
    { title: 'Sales', jobs: 756, icon: BarChart3 },
    { title: 'Marketing', jobs: 140, icon: Megaphone },
    { title: 'Finance', jobs: 325, icon: Wallet },
    { title: 'Technology', jobs: 436, icon: Monitor },
    { title: 'Engineering', jobs: 542, icon: Code2 },
    { title: 'Business', jobs: 211, icon: Briefcase },
    { title: 'Human Resource', jobs: 346, icon: Users },
];

export default function ExploreByCategories() {
    return (
        <section className="mt-12 md:mt-32">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-14">
                    <h2 className="text-xl md:text-5xl font-bold text-heading">
                        Explore by <span className="text-secondary">category</span>
                    </h2>

                    <Link
                        href='/jobs'
                        className="text-primary text-sm md:text-xl font-semibold flex items-center gap-2"
                    >
                        Show all jobs
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;

                        return (
                            <Link
                                href="/jobs"
                                key={index}
                                className="cat-card group border border-border rounded-xl p-4 md:p-8 cursor-pointer
                                           transition-all duration-300
                                           hover:bg-primary hover:text-card
                                           hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
                                style={{ animationDelay: `${index * 0.07}s` }}
                            >
                                <div className="ripple-el" />

                                <Icon
                                    className="cat-icon mb-6 text-primary group-hover:text-card"
                                    size={48}
                                />

                                <h3 className="text-xl font-semibold mb-3 text-heading group-hover:text-card transition-colors">
                                    {cat.title}
                                </h3>

                                <div className="flex items-center justify-between text-sm text-muted group-hover:text-card transition-colors">
                                    <span>{cat.jobs} jobs available</span>
                                    <ArrowRight size={16} className="cat-arrow" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}