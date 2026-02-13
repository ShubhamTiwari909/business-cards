"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { container, item } from "./animations";
import { LightLines } from "@/components/animated/light-lines";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "dark relative overflow-hidden min-h-[calc(100vh-150px)] grid place-items-center text-foreground",
        className,
      )}
      data-testid="hero-section"
    >
      <LightLines
        gradientFrom="#0f0f0f"
        gradientTo="#1a1a2e"
        lightColor="#4ade80"
        lineColor="#4ade80"
        linesOpacity={0.1}
        lightsOpacity={0.7}
        speedMultiplier={1.5}
        className="grid place-items-center py-20 min-h-screen px-5"
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={item}
            className="mb-4 inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground"
          >
            Business card generator
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Design and share your{" "}
            <span className="text-primary">professional card</span> in minutes
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            Create custom business cards with templates, export for print or
            digital, and get a shareable link—no design skills needed.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" className="min-w-[160px]">
              Create your card
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px]">
              View examples
            </Button>
          </motion.div>
        </motion.div>
      </LightLines>
    </section>
  );
}
