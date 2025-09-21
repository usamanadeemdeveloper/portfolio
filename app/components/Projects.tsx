"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectNav from "./ProjectNav";
import { PROJECTS_QUERYResult } from "@/sanity.types";

type ProjectsProps = {
  projects: PROJECTS_QUERYResult;
};

function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToProject = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;

    container.scrollTo({ left: width * index, behavior: "smooth" });
    setCurrentIndex(index);
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % projects.length;
        scrollToProject(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollToProject((currentIndex - 1 + projects.length) % projects.length);
      }
      if (e.key === "ArrowRight") {
        scrollToProject((currentIndex + 1) % projects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, projects.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col text-left max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-blue-400 text-2xl">
        Projects
      </h3>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="relative w-full flex overflow-x-scroll snap-x snap-mandatory scroll-smooth z-10 scrollbar-thin scrollbar-track-gray-700/20 scrollbar-thumb-blue-500/80"
      >
        {projects.map((project, i) => (
          <ProjectCard
            index={i}
            project={project}
            key={project._id}
            total={projects.length}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <ProjectNav
        onPrev={() =>
          scrollToProject(
            (currentIndex - 1 + projects.length) % projects.length
          )
        }
        onNext={() => scrollToProject((currentIndex + 1) % projects.length)}
      />

      {/* Background accent strip */}
      <div className="w-full absolute top-[30%] left-0 h-[500px] -skew-y-12 bg-blue-500/10" />
    </motion.div>
  );
}

export default Projects;
