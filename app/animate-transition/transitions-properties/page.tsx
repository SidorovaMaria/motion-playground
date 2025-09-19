"use client";
/**
 * TransitionsProperties — Page: Transition property catalogue
 *
 * Purpose:
 * - Renders a scrollable page of Motion transition properties using `transitionProps`.
 * - Each item is wrapped in <InViewSection/> for per-section entrance animation + collapse.
 *
 * Structure:
 * - Header: page title + intro.
 * - Body: maps `transitionProps` -> <InViewSection id title> -> <PropertyOverview/>.
 */
import InViewSection from "@/components/pageFormat/InViewSection";
import PropertyOverview from "@/components/properties/PropertyOverview";
import { transitionProps } from "@/constants/transition-properties";

import React from "react";

const TransitionsProperties = () => {
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto space-y-2 ">
        <h1 className="main-heading">Transition Properties</h1>
        <p className="subheading">
          There are several transition properties you can use to customize the animation behavior in
          Framer Motion. Here we explore all of them with tiny exmaples to understand how they work.
        </p>
      </header>
      {transitionProps.map((element) => (
        <InViewSection key={element.id} id={element.id} title={element.title} defaultOpen={false}>
          <PropertyOverview {...element} />
        </InViewSection>
      ))}
    </main>
  );
};

export default TransitionsProperties;
