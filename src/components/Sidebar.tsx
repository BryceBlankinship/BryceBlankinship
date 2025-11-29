'use client'

import { useRouter } from "next/navigation";
import { Skills } from "./Skills";
import { Profile } from "./Profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const Sidebar = () => {
    const router = useRouter();

    return (
        <aside className="md:col-span-1">
            {/* Profile Section */}
            <Profile />

            {/* Blog Link */}
            {/* <div className="mt-6">
                <Link href="/blog" onClick={() => router.push("/blog")}>
                    <Button className="w-full apple-classic-button border-2">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read My Blog
                    </Button>
                </Link>
            </div> */}

            {/* Skills Section */}
            <Skills />
        </aside>
    );
};