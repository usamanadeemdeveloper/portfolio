import Link from "next/link";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import { fetchSanityData } from "@/sanity/lib/fetchSanityData";
import { ArrowUpIcon } from "@sanity/icons";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function Home() {
  const { socials, pageInfo, experiences, skills, projects } =
    await fetchSanityData();

  return (
    <div className="bg-background text-foreground min-h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth scrollbar-thin scrollbar-track-slate-900/20 scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40">
      <Header socials={socials} />

      <section id="hero" className="snap-start h-screen">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center min-h-screen flex items-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center min-h-screen flex items-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-center min-h-screen flex items-center">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start min-h-screen flex items-center">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-start min-h-screen flex items-center">
        <ContactMe />
      </section>

      <footer className="sticky bottom-8 w-full z-30 pointer-events-none">
        <div className="flex items-center justify-center pointer-events-auto">
          <Link href="/#hero" aria-label="Scroll to top" className="group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-full hover:bg-blue-600/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <ArrowUpIcon className="w-6 h-6 text-blue-500/40 group-hover:text-blue-400 transition-colors" />
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
