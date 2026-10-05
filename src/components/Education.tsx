import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardEntryHeader } from "@/components/CardEntryHeader";
import { JobImages } from "@/components/JobImages";

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
            <CardHeader className="p-4 pb-4 md:p-6 md:pb-5">
                <CardTitle className="text-xl md:text-2xl">Education</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <ul className="divide-y divide-border">
                    {degrees.map((j, i) => (
                        <li key={i} className="py-5 first:pt-0 last:pb-0 md:py-6">
                            <CardEntryHeader
                                title={j.role}
                                organization={j.school}
                                logo={j.logo}
                                duration={j.duration}
                                href={j.link}
                                linkLabel="View School"
                            />
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
