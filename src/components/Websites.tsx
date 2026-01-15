import Image from "next/image";

import { CalendarDays, ExternalLink } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";
import Link from "next/link";

const jobs = [
    {
        role: "Global Driving School NJ",
        company: "Woodland Park, NJ", // TODO: Replace with actual company name
        logo: "/gds.svg", // TODO: Replace with actual logo
        duration: "2025",
        description:
            <div>
                <p className="mb-2">Digital makeover for Global Driving School NJ.</p>
                <p className="text-muted-foreground">My fraternity brother's parents were in the market for a new website for their driving school. He showed them I was of good value, and they agreed. They were so pleased with the results that they paid me more money than I had asked for.</p>
            </div>,
        link: "https://globaldrivingschoolnj.com/",
        images: [],
    },
    {
        role: "Top Level Properties",
        company: "Harrisburg, PA", // TODO: Replace with actual company name
        logo: "https://placehold.co/40x40?text=TLP", // TODO: Replace with actual logo
        duration: "2020",
        description:
            <div>
                <p className="mb-2">Really simple website for a local real estate company.</p>
                <p className="text-muted-foreground">My old boss at the Home Depot store I worked at let me know a friend of theirs was looking for a website for their real estate business.</p>
            </div>,
        link: "https://toplevelpropertiesllc.com/",
        images: [],
    },
    {
        role: "Speedline Car Wash",
        company: "Whitehouse Station, NJ", // TODO: Replace with actual company name
        logo: "/speedline.png", // TODO: Replace with actual logo
        duration: "2020",
        description:
            <div>
                <p className="mb-2">Rebranded Greenway Car Wash to Speedline Car Wash.</p>
                <p className="text-muted-foreground">This was the first paid project I ever did. I wanted to get exposure to working with people who have real businesses and real needs, so I went on my local Hunterdon County Chamber of Commerce business directory and called every business that had an old website. When Lenny picked up the phone for (now) Speedline, he said it was great timing because they were about to rebrand their car wash. I still talk on the phone with Lenny every now and then, and I always credit him to starting my journey into commercial work.<br></br><br></br>The website I built for them was retired, because an ad agency took over digital operations after I left for college. The link points to the development domain, and the site doesn't fully work anymore because of that.</p>
            </div>,
        link: "https://speedlinewash.fly.dev",
        images: [],
    },
]

export const Websites = () => {
    return (
        <Card id="experience" className="scroll-mt-20 md:scroll-mt-24">
            <CardHeader className="flex flex-col justify-between items-baseline p-4 md:p-6 pb-3 md:pb-0">
                <CardTitle className="text-xl md:text-2xl">Freelanced Websites</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">I've built several websites for small businesses. All my clients come from referrals.</CardDescription>
            </CardHeader>

            <CardContent className="p-4 md:p-6 pt-0">
                <ul className="space-y-6 md:space-y-8">
                    {jobs.map((j, i) => (
                        <li key={i} className="border-b last:border-b-0 pb-6 md:pb-8 last:pb-0">
                            {/* Job Details */}
                            <div className="flex items-start space-x-3 md:space-x-4">
                                <Image
                                    src={j.logo}
                                    alt={j.company}
                                    width={40}
                                    height={40}
                                    className="rounded-md object-contain flex-shrink-0 w-10 h-10"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base md:text-lg">
                                                {j.role}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                <span className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                    <span>{j.company}</span>
                                                    {j.link && <Link href={j.link} target="_blank" className="flex items-center gap-1.5 text-sm text-primary hover:underline w-fit"                                                >
                                                        View Website
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
                            <div className="text-sm leading-relaxed mt-3 md:mt-2">{j.description}</div>
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
        </Card >
    )
}
