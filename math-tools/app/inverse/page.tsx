// app/inverse/page.tsx (ou pages/inverse.tsx)
"use client";

import MatrixInputDynamic from "../components/MatrixInputDynamic";

export default function InversePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matriz Inversa</h1>
      <MatrixInputDynamic />
    </div>
  );
}
