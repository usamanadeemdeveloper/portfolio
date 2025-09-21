"use client";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetSocialsResult } from "@/sanity.types";

type HeaderProps = {
  socials: GetSocialsResult;
};

function Header({ socials }: HeaderProps) {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      {/* Left - Social Icons */}
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center"
      >
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            bgColor="transparent"
            fgColor="var(--color-primary)"
            title="Visit Usama's YouTube"
          />
        ))}
      </motion.div>

      {/* Right - Contact */}
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center cursor-pointer"
      >
        <Link
          href="#contact"
          className="cursor-pointer"
          aria-label="Get in touch via email"
        >
          <SocialIcon
            className="cursor-pointer"
            network="email"
            bgColor="transparent"
            fgColor="var(--color-secondary)"
            as="div"
          />
          <p className="uppercase hidden md:inline-flex text-sm text-secondary">
            Get In Touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}

export default Header;
