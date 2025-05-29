"use client";
import MatrixInput from "../components/MatrixInput";

export default function InversePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Matriz Inversa</h1>
      <MatrixInput size={3} mode="inverse" />
    </div>
  );
}
