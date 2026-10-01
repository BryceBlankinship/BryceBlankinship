import { Profile } from "@/components/Profile";
import { BlogPreview } from "@/components/BlogPreview";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { StickySidebar } from "@/components/StickySidebar";
import { MatchHeight } from "@/components/MatchHeight";
import { Websites } from "@/components/Websites";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-6 md:py-8 pt-20 md:pt-24 pb-10 md:pb-12">
        {/* Mobile: Single column with order */}
        <div className="flex flex-col md:hidden gap-4">
          <header className="order-1">
            <Profile />
          </header>
          <section className="order-2" aria-label="Blog">
            <BlogPreview />
          </section>
          <section className="order-3" aria-label="Experience">
            <Experience />
          </section>
          <section className="order-4" aria-label="Education">
            <Education />
          </section>
        </div>
        
        {/* Desktop: Two column layout */}
        <MatchHeight sourceId="education" targetId="blog" />
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <StickySidebar className="col-span-1 flex flex-col gap-6" aria-label="Profile sidebar">
            <header>
              <Profile />
            </header>
            <section aria-label="Blog">
              <BlogPreview />
            </section>
          </StickySidebar>
          
          {/* Right Main Content */}
          <article className="col-span-2 flex flex-col gap-6">
            <section aria-label="Experience">
              <Experience />
            </section>
            <section aria-label="Projects">
              <Websites />
            </section>
            <section aria-label="Education">
              <Education />
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
