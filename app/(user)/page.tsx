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
    <div className="bg-background text-foreground min-h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0">
      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <footer className="sticky bottom-5 w-full">
        <div className="flex items-center justify-center">
          <Link href="#hero" aria-label="Scroll to top">
            <ArrowUpIcon className="w-12 h-12 rounded-full bg-gray-800 text-[#3B82F6] p-3 cursor-pointer hover:bg-gray-700 transition" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
