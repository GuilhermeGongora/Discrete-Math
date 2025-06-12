/**
 * Realiza escalonamento de Gauss e retorna as etapas + solução
 */
export function gaussianElimination(matrix: number[][]): {
  steps: number[][][];
  solution?: number[];
} {
  const n = matrix.length;
  const A = matrix.map((row) => [...row]); // cópia profunda
  const steps: number[][][] = [A.map((r) => [...r])];

  for (let k = 0; k < n; k++) {
    // 1) Procurar a linha com o maior valor absoluto na coluna k
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) {
        maxRow = i;
      }
    }

    // 2) Trocar a linha atual com a linha do maior pivô
    if (A[maxRow][k] === 0) {
      // sistema impossível ou indeterminado
      steps.push(A.map((r) => [...r]));
      return { steps, solution: undefined };
    }

    if (maxRow !== k) {
      [A[k], A[maxRow]] = [A[maxRow], A[k]];
    }

    // 3) Eliminar os elementos abaixo do pivô
    for (let i = k + 1; i < n; i++) {
      const factor = A[i][k] / A[k][k];
      for (let j = k; j <= n; j++) {
        A[i][j] -= factor * A[k][j];
      }
    }

    steps.push(A.map((r) => [...r]));
  }

  // 4) Retro-substituição
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = A[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= A[i][j] * x[j];
    }

    if (A[i][i] === 0) {
      return { steps, solution: undefined }; // sistema indeterminado
    }

    x[i] = sum / A[i][i];
  }

  return { steps, solution: x };
}
