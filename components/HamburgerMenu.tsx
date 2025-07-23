"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "my-journey" },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsOpen(!isOpen);
    }
  };

  const closeMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [pathname]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            "block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out",
            isOpen && "rotate-45 translate-y-2"
          )}
        />
        <span
          className={cn(
            "block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out",
            isOpen && "-rotate-45 -translate-y-2"
          )}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={closeMenu}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Menu Content */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg menu-slide-down",
              isAnimating && "menu-slide-up"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6 space-y-6">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-4 flex flex-col items-center">
                {navItems.map(({ label, href }) => (
                  <Link
                    href={href}
                    key={label}
                    onClick={closeMenu}
                    className={cn(
                      "block py-3 px-4 text-lg font-medium transition-colors hover:bg-gray-50 rounded-lg text-center w-full",
                      pathname === href &&
                        "text-primary font-semibold bg-gray-50"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <SignedOut>
                  <SignInButton>
                    <button
                      onClick={closeMenu}
                      className="w-full btn-signin text-center"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
