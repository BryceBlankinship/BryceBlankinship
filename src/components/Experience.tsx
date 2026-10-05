import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardEntryHeader } from "@/components/CardEntryHeader";
import { JobImages } from "@/components/JobImages";

const startups = [
    {
        role: "Founder",
        company: "Tiki",
        logo: "/tiki.png",
        duration: "2026 - Present",
        description:
            <div>
                <p className="mb-2">Built Tiki, software for independent insurance agencies that does the servicing work.</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-muted-foreground/70">
                    <li>
                        Sends ID cards, processes endorsements, and issues certificates of insurance
                    </li>
                    <li>
                        Drafts renewals and files call notes, and holds every send until the team approves it
                    </li>
                    <li>
                        Takes requests by email, phone, or the agency website
                    </li>
                </ul>
            </div>,
        link: "https://trytiki.ai",
        images: [],
    },
    // {
    //     role: "Co-Founder & Software Engineer",
    //     company: "ButterPhone", // TODO: Replace with actual company name
    //     logo: "/butterphone-logo.png", // TODO: Replace with actual logo
    //     duration: "2025 - Present",
    //     description:
    //         <div>
    //             <p className="mb-2">Co-founder of ButterPhone, a startup that provides AI-powered phone calls for restaurants.</p>
    //             <ul className="text-sm text-muted-foreground flex flex-col gap-1 ml-2">
    //                 <li>
    //                     • ButterPhone takes orders, reservations, and payments for restaurants over the phone.
    //                 </li>
    //                 <li>
    //                     • ButterPhone picks up every phone call in parallel, meaning there's never a missed call.
    //                 </li>
    //                 <li>
    //                     • ButterPhone learns from conversations with customers, and gives restaurants actionable insights to improve their business.
    //                 </li>
    //                 <li>
    //                     • ButterPhone communicates with customers after their visit, and can recover dissatisfied customers that would not otherwise return, and also promote happy customers to leave a review online -- directly driving revenue.
    //                 </li>
    //             </ul>
    //         </div>,
    //     link: "https://butterphone.com",
    //     images: [],
    // },
    {
        role: "Technical Co-Founder",
        company: "PatentFlip", // TODO: Replace with actual company name
        logo: "/patentfliplogo.png", // TODO: Replace with actual logo
        duration: "2024 - Present",
        description:
            <div>
                <p className="mb-2">Developed PatentFlip, a marketplace for buying and selling patents.</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-muted-foreground/70">
                    <li>
                        Adapted quickly to changing product requirements & features
                    </li>
                    <li>
                        Worked with stakeholders directly as the sole Software Engineer
                    </li>
                    <li>
                        Consulted stakeholders on hiring a UX designer
                    </li>
                    <li>
                        Provisioned the entire application infrastructure in Google Cloud
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
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-muted-foreground/70">
                    <li>
                        Developed robust web scrapers that run on a distributed residential proxy network
                    </li>
                    <li>
                        Fine-tuned various LLMs for document extraction & sentiment analysis
                    </li>
                    <li>
                        Worked with stakeholders directly as the sole Software Engineer
                    </li>
                    <li>
                        Consulted stakeholders on hiring a UX designer
                    </li>
                    <li>
                        Provisioned the entire application infrastructure in Google Cloud
                    </li>
                </ul>
            </div>,
        link: "https://lookio.io",
        images: [],
    },
]

const work = [
    {
        role: "Incoming Software Engineer",
        company: "The Home Depot",
        logo: "/homedepotlogo.jpeg",
        duration: "Jan 2027",
        description:
            <div>
                <p className="mb-2">Joining The Home Depot full-time in January 2027.</p>
            </div>,
        link: "",
        images: [],
    },
    {
        role: "Software Engineer Intern (4x)",
        company: "The Home Depot", // TODO: Replace with actual company name
        logo: "/homedepotlogo.jpeg", // TODO: Replace with actual logo
        duration: "2022 - Present",
        description:
            <div>
                <p className="mb-2">Working across multiple teams within the Pricing organization.</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-muted-foreground/70">
                    <li>
                        Managed deployments for the PaCMan team
                    </li>
                    <li>
                        Helped shape the tech stack for Merch UX Architecture
                    </li>
                    <li>
                        Managed two Software Engineers on a UI migration effort spanning over 20 frontends
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

const JobList = ({ title, jobs }: { title: string; jobs: typeof startups }) => {
    return (
        <Card>
            <CardHeader className="p-4 pb-4 md:p-6 md:pb-5">
                <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <ul className="divide-y divide-border">
                    {jobs.map((j) => (
                        <li key={`${j.company}-${j.role}`} className="py-5 first:pt-0 last:pb-0 md:py-6">
                            <CardEntryHeader
                                title={j.role}
                                organization={j.company}
                                logo={j.logo}
                                duration={j.duration}
                                href={j.link}
                                linkLabel="View Product"
                            />
                            <div className="mt-3 text-sm leading-relaxed [&_p:last-child]:mb-0">{j.description}</div>
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

export const Experience = () => {
    return (
        <div id="experience" className="scroll-mt-20 md:scroll-mt-24 flex flex-col gap-4 md:gap-6">
            <JobList title="Startups" jobs={startups} />
            <JobList title="Work" jobs={work} />
        </div>
    )
}
