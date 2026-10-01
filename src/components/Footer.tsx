import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { formatPostDate, getAllPosts } from "@/lib/blog";
import { BackToTop, EmailActions, FooterReveal, LocalTime } from "@/components/footer/FooterClient";

const EMAIL = "blankinship2002@gmail.com";

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/BryceBlankinship",
        icon: FaGithub,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/bryceblankinship",
        icon: FaLinkedin,
    },
];

const FLAG_STRIPE = 16 / 13;

const UsFlag = () => (
    <svg
        viewBox="0 0 24 16"
        className="h-[11px] w-[16.5px] flex-shrink-0 drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.18)]"
        role="img"
        aria-label="United States flag"
    >
        <defs>
            <clipPath id="footer-flag-clip">
                <rect width="24" height="16" rx="3" />
            </clipPath>
            <linearGradient id="footer-flag-sheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
                <stop offset="0.55" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.18" />
            </linearGradient>
        </defs>
        <g clipPath="url(#footer-flag-clip)">
            <rect width="24" height="16" fill="#c8323f" />
            {[1, 3, 5, 7, 9, 11].map((i) => (
                <rect key={i} y={i * FLAG_STRIPE} width="24" height={FLAG_STRIPE} fill="#fff" />
            ))}
            <rect width="10.5" height={7 * FLAG_STRIPE} fill="#3c3b6e" />
            {[0, 1, 2].flatMap((row) =>
                [0, 1, 2, 3].map((col) => (
                    <circle
                        key={`${row}-${col}`}
                        cx={1.6 + col * 2.45 + (row % 2) * 1.2}
                        cy={1.6 + row * 2.6}
                        r="0.5"
                        fill="#fff"
                    />
                ))
            )}
            <rect width="24" height="16" fill="url(#footer-flag-sheen)" />
        </g>
        <rect
            x="0.25"
            y="0.25"
            width="23.5"
            height="15.5"
            rx="2.75"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="0.5"
        />
    </svg>
);

export const Footer = () => {
    const latest = getAllPosts()[0];

    return (
        <footer role="contentinfo" className="relative isolate shrink-0 overflow-hidden">
            <div className="footer-orbs" aria-hidden="true">
                <span className="footer-orb footer-orb-blue" />
                <span className="footer-orb footer-orb-lavender" />
                <span className="footer-orb footer-orb-peach" />
            </div>

            <div className="footer-glass">
                <FooterReveal className="container max-w-screen-lg mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-10">
                    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                            <h2 className="apple-classic-title text-3xl md:text-4xl">
                                <span className="block">Have an idea?</span>
                                <span className="block whitespace-nowrap">I&apos;d love to hear it.</span>
                            </h2>
                            <div className="mt-6">
                                <EmailActions email={EMAIL} />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-5 md:items-end md:justify-end">
                            {latest && (
                                <Link
                                    href={`/blog/${latest.slug}`}
                                    className="footer-glass-pill group flex w-full max-w-sm items-center gap-4 rounded-2xl px-4 py-3 text-left"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            Latest post
                                        </p>
                                        <p className="mt-0.5 truncate font-medium text-gray-900">
                                            {latest.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatPostDate(latest.date)}
                                        </p>
                                    </div>
                                    <ArrowRight
                                        className="size-4 flex-shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </Link>
                            )}
                            <ul className="flex items-center gap-2">
                                {socials.map(({ name, href, icon: Icon }) => (
                                    <li key={name}>
                                        <Link
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit Bryce Blankinship's ${name} profile`}
                                            className="footer-glass-pill inline-flex size-11 items-center justify-center rounded-full text-gray-700"
                                        >
                                            <Icon className="size-[18px]" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-black/[0.06] pt-6 sm:flex-row sm:justify-between">
                        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:justify-start">
                            <span>
                                &copy; {new Date().getFullYear()}{" "}
                                <Link href="/" className="transition-colors hover:text-gray-900">
                                    Bryce Blankinship
                                </Link>
                            </span>
                            <span aria-hidden="true">&middot;</span>
                            <span className="inline-flex items-center gap-1.5">
                                <UsFlag />
                                New Jersey, USA
                            </span>
                            <span aria-hidden="true">&middot;</span>
                            <LocalTime />
                        </p>
                        <BackToTop />
                    </div>
                </FooterReveal>
            </div>
        </footer>
    );
};
