"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRef } from "react";
import ProjectNav from "./ProjectNav"; // Reusing your component

type Props = {
  open: boolean;
  onClose: () => void;
  project: PROJECTS_QUERYResult[number];
};

export default function ProjectDetailsModal({ open, onClose, project }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { offsetWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -offsetWidth : offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-blue-500/20 rounded-2xl p-6 relative no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-50"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">{project.title}</h2>

        {/* REUSED NAV COMPONENT */}
        {project.images && project.images.length > 0 && (
          <div className="relative group mb-6">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-xl border border-white/10"
            >
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative min-w-full aspect-video snap-center"
                >
                  <Image
                    alt="Project gallery"
                    src={urlFor(img).url()}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>

            {/* If more than 1 image, show the nav */}
            {project.images.length > 1 && (
              <ProjectNav
                onPrev={() => scroll("left")}
                onNext={() => scroll("right")}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            )}
          </div>
        )}

        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {project.summary}
        </p>
      </div>
    </div>
  );
}
