"use client";

import { GetPageInfoResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const BackgroundCircles = dynamic(() => import("./BackgroundCircles"), {
  ssr: false,
});

type HeroProps = {
  pageInfo: GetPageInfoResult;
};

const sections = ["about", "experience", "skills", "projects"] as const;

function Hero({ pageInfo }: HeroProps) {
  const [text] = useTypewriter({
    words: pageInfo?.heroTypewriterWords || [],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="min-h-screen flex flex-col space-y-6 sm:space-y-8 items-center justify-center text-center overflow-hidden px-4">
      <BackgroundCircles />

      {pageInfo?.heroImage && (
        <Image
          className="relative rounded-full mx-auto object-cover border-4 border-primary w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
          src={urlFor(pageInfo.heroImage).url()}
          alt={`Profile image of ${pageInfo?.name}`}
          fetchPriority="high"
          sizes="(max-width: 640px) 96px, 144px"
          height={144}
          width={144}
          priority
        />
      )}

      <div className="z-20">
        <h1 className="text-[10px] sm:text-sm uppercase text-secondary pb-2 tracking-[6px] sm:tracking-[15px]">
          {pageInfo?.role}
        </h1>

        <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-semibold px-2 sm:px-6 md:px-10 leading-snug">
          <span className="mr-2 sm:mr-3 inline-flex items-center flex-wrap justify-center">
            {text}
            <Cursor cursorColor="var(--color-accent)" aria-hidden="true" />
          </span>
        </h2>

        <div className="pt-8 sm:pt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`#${section}`} className="heroButton capitalize">
                {section}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
