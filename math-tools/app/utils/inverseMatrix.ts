// utils/inverseMatrix.ts

import { fraction, Fraction } from "mathjs";

/**
 * Retorna as etapas de Gauss–Jordan em estilo “eliminação cruzada inteira”
 * (sem normalizar cada pivô imediatamente) e, em seguida, normaliza cada linha
 * separadamente, gerando a inversa exata no final.
 *
 * Cada subetapa é gravada em `steps` como um snapshot completo da matriz aumentada.
 *
 * 1) Monta [ A | I ] em Fractions.
 * 2) Para k = 0..n-1:
 *      pivot = A[k][k]
 *      se pivot == 0 → matriz singular (retorna undefined)
 *      para cada i ≠ k:
 *         α = A[i][k]
 *         linha_i := pivot * linha_i − α * linha_k   (para j = 0..2n-1)
 *         grava um snapshot após atualizar linha_i inteira.
 * 3) Após terminar todas as colunas, grava um snapshot “final da eliminação”
 *    (isto é, a forma triangular esquerda com pivôs na diagonal, a metade direita
 *     multiplicada pelos mesmos pivôs).
 * 4) Em seguida, normaliza **linha 0** dividindo-a por A[0][0], grava outro snapshot.
 * 5) Normaliza **linha 1** dividindo-a por A[1][1], grava snapshot.
 * 6) Normaliza **linha 2** dividindo-a por A[2][2], grava snapshot final.
 * 7) Extrai a inversa de A, que está em [ colunas n..2n-1 ] na última snapshot.
 *
 * @param matrix Matriz original A (n×n de números JS).
 * @returns
 *   - steps: matriz de snapshots (Fraction[][]) em cada subetapa;
 *   - inverse: matriz inversa exata (Fraction[][]).
 *   Retorna `undefined` se A não for invertível.
 */
export function inverseMatrixWithSteps(
  matrix: number[][]
): { steps: Fraction[][][]; inverse: Fraction[][] } | undefined {
  const n = matrix.length;

  // 1) Montar matriz aumentada [A | I] em Fractions
  const A: Fraction[][] = Array.from({ length: n }, (_, i) => {
    // convertendo cada linha de matrix[i] em Fraction
    const rowA = matrix[i].map((v) => fraction(v));
    // linha identidade
    const rowI = Array.from({ length: n }, (_, j) =>
      i === j ? fraction(1) : fraction(0)
    );
    return [...rowA, ...rowI];
  });

  // 2) Gravar o estado inicial
  const steps: Fraction[][][] = [A.map((r) => r.map((c) => c.clone()))];

  // 3) Eliminação cruzada inteira (Gauss–Jordan sem divisão imediata)
  for (let k = 0; k < n; k++) {
    const pivot = A[k][k];
    if (pivot.equals(0)) {
      // Matriz singular: não invertível
      return undefined;
    }

    // Para cada linha i ≠ k, fazemos: linha_i := pivot⋅linha_i − A[i][k]⋅linha_k
    for (let i = 0; i < n; i++) {
      if (i === k) continue;

      const alpha = A[i][k]; // o valor que queremos zerar
      for (let j = 0; j < 2 * n; j++) {
        // Nova entrada: pivot*A[i][j] − alpha*A[k][j]
        A[i][j] = pivot.mul(A[i][j]).sub(alpha.mul(A[k][j]));
      }
      // Gravar snapshot após atualizar toda linha i
      steps.push(A.map((r) => r.map((c) => c.clone())));
    }
  }

  // 3.a) Gravar também o “snapshot final da eliminação”, antes de qualquer normalização
  //     (evita que a primeira normalização “ofusque” a etapa em que a diagonal ficou [20,10,2])
  steps.push(A.map((r) => r.map((c) => c.clone())));

  // 4) Agora normalizamos cada linha i separadamente, gravando cada divisão como um passo novo:

  for (let i = 0; i < n; i++) {
    const piv = A[i][i];
    // Dividimos toda a linha i pelo seu pivô
    for (let j = 0; j < 2 * n; j++) {
      A[i][j] = A[i][j].div(piv);
    }
    // Gravar snapshot logo após normalizar a linha i
    steps.push(A.map((r) => r.map((c) => c.clone())));
  }

  // 5) Extração da inversa: colunas n..2n−1 da última snapshot
  const inverse: Fraction[][] = Array.from({ length: n }, (_, i) => {
    return A[i].slice(n, 2 * n).map((c) => c.clone());
  });

  return { steps, inverse };
}
