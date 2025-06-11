// utils/determinant.ts

/**
 * Calcula o determinante usando eliminação no estilo “cruzado” (sem normalizar a linha do pivô),
 * exatamente como mostrado nos exemplos do quadro. Em cada passo:
 *
 *   1. Pivô = A[k][k]. Se for zero, det = 0 e encerramos.
 *   2. Para cada i > k:
 *        Nova linha_i = pivô * linha_i − A[i][k] * linha_k
 *      (e isso zera A[i][k], gerando um inteiro no restante da linha).
 *   3. Armazenamos o estado inteiro de A em `steps`.
 *
 * No fim, calculamos o determinante a partir dos produtos das diagonais, levando em conta quantas vezes multiplicamos
 * as linhas pelos pivôs. Mas, se a única preocupação for o valor final, basta usar diretamente a fórmula de Laplace
 * numa matriz 2×2 – para matrizes maiores, você pode usar a mesma rotina de Gaussian “clássico” apenas para extrair det.
 *
 * Aqui, focamos em “passos de quadro” e devolvemos também um `det` correto.
 */
export function determinantWithSteps(matrix: number[][]): {
  steps: number[][][];
  det: number;
} {
  const n = matrix.length;
  // Cópia profunda da matriz original (para não mutar)
  const A: number[][] = matrix.map((r) => r.slice());
  const steps: number[][][] = [A.map((r) => r.slice())];

  // Vamos armazenar cada pivô que usamos, para ajustar o det no final se quisermos.
  const pivots: number[] = [];

  for (let k = 0; k < n; k++) {
    const pivot = A[k][k];

    // Se pivô é zero, determinante = 0 e gravamos este passo
    if (pivot === 0) {
      steps.push(A.map((r) => r.slice()));
      return { steps, det: 0 };
    }

    // Guardamos o pivô (para uso no cálculo final do det, se quiser)
    pivots.push(pivot);

    // Eliminação cruzada: para cada linha abaixo, i = k+1..n-1
    for (let i = k + 1; i < n; i++) {
      const alpha = A[i][k]; // elemento que será zerado
      // A[i][j] := pivô*A[i][j] − alpha*A[k][j], para cada coluna j=k..n-1
      for (let j = k; j < n; j++) {
        A[i][j] = pivot * A[i][j] - alpha * A[k][j];
      }
      // Após essa operação, A[i][k] = 0. Armazenamos cada subetapa:
      steps.push(A.map((r) => r.slice()));
    }
  }

  // Agora A está em uma forma “quase triangular”, mas cada linha i foi
  // multiplicada implicitamente por todos os pivôs anteriores.
  // A diagonal final A[i][i] já carrega (pivô_i × pivô_{i+1} × ...).
  // Para obter o valor exato de det, podemos usar:
  //
  //   det = A[0][0] * A[1][1] * ... * A[n-1][n-1]
  //         / ( pivots[0]^(n-1) × pivots[1]^(n-2) × ... × pivots[n-2]^1 ).
  //
  // Implementamos isso abaixo:

  // 1) Produto das diagonais finais
  let prodDiagonal = 1;
  for (let i = 0; i < n; i++) {
    prodDiagonal *= A[i][i];
  }

  // 2) Ajuste pelos pivôs usados em cada etapa
  let divisor = 1;
  for (let k = 0; k < n - 1; k++) {
    // O pivô pivots[k] entrou nas linhas i>k. Ou seja, ele multiplicou cada uma
    // das n−1−k linhas restantes. Logo, a potência é (n−1−k).
    divisor *= Math.pow(pivots[k], n - 1 - k);
  }

  const det = prodDiagonal / divisor;

  return { steps, det };
}
