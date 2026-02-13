"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string };

type HeaderMobileProps = {
  navLinks: readonly NavLink[];
};

export function HeaderMobile({ navLinks }: HeaderMobileProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-lg text-zinc-400 transition-all duration-200 hover:scale-110 hover:rotate-90 hover:bg-white/10 hover:text-zinc-100 active:scale-95 lg:hidden"
        aria-label="Open menu"
        data-testid="header-mobile-menu-button"
      >
        <HiOutlineBars3 className="size-6" aria-hidden />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-linear-to-b from-zinc-900 via-slate-900 to-zinc-900/95 backdrop-blur-sm lg:hidden",
          mobileMenuOpen ? "visible" : "invisible",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 flex w-full max-w-xs flex-col border-r border-white/10 bg-linear-to-b from-zinc-900 via-slate-900 to-zinc-900 transition-transform duration-200 ease-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <span className="font-semibold text-zinc-100">Menu</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-lg text-zinc-400 transition-all duration-200 hover:scale-110 hover:rotate-180 hover:bg-white/10 hover:text-zinc-100 active:scale-95"
              aria-label="Close menu"
              data-testid="header-mobile-menu-close"
            >
              <HiXMark className="size-6" aria-hidden />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-100 hover:bg-white/10 hover:pl-4 hover:text-zinc-100"
                data-testid={`header-mobile-nav-${label.toLowerCase().replace(/\s+/, "-")}`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 border-t border-white/10 pt-4">
              <Button
                asChild
                variant="default"
                size="sm"
                className="w-full bg-zinc-100 text-zinc-900 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 active:scale-100"
              >
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </nav>
        </div>
        <button
          type="button"
          className="absolute inset-0 -z-10 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
}
