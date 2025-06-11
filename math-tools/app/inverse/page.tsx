// app/inverse/page.tsx (ou pages/inverse.tsx)
"use client";

import MatrixInputDynamic from "../components/MatrixInputDynamic";

export default function InversePage() {
  return (
    <div className="p-6 min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-blue-950 font-sans">
      <h1 className="text-2xl font-bold mb-4">Matriz Inversa</h1>
      <MatrixInputDynamic mode="inverse" />
    </div>
  );
}
