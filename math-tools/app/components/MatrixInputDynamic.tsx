// components/MatrixInput.tsx
"use client";

import { useState, useEffect } from "react";
import { gaussianElimination } from "../utils/gaussianElimination";
import { inverseMatrixWithSteps } from "../utils/inverseMatrix";
import { determinantWithSteps } from "../utils/determinant";
import type { Fraction } from "mathjs";
import StepViewer from "./StepViewer";

type Mode = "gaussian" | "inverse" | "determinant";

export default function MatrixInputDynamic() {
  const [mode, setMode] = useState<Mode>("gaussian");
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4); // for gaussian cols = rows+1 by default

  // adjust cols when mode or rows change
  const computedCols = mode === "gaussian" ? rows + 1 : cols;

  const [matrix, setMatrix] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(computedCols).fill("0"))
  );
  const [steps, setSteps] = useState<(number | Fraction)[][][]>([]);
  const [solution, setSolution] = useState<number[] | number | Fraction[][]>();

  // regenerate matrix when dims change
  useEffect(() => {
    const newCols = mode === "gaussian" ? rows + 1 : cols;
    setMatrix(Array.from({ length: rows }, () => Array(newCols).fill("0")));
    setSteps([]);
    setSolution(undefined);
  }, [mode, rows, cols]);

  function handleChange(i: number, j: number, val: string) {
    const copy = matrix.map((r) => [...r]);
    copy[i][j] = val;
    setMatrix(copy);
  }

  function handleSolve() {
    const numMat = matrix.map((r) => r.map((v) => parseFloat(v) || 0));
    switch (mode) {
      case "gaussian": {
        const { steps: s, solution: sol } = gaussianElimination(numMat);
        setSteps(s);
        setSolution(sol);
        break;
      }
      case "inverse": {
        const res = inverseMatrixWithSteps(numMat);
        if (!res) {
          setSteps([]);
          setSolution(NaN);
          return;
        }
        setSteps(res.steps);
        setSolution(res.inverse);
        break;
      }
      case "determinant": {
        const { steps: s, det } = determinantWithSteps(numMat);
        setSteps(s);
        setSolution(det);
        break;
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label>
          Modo:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="gaussian">Sistemas Lineares</option>
            <option value="inverse">Matriz Inversa</option>
            <option value="determinant">Determinantes</option>
          </select>
        </label>
        <label>
          Linhas:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Math.max(2, parseInt(e.target.value)))}
            min={2}
            max={10}
          />
        </label>
        {mode !== "gaussian" && (
          <label>
            Colunas:
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Math.max(2, parseInt(e.target.value)))}
              min={2}
              max={10}
            />
          </label>
        )}
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${computedCols}, minmax(3rem,1fr))`,
        }}
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Resolver
      </button>

      <StepViewer mode={mode} steps={steps} solution={solution} />
    </div>
  );
}
