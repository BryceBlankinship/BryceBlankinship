import Image from "next/image";

import { CalendarDays, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";
import Link from "next/link";

const jobs = [
    {
        role: "Software Engineer & Technical Advisor",
        company: "PatentFlip", // TODO: Replace with actual company name
        logo: "/patentfliplogo.png", // TODO: Replace with actual logo
        duration: "2024 - Present",
        description:
            <div>
                <p className="mb-2">Developed PatentFlip, a marketplace for buying and selling patents.</p>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 ml-2">
                    <li>
                        • Adapted quickly to changing product requirements & features
                    </li>
                    <li>
                        • Worked with stakeholders directly as the sole Software Engineer
                    </li>
                    <li>
                        • Consulted stakeholders on hiring a UX designer
                    </li>
                    <li>
                        • Provisioned the entire application infrastructure in Google Cloud
                    </li>
                </ul>
            </div>,
        link: "https://patentflip.com",
        images: [],
    },
    {
        role: "Software Engineer & Technical Advisor",
        company: "Lookio", // TODO: Replace with actual company name
        logo: "/lookiologo.png", // TODO: Replace with actual logo
        duration: "2023 - Present",
        description:
            <div>
                <p className="mb-2">Developed Lookio, a social media auditor that creates insights for employers.</p>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 ml-2">
                    <li>
                        • Developed robust web scrapers that run on a distributed residential proxy network
                    </li>
                    <li>
                        • Fine-tuned various LLMs for document extraction & sentiment analysis
                    </li>
                    <li>
                        • Worked with stakeholders directly as the sole Software Engineer
                    </li>
                    <li>
                        • Consulted stakeholders on hiring a UX designer
                    </li>
                    <li>
                        • Provisioned the entire application infrastructure in Google Cloud
                    </li>
                </ul>
            </div>,
        link: "https://lookio.io",
        images: [],
    },
    {
        role: "Software Engineer Intern",
        company: "The Home Depot", // TODO: Replace with actual company name
        logo: "/homedepotlogo.jpeg", // TODO: Replace with actual logo
        duration: "2022 - Present",
        description:
            <div>
                <p className="mb-2">Working across multiple teams within the Pricing organization.</p>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 ml-2">
                    <li>
                        • Managed deployments for the PaCMan team
                    </li>
                    <li>
                        • Helped shape the tech stack for Merch UX Architecture
                    </li>
                    <li>
                        • Managed two Software Engineers on a UI migration effort spanning over 20 frontends
                    </li>
                </ul>
            </div>,
        link: "",
        images: [],
    },
    {
        role: "Store Associate",
        company: "The Home Depot", // TODO: Replace with actual company name
        logo: "/homedepotlogo.jpeg", // TODO: Replace with actual logo
        duration: "2020 - 2022",
        description:
            <div>
                <p className="mb-2">Worked in various departments day-to-day as needed.</p>
                <p className="text-muted-foreground">My ability to learn quickly and flexible schedule allowed me to work almost anywhere in the store. I really enjoyed walking the floor and helping customers when there wasn't assigned work.</p>
            </div>,
        link: "",
        images: [],
    },
]

export const Experience = () => {
    return (
        <Card id="experience" className="scroll-mt-20 md:scroll-mt-24">
            <CardHeader className="flex flex-row justify-between items-baseline p-4 md:p-6 pb-3 md:pb-0">
                <CardTitle className="text-xl md:text-2xl">Work Experience</CardTitle>
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
                                        className="rounded-md border shadow-md object-cover flex-shrink-0"
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
                                                            View Product
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
            </Card>
    )
}
