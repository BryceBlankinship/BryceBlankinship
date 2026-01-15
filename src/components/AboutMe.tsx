'use client'
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import Link from "next/link";


export const AboutMe = () => {
    return (    
    <Card id="about-me" className="mb-4 md:mb-0 scroll-mt-20">
        <CardHeader className="flex flex-row justify-between items-baseline p-4 md:p-6 pb-3 md:pb-0">
            <CardTitle className="text-xl md:text-2xl">About Me</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
            <p className="text-sm md:text-base text-muted-foreground">
                I thrive on transforming ambitious ideas into production-ready applications, whether it's modernizing enterprise systems at Fortune 500 companies or architecting MVPs for early-stage startups. When I'm not working, I'm usually coding my own projects or spending time outside.
                <br></br><br></br>
                I'm always open to freelance websites, I find it fun and rewarding to help small businesses get online. If you need your website redone, don't hesitate to <Link href="tel:9082978745" className="text-primary hover:underline">contact me</Link>.
            </p>
        </CardContent>
    </Card>
    )
}