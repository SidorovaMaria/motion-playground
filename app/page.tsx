"use client";
import PathCard from "@/components/cards_tags/PathCard";
import Tag from "@/components/cards_tags/Tag";
import { Links } from "@/constants/links";
import { revealSpanVariant, shimmerSpanVariant } from "@/variants/buttonVariants";
import { revealFromBottom } from "@/variants/TextVariants";
import {
  ArrowRight,
  GalleryVerticalEnd,
  Gauge,
  Hand,
  Loader,
  MonitorX,
  Pointer,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero" aria-labelledby="hero-title" className="relative py-18 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Motion Tag */}
          <Tag icon={Star} text="The Ultimate React Motion Learning Experience" className="mb-12" />
          <h2
            id="hero-title"
            className="text-5xl font-bold text-foreground mb-8 leading-tight font-display"
          >
            Master{" "}
            <motion.span
              initial="hidden"
              whileHover="hovered"
              className="text-gradient relative cursor-pointer"
            >
              Motion
              <motion.span
                variants={revealFromBottom}
                className="text-xs absolute  left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap"
              >
                Previously Framer Motion
              </motion.span>
              <Pointer className="text-foreground inline-block absolute -bottom-3 -right-3 -rotate-25 bounce-up" />
            </motion.span>{" "}
            like a <span className="text-gradient">Pro</span>
          </h2>
          <p className="paragraph text-lg mb-12 max-w-3xl mx-auto">
            Your interactive hub for learning Framer Motion with React. This site isn’t just another
            documentation copy — it’s a playground where you can experiment, break things, and see
            animations come to life.
          </p>
          {/* Buttons */}
          <div className="flex items-center justify-center gap-8 ">
            <motion.button
              initial="rest"
              whileHover="hovered"
              whileFocus="hovered"
              animate="rest"
              onClick={() => {
                const section = document.getElementById("learning-path");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="primary-button flex items-center gap-1 overflow-hidden"
            >
              <p>Get Started</p>
              <motion.span variants={revealSpanVariant} className="text-background bounce-right">
                <ArrowRight />
              </motion.span>
            </motion.button>
            <motion.button
              initial="rest"
              whileHover="hovered"
              whileFocus="hovered"
              animate="rest"
              className="button-outline relative overflow-hidden"
            >
              Learn More
              <motion.span
                variants={shimmerSpanVariant}
                className="shimmer-element white-shimmer"
              ></motion.span>
            </motion.button>
          </div>
        </div>
      </section>
      {/* End of Hero Section */}
      {/* Why Motion for React  */}
      <section id="why-motion" aria-labelledby="why-motion-title" className="py-18 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-4xl font-bold text-foreground font-display mb-2">
              Why <span className="text-gradient ">Motion </span>for React?
            </h4>
            <p className="text-gradient text-base mx-auto">
              Animations should feel like part of your app, not an afterthought.
            </p>
            <div className="max-w-6xl mx-auto mt-10 grid grid-cols-[2fr_1fr] gap-18">
              <p className="text-foreground/80 text-base text-center ">
                React empowers you to build dynamic, data-driven interfaces — but making them feel
                alive with smooth, performant animations is often tricky. <br />
                Motion solves that problem. <br />
                It’s a production-ready animation library built for React, giving you the tools to
                craft everything from elegant micro-interactions to immersive, gesture-driven
                experiences.
                <br />
                With a simple{" "}
                <code className="bg-gray-700 text-accent/90 px-2 py-1 text-xs rounded-md font-mono">
                  {"<motion.div>"}
                </code>{" "}
                you can declare what your UI should look like, and Motion takes care of the journey
                to get there. No imperative “move this box here” logic, just clean and expressive
                code.
                <br />
                Whether you’re a beginner looking to add some flair to your projects or an
                experienced developer aiming to create polished, app-like experiences, Motion
                provides a frictionless way to bring your React applications to life.
              </p>
              <div className="flex flex-col justify-center gap-6 items-stretch relative">
                <Tag
                  text="Built for React"
                  className="justify-center py-2.5 "
                  icon={Star}
                  preview="While other animation libraries are messy to integrate, Motion's declarative API feels like a natural extension of React"
                />
                <Tag
                  text="Hardware-acceleration"
                  className="justify-center py-2.5 "
                  icon={Star}
                  preview="Motion leverages the same high-performance browser animations as pure CSS,"
                />
                <Tag
                  text="Animate anything"
                  className="justify-center py-2.5 "
                  icon={Star}
                  preview="CSS has limits — some values can’t animate. Motion fixes this with one consistent API for everything."
                />
                <Tag
                  text="App-like gestures"
                  className="justify-center py-2.5"
                  icon={Star}
                  preview="Motion provides robust, cross-device gesture recognisers for tap, drag, and hover"
                />
                <Pointer className="absolute -top-5 -right-5 -rotate-125 bounce-up" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End of Why Motion for React  */}
      {/* Learning Path Section  */}
      <section
        id="learning-path"
        aria-labelledby="learning-path-title"
        className="relative py-18 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-4xl font-bold text-foreground mb-2">Choose Your Learning Path</h4>
            <p className="text-gradient text-base mx-auto">
              Each path is designed to build your expertise step by step
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PathCard
              icon={Sparkles}
              title="Animate & Transitions"
              description="Start with the fundamentals of animating components and creating smooth transitions."
              link={Links["animate-transition"].default}
              accentColor="#B20650"
            />
            <PathCard
              icon={MonitorX}
              title="Motion Component"
              description="Learn how to use the Motion component to create complex animations."
              link={Links["motion-component"].default}
              accentColor="#2CA060"
            />
            <PathCard
              icon={GalleryVerticalEnd}
              title="Layout Animations"
              description="Discover what layout animations are and how to implement them effectively."
              link="/learn"
              accentColor="#215E97"
            />
            <PathCard
              icon={Hand}
              title="Gestures & Drag"
              description="Implement intuitive drag-and-drop interfaces and gesture-based interactions that enhance user engagement."
              link="/learn"
              accentColor="#450D82"
            />
            <PathCard
              icon={Loader}
              title="Advanced Animations"
              description="Dive into advanced animation techniques, including keyframes, custom easing, and orchestrating complex sequences."
              link="/learn"
              accentColor="#136F63"
            />
            <PathCard
              icon={Gauge}
              title="My Examples"
              description="Below you’ll find example snippets using Framer Motion, each with an explanation."
              link="/examples"
              accentColor="#C20114"
            />
          </div>
        </div>
      </section>
      {/* End of Learning Path Section */}
    </main>
  );
}
