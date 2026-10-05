import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardEntryHeader } from "@/components/CardEntryHeader";
import { JobImages } from "@/components/JobImages";

const jobs = [
    {
        role: "H.E. Chimney",
        company: "Bethlehem, PA",
        logo: "/he-chimney.png",
        duration: "2026",
        description:
            <div>
                <p className="mb-2">Website for a chimney service in the Lehigh Valley.</p>
                <p className="text-muted-foreground">Phil Milne runs H.E. Chimney out of Bethlehem, sweeping, relining, inspecting, and repairing chimneys around Easton and the rest of the valley. The site introduces Phil and Sam, lays out the work, and lets homeowners request a visit.</p>
            </div>,
        link: "https://hechimney.com/",
        images: [],
    },
    {
        role: "Firefly Lawn & Land",
        company: "Bucks County, PA",
        logo: "/firefly.svg",
        duration: "2026",
        description:
            <div>
                <p className="mb-2">Marketing site and estimating tool for a lawn and land care company.</p>
                <p className="text-muted-foreground">Matt Zdepski runs Firefly in and around Bucks County. Homeowners can walk through an estimate for their property, and the shop has an internal estimator that prices the job and drafts a Stripe invoice.</p>
            </div>,
        link: "https://fireflylawnandland.com/",
        images: [],
    },
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
        <Card id="projects" className="scroll-mt-20 md:scroll-mt-24">
            <CardHeader className="p-4 pb-4 md:p-6 md:pb-5">
                <CardTitle className="text-xl md:text-2xl">Freelanced Websites</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">I've built several websites for small businesses. All my clients come from referrals.</CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <ul className="divide-y divide-border">
                    {jobs.map((j, i) => (
                        <li key={i} className="py-5 first:pt-0 last:pb-0 md:py-6">
                            <CardEntryHeader
                                title={j.role}
                                organization={j.company}
                                logo={j.logo}
                                duration={j.duration}
                                href={j.link}
                                linkLabel="View Website"
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
        </Card >
    )
}
