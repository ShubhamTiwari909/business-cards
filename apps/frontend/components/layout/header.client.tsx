"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HeaderClient = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.innerWidth > 1024 ? window.scrollY > 200 : window.scrollY > 100,
      );
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
