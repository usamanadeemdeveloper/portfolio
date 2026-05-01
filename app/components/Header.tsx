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
    <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-7xl items-start justify-between bg-transparent p-5 xl:items-center">
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{ willChange: "transform" }}
        className="flex flex-row items-center"
      >
        {socials.map((social) => (
          <SocialIcon
            title={social.title}
            key={social._id}
            url={social.url}
            bgColor="transparent"
            fgColor="var(--color-primary)"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        style={{ willChange: "transform" }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center"
      >
        <Link
          href="/#contact"
          className="flex items-center cursor-pointer"
          aria-label="Get in touch via email"
        >
          <SocialIcon
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
