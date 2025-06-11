"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const tools = [
  { href: "/gaussian", label: "Escalonamento (Gauss)" },
  { href: "/inverse", label: "Matriz Inversa" },
  { href: "/determinant", label: "Determinante" },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-950 via-gray-900 to-blue-950 font-sans">
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-8 text-white"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center drop-shadow-lg tracking-tight">
          Math Tools
        </h1>

        <p className="text-base sm:text-lg text-blue-200 text-center max-w-md">
          Escolha uma ferramenta para começar:
        </p>

        {/* 🔧 Corrigido aqui: flex-wrap e justify-center no container */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-xl">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link
                href={tool.href}
                className="block text-center w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300"
              >
                {tool.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
