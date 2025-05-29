import { fraction, Fraction } from "mathjs";

/**
 * Retorna as etapas de Gauss–Jordan e a matriz inversa:
 */
export function inverseMatrixWithSteps(
  matrix: number[][]
): { steps: Fraction[][][]; inverse: Fraction[][] } | undefined {
  const n = matrix.length;
  // Monta [A | I] em Fractions
  const A: Fraction[][] = matrix.map((row, i) => [
    ...row.map((v) => fraction(v)),
    ...Array.from({ length: n }, (_, j) =>
      i === j ? fraction(1) : fraction(0)
    ),
  ]);

  const steps: Fraction[][][] = [A.map((r) => r.slice())];

  for (let k = 0; k < n; k++) {
    // pivot via maior valor absoluto
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (A[i][k].abs().valueOf() > A[maxRow][k].abs().valueOf()) maxRow = i;
    }
    [A[k], A[maxRow]] = [A[maxRow], A[k]];
    // normalize pivot row
    const pivot = A[k][k];
    if (pivot.valueOf() === 0) return undefined;
    for (let j = 0; j < 2 * n; j++) A[k][j] = A[k][j].div(pivot);

    // eliminate
    for (let i = 0; i < n; i++) {
      if (i !== k) {
        const factor = A[i][k];
        for (let j = 0; j < 2 * n; j++) {
          A[i][j] = A[i][j].sub(factor.mul(A[k][j]));
        }
      }
    }
    steps.push(A.map((r) => r.slice()));
  }

  // separa a parte da inversa
  const inverse = A.map((r) => r.slice(n, 2 * n));
  return { steps, inverse };
}
