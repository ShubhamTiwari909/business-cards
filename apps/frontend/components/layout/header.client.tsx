"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HeaderClient = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const LARGE_SCREEN_BREAKPOINT = 1024;
      const DESKTOP_SCROLL_THRESHOLD = 200;
      const MOBILE_SCROLL_THRESHOLD = 100;

      const isLargeScreen = window.innerWidth > LARGE_SCREEN_BREAKPOINT;
      const scrollThreshold = isLargeScreen
        ? DESKTOP_SCROLL_THRESHOLD
        : MOBILE_SCROLL_THRESHOLD;

      setIsScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full  text-zinc-100",
        isScrolled
          ? "border-b-2 border-white/10 bg-linear-to-r from-zinc-900 via-slate-900 to-zinc-900"
          : "bg-transparent",
      )}
    >
      {children}
    </header>
  );
};

export default HeaderClient;
