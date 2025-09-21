"use client";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

function Header() {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center">
      {/* Left - Social Icons */}
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center"
      >
        <SocialIcon
          url="https://www.youtube.com/usamanadeem"
          bgColor="transparent"
          fgColor="var(--color-primary)"
        />
        <SocialIcon
          url="https://www.youtube.com/usamanadeem"
          bgColor="transparent"
          fgColor="var(--color-primary)"
        />
        <SocialIcon
          url="https://www.youtube.com/usamanadeem"
          bgColor="transparent"
          fgColor="var(--color-primary)"
        />
      </motion.div>

      {/* Right - Contact */}
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center cursor-pointer"
      >
        <SocialIcon
          className="cursor-pointer"
          network="email"
          bgColor="transparent"
          fgColor="var(--color-secondary)"
        />
        <p className="uppercase hidden md:inline-flex text-sm text-secondary">
          Get In Touch
        </p>
      </motion.div>
    </header>
  );
}

export default Header;
