import Image from "next/image";

import { CalendarDays, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";
import Link from "next/link";

const degrees = [
    {
        role: "Computer Science, BS",
        school: "New Jersey Institute of Technology", // TODO: Replace with actual school name
        logo: "/njitlogo.png", // TODO: Replace with actual logo
        duration: "Spring '24 - Fall '26",
        link: "https://computing.njit.edu/",
        images: [],
    },
    {
        role: "Computer Science, AS",
        school: "RVCC", // TODO: Replace with actual school name
        logo: "/rvcclogo.jpg", // TODO: Replace with actual logo
        duration: "Fall '21 - Fall '23",
        link: "https://www.raritanval.edu/academic-programs/academic-departments/math-computer-science",
        images: [],
    },
]

export const Education = () => {
    return (
        <Card id="education" className="scroll-mt-20 md:scroll-mt-24">
            <CardHeader className="flex flex-row justify-between items-baseline p-4 md:p-6 pb-3 md:pb-0">
                <CardTitle className="text-xl md:text-2xl">Education</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
                    <ul className="space-y-4 md:space-y-6">
                        {degrees.map((j, i) => (
                            <li key={i} className="border-b last:border-b-0 pb-4 md:pb-6 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-start space-x-3 md:space-x-4">
                                    <Image
                                        src={j.logo}
                                        alt={`${j.school} logo`}
                                        width={40}
                                        height={40}
                                        className="rounded-md object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-base md:text-lg">
                                                    {j.role}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    <span className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                        <span>{j.school}</span>
                                                        {j.link && <Link href={j.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:underline w-fit"                                                >
                                                            View School
                                                            <ExternalLink className="inline-block size-3" />
                                                        </Link>}
                                                    </span>
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground flex items-center sm:flex-shrink-0 sm:mt-0.5">
                                                <CalendarDays className="size-3 mr-1.5 flex-shrink-0" />
                                                <span className="whitespace-nowrap">{j.duration}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
    )
}
