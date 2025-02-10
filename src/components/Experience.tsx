import Image from "next/image";

import { CalendarDays, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";
import Link from "next/link";

const jobs = [
    {
        role: "Software Engineer / Techincal Advisor",
        company: "PatentFlip", // TODO: Replace with actual company name
        logo: "/patentfliplogo.png", // TODO: Replace with actual logo
        duration: "2024 - Present",
        description:
            <div>Developed PatentFlip, a marketplace for buying and selling patents.
                <br></br>
                <br></br>
                Notable Responsibilities:
                <br></br>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 mt-2 ml-2">
                    <li>
                        Adapted quickly to changing product requirements & features
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
        role: "Software Engineer / Technical Advisor",
        company: "Lookio", // TODO: Replace with actual company name
        logo: "/lookiologo.png", // TODO: Replace with actual logo
        duration: "2023 - Present",
        description:
            <div>Developed Lookio, a social media auditor that creates insights for employers.
                <br></br>
                <br></br>
                Notable Responsibilities:
                <br></br>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 mt-2 ml-2">
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
            <div>Working across multiple teams within the Pricing organization. I add value by rapidly developing and deploying my assigned work, and collaborating with Staff/Principal Engineers to improve the Developer Experience in many repositories impacting over 20 applications.
                <br></br>
                <br></br>
                Notable Responsibilities:
                <br></br>
                <ul className="text-sm text-muted-foreground flex flex-col gap-1 mt-2 ml-2">
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
            "Worked in various departments day-to-day as I was needed. My ability to learn quickly and flexible schedule allowed me to work almost anywhere in the store. I really enjoyed walking the floor and helping customers when there wasn't assigned work.",
        link: "",
        images: [],
    },
]

export const Experience = () => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Work Experience</h2>
            <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-8">
                        {jobs.map((j, i) => (
                            <li key={i} className="border-b last:border-b-0 pb-8 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={j.logo}
                                        alt={j.company}
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
                                                {j.company}
                                                {j.link && <Link href={j.link} target="_blank" className="flex items-center gap-2 text-sm text-primary hover:underline"                                                >
                                                    View Product
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
