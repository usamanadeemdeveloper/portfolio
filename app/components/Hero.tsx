"use client";

import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroudCircles from "./BackgroudCircles";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  const [text, count] = useTypewriter({
    words: [
      "Usama Nadeem",
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
      <BackgroudCircles />

      <Image
        src="/profile-img.jpeg"
        alt="Profile image"
        width={128}
        height={128}
        className="relative rounded-full mx-auto object-cover border-4 border-primary"
      />

      <div className="z-20">
        {/* Subheading */}
        <h2 className="text-sm uppercase text-secondary pb-2 tracking-[15px]">
          Software Engineer
        </h2>

        {/* Typewriter headline */}
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold px-4 sm:px-6 md:px-10">
          <span className="mr-3 inline-flex items-center">
            {text}
            <Cursor cursorColor="var(--color-accent)" />
          </span>
        </h1>

        {/* Nav buttons */}
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
