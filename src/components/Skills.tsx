import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// TODO: Update skills
const skills = ["TypeScript", "JavaScript", "Python", "Java", "PostgreSQL", "SQL", "HTML", "CSS", "ReactJS", "Spring Boot", "CI/CD", "Google Cloud"]

export const Skills = () => {
    return (
        <section id="skills" className="scroll-mt-20 md:scroll-mt-24 flex flex-col gap-4">
            <Card className="mt-0">
                <CardHeader className="p-4 md:p-6 pb-3 md:pb-6">
                    <CardTitle className="text-xl md:text-2xl">Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                            <Badge key={i} variant="secondary" className="text-xs md:text-sm">{s}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}