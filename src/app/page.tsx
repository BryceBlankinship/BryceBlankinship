import { Profile } from "@/components/Profile";
import { AboutMe } from "@/components/AboutMe";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-screen-lg mx-auto px-4 py-6 md:py-8 pt-20 md:pt-24 pb-20 md:pb-8">
        {/* Mobile: Single column with order */}
        <div className="flex flex-col md:hidden gap-4">
          <div className="order-1"><Profile /></div>
          <div className="order-2"><AboutMe /></div>
          <div className="order-3"><Experience /></div>
          <div className="order-4"><Skills /></div>
          <div className="order-5"><Education /></div>
        </div>
        
        {/* Desktop: Two column layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-1 flex flex-col gap-6">
            <Profile />
            <Skills />
          </aside>
          
          {/* Right Main Content */}
          <main className="col-span-2 flex flex-col gap-6">
            <AboutMe />
            <Experience />
            <Education />
          </main>
        </div>
      </div>
    </div>
  );
}
