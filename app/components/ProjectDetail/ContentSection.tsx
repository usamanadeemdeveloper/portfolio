"use client";

import MarkdownContent from "@/app/components/MarkdownContent";
import LinksCard from "./LinksCard";
import SpecsCard from "./SpecsCard";
import GalleryCard from "./GalleryCard";
import { motion } from "framer-motion";
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
};

export default function ContentSection({ project }: Props) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid lg:grid-cols-3 gap-16 pb-24"
    >
      <div className="lg:col-span-2 space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            About the Project
          </h2>
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
        </div>

        <MarkdownContent content={project.summary ?? ""} />
      </div>

      <div className="lg:col-span-1 space-y-12 lg:border-l lg:border-white/5 lg:pl-12">
        <LinksCard project={project} />
        <SpecsCard project={project} />
        <GalleryCard project={project} />
      </div>
    </motion.section>
  );
}
