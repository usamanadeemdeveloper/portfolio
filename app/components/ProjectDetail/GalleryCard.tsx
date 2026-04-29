"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";
import ProjectNav from "@/app/components/ProjectNav";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
};

export default function GalleryCard({ project }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // lock scroll when modal is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeImageIndex]);

  const handleNext = () => {
    if (activeImageIndex === null || !project.images) return;
    setActiveImageIndex((prev) =>
      prev! < project.images!.length - 1 ? prev! + 1 : 0,
    );
  };

  const handlePrev = () => {
    if (activeImageIndex === null || !project.images) return;
    setActiveImageIndex((prev) =>
      prev! > 0 ? prev! - 1 : project.images!.length - 1,
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeImageIndex, project.images, handleNext, handlePrev]);

  if (!project.images?.length) return null;

  const displayedImages = project.images.slice(0, 4);
  const remainingCount = project.images.length - 4;

  return (
    <>
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
          Project Gallery
        </h3>

        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
          <div className="grid grid-cols-1 gap-4">
            {displayedImages.map((img, index) => {
              const imageUrl = urlFor(img).url();
              const isLast = index === 3 && remainingCount > 0;

              return (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 cursor-pointer group outline-none focus:ring-2 focus:ring-blue-500/50"
                  aria-label={`View ${project.title} gallery image ${index + 1}`}
                >
                  <Image
                    src={imageUrl}
                    alt={`${project.title} gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {isLast && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="text-xl font-bold text-white">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(null);
              }}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Main Content Area */}
            <div className="relative w-full h-full max-w-7xl flex items-center justify-center">
              {/* Navigation Buttons (Reusing ProjectNav) */}
              {project.images.length > 1 && (
                <ProjectNav
                  onPrev={(e) => {
                    e?.stopPropagation();
                    handlePrev();
                  }}
                  onNext={(e) => {
                    e?.stopPropagation();
                    handleNext();
                  }}
                  className="!absolute inset-x-0 md:-inset-x-20 z-[120]"
                />
              )}

              {/* Image Container */}
              <motion.div
                key={activeImageIndex}
                initial={{ scale: 0.9, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={urlFor(project.images[activeImageIndex]).url()}
                  alt={`Zoomed image ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Dots / Pagination */}
              {project.images.length > 1 && (
                <div
                  className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 z-[110]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === activeImageIndex
                          ? "bg-blue-500 w-6"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
