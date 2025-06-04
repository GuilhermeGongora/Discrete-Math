// app/page.tsx
"use client";

import Link from "next/link";
import Background from "./components/Background";

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-slate-900">
      <Background />
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">Math Tools</h1>
        <p className="text-gray-300">Escolha uma ferramenta para começar:</p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/gaussian"
            className="rounded bg-indigo-600 px-6 py-3 font-medium text-white shadow hover:bg-indigo-500 transition"
          >
            Escalonamento (Gauss)
          </Link>
          <Link
            href="/inverse"
            className="rounded bg-green-600 px-6 py-3 font-medium text-white shadow hover:bg-green-500 transition"
          >
            Matriz Inversa
          </Link>
          <Link
            href="/determinant"
            className="rounded bg-red-600 px-6 py-3 font-medium text-white shadow hover:bg-red-500 transition"
          >
            Determinante
          </Link>
        </div>
      </div>
    </div>
  );
}
