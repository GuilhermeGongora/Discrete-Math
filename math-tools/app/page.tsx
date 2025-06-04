// app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Fundo animado */}

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 space-y-8 text-white">
        <h1 className="text-5xl font-bold">Math Tools</h1>
        <p className="text-lg text-gray-300">
          Escolha uma ferramenta para começar:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/gaussian"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded transition"
          >
            Escalonamento (Gauss)
          </Link>
          <Link
            href="/inverse"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded transition"
          >
            Matriz Inversa
          </Link>
          <Link
            href="/determinant"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded transition"
          >
            Determinante
          </Link>
        </div>
      </div>
    </div>
  );
}
