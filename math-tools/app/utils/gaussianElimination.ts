/**
 * Recebe a matriz aumentada de dimensão n×(n+1)
 * e retorna o passo-a-passo do pivoteamento de Gauss.
 */
export function gaussianElimination(matrix: number[][]): {
  steps: number[][][];
  solution?: number[];
} {
  const n = matrix.length;
  const A = matrix.map((row) => row.slice()); // cópia
  const steps: number[][][] = [A.map((r) => r.slice())];

  // Pivoteamento e eliminação
  for (let k = 0; k < n; k++) {
    // 1) Encontrar pivot (maior valor absoluto na coluna k)
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) maxRow = i;
    }
    // 2) Trocar linhas
    [A[k], A[maxRow]] = [A[maxRow], A[k]];
    // 3) Eliminar abaixo
    for (let i = k + 1; i < n; i++) {
      const factor = A[i][k] / A[k][k];
      for (let j = k; j < n + 1; j++) {
        A[i][j] -= factor * A[k][j];
      }
    }
    steps.push(A.map((r) => r.slice()));
  }

  // 4) Retro-substituição (se quiser a solução)
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = A[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= A[i][j] * x[j];
    }
    x[i] = sum / A[i][i];
  }

  return { steps, solution: x };
}
