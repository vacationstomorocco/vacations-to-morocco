"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

interface DropdownLink {
  name: string;
  href: string;
}

const tourLinks: DropdownLink[] = [
  { name: "Tours From Marrakech", href: "/morocco-tours-from-marrakech" },
  { name: "Tours From Casablanca", href: "/morocco-tours-from-casablanca" },
  { name: "Tours From Fes", href: "/morocco-tours-from-fes" },
  { name: "Tours From Tangier", href: "/morocco-tours-from-tangier" },
  { name: "Tours From Agadir", href: "/morocco-tours-from-agadir" },
  { name: "All Morocco Tours", href: "/morocco-tours" },
];

const destinationLinks: DropdownLink[] = [
  { name: "Marrakech", href: "/destinations/marrakech" },
  { name: "Fes", href: "/destinations/fes" },
  { name: "Casablanca", href: "/destinations/casablanca" },
  { name: "Tangier", href: "/destinations/tangier" },
  { name: "Agadir", href: "/destinations/agadir" },
];

function isDarkHeroPage(pathname: string | null): boolean {
  return pathname === "/";
}

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);

  const forceSolid = !isDarkHeroPage(pathname);
  const showSolid = forceSolid || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMobileToursOpen(false);
    setMobileDestinationsOpen(false);
  }, [pathname]);

  const textColor = showSolid ? "text-[#4a3b32]" : "text-white";
  const hoverColor = showSolid ? "hover:text-[#d96c27]" : "hover:text-[#e07a5f]";

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 flex flex-col",
          showSolid
            ? "bg-[#fdfcf9]/95 backdrop-blur-md shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* Top Info Bar (Desktop Only) */}
        <div
          className={`hidden lg:flex w-full border-b transition-colors duration-300 ${
            showSolid ? "bg-[#f4f0ea] border-[#e5dcd0]" : "bg-black/30 border-white/10"
          }`}
        >
          <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-end gap-8 px-4 text-xs font-semibold tracking-wide">
            <a
              href="tel:+212668422869"
              className={`flex items-center gap-2 transition-colors ${
                showSolid ? "text-[#6b5a50] hover:text-[#d96c27]" : "text-white/90 hover:text-white"
              }`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${showSolid ? "text-[#d96c27]" : "text-[#e07a5f]"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              +212 668 422 869
            </a>
            <a
              href="mailto:vacationstomorocco@gmail.com"
              className={`flex items-center gap-2 transition-colors ${
                showSolid ? "text-[#6b5a50] hover:text-[#d96c27]" : "text-white/90 hover:text-white"
              }`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${showSolid ? "text-[#d96c27]" : "text-[#e07a5f]"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              vacationstomorocco@gmail.com
            </a>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Vacations to Morocco home">
            <Image
              src="/picture/vacations-to-morocco.webp"
              alt="Vacations to Morocco"
              width={180}
              height={60}
              priority
              style={{
                width: "auto",
                height: "60px",
                objectFit: "contain",
                filter: !showSolid ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.3s ease",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex font-semibold text-sm" aria-label="Main navigation">
            <Link href="/" className={`${textColor} ${hoverColor} transition-colors`}>Home</Link>

            <div className="group relative py-6">
              <Link href="/morocco-tours" className={`inline-flex items-center gap-1 ${textColor} ${hoverColor} transition-colors`}>
                Morocco Tours <span aria-hidden="true" className="text-[10px] mt-0.5">▼</span>
              </Link>
              <div className="absolute left-0 top-full z-50 w-64 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="rounded-lg border border-[#e5dcd0] bg-white py-2 shadow-2xl">
                  {tourLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-sm font-semibold text-[#4a3b32] hover:bg-[#fbf7f2] hover:text-[#d96c27] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Destinations kept — no /morocco-destinations */}
            <div className="group relative py-6">
              <span className={`inline-flex items-center gap-1 cursor-default ${textColor} ${hoverColor} transition-colors`}>
                Destinations <span aria-hidden="true" className="text-[10px] mt-0.5">▼</span>
              </span>
              <div className="absolute left-0 top-full z-50 w-56 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="rounded-lg border border-[#e5dcd0] bg-white py-2 shadow-2xl">
                  {destinationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-sm font-semibold text-[#4a3b32] hover:bg-[#fbf7f2] hover:text-[#d96c27] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/trips" className={`${textColor} ${hoverColor} transition-colors`}>Day Trips</Link>
            <Link href="/blog" className={`${textColor} ${hoverColor} transition-colors`}>Blog</Link>
            <Link href="/about-us" className={`${textColor} ${hoverColor} transition-colors`}>About Us</Link>
            <Link href="/contact" className={`${textColor} ${hoverColor} transition-colors`}>Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-[#d96c27] px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#c25e1d] hover:shadow-lg hover:-translate-y-0.5"
              href="/contact"
            >
              Book Your Trip
            </Link>

            <button
              className={`inline-flex items-center justify-center rounded-full border p-2 lg:hidden transition-colors ${
                showSolid ? "border-[#ddd] bg-white text-[#333]" : "border-white/30 bg-black/20 text-white"
              }`}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-menu"
        className={[
          "fixed right-0 top-0 z-50 h-dvh w-[85vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-20 items-center justify-between border-b border-[#eee] px-6">
          <Image
            src="/picture/vacations-to-morocco.webp"
            alt="Vacations to Morocco"
            width={120}
            height={40}
            style={{ objectFit: "contain", height: "40px" }}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#ddd] bg-gray-50 p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav className="flex h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto px-6 py-6 text-[#2d251f]">
          <Link href="/" onClick={() => setOpen(false)} className="py-3 font-bold text-lg hover:text-[#d96c27]">
            Home
          </Link>

          <div className="border-b border-[#f0f0f0] pb-2">
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left font-bold text-lg hover:text-[#d96c27]"
              onClick={() => setMobileToursOpen((v) => !v)}
            >
              Morocco Tours <span className="text-sm">{mobileToursOpen ? "▲" : "▼"}</span>
            </button>
            {mobileToursOpen && (
              <div className="flex flex-col space-y-2 pl-4 pb-3">
                {tourLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-1.5 text-sm font-semibold text-gray-600 hover:text-[#d96c27]"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-b border-[#f0f0f0] pb-2 mt-2">
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left font-bold text-lg hover:text-[#d96c27]"
              onClick={() => setMobileDestinationsOpen((v) => !v)}
            >
              Destinations <span className="text-sm">{mobileDestinationsOpen ? "▲" : "▼"}</span>
            </button>
            {mobileDestinationsOpen && (
              <div className="flex flex-col space-y-2 pl-4 pb-3">
                {destinationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-1.5 text-sm font-semibold text-gray-600 hover:text-[#d96c27]"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/trips" onClick={() => setOpen(false)} className="py-3 font-bold text-lg hover:text-[#d96c27] mt-2 border-b border-[#f0f0f0]">
            Day Trips
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="py-3 font-bold text-lg hover:text-[#d96c27] border-b border-[#f0f0f0]">
            Blog
          </Link>
          <Link href="/about-us" onClick={() => setOpen(false)} className="py-3 font-bold text-lg hover:text-[#d96c27] border-b border-[#f0f0f0]">
            About Us
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="py-3 font-bold text-lg hover:text-[#d96c27]">
            Contact
          </Link>

          <div className="mt-8">
            <Link
              className="flex w-full items-center justify-center rounded-full bg-[#d96c27] px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#c25e1d]"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Book Your Trip
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}