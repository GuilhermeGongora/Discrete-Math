"use client";
import MatrixInput from "../components/MatrixInput";

export default function GaussianPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Escalonamento (Gauss)</h1>
      <MatrixInput size={3} mode="gaussian" />
    </div>
  );
}
