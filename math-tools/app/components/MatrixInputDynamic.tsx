"use client";

import { useState, useEffect } from "react";
import { gaussianElimination } from "../utils/gaussianElimination";
import { inverseMatrixWithSteps } from "../utils/inverseMatrix";
import { determinantWithSteps } from "../utils/determinant";
import type { Fraction } from "mathjs";
import StepViewer from "./StepViewer";

type Mode = "gaussian" | "inverse" | "determinant";

interface MatrixInputProps {
  mode: Mode;
}

export default function MatrixInputDynamic({ mode }: MatrixInputProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(mode === "gaussian" ? 4 : 3);
  const effectiveCols = mode === "gaussian" ? rows + 1 : cols;

  const [matrix, setMatrix] = useState<string[][]>(() =>
    Array.from({ length: rows }, () => Array(effectiveCols).fill(""))
  );

  const [steps, setSteps] = useState<(number | Fraction)[][][]>([]);
  const [solution, setSolution] = useState<number[] | number | Fraction[][]>();

  useEffect(() => {
    if (mode === "inverse") {
      setCols(rows);
    }
  }, [rows, mode]);

  useEffect(() => {
    setMatrix(
      Array.from({ length: rows }, () =>
        Array(mode === "gaussian" ? rows + 1 : cols).fill("")
      )
    );
    setSteps([]);
    setSolution(undefined);
  }, [rows, cols, mode]);

  const handleChange = (i: number, j: number, val: string) => {
    const copy = matrix.map((r) => [...r]);
    copy[i][j] = val;
    setMatrix(copy);
  };

  const handleSolve = () => {
    const numMat = matrix.map((r) =>
      r.map((v) => {
        const n = parseFloat(v);
        return isNaN(n) ? 0 : n;
      })
    );

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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex flex-col">
          Linhas:
          <input
            type="number"
            min={2}
            max={20}
            value={rows}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) setRows(Math.max(2, Math.min(20, val)));
            }}
            className="border p-1 rounded text-center w-20"
          />
        </label>

        {mode !== "gaussian" && (
          <label className="flex flex-col">
            Colunas:
            <input
              type="number"
              min={2}
              max={20}
              value={cols}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) setCols(Math.max(2, Math.min(20, val)));
              }}
              disabled={mode === "inverse"}
              className="border p-1 rounded text-center w-20"
            />
          </label>
        )}
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${effectiveCols}, minmax(3rem, 1fr))`,
        }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              placeholder="0"
              onChange={(e) => handleChange(i, j, e.target.value)}
              className="border rounded p-1 text-center"
            />
          ))
        )}
      </div>

      <button
        onClick={handleSolve}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Resolver
      </button>

      <StepViewer mode={mode} steps={steps} solution={solution} />
    </div>
  );
}
