import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderMobile } from "./header-mobile";
import HeaderClient from "./header.client";

const NAV_LINKS = [
  { href: "/cards", label: "Cards" },
  { href: "/cards/create", label: "Create Cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <HeaderClient>
      <div className="mx-auto flex py-3 md:py-5 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-zinc-100 transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] active:scale-100"
          data-testid="header-logo"
        >
          <span className="text-lg">BC</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-6 lg:gap-8">
          <HeaderMobile navLinks={NAV_LINKS} />
          <div className="hidden items-center gap-6 lg:flex lg:gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-zinc-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                data-testid={`header-nav-${label.toLowerCase().replace(/\s+/, "-")}`}
              >
                {label}
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-zinc-100 text-zinc-900 shadow-none transition-all duration-200 hover:scale-105 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-100"
              data-testid="header-login-button"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </nav>
      </div>
    </HeaderClient>
  );
}
