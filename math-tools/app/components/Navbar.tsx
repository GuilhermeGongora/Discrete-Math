// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/gaussian", label: "Escalonamento" },
    { href: "/inverse", label: "Inversa" },
    { href: "/determinant", label: "Determinante" },
  ];

  return (
    /* sticky → gruda no topo | backdrop-blur para leve desfoque em scroll */
    <nav className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-md shadow-sm justify-center">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home (sempre visível) */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-white hover:text-blue-300 transition-colors"
        >
          Gaussávio😎
        </Link>

        {/* Links extras — exibidos APENAS em ≥ sm */}
        <ul className="hidden sm:flex items-center space-x-6 text-white text-sm md:text-base">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href} className="relative group">
                <Link
                  href={href}
                  className={`px-2 py-1 transition-colors ${
                    active ? "text-blue-300" : "hover:text-blue-300"
                  }`}
                >
                  {label}
                  {/* sub-linha animada */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] w-full bg-blue-300 transition-transform duration-300 ${
                      active
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
    </nav>
  );
}
