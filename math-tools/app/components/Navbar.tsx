// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
export default function Navbar() {
  const path = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/gaussian", label: "Escalonamento" },
    { href: "/inverse", label: "Inversa" },
    { href: "/determinant", label: "Determinante" },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold">Math Tools</span>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-1 py-2 font-medium hover:text-indigo-400"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-indigo-400"
                  layoutId="underline"
                  initial={false}
                  animate={
                    path === link.href ? { width: "100%" } : { width: 0 }
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
