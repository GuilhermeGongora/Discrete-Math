"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/gaussian", label: "Escalonamento" },
    { href: "/inverse", label: "Inversa" },
    { href: "/determinant", label: "Determinante" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      {/* Backdrop Layer */}
      <div className="absolute inset-0 " />

      {/* Navbar Content */}
      <div className="relative w-full px-4 py-6 flex justify-center">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors z-10"
          >
            Math Tools
          </Link>

          <ul className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 z-10">
            {links.map((link) => {
              const isActive = path === link.href;
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-1 font-medium transition-colors duration-300 ${
                      isActive ? "text-blue-400" : "hover:text-blue-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-400 transition-transform duration-300 transform ${
                        isActive
                          ? ""
                          : "scale-x-0 group-hover:scale-x-100 origin-left"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
