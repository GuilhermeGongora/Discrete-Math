// components/StepViewer.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Fraction } from "mathjs";
import { fraction, isInteger } from "mathjs";

type StepViewerProps = {
  mode: "gaussian" | "inverse" | "determinant";
  steps: (number | Fraction)[][][];
  solution?: number[] | number | Fraction[][];
};

export default function StepViewer({ mode, steps, solution }: StepViewerProps) {
  if (!steps.length) {
    if (mode === "determinant" && typeof solution === "number") {
      return (
        <div className="mt-6 text-center">
          <h3 className="font-semibold">Determinante:</h3>
          <span className="text-xl">{solution}</span>
        </div>
      );
    }
    if (mode === "gaussian" && Array.isArray(solution)) {
      return (
        <div className="mt-6">
          <h3 className="font-semibold">Solução:</h3>
          <ul className="list-disc list-inside">
            {(solution as number[]).map((v, i) => (
              <li key={i}>
                x<sub>{i + 1}</sub> ={" "}
                {isInteger(v) ? v : fraction(v).toFraction()}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (
      mode === "inverse" &&
      Array.isArray(solution) &&
      Array.isArray(solution[0])
    ) {
      return (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Matriz Inversa (frações exatas):</h3>
          <MatrixTable rows={solution as Fraction[][]} />
        </div>
      );
    }
    return null;
  }

  const [index, setIndex] = useState(0);
  const max = steps.length - 1;
  const navBtn =
    "px-3 py-1 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700";

  return (
    <div className="mt-6 space-y-4">
      {steps.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className={navBtn}
          >
            ← Anterior
          </button>
          <span className="text-sm">
            Passo {index + 1} de {max + 1}
          </span>
          <button
            onClick={() => setIndex((i) => Math.min(max, i + 1))}
            disabled={index === max}
            className={navBtn}
          >
            Próximo →
          </button>
        </div>
      )}

      {/* Matriz do passo atual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="overflow-auto"
        >
          <MatrixTable rows={steps[index]} />
        </motion.div>
      </AnimatePresence>

      {/* Blocos de resultado final (opcionais) ------------------------ */}
      {mode === "inverse" && Array.isArray(solution) && (
        <>
          <h3 className="font-semibold text-center">Inversa Final:</h3>
          <MatrixTable rows={solution as Fraction[][]} />
        </>
      )}

      {mode === "gaussian" && Array.isArray(solution) && (
        <div>
          <h3 className="font-semibold">Solução:</h3>
          <ul className="list-disc list-inside">
            {(solution as number[]).map((v, i) => (
              <li key={i}>
                x<sub>{i + 1}</sub> ={" "}
                {isInteger(v) ? v : fraction(v).toFraction()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "determinant" && typeof solution === "number" && (
        <div className="text-center">
          <h3 className="font-semibold">Determinante:</h3>
          <span className="text-xl">{solution}</span>
        </div>
      )}
    </div>
  );
}

function MatrixTable({ rows }: { rows: (number | Fraction)[][] }) {
  return (
    <table className="mx-auto border-collapse">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => {
              const text =
                typeof c === "object" && "toFraction" in c
                  ? c.toFraction()
                  : Math.round(c);
              return (
                <td
                  key={j}
                  className="border px-3 py-1 text-right min-w-[3rem] whitespace-nowrap"
                >
                  {text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
