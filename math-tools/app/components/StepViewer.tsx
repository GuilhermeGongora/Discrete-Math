// components/StepViewer.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Fraction } from "mathjs";

type StepViewerProps = {
  mode: "gaussian" | "inverse" | "determinant";
  steps: (number | Fraction)[][][];
  solution?: number[] | number | Fraction[][];
};

export default function StepViewer({ mode, steps, solution }: StepViewerProps) {
  const [index, setIndex] = useState(0);
  const maxIndex = steps.length - 1;
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Se não houver passos, pulamos direto para o resultado
  if (!steps.length) {
    if (mode === "determinant" && typeof solution === "number") {
      return (
        <div className="mt-6 text-center">
          <h3 className="font-semibold">Determinante:</h3>
          <span className="text-xl">{solution.toFixed(3)}</span>
        </div>
      );
    }
    if (
      mode === "gaussian" &&
      Array.isArray(solution) &&
      typeof solution[0] === "number"
    ) {
      const sol = solution as number[];
      return (
        <div className="mt-6">
          <h3 className="font-semibold">Solução:</h3>
          <ul className="list-disc list-inside">
            {sol.map((x, idx) => (
              <li key={idx}>
                x<sub>{idx + 1}</sub> = {x.toFixed(3)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (
      mode === "inverse" &&
      Array.isArray(solution) &&
      Array.isArray(solution?.[0])
    ) {
      const inv = solution as Fraction[][];
      return (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Matriz Inversa (frações exatas):</h3>
          <table className="mx-auto border-collapse">
            <tbody>
              {inv.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border px-3 py-1 text-right min-w-[3rem] whitespace-nowrap"
                    >
                      {cell.toFraction()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Navegação entre passos */}
      {steps.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span className="text-sm">
            Passo {index + 1} de {maxIndex + 1}
          </span>
          <button
            onClick={goNext}
            disabled={index === maxIndex}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próximo →
          </button>
        </div>
      )}

      {/* Exibição da matriz do passo atual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="overflow-auto"
        >
          <table className="mx-auto border-collapse">
            <tbody>
              {steps[index].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    // Fração?
                    if (
                      typeof cell === "object" &&
                      typeof (cell as Fraction).toFraction === "function"
                    ) {
                      return (
                        <td
                          key={j}
                          className="border px-3 py-1 text-right min-w-[3rem] whitespace-nowrap"
                        >
                          {(cell as Fraction).toFraction()}
                        </td>
                      );
                    }
                    // Número decimal
                    return (
                      <td
                        key={j}
                        className="border px-3 py-1 text-right min-w-[3rem]"
                      >
                        {(cell as number).toFixed(0)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>

      {/* Resultado final específico */}
      {mode === "inverse" && (
        <div className="mt-4 space-y-4 text-center">
          <h3 className="font-semibold">Inversa Final:</h3>
          <table className="mx-auto border-collapse">
            <tbody>
              {(solution as Fraction[][]).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border px-3 py-1 text-right min-w-[3rem] whitespace-nowrap"
                    >
                      {cell.toFraction()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mode === "gaussian" && Array.isArray(solution) && (
        <div className="mt-4">
          <h3 className="font-semibold">Solução:</h3>
          <ul className="list-disc list-inside">
            {(solution as number[]).map((x, idx) => (
              <li key={idx}>
                x<sub>{idx + 1}</sub> = {x.toFixed(0)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "determinant" && typeof solution === "number" && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold">Determinante:</h3>
          <span className="text-xl">{solution.toFixed(0)}</span>
        </div>
      )}
    </div>
  );
}
