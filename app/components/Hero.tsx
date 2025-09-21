"use client";

import { Cursor, useTypewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GetPageInfoResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

const BackgroundCircles = dynamic(() => import("./BackgroudCircles"), {
  ssr: false,
});

type HeroProps = {
  pageInfo: GetPageInfoResult;
};

function Hero({ pageInfo }: HeroProps) {
  const [text] = useTypewriter({
    words: [
      `Hi, The Name's ${pageInfo?.name}`,
      "Full-Stack Developer",
      "MERN Stack Developer",
      "MEAN Stack Developer",
      "Performance Optimizer",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      {pageInfo?.heroImage && (
        <Image
          className="relative rounded-full mx-auto object-cover border-4 border-primary"
          src={urlFor(pageInfo.heroImage).url()}
          alt="Profile image of Usama Nadeem"
          fetchPriority="high"
          height={128}
          width={128}
          priority
        />
      )}

      <div className="z-20">
        <h1 className="text-sm uppercase text-secondary pb-2 tracking-[15px]">
          {pageInfo?.role}
        </h1>

        <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold px-4 sm:px-6 md:px-10">
          <span className="mr-3 inline-flex items-center">
            {text}
            <Cursor cursorColor="var(--color-accent)" aria-hidden="true" />
          </span>
        </h2>

        <div className="pt-5 space-x-3">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
