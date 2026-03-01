"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobSearchBar() {
    const router = useRouter();

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        const query = new URLSearchParams();

        if (keyword) query.append("search", keyword);
        if (location) query.append("location", location);

        router.push(`/jobs?${query.toString()}`);
    };

    return (
        <div className="bg-card mt-8
     shadow-md rounded-xl p-4 flex items-center max-w-5xl">

            {/* Keyword Input */}
            <div className="flex items-center gap-4 flex-1 pr-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full outline-none text-sm text-muted-foreground border-b pb-2"
                />
            </div>

            {/* Location Input */}
            <div className="flex items-center ml-3 gap-4 flex-1  pr-4">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full outline-none text-sm text-muted-foreground border-b pb-2"
                />
            </div>

            {/* Search Button */}
            <Button
                onClick={handleSearch}
                className=" px-6 py-2 rounded-sm font-medium transition"
            >
                Search my job
            </Button>
        </div>
    );
}