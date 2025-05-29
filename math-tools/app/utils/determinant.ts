/**
 * Calcula o determinante de A usando escalonamento de Gauss
 * e retorna as matrizes de cada etapa + o valor final.
 */
export function determinantWithSteps(matrix: number[][]): {
  steps: number[][][];
  det: number;
} {
  const n = matrix.length;
  const A = matrix.map((r) => r.slice());
  const steps: number[][][] = [A.map((r) => r.slice())];
  let det = 1;

  for (let k = 0; k < n; k++) {
    // 1) encontra pivot
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) maxRow = i;
    }
    // 2) troca de linha, se necessário
    if (maxRow !== k) {
      [A[k], A[maxRow]] = [A[maxRow], A[k]];
      det *= -1; // troca inverte sinal
    }
    // 3) se pivot zero, det = 0 e terminamos
    const pivot = A[k][k];
    if (pivot === 0) {
      det = 0;
      steps.push(A.map((r) => r.slice()));
      return { steps, det };
    }
    det *= pivot;

    // 4) eliminação abaixo
    for (let i = k + 1; i < n; i++) {
      const factor = A[i][k] / pivot;
      for (let j = k; j < n; j++) {
        A[i][j] -= factor * A[k][j];
      }
    }
    // 5) armazena etapa
    steps.push(A.map((r) => r.slice()));
  }

  return { steps, det };
}
