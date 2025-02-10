import Image from "next/image";

import { CalendarDays, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";
import Link from "next/link";

const degrees = [
    {
        role: "Computer Science, BS",
        school: "New Jersey Institute of Technology", // TODO: Replace with actual school name
        logo: "/njitlogo.png", // TODO: Replace with actual logo
        duration: "Spring '24 - Fall '26",
        description:
            <div>
                Notable Courses & Experiences:
                <br></br>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 mt-2 ml-2">
                    <li>
                        • CS288; Intensive Programming in Linux with Dr. Itani
                    </li>
                    <li>
                        • CS331; Database System Design and Management
                    </li>
                    <li>
                        • CS490; Guided Design in Software Engineering
                    </li>
                    <li>
                        • Member of Sigma Alpha Epsilon Fraternity
                    </li>
                </ul>
            </div>,
        link: "https://computing.njit.edu/",
        images: [],
    },
    {
        role: "Computer Science, AS",
        school: "RVCC", // TODO: Replace with actual school name
        logo: "/rvcclogo.jpg", // TODO: Replace with actual logo
        duration: "Fall '21 - Fall '23",
        description: <div>
            Notable Courses & Experiences:
            <br></br>
            <ul className="text-sm text-muted-foreground flex flex-col gap-1 mt-2 ml-2">
                <li>
                    • CSIT256; Computer Architecture & Assembly Language with Dr. Brower
                </li>
            </ul>
        </div>,
        link: "https://www.raritanval.edu/academic-programs/academic-departments/math-computer-science",
        images: [],
    },
]

export const Education = () => {
    return (
        <>
            <h2 className="text-xl font-bold mt-6 mb-4 text-black dark:text-white">Education</h2>
            <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-8">
                        {degrees.map((j, i) => (
                            <li key={i} className="border-b last:border-b-0 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={j.logo}
                                        alt={j.school}
                                        width={40}
                                        height={40}
                                        className="rounded-md border shadow-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">
                                            {j.role}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="flex flex-row align-center gap-4">
                                                {j.school}
                                                {j.link && <Link href={j.link} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline"                                                >
                                                    View School
                                                    <ExternalLink className="inline-block size-3" />
                                                </Link>}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                                    <CalendarDays className="size-3 mr-2" />
                                    {j.duration}
                                </p>
                                <div className="text-sm mt-2">{j.description}</div>
                                {/* Job Images */}
                                <JobImages
                                    role={j.role}
                                    link={j.link}
                                    images={j.images}
                                    duration={j.duration}
                                />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}
