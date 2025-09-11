"use client";
import { ExternalLink, Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useVelocity } from "motion/react";
import { useEffect } from "react";
import { useSlideOnScroll } from "@/hooks/useSlideOnScroll";
import { distance } from "motion";

const Navbar = () => {
  const { y } = useSlideOnScroll({ slideDistance: 115, threshold: 150 });
  return (
    <motion.header
      className="flex items-center justify-between py-5 px-6 bg-background-muted sticky top-0 z-50 border-b border-primary/30 backdrop-blur-md"
      style={{ y }}
    >
      <div className="flex items-center gap-3" aria-labelledby="site-title">
        <Link href="/" className="color-icon w-10 h-10">
          <Image src="./icons/motion.svg" alt="Motion Logo" fill />
        </Link>
        <div>
          <h1 id="site-title" className="text-gradient font-display font-bold text-2xl">
            Motion Playground
            <Link
              href="https://motion.dev/"
              title="Framer Motion Documentation"
              className="inline group rounded-md p-0.5"
            >
              <ExternalLink className="inline-block icon ml-1 mb-1  text-primary/70 group-hover:text-primary transition focus:text-primary" />
            </Link>
          </h1>
          <p className="paragraph">Interactive Framer Motion Learning</p>
        </div>
      </div>
      <div aria-labelledby="author">
        <div className="flex items-center gap-3">
          <Link href="https://portfolio-6dft.vercel.app/" className="cursor-pointer rounded-full  ">
            <Image
              src="./profile-img.svg"
              alt="Maria Sidorova Profile Image"
              width={44}
              height={44}
              className="rounded-full filter brightness-125 border border-foreground/50 "
            />
          </Link>
          <div className="flex flex-col items-center gap-1.5">
            <Link href="" className="hovered-link flex items-center gap-1.5 group  text-xs">
              <Github className="small-icon group-hover:text-foreground transition" />
              <span>Github</span>
            </Link>
            <Link
              href="mailto:sidmashav@icloud.com"
              className="hovered-link flex items-center gap-1.5 group  text-xs"
            >
              <Mail className="small-icon group-hover:text-foreground transition " />
              <span>Email</span>
            </Link>
          </div>
        </div>
        <p id="author" className="text-sm text-gradient mt-2">
          By Maria Sidorova
        </p>
      </div>
    </motion.header>
  );
};

export default Navbar;
