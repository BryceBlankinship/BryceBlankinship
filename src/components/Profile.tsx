'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, ChevronDown } from "lucide-react";

import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const socials = [
    {
        name: "Github",
        link: "https://github.com/BryceBlankinship",
        icon: <FaGithub className="size-4" />
    },
    {
        name: "LinkedIn",
        link: "https://linkedin.com/in/bryceblankinship",
        icon: <FaLinkedin className="size-4" />
    },
]

export const Profile = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)

    useEffect(() => {
        const updateWidth = () => {
            if (wrapperRef.current) {
                setButtonWidth(wrapperRef.current.offsetWidth)
            }
        }
        
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    return (
        <Card>
            <CardContent className="p-4 md:p-6 md:pt-6">
                <div className="flex flex-col items-start gap-3 md:gap-2">
                    <div className="w-full flex flex-row justify-between items-top">
                        <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-3 md:gap-4">
                            <Image
                                width={150}
                                height={150}
                                quality={100}
                                src="/avatar.jpg"
                                alt="Profile Picture"
                                className="rounded-full size-16 md:w-full md:h-auto object-cover border-2 flex-shrink-0"
                            />
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="font-bold text-lg md:text-2xl">Bryce Blankinship</h1>
                                <p className="text-sm text-muted-foreground">
                                    Software Engineer
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-1 md:mt-2 text-start text-sm text-muted-foreground">
                        I am a full-stack software engineer with a passion for building user applications.
                    </p>
                    <div ref={wrapperRef} className="w-full mt-3 md:mt-4 relative z-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    className="w-full font-semibold uppercase apple-liquid-nav-button touch-manipulation flex items-center justify-center gap-2"
                                    type="button"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Contact Me</span>
                                    <ChevronDown className="w-3 h-3 ml-auto" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                align="start" 
                                side="bottom"
                                sideOffset={8}
                                collisionPadding={16}
                                className="apple-liquid-dropdown z-[100]"
                                style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
                            >
                                <DropdownMenuItem
                                    onSelect={() => {
                                        window.location.href = 'mailto:blankinship2002@gmail.com'
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => {
                                        window.location.href = 'tel:9082978745'
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>Phone</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="mt-3 md:mt-4 flex flex-col space-y-2 border-t border-border pt-3 md:pt-4 w-full">
                        {socials.map((s, i) => {
                            const parts = s.link.split("/");
                            const username = parts[parts.length - 1];

                            return (
                                <Link
                                    key={i}
                                    href={s.link}
                                    target="_blank"
                                    className="cursor-pointer flex items-center gap-2 group"
                                >
                                    {s.icon}
                                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-color duration-200 ease-linear">
                                        /{username}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}