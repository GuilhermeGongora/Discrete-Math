"use client";

import { useState } from "react";
import { gaussianElimination } from "../utils/gaussianElimination";
import { inverseMatrixWithSteps } from "../utils/inverseMatrix";
import { determinantWithSteps } from "../utils/determinant";
import type { Fraction } from "mathjs";
import StepViewer from "./StepViewer";

type MatrixInputProps = {
  size: number;
  mode: "gaussian" | "inverse" | "determinant";
};

export default function MatrixInput({ size, mode }: MatrixInputProps) {
  const cols = mode === "gaussian" ? size + 1 : size;

  const [matrix, setMatrix] = useState<string[][]>(
    Array.from({ length: size }, () => Array(cols).fill("0"))
  );
  const [steps, setSteps] = useState<(number | Fraction)[][][]>([]);
  const [solution, setSolution] = useState<number[] | number | Fraction[][]>();

  function handleChange(i: number, j: number, value: string) {
    const copy = matrix.map((row) => [...row]);
    copy[i][j] = value;
    setMatrix(copy);
  }

  function handleSolve() {
    const numMatrix = matrix.map((row) =>
      row.map((v) => parseFloat(v.replace(",", ".")) || 0)
    );

    switch (mode) {
      case "gaussian": {
        const { steps: geSteps, solution: geSol } =
          gaussianElimination(numMatrix);
        setSteps(geSteps);
        setSolution(geSol);
        break;
      }

      case "inverse": {
        const result = inverseMatrixWithSteps(numMatrix);
        if (!result) {
          setSteps([]);
          setSolution(NaN);
          return;
        }
        // Preenche steps com as etapas de Gauss–Jordan e solution com a inversa final
        setSteps(result.steps);
        setSolution(result.inverse);
        break;
      }

      case "determinant": {
        const { steps: detSteps, det } = determinantWithSteps(numMatrix);
        setSteps(detSteps);
        setSolution(det);
        break;
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Grid de inputs */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(3rem, 1fr))` }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              className="border p-1 text-center rounded"
            />
          ))
        )}
      </div>

      <button
        onClick={handleSolve}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Resolver
      </button>

      {/* Renderiza sempre o StepViewer, que agora mostrará passos para todos os modos */}
      <StepViewer mode={mode} steps={steps} solution={solution} />
    </div>
  );
}
