import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/cards", label: "Cards" },
  { href: "/cards/create", label: "Create Cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-linear-to-r from-zinc-900 via-slate-900 to-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8"
          aria-label="Footer navigation"
        >
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-100"
              data-testid={`footer-nav-${label.toLowerCase().replace(/\s+/, "-")}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <p
          className="mt-6 border-t border-white/10 pt-6 text-sm text-zinc-400"
          data-testid="footer-copyright"
        >
          © {currentYear} BC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
