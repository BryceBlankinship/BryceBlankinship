import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";

type CardEntryHeaderProps = {
    title: string;
    organization: string;
    logo: string;
    duration: string;
    href?: string;
    linkLabel?: string;
};

export const CardEntryHeader = ({
    title,
    organization,
    logo,
    duration,
    href,
    linkLabel,
}: CardEntryHeaderProps) => (
    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1 md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:gap-x-4">
        <Image
            src={logo}
            alt={`${organization} logo`}
            width={40}
            height={40}
            className="row-span-2 size-10 rounded-md object-contain"
        />
        <h3 className="min-w-0 text-base font-semibold leading-snug md:text-lg">
            {title}
        </h3>
        <p className="col-start-2 min-w-0 text-sm leading-relaxed text-muted-foreground md:row-start-2">
            {organization}
        </p>
        <div className="col-span-2 mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs leading-5 md:contents">
            <p className="flex items-center gap-1.5 text-muted-foreground md:col-start-3 md:row-start-1 md:mt-0.5 md:justify-self-end">
                <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{duration}</span>
            </p>
            {href && (
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline md:col-start-3 md:row-start-2 md:justify-self-end"
                >
                    {linkLabel}
                    <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
                </Link>
            )}
        </div>
    </div>
);
